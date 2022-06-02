import { Recipe } from "./recipe.model";

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe("Burger", "Burger", ""),
    new Recipe("Pasta", "Pasta", ""),
    new Recipe("Salad", "Salad", ""),
  ]

  getRecipes() {
    return this.recipes.slice();
  }
}
