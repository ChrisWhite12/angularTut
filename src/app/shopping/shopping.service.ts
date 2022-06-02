import { EventEmitter } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingService {
  ingredientChanged = new EventEmitter<Ingredient[]>()
  private ingredients: Ingredient[] = [
    new Ingredient('chicken', '500g'),
    new Ingredient('eggs', '1')
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.ingredientChanged.emit(this.ingredients.slice())
  }
}
