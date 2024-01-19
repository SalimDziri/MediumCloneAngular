import { createAction } from "@ngrx/store";
import { loginAuthModel, registerAuthModel} from "../../shared/models/auth.model"


export const loadRegisterPage = createAction(
    '[Auth Page] Load Register Page'
)

export const register = createAction(
    '[AuthPage] Register User',
    (registerUser: registerAuthModel) => ({ registerUser })
)

export const loadLoginPage = createAction(
    '[Auth Page] Load Login Page'
)

export const login = createAction(
    '[AuthPage] Login User',
    (loginUser: loginAuthModel) => ({ loginUser })
)