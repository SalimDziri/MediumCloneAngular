import { createReducer, on } from "@ngrx/store"
import { UserModel } from "../models/user.model"
import { AuthApiPageActions, AuthPageActions } from "src/app/auth/actions"
import { SharedActions } from "../actions"
import { Router } from "@angular/router"


// STATE
export interface authState{
    user: UserModel['user'] | null,
    userLoaded: boolean,
    error: any | null,
    loading: boolean
}

const initState: authState = {
    user: null,
    userLoaded: false,
    error: null,
    loading: false
}


// SELECTORS
export const selectUser = (state: authState) => state.user
export const selectError = (state: authState) => state.error
export const selectLoading = (state: authState) => state.loading
export const selectUserLoaded = (state: authState) => state.userLoaded


// REDUCER
export const authReducer = createReducer(
    initState,
    //Register Page
    on(AuthPageActions.loadRegisterPage, (state) => {
        return {
            ...state,
            error: null,
            user: null,
            loading: false
        }
    }),
    on(AuthPageActions.register, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(AuthApiPageActions.registerSuccess, (state, action) =>{
        return {
            ...state,
            loading: false,
            error: null,
            user: action.user.user
        }
    }),
    on(AuthApiPageActions.registerFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            user: null
        }
    }),
    // Login Page
    on(AuthPageActions.loadLoginPage, (state) => {
        return {
            ...state,
            error: null,
            user: null,
            loading: false
        }
    }),
    on(AuthPageActions.login, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(AuthApiPageActions.loginSuccess, (state, action) =>{
        return {
            ...state,
            loading: false,
            error: null,
            user: action.user.user,
            userLoaded: true
        }
    }),
    on(AuthApiPageActions.loginFailure, (state, action) => {
        return {
            ...state,
            loading: false,
            error: action.error,
            user: null
        }
    }),
    // Gey User Data
    on(SharedActions.initApp, (state) => {
        return {
            ...state,
            loading: true,
            error: false,
            userLoaded: false
        }
    }),
    on(AuthApiPageActions.getUserDataSuccess, (state, action) => {
        return {
            ...state,
            loading: false,
            error: false,
            user: action.user['user'],
            userLoaded: true
        }
    }),
    on(AuthApiPageActions.getUserDataFailure, (state, action) => {
        return {
            ...state,
            error: action.error,
            loading: false,
            user: null,
            userLoaded: false
        }
    })
)