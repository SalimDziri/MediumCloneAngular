import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Article } from 'src/app/shared/models/article.model';
import { GlobalState, selectHomeLoadingFavorite } from 'src/app/shared/state';
import { HomePageActions } from '../../actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  loadingFavorite$ = this.store.select(selectHomeLoadingFavorite)

  @Input() article!:Article

  constructor(
    private store: Store<GlobalState>,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  favorite(slug: string){
    this.store.dispatch(HomePageActions.favorite(slug))
  }

  unfavorite(slug: string){
    this.store.dispatch(HomePageActions.unfavorite(slug))
  }

  goToProfile(username:string){
    this.router.navigateByUrl(`profile/${username}`)
  }

  goToArticle(slug:string){
    console.log('going to '+slug)
    this.router.navigateByUrl(`articles/${slug}`)
  }

}