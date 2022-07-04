import { Subject } from 'rxjs';
import { ShoppingService } from './../shopping/shopping.service';
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()
  private recipes: Recipe[] = []

  // private recipes: Recipe[] = [
  //   new Recipe("Burger", "Burger", "", [
  //     new Ingredient('Meat', '1'),
  //     new Ingredient('Bun', '1'),
  //     new Ingredient('Cheese', '50g')
  //   ]),
  //   new Recipe("Pasta", "Pasta", "", [
  //     new Ingredient('Pasta', '100g'),
  //     new Ingredient('Sauce', '250ml')
  //   ]),
  //   new Recipe("Salad", "Salad", "", [
  //     new Ingredient('Spinach', '100g'),
  //     new Ingredient('Tomato', '1'),
  //     new Ingredient('Cheese', '50g')
  //   ]),
  // ]

  constructor(private shoppingService: ShoppingService ){}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number){
    return this.recipes[id]
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.onIngredientsAdded(ingredients)
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index] = recipe
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1)
    this.recipesChanged.next(this.recipes.slice())
  }
}
