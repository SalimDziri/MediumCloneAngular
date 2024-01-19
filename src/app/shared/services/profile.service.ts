import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { followUserEndpoint, getArticleEndpoint } from 'src/app/api';
import { STORAGE_TOKEN } from 'src/app/globalConsts';
import { ProfileModel } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  jwt = localStorage.getItem(STORAGE_TOKEN)

  constructor(
    private http: HttpClient
  ) { }

  followUser(username:string){
    const headers = new HttpHeaders().set('Authorization', `Token ${this.jwt}`);
    return this.http.post<ProfileModel>(followUserEndpoint(username),{}, {headers} )
  }

  unfollowUser(username:string){
    const headers = new HttpHeaders().set('Authorization', `Token ${this.jwt}`);
    return this.http.delete<ProfileModel>(followUserEndpoint(username), {headers} )
  }
}
