import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.recipeDetail = this.recipeService.getRecipe(this.id);
    })
  }

  handleAddIngredients() {
    this.recipeService.addIngredientsToShoppingList(this.recipeDetail.ingredients)
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['/recipes'])
  }
}
