import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private igChangeSub: Subscription;
  constructor(
    private shoppingService: ShoppingService,
    private loggingService: LoggingService
  ) { }

  ngOnInit(): void {
    this.loggingService.printLog('shopping');
    this.ingredients = this.shoppingService.getIngredients();
    this.igChangeSub = this.shoppingService.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      }
    )
  }

  ngOnDestroy(): void {
      this.igChangeSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingService.startedEditing.next(index)
  }
}
