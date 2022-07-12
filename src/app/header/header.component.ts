import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'
import * as AuthActions from '../auth/store/auth.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false
  private userSub: Subscription

  constructor(
    private dataStorage: DataStorageService,
    private store: Store<fromApp.AppState>
  ){}

  ngOnInit(): void {
    const authState = this.store.select('auth')
    this.userSub = authState.subscribe((state) =>
      this.isAuthenticated = !!state.user
    )
  }

  onSaveRecipes() {
    this.dataStorage.storeRecipes();
  }

  onFetchRecipes(){
    this.dataStorage.fetchRecipes().subscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.SignOut());
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe()
  }
}
