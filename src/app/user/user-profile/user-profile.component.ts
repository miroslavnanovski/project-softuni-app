import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { userService } from '../user-service.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  @Input() closeMenu!: () => void;

  constructor(private userService:userService,private router:Router){}
  
  logout() {
    this.router.navigate(['/home'])
    console.log(`works`);
    
    return this.userService.logout();
  }

  onLinkClick() {
    this.closeMenu(); // Close the menu by calling the parent's method
  }
}
