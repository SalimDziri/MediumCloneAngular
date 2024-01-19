import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SharedActions } from 'src/app/shared/actions';
import { GlobalState, selectAuthError, selectAuthLoading, selectAuthUserLoaded, selectHomeLoadingMyFeed, selectHomeLoadingSuggested, selectHomeLoadingTags, selectHomeMyFeed, selectHomeSelectedTag, selectHomeSuggestedFeed, selectHomeTags } from 'src/app/shared/state';
import { HomePageActions } from '../../actions';
import { STORAGE_TOKEN } from 'src/app/globalConsts';
import { take } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  token = localStorage.getItem(STORAGE_TOKEN)

  loading$ = this.store.select(selectAuthLoading)
  error$ = this.store.select(selectAuthError)
  userLoaded$ = this.store.select(selectAuthUserLoaded)

  loadingTags$ = this.store.select(selectHomeLoadingTags)
  tags$ = this.store.select(selectHomeTags)
  selectedTag$ = this.store.select(selectHomeSelectedTag)

  loadingSuggestedFedd$ = this.store.select(selectHomeLoadingSuggested)
  suggestedArticles$ = this.store.select(selectHomeSuggestedFeed)

  loadingMyFeed$ = this.store.select(selectHomeLoadingMyFeed)
  myFeed$ = this.store.select(selectHomeMyFeed)

  constructor(
    private store: Store<GlobalState>
  ) { }

  ngOnInit(): void {
    this.userLoaded$.subscribe((data) => {
      if(data == true){
        this.store.dispatch(HomePageActions.getTags())
        this.store.dispatch(HomePageActions.getSuggestedFeed())
        this.store.dispatch(HomePageActions.getMyFeed())
      }
    })
  }

  retry(){
    this.store.dispatch(SharedActions.initApp())
  }

  filter(tag: string){
    this.selectedTag$.pipe(take(1)).subscribe((StoreTag) => {
      if(StoreTag !== tag){
        this.store.dispatch(HomePageActions.getSuggestedFeed({tag}))
        this.store.dispatch(HomePageActions.addTagFilter(tag))
      }else{
        this.store.dispatch(HomePageActions.removeTagFilter())
        this.store.dispatch(HomePageActions.getSuggestedFeed())
      }
    })
  }

}
