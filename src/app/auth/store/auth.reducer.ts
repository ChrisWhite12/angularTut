import { AuthActions, AuthTypeActions } from './auth.actions';
import { User } from '../user.model';

export interface AuthState {
  user: User
}

const initialState: AuthState = {
  user: null
}

export function authReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type){
    case AuthTypeActions.SIGN_IN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
        )
      return {
        ...state,
        user
      }

    case AuthTypeActions.SIGN_OUT:
    return {
      ...state,
      user: null
    }
    default:
      return state
  }

}
