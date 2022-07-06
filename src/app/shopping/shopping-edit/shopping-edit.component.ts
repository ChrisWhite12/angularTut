import { appReducer } from './../../store/app.reducer';
import { AddIngredient, DeleteIngredient, UpdateIngredient, StopEdit } from './../store/shopping.actions';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editItem: Ingredient;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editIgIndex > -1){
        this.editMode = true;
        this.editItem = stateData.editIg
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        })
      }
      else {
        this.editMode = false;
      }
    })
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount)
    if(this.editMode){
      this.store.dispatch(new UpdateIngredient(ingredient))
    }
    else{
      this.store.dispatch(new AddIngredient(ingredient))
    }
    this.editMode = false
    form.reset()
  }

  onDeleteItem() {
    this.store.dispatch(new DeleteIngredient())
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new StopEdit())
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new StopEdit())
  }

}
