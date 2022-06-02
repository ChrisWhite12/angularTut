import { ShoppingService } from './../../shopping/shopping.service';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipeDetail: Recipe;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
  }

  handleAddIngredients() {
    this.recipeDetail.ingredients.forEach((el: Ingredient) => {
      this.shoppingService.onIngredientAdded(el);
    })
  }
}
