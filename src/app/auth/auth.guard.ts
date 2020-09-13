import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';
import { Store, select } from '@ngrx/store';
import { UserState } from './store/user.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuth : boolean;
  constructor(private authService: AuthService, 
    private router: Router, private store: Store<{ stateObj:UserState }>) { 
      this.store.pipe(select('stateObj')).subscribe(data => {
        this.isAuth = data.isLoggedIn;
      });
     }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuthenticated = this.isAuth;
      if(isAuthenticated) {
        return true;
      } else {
        this.router.navigateByUrl('/login');
      }
      return true;//this.authService.isLoggedIn;
  }
  
}
