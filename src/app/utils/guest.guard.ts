import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { userService } from '../user/user-service.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private userService: userService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.getProfile().pipe(
      map(() => {
        // If profile is successfully fetched, user is authenticated

        this.router.navigate(['/home']); 

        return false; // Block access to the route
      }),
      catchError(() => {
        // If fetching the profile fails, user is not authenticated
        
        return of(true); // Allow access to the route
      })
    );
  }
}
