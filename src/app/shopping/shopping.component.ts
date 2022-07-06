import { StartEdit } from './store/shopping.actions';
import { IgState } from './store/shopping.reducer';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit, OnDestroy {
  ingredients: Observable<IgState>;

  constructor(
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList')
  }

  ngOnDestroy(): void {

  }

  onEditItem(index: number) {
    this.store.dispatch(new StartEdit(index))
  }
}
