import { User } from './../user.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import * as AuthActions from './auth.actions';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken:	string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (resData) => {
  const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000)
  const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user))

  return new AuthActions.AuthSuccess({
    email: resData.email,
    userId: resData.localId,
    token: resData.idToken,
    expirationDate
  })
}

const handleError = (errorRes) => {
  const defaultError = 'An error occurred'
  if(!errorRes?.error?.error){
    return of(new AuthActions.AuthFail(defaultError))
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      return of(new AuthActions.AuthFail('Email already exists'))
    default:
      return of(new AuthActions.AuthFail(defaultError))
  }
}

@Injectable()
export class AuthEffects {
  authSignup = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthTypeActions.SIGN_UP_START),
    switchMap((authData: AuthActions.SignUpStart) => {
      const {email, password} = authData.payload
      return this.http.post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_KEY}`,
        {
          email,
          password,
          returnSecureToken: true
        }
      ).pipe(
        tap((resData) => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000)
        }),
        map(handleAuthentication),
        catchError(handleError)
      )
    })
  ))

  authLogin = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthTypeActions.SIGN_IN_START),
    switchMap((authData: AuthActions.SignInStart) => {
      const {email, password} = authData.payload
      return this.http.post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_KEY}`,
        {
          email,
          password,
          returnSecureToken: true
        }
      ).pipe(
        tap((resData) => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000)
        }),
        map(handleAuthentication),
        catchError(handleError)
      )
    })
  ))

  authRedirect = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthTypeActions.AUTH_SUCCESS),
    tap(() => {
      this.router.navigate(['/'])
    })
  ),{dispatch: false})

  autoLogin = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthTypeActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: Date
      } = JSON.parse(localStorage.getItem('userData'))
      if(!userData){
        return { type: '' }
      }

      const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
      if(loadedUser.token){
        const expDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
        this.authService.setLogoutTimer(expDuration)
        return new AuthActions.AuthSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate)
        })
      }
      return { type: '' }
    })
  ))

  authLogout = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthTypeActions.SIGN_OUT),
    tap(() => {
      this.authService.clearLogoutTimer()
      localStorage.removeItem('userData')
      this.router.navigate(['/auth'])
    })
  ), {dispatch: false})

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
