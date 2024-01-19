import { createAction } from "@ngrx/store";
import { loginAuthModel, registerAuthModel } from "src/app/shared/models/auth.model";
import { UserModel } from "src/app/shared/models/user.model";

export const registerSuccess = createAction(
    '[Auth Api] Register Success',
    (user: UserModel) => ({ user })
)

export const registerFailure = createAction(
    '[Auth Api] Register Failure',
    (error:any, registerUser: registerAuthModel) => ({ error,registerUser })
)


export const loginSuccess = createAction(
    '[Auth Api] Login Success',
    (user: UserModel) => ({ user })
)

export const loginFailure = createAction(
    '[Auth Api] Login Failure',
    (error:any, registerUser: loginAuthModel) => ({ error,registerUser })
)

export const getUserDataSuccess = createAction(
    '[Auth Api] Get User Data Success',
    (user: UserModel) => ({ user })
)

export const getUserDataFailure = createAction(
    '[Auth Api] Get User Data Failure',
    (error: any) => ({ error })
)