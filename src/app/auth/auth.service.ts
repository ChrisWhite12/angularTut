import { SignOut } from './store/auth.actions';
import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'

@Injectable({providedIn: 'root'})
export class AuthService {
  private tokenExp: any

  constructor(
    private store: Store<fromApp.AppState>
  ){}

  setLogoutTimer(expirationDuration: number) {
    this.tokenExp = setTimeout(() => {
      this.store.dispatch(new SignOut())
    }, expirationDuration)
  }

  clearLogoutTimer() {
    if(this.tokenExp){
      clearTimeout(this.tokenExp)
      this.tokenExp = null
    }
  }
}
