import { AuthService } from './../auth/auth.service';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({ providedIn: 'root'})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ){}

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      'https://ng-recipe-tut-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
      recipes
    ).subscribe((res) => {
      console.log('res',res);
    })
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(
      'https://ng-recipe-tut-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
    )
    .pipe(
      map((data) => {
          return data.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            }
        })
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes)
      })
    )
  }
}
