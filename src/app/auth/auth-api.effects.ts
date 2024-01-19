import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { AuthService } from '../shared/services/auth.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { AuthApiPageActions, AuthPageActions } from './actions'
import { catchError, concatMap, exhaustMap, map, of } from 'rxjs'
import { Router } from '@angular/router'
import { SharedActions } from '../shared/actions'
import { STORAGE_TOKEN } from '../globalConsts'

@Injectable()
export class AuthApiEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  // Register Effects
  registerEffect$ = createEffect(() => {
    return this.action$.pipe(
      ofType(AuthPageActions.register),
      exhaustMap((action) => {
        return this.authService.signup(action.registerUser).pipe(
          map((user) => {
            this.router.navigateByUrl('login')
            return AuthApiPageActions.registerSuccess(user)
          }),
          catchError((error) => {
            return of(
              AuthApiPageActions.registerFailure(error, action.registerUser)
            )
          })
        )
      })
    )
  })

  // Login Effects
  loginEffect$ = createEffect(() => {
    return this.action$.pipe(
      ofType(AuthPageActions.login),
      exhaustMap((action) => {
        return this.authService.login(action.loginUser).pipe(
          map((user) => {
            this.router.navigateByUrl('/')
            this.authService.saveTokenToStorage(user['user'].token)
            return AuthApiPageActions.loginSuccess(user)
          }),
          catchError((error) => {
            return of(AuthApiPageActions.loginFailure(error, action.loginUser))
          })
        )
      })
    )
  })

  // Get User Data
  getData$ = createEffect(() => {
    const token = localStorage.getItem(STORAGE_TOKEN)
    return this.action$.pipe(
      ofType(SharedActions.initApp),
      concatMap((action) => {
        return this.authService.getUserData(token)!.pipe(
          map((user) => {
            return AuthApiPageActions.getUserDataSuccess(user)
          }),
          catchError((error) => {
            this.authService.removeTokenFromStorage();
            this.router.navigateByUrl('/auth/login');
            return of(AuthApiPageActions.getUserDataFailure(error))
          })
        )
      })
    )
  })
}
