import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { userService } from '../user/user-service.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: userService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.getProfile().pipe(
      map(() => true), // If the profile loads, user is authenticated
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false); // If an error occurs, block the route
      })
    );
  }
}
