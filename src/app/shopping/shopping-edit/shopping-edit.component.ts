import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() ingredientCreate = new EventEmitter<Ingredient>()

  constructor() { }

  ngOnInit(): void {
  }

  handleAddIngredient(name: HTMLInputElement, amount: HTMLInputElement) {
    const ingredient = new Ingredient(name.value, amount.value)
    this.ingredientCreate.emit(ingredient)
  }

}
