import { Action } from "@ngrx/store";

export enum AuthTypeActions {
  SIGN_IN_START = 'SIGN_IN_START',
  SIGN_IN = 'SIGN_IN',
  SIGN_IN_FAIL = 'SIGN_IN_FAIL',
  SIGN_OUT = 'SIGN_OUT'
}

export class SignIn implements Action {
  readonly type = AuthTypeActions.SIGN_IN;
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

export class SignInFail implements Action {
  readonly type = AuthTypeActions.SIGN_IN_FAIL
  constructor(public payload: string){}
}

export type AuthActions = SignIn | SignOut | SignInStart | SignInFail
