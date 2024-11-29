import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { userService } from '../../user/user-service.service';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { UserProfileComponent } from '../../user/user-profile/user-profile.component';
import { UserForAuth } from '../../types/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,HamburgerMenuComponent,UserProfileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  isShown:boolean=false;

  constructor(private userService:userService,private router:Router){}


  get isLoggedIn():boolean {
    return this.userService.isLoggedIn;
  }

  get username():string {
    return this.userService.user?.username || '';
  }

  

  showProfile(){
    this.isShown = !this.isShown; 
  }


  
}
