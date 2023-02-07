import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  constructor(private auth: AuthService,
              private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.delay(500).then(() => {
      if(this.auth.isLoggedIn) {
        return true
      } else {
        this.auth.signOut()
        this.router.navigate(['/sign-in'], {
          queryParams: {
            isAuth: false
          }
        })
        return false
      }
    })

  }

  async delay(time: number) {
    return await new Promise(resolve => setTimeout(resolve, time))
  }

}
