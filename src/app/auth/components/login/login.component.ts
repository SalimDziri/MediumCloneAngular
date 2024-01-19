import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GlobalState, selectAuthError, selectAuthLoading } from 'src/app/shared/state';
import { AuthPageActions } from '../../actions';

@Component({
  selector: 'mc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading$ = this.store.select(selectAuthLoading)
  error$ = this.store.select(selectAuthError)

  loginForm!: FormGroup
  emailCtrl!: FormControl
  passwordCtrl!: FormControl

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<GlobalState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(AuthPageActions.loadLoginPage())
    this.initFormControls()
    this.initRegisterForm()
  }


  initFormControls(){
    this.emailCtrl = this.formBuilder.control('', Validators.required)
    this.passwordCtrl = this.formBuilder.control('', Validators.required)
  }

  initRegisterForm(){
    this.loginForm = this.formBuilder.group({
      email: this.emailCtrl,
      password: this.passwordCtrl
    })
  }

  GoToSignUp(){
    this.router.navigateByUrl('auth/register')
  }

  signin(){
    this.store.dispatch(AuthPageActions.login(this.loginForm.value))
  }

}