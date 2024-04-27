import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | UrlTree
    | boolean
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    const isAuth = !!this.cookieService.get('idToken');
    if (isAuth) {
      return true;
    }

    return this.router.createUrlTree(['/login']);
  }
}
