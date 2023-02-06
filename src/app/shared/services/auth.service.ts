import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {fbLoginResponse, User} from "../../enviroments/interfaces";
import {catchError, Observable, tap, throwError, pipe} from "rxjs";
import {enviroment} from "../../enviroments/enviroment";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(private http: HttpClient, private router: Router,
              public afAuth: AngularFireAuth,
              public afs: AngularFirestore) {

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  get token() {
    if(localStorage.getItem('exp-fb-token')) {
      if(new Date().getTime() > +localStorage.getItem('exp-fb-token')!) {
        this.logout()
        return null
      }
    }

    return localStorage.getItem('fb-token')
  }

  private setToken(response: any) {
    const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000)
    localStorage.setItem('fb-token', response.idToken)
    localStorage.setItem('exp-fb-token', expDate.toString())
  }
  login(user: User): Observable<any> {
    return this.http.post(`${enviroment.firebase.firebaseLink}${enviroment.firebase.apiKey}`, user)
      .pipe(
        tap((res) => {
          this.setToken(res)
          this.router.navigate(['/dashboard'])
        }),
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.router.navigate(['/login'])
    localStorage.setItem('fb-token', '')
    localStorage.setItem('exp-fb-token', '')

  }

  handleError(err: HttpErrorResponse) {
    const {message} = err.error.error

    return throwError(message)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        // this.SendVerificationMail();
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // setUserData(user: any) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.id}`);
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     password: user.password
  //   };
  //   return userRef.set(userData, {
  //     merge: true
  //   })
  // }

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
