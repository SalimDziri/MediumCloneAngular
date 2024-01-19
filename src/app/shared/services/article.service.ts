import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { STORAGE_TOKEN } from 'src/app/globalConsts';
import { ArticleDetailsResponse, mergedArticleDataResponse } from '../models/article.model';
import { addCommentEndpoint, deleteCommentEndpoint, getArticleEndpoint, getCommentsEndpoint } from 'src/app/api';
import { CommentCreatedResponse, CommentListResponse, CommentRequest } from '../models/comment.model';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  jwt = localStorage.getItem(STORAGE_TOKEN)

  constructor(
    private http: HttpClient
  ) { }

  getArticle(slug:string):Observable<mergedArticleDataResponse>{
    const headers = new HttpHeaders().set('Authorization', `Token ${this.jwt}`);
    let req1 = this.http.get<ArticleDetailsResponse>(getArticleEndpoint(slug), {headers} )
    let req2 = this.http.get<CommentListResponse>(getCommentsEndpoint(slug), {headers} )
    return forkJoin([req1, req2]).pipe(
      map((responses: any[]) => {
        // Merge the responses into one object
        const mergedResponse = {
          article: responses[0],
          comments: responses[1]
        };
        return mergedResponse;
      })
    );
  }

  createComment(slug:string, comment: CommentRequest){
    const headers = new HttpHeaders().set('Authorization', `Token ${this.jwt}`);
    return this.http.post<CommentCreatedResponse>( addCommentEndpoint(slug), comment, {headers} )
  }

  delteComment(slug:string, id:number){
    const headers = new HttpHeaders().set('Authorization', `Token ${this.jwt}`);
    return this.http.delete(deleteCommentEndpoint(slug,id), {headers} )
  }
}