import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login-and-register/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (localStorage.getItem('my-token')) {
      return true;
    } else {
      console.log('Nie masz dostepu');
      this.router.navigate(['home/login'])
      setTimeout(() => {
        this.scroll()
      })

      return false;
    }
  }

  scroll() {
    document.querySelector('#lgSc')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
