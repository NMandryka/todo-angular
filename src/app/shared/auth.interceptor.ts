import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements  HttpInterceptor {

  constructor(private auth: AuthService,
              private router: Router) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.auth.isLoggedIn) {
      req = req.clone()
    }
    return next.handle(req)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          console.log('[Interceptor error]', err.message)
          if(err.status === 401) {
            this.auth.signOut()
            this.router.navigate(['sign-up'], {
              queryParams: {
                authFailed: true
              }
            })
          }
          return throwError(err.message)
        })
      )
  }

}
