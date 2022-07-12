import { Action } from "@ngrx/store";

export enum AuthTypeActions {
  SIGN_IN_START = 'SIGN_IN_START',
  SIGN_UP_START = 'SIGN_UP_START',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_FAIL = 'AUTH_FAIL',
  SIGN_OUT = 'SIGN_OUT',
  CLEAR_ERROR = 'CLEAR_ERROR',
  AUTO_LOGIN = 'AUTO_LOGIN',
  AUTO_LOGOUT = 'AUTO_LOGOUT'
}

export class AuthSuccess implements Action {
  readonly type = AuthTypeActions.AUTH_SUCCESS;
  constructor(public payload: {
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }) { }
}

export class SignOut implements Action {
  readonly type = AuthTypeActions.SIGN_OUT
}

export class SignInStart implements Action {
  readonly type = AuthTypeActions.SIGN_IN_START
  constructor(public payload: {email: string, password: string}) {}
}

export class AuthFail implements Action {
  readonly type = AuthTypeActions.AUTH_FAIL;
  constructor(public payload: string){}
}

export class SignUpStart implements Action {
  readonly type = AuthTypeActions.SIGN_UP_START
  constructor(public payload: {email: string, password: string}){}
}

export class ClearError implements Action {
  readonly type = AuthTypeActions.CLEAR_ERROR
}

export class AutoLogin implements Action {
  readonly type = AuthTypeActions.AUTO_LOGIN
}
export class AutoLogout implements Action {
  readonly type = AuthTypeActions.AUTO_LOGOUT
}

export type AuthActions = AuthSuccess | SignOut | SignInStart | AuthFail | SignUpStart | ClearError | AutoLogin | AutoLogout
