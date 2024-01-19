import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginAuthModel, registerAuthModel } from '../models/auth.model';
import { UserModel } from '../models/user.model';
import { getUserEndpoint, loginEndpoint, registerEndpoint } from 'src/app/api';
import { STORAGE_TOKEN } from 'src/app/globalConsts';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  signup(data:registerAuthModel){
    const payload = { user: data }
    return this.http.post<UserModel>(registerEndpoint, payload)
  }

  login(data:loginAuthModel){
    const payload = { user: data }
    return this.http.post<UserModel>(loginEndpoint, payload)
  }

  getUserData(jwt: string | null ){
    if(jwt){
      const headers = new HttpHeaders().set('Authorization', `Token ${jwt}`);
      return this.http.get<UserModel>(getUserEndpoint, {headers})
    }
    return
  }

  // Local storage manipulation

  saveTokenToStorage(token: string) {
    localStorage.setItem(STORAGE_TOKEN, token);
  }
  
  removeTokenFromStorage() {
    localStorage.removeItem(STORAGE_TOKEN);
  }
}