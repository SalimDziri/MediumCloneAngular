import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlobalState, selectAuthError } from './shared/state';
import { SharedActions } from './shared/actions';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<GlobalState>,
    private authService: AuthService,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.store.dispatch(SharedActions.initApp())
  }
}
