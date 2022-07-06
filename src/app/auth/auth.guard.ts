import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";
import * as fromApp from '../store/app.reducer'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree > | boolean | UrlTree | Promise<boolean | UrlTree > {
    const authState = this.store.select('auth')
    return authState.pipe(
      take(1),
      map((state) => {
        const isAuth = !!state.user
        if (isAuth) {
          return true
        }
        return this.router.createUrlTree(['/auth'])
      })
    )
  }
}
