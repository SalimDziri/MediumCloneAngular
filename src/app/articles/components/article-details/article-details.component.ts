import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GlobalState, selectArticleArticle, selectArticleComments, selectArticleLoadingArticle, selectArticleLoadingFavorite, selectArticleLoadingFollow, selectAuthUser, selectAuthUserLoaded } from 'src/app/shared/state';
import { ArticlePageActions } from '../../actions';
import { Router } from '@angular/router';
import { Subscription, combineLatest, map, take } from 'rxjs';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  CurrentLoggedUser$ = this.store.select(selectAuthUser)

  userLoaded$ = this.store.select(selectAuthUserLoaded)
  currentNavigation = this.router.getCurrentNavigation()

  $isLoadingArticle$ = this.store.select(selectArticleLoadingArticle)
  articleDetails$ = this.store.select(selectArticleArticle)
  commentsList$ = this.store.select(selectArticleComments)

  isLoadingFollow$ = this.store.select(selectArticleLoadingFollow)
  isLoadingFavorite$ = this.store.select(selectArticleLoadingFavorite)

  combinedData$ = combineLatest([this.articleDetails$, this.CurrentLoggedUser$]).pipe(
    map(([profile, user]) => {
      return profile?.author.username === user?.username;
    })
  );

  constructor(
    private store: Store<GlobalState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    let slug: string = this.getCurrentSlug()
    this.userLoaded$.subscribe((data) => {
      if(data == true){
        this.store.dispatch(ArticlePageActions.loadArticleDetails(slug))
      }
    })
  }

  getCurrentSlug():string{
    // all url will start with '/articles/' which need to be sliced
    let slug = this.currentNavigation!.finalUrl!.toString().slice(10)
    return decodeURIComponent(slug)
  }

  toggleFollow(username:string,followed:boolean){
    this.isLoadingFollow$.pipe(take(1)).subscribe((loading) => {
      if(loading == false){
        if(followed){
          this.store.dispatch(ArticlePageActions.UnFollow(username))
        }else{
          this.store.dispatch(ArticlePageActions.Follow(username))
        }
      }
    })
  }
  
  toggleFavorite(slug:string, favorited:boolean){
    this.isLoadingFavorite$.pipe(take(1)).subscribe((loading) => {
      if(loading == false){
        if(favorited){
          this.store.dispatch(ArticlePageActions.unfavorite(slug))
        }else{
          this.store.dispatch(ArticlePageActions.favorite(slug))
        }
      }
    })
  }

  goToProfile(username:string){
    this.router.navigateByUrl(`profile/${username}`)
  }

}
