import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe("Burger", "Burger", "", [
      new Ingredient('Meat', '1'),
      new Ingredient('Bun', '1'),
      new Ingredient('Cheese', '50g')
    ]),
    new Recipe("Pasta", "Pasta", "", [
      new Ingredient('Pasta', '100g'),
      new Ingredient('Sauce', '250ml')
    ]),
    new Recipe("Salad", "Salad", "", [
      new Ingredient('Spinach', '100g'),
      new Ingredient('Tomato', '1'),
      new Ingredient('Cheese', '50g')
    ]),
  ]

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number){
    return this.recipes[id]
  }
}
