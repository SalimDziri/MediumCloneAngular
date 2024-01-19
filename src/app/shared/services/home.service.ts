import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagModel } from '../models/tag.model';
import { ArticleListQueryParams, articlesFeedEndpoint, articlesListEndpoint, favouriteArticleEndpoint, getArticleEndpoint, getProfileEndpoint, getTagsEndpoint, unfavouriteArticleEndpoint } from 'src/app/api';
import { ArticleModel, FavoriteArticle, FavoriteArticleModel } from '../models/article.model';
import { STORAGE_TOKEN } from 'src/app/globalConsts';
import { Observable } from 'rxjs';
import { ProfileModel } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  jwt = localStorage.getItem(STORAGE_TOKEN)

  constructor(
    private http: HttpClient
  ) { }

  getTags(){
    return this.http.get<TagModel>(getTagsEndpoint)
  }

  getSuggestedFeed(query?:ArticleListQueryParams){
    const headers = new HttpHeaders().set('Authorization', `Token ${this.jwt}`);
    return this.http.get<ArticleModel>(articlesListEndpoint(query), {headers})
  }

  getMyFeed(){
    const headers = new HttpHeaders().set('Authorization', `Token ${this.jwt}`);
    return this.http.get<ArticleModel>(articlesFeedEndpoint(), {headers} )
  }

  addToFavorite(slug:string){
    const headers = new HttpHeaders().set('Authorization', `Token ${this.jwt}`);
    return this.http.post<FavoriteArticleModel>(favouriteArticleEndpoint(slug),{},{headers})
  }

  removeFromFavorite(slug:string){
    const headers = new HttpHeaders().set('Authorization', `Token ${this.jwt}`);
    return this.http.delete<FavoriteArticleModel>(unfavouriteArticleEndpoint(slug),{headers})
  }

  getProfile(username:string){
    const headers = new HttpHeaders().set('Authorization', `Token ${this.jwt}`);
    return this.http.get<ProfileModel>(getProfileEndpoint(username), {headers})
  }
}
