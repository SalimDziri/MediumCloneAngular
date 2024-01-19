import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeGuard } from '../../guards/home.guard';
import { Store } from '@ngrx/store';
import { GlobalState, selectAuthLoading, selectAuthUser } from '../../state';
import { Observable, map, take } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'mc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedUser$: Observable<User | null>;
  
  loading$ = this.store.select(selectAuthLoading)
  

  constructor(
    private router: Router,
    private store: Store<GlobalState>,
    public auth: HomeGuard
  ) {
    this.loggedUser$ = this.store.select(selectAuthUser).pipe(
      map((user) => user)
    );
   }

  ngOnInit(): void {
  }

  goToHome(){
    this.router.navigateByUrl('/')
  }
  goToSignUp(){
    this.router.navigateByUrl('auth/register')
  }
  goToSignIn(){
    this.router.navigateByUrl('auth/login')
  }

  newArticle(){
    this.router.navigateByUrl('newArticle')
  }

  settings(){

  }

  profile(username:string){
    console.log(username)
    this.router.navigateByUrl(`profile/${username}`)
  }


  
}