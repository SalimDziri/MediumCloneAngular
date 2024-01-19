import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { STORAGE_TOKEN } from 'src/app/globalConsts';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}

  canActivate():boolean{
    if (!this.isLoggedIn()) {
      this.router.navigate(['auth/login']);
      return false;
    }
    return true;
  }


  isLoggedIn(): boolean {
  var token = localStorage.getItem(STORAGE_TOKEN);
  if (token) {
    return true;
  }
  return false;
}
}