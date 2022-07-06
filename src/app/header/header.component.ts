import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'
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
    private authService: AuthService,
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
    this.authService.logout();
  }

  ngOnDestroy(): void {
      this.userSub.unsubscribe()
  }
}
