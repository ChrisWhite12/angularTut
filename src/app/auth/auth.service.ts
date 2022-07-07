import { AuthActions, SignIn, SignOut } from './store/auth.actions';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs'
import { User } from './user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken:	string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private tokenExp: any

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ){}

  signup(email:string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      tap(({email, localId, idToken, expiresIn}) => {
        this.handleAuthentication(email, localId, idToken, +expiresIn)
      })
    )
  }

  login(email:string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      tap(({email, localId, idToken, expiresIn}) => {
        this.handleAuthentication(email, localId, idToken, +expiresIn)
      })
    )
  }

  autoLogin () {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: Date
    } = JSON.parse(localStorage.getItem('userData'))
    if(!userData){
      return
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if(loadedUser.token){
      this.store.dispatch(new SignIn({
        email: loadedUser.email,
        userId: loadedUser.id,
        token: loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate)
      }))
      this.autoLogout(new Date(userData._tokenExpirationDate).getTime() - new Date().getTime())
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExp = setTimeout(() => {
      this.logout()
    }, expirationDuration)
  }

  logout() {
    this.store.dispatch(new SignOut())
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
    if(this.tokenExp){
      clearTimeout(this.tokenExp)
    }
    this.tokenExp = null
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const newUser = new User(email, userId, token, expirationDate)
    this.store.dispatch(new SignIn({
      email,
      userId,
      token,
      expirationDate
    }))
    this.autoLogout(expiresIn * 1000)
    localStorage.setItem('userData', JSON.stringify(newUser))
  }
}
