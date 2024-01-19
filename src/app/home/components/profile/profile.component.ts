import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router,NavigationStart, Event as NavigationEvent, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { GlobalState, selectAuthUser, selectProfileErrors, selectProfileFavoritedArticles, selectProfileLoadings, selectProfilePersonalArticles, selectProfileProfile } from 'src/app/shared/state';
import { ProfilePageActions } from '../../actions';
import { Subscription, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  getLoggedUser$ = this.store.select(selectAuthUser)

  currentNavigation = this.router.getCurrentNavigation()
  currentProfile!:string

  getProfile$ = this.store.select(selectProfileProfile)
  getPersonalArticles$ = this.store.select(selectProfilePersonalArticles)
  getFavoritedArticles$ = this.store.select(selectProfileFavoritedArticles)

  getErrors$ = this.store.select(selectProfileErrors)
  getLoadings$ = this.store.select(selectProfileLoadings)

  combinedData$ = combineLatest([this.getProfile$, this.getLoggedUser$]).pipe(
    map(([profile, user]) => {
      return profile?.username === user?.username;
    })
  );

  AuthSubscription!: Subscription

  constructor(
    private router: Router,
    private store: Store<GlobalState>
  ) {}

  ngOnInit(): void {
    this.initCurrentProfile()
    this.AuthSubscription = this.getLoggedUser$.subscribe((user) => {
      if(user){
        this.getData()
      }
    })
  }

  ngOnDestroy(): void {
    this.AuthSubscription.unsubscribe()
  }

  initCurrentProfile(){
    // all url will start with '/profile/' which need to be sliced to get the username
    let sliced = this.currentNavigation!.finalUrl!.toString().slice(9)
    this.currentProfile = decodeURIComponent(sliced)
  }

  getData(){
    this.store.dispatch(ProfilePageActions.getProfileData(this.currentProfile))
    this.store.dispatch(ProfilePageActions.getPersonalArticles(this.currentProfile))
    this.store.dispatch(ProfilePageActions.getFavoritedArticles(this.currentProfile))
  }

  follow(username:string){
    this.store.dispatch(ProfilePageActions.Follow(username))
  }
  unfollow(username:string){
    this.store.dispatch(ProfilePageActions.UnFollow(username))
  }
  profileSettings(){

  }

}