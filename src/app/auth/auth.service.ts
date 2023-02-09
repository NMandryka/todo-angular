import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../core/interfaces/user/user.interface";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {TasksService} from "../core/services/tasks.service";
import {AlertService} from "../shared/components/alert/alert.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;


  constructor(private http: HttpClient, private router: Router,
              public afAuth: AngularFireAuth,
              public afs: AngularFirestore,
              private tasksService: TasksService,
              private alertService: AlertService
              ) {

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

  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['auth/sign-in']);
    });
  }

  get isLoggedIn(): boolean {

    const user = JSON.parse(localStorage.getItem('user')!);

    return user !== null;
  }

  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {

        this.setUserData(result.user);
        this.tasksService.createDbForNewUser(result.user!.uid).subscribe()
        this.router.navigate(['dashboard'])

      })
      .catch((error) => {
        this.alertService.danger('There is no user with this data')
        throw new Error(error)
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

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/dashboard']);
          }
        });
      })
      .catch((error) => {
        this.alertService.danger('There is not user with this data')
      });
  }
}
