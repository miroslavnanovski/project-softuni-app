import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

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

  constructor(private http:HttpClient) {
    try{
      const localUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(localUser);
    } catch(error)
     {
      this.user = null;
    }
  }
   
  login(email:string, password:string){
    
    return this.http
      .post<UserForAuth>('/api/login', {email,password} )
      .pipe(tap(user => 
      this.user$$.next(user)));
  }

  register(username:string,email:string,telephone:string,password:string,rePassword:string){
    
    return this.http
      .post<UserForAuth>('/api/register', {username,email,telephone,password,rePassword} )
      .pipe(tap(user => 
      this.user$$.next(user)));
  }

  logout(){
    this.user = null;
    localStorage.removeItem(this.USER_KEY)
  }

  getProfile(){
    return this.http
    .get<UserForAuth>('/api/users/profile')
    .pipe(tap(user => this.user$$.next(user)));

  }
}
