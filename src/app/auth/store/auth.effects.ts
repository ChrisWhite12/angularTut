import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap, throwError } from "rxjs";
import * as AuthActions from './auth.actions';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken:	string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
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
        map(resData => {
          const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000)

          return new AuthActions.SignIn({
            email: resData.email,
            userId: resData.localId,
            token: resData.idToken,
            expirationDate
          })
        }),
        catchError(errorRes => {
          const defaultError = 'An error occurred'
          if(!errorRes?.error?.error){
            return of(new AuthActions.SignInFail(defaultError))
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              return of(new AuthActions.SignInFail('Email already exists'))
            default:
              return of(new AuthActions.SignInFail(defaultError))
          }
        })
      )
    })
  ))

  authSuccess = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.AuthTypeActions.SIGN_IN),
    tap(() => {
      this.router.navigate(['/'])
    })
  ),{dispatch: false})

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}
}
