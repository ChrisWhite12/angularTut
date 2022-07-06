import * as fromShoppingList from '../shopping/store/shopping.reducer'
import * as fromAuth from '../auth/store/auth.reducer'
import { ActionReducerMap } from '@ngrx/store'

export interface AppState {
  shoppingList: fromShoppingList.IgState
  auth: fromAuth.AuthState
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer
}
