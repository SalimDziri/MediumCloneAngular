import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GlobalState, selectAuthError, selectAuthLoading } from 'src/app/shared/state';
import { AuthPageActions } from '../../actions';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading$ = this.store.select(selectAuthLoading)
  error$ = this.store.select(selectAuthError)

  registerForm!: FormGroup
  usernameCtrl!: FormControl
  emailCtrl!: FormControl
  passwordCtrl!: FormControl

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<GlobalState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(AuthPageActions.loadRegisterPage())
    this.initFormControls()
    this.initRegisterForm()
  }

  initFormControls(){
    this.usernameCtrl = this.formBuilder.control('', Validators.required)
    this.emailCtrl = this.formBuilder.control('', Validators.required)
    this.passwordCtrl = this.formBuilder.control('', Validators.required)
  }

  initRegisterForm(){
    this.registerForm = this.formBuilder.group({
      username: this.usernameCtrl,
      email: this.emailCtrl,
      password: this.passwordCtrl
    })
  }

  GoTologin() {
    this.router.navigateByUrl('auth/login')
  }

  signup() {
    this.store.dispatch(AuthPageActions.register(this.registerForm.value))
  }

}
