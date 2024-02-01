// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.authService.user$.pipe(
      take(1),
      map((user) => !!user),
      map((isAuthenticated) => {
        if (!isAuthenticated) {
          console.log('User is not authenticated. Redirecting to /signin.');
          this.router.navigate(['/signin']);
          return false; // Return false to prevent navigation
        }
        console.log('User is authenticated.');
        return true; // Return true to allow navigation
      }),
      catchError((error) => {
        console.error('Sign-in error:', error);
        alert('Sign-in failed. Check credentials.');
        this.router.navigate(['/signin']);
        return of(false); // Return false to prevent navigation
      })
    );
  }
}
