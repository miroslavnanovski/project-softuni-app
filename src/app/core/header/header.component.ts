import { Component, ElementRef, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { userService } from '../../user/user-service.service';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { UserProfileComponent } from '../../user/user-profile/user-profile.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,HamburgerMenuComponent,UserProfileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isShown:boolean=false;
  isHamburgerOpen:boolean = false;

  constructor(private userService:userService,private router:Router,private eRef: ElementRef){}


  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  get username(): string {
    return this.userService.user?.username || '';
  }

  toggleHamburger(): void {
    this.isHamburgerOpen = !this.isHamburgerOpen;
    if (this.isHamburgerOpen) {
      this.isShown = false; // Close profile menu if hamburger is opened
    }
  }

  showProfile(): void {
    this.isShown = !this.isShown;   
    if (this.isShown) {
      this.isHamburgerOpen = false; // Close hamburger menu if profile is opened
    }
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event): void {
    if (
      !this.eRef.nativeElement.contains(event.target)
    ) {
      this.isHamburgerOpen = false;
      this.isShown = false;
    }
  }


  
}
