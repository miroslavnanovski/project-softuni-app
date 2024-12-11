import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { ActivityLoggerService } from './activity-logger.service';
import { getCookie } from '../utils/cookie.util';

@Injectable({
  providedIn: 'root'
})
export class userService {
  private user$$ = new BehaviorSubject<UserForAuth | null > (null);
  private user$ = this.user$$.asObservable();


  USER_KEY = '[user]';
  user:UserForAuth | null = null;

  get isLoggedIn():boolean {
    return !!this.user;
    
  }

  constructor(private http:HttpClient,private activityLoggerService: ActivityLoggerService) {
    this.user$.subscribe((user) => {
      this.user = user;
    })
   
  }


  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>('/api/login', { email, password })
      .pipe(tap(user => {
        this.user$$.next(user);
      }));
  }
  register(username:string,email:string,tel:string,password:string,rePassword:string){
    
    return this.http
      .post<UserForAuth>('/api/register', {username,email,tel,password,rePassword} )
      .pipe(tap(user => 
      this.user$$.next(user)));
      
  }

  logout(){
    return this.http.post('/api/logout', {})
    .pipe(tap((user) => this.user$$.next(null)));
    
  }

  getProfile(){
    return this.http
    .get<UserForAuth>('/api/users/profile')
    .pipe(tap(user => this.user$$.next(user)));
  
  }

  updateProfile(username:string,email:string,tel?:string){
    return this.http
    .put<UserForAuth>('/api/users/profile',{username,email,tel})
    .pipe(tap(user => this.user$$.next(user)));
  }
}
