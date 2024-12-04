import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { userService } from '../user-service.service';
import { ApiService } from '../../api.service';
import { ActivityLoggerService } from '../activity-logger.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  currentUsername:string = '';

  @Input() closeMenu!: () => void;

  constructor(private userService:userService,private router:Router,private activityLoggerService:ActivityLoggerService){}
  
  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (userData) => {
        this.currentUsername = userData.username; 
        console.log(this.currentUsername);
        
      },
      error: (err) => {
        console.error('Failed to load user profile:', err);
      }
    });
  }
  
  logout() {
    localStorage.removeItem('userData');
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/login'])
    });
  }

  onLinkClick() {
    this.closeMenu(); // Close the menu by calling the parent's method
  }

  get username():string {
    return this.userService.user?.username || '';
  }

  get email():string {
    return this.userService.user?.email || '';
  }

  viewThemes(): void {
    this.router.navigate([`/${this.currentUsername}/themes`]);
  }

  
  
}
