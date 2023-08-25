import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from './services/login.service';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private dataService: ApiService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    // Check if user can access the route

    const routeurl: string = state.url;
    return this.checkLogin(routeurl);
  }

  // Check if the user is logged in
  checkLogin(routeurl: string): boolean {
    if (this.dataService.isLoggedIn()) {
      return true; // Allow access to the route
    }

    // Store the attempted URL for redirecting after login
    this.dataService.redirectUrl = routeurl;
    
    // Redirect to the login page and pass the returnUrl as a query parameter
    this.router.navigate(['/login'], { queryParams: { returnUrl: routeurl }});
    return false; // Deny access to the route until login is successful
  }
}

