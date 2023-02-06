import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {fbLoginResponse, User} from "../../enviroments/interfaces";
import {catchError, Observable, tap, throwError, pipe} from "rxjs";
import {enviroment} from "../../enviroments/enviroment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

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

}
