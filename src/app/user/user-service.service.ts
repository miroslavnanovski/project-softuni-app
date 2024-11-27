import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class userService {
  USER_KEY = '[user]';
  user:UserForAuth | null = null;

  get isLoggedIn():boolean {
    return !!this.user;
  }

  constructor() {
    try{
      const localUser = localStorage.getItem(this.USER_KEY) || '';
      this.user = JSON.parse(localUser);
    } catch(error)
     {
      this.user = null;
    }
  }
   


  login(){
    this.user = {
    username: 'John',
    email: 'johndoe@gmail.com',
    telephone:'124113212',
    password:'atragasada',
    id:'gfafasdfas'
    }

    localStorage.setItem(this.USER_KEY, JSON.stringify(this.user))
  }

  logout(){
    this.user = null;
    localStorage.removeItem(this.USER_KEY)
  }
}
