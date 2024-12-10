import { Injectable } from '@angular/core';
import { getCookie } from './cookie.util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    // Check if JWT token exists (in cookies or localStorage)
    isAuthenticated(): boolean {
      const token = this.getToken();
      return !!token; // Returns true if token exists, otherwise false
    }
  
    // Retrieve the JWT token from cookies or localStorage
    getToken(): string | null {
      return getCookie('auth-cookie'); // You can also use localStorage or other methods
    }
  }