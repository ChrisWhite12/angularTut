import { Action } from "@ngrx/store";

export enum AuthTypeActions {
  SIGN_IN = 'SIGN_IN',
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
export type AuthActions = SignIn | SignOut
