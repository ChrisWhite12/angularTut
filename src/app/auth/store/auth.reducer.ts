import { AuthActions, AuthTypeActions } from './auth.actions';
import { User } from '../user.model';

export interface AuthState {
  user: User,
  authError: string,
  loading: boolean
}

const initialState: AuthState = {
  user: null,
  authError: null,
  loading: false
}

export function authReducer(state = initialState, action: AuthActions): AuthState {
  switch (action.type){
    case AuthTypeActions.AUTH_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
        )
      return {
        ...state,
        authError: null,
        user,
        loading: false
      }

    case AuthTypeActions.SIGN_OUT:
    return {
      ...state,
      authError: null,
      user: null
    }

    case AuthTypeActions.SIGN_IN_START:
    case AuthTypeActions.SIGN_UP_START:
      return {
        ...state,
        authError: null,
        loading: true
      }

    case AuthTypeActions.AUTH_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      }
    case AuthTypeActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      }
    default:
      return state
  }

}
