import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { STORAGE_TOKEN } from 'src/app/globalConsts';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate():boolean{
    if (isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}

function isLoggedIn(): boolean {
  var token = localStorage.getItem(STORAGE_TOKEN);
  if (token) {
    return true;
  }
  return false;
}