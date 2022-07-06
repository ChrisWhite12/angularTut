import { IngredientActions, ShoppingListActions, UpdateIngredient } from './shopping.actions';
import { Ingredient } from "../../shared/ingredient.model";

export interface IgState {
  ingredients: Ingredient[],
  editIg: Ingredient,
  editIgIndex: number
}

const initialState: IgState = {
  ingredients: [
    new Ingredient('chicken', '500g'),
    new Ingredient('eggs', '1')
  ],
  editIg: null,
  editIgIndex: -1
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions): IgState {
  switch (action.type){
    case IngredientActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          action.payload
        ]
      }
    case IngredientActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          ...action.payload
        ]
      }
    case IngredientActions.UPDATE_INGREDIENT:
      const ingredientEdit = state.ingredients[state.editIgIndex]
      const ingredientUpdate = {
        ...ingredientEdit,
        ...action.payload
      }

      const ingredientsUpdate = [...state.ingredients]
      ingredientsUpdate[state.editIgIndex] = ingredientUpdate

      return {
        ...state,
        ingredients: ingredientsUpdate,
        editIg: null,
        editIgIndex: -1,
      }
    return
    case IngredientActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((_,i) => i !== state.editIgIndex),
        editIg: null,
        editIgIndex: -1,
      }
    case IngredientActions.START_EDIT:
      return {
        ...state,
        editIgIndex: action.payload,
        editIg: {...state.ingredients[action.payload]}
      }
    case IngredientActions.STOP_EDIT:
      return {
        ...state,
        editIgIndex: -1,
        editIg: null
      }
    default:
      return state
  }

}
