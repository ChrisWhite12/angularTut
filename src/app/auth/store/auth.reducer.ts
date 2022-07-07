import { AuthActions, AuthTypeActions, SignInFail } from './auth.actions';
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
    case AuthTypeActions.SIGN_IN:
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
      return {
        ...state,
        authError: null,
        loading: true
      }

    case AuthTypeActions.SIGN_IN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      }
    default:
      return state
  }

}
