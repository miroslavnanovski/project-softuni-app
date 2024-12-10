import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from '../posts/post-card/post-card.component';
import { HeaderComponent } from '../core/header/header.component';
import { HomeCardsComponent } from "../shared/home-cards/home-cards.component";
import { userService } from '../user/user-service.service';
import { CreatePostComponent } from '../posts/create-post/create-post.component';
import { LoginPageComponent } from '../user/login-page/login-page.component';
import { ActivityLoggerService } from '../user/activity-logger.service';
import { CommonModule, NgIf } from '@angular/common';
import { Activity } from '../types/activity';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { LoaderComponent } from "../shared/loader/loader.component";
import { Post } from '../types/posts';
import { ApiService } from '../api.service';
import { User, UserForAuth } from '../types/user';
import { getCookie } from '../utils/cookie.util';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [PostCardComponent,
     HeaderComponent, 
     HomeCardsComponent, 
     CreatePostComponent, 
     LoginPageComponent, 
     CommonModule, 
     RouterLink, 
     FormsModule, 
     LoaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  dropdownVisible = false;
  filterUsername = '';
  currentIndex: number = 0;  // Keeps track of where we are in the activities array
  postsPerPage: number = 5;
  isLoading: boolean = true;
  latestPosts: Post[] = [];

  user: UserForAuth | null = null;
  userId: string = '';

  activities: Activity[] = [];
  filteredLogs: Activity[] = []; // Store filtered activities
  uniqueUsers: any[] = [];
  isFilterMenuOpen: boolean = false; // Track the filter menu's state
  selectedUserId: string = ''; // The ID of the selected user for filtering

  constructor(
    private userService: userService,
    private ActivityLoggerService: ActivityLoggerService,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // Get activities and unique users
    this.activities = this.ActivityLoggerService.getActivities();
    this.filteredLogs = [...this.activities]; // Default to unfiltered list
    this.uniqueUsers = this.getUniqueUsers();

    // Load pagination index
    this.loadIndexFromLocalStorage();

    setTimeout(() => {
      this.isLoading = false;
    }, 500);

    
    // Get user profile
    if(this.isAuthenticated()){
      if (!this.user) {
        this.userService.getProfile().subscribe({
          next: (userData: UserForAuth) => {
            this.user = userData;
            this.userId = this.user._id;
          },
          error: (err) => {
            console.error('Failed to fetch user profile:', err);
            // Optionally handle the error (e.g., show a message)
          }
        });
      }
    }
  }

  isAuthenticated(): boolean {
    const token = getCookie('auth-cookie');
    return !!token; 
  }

  // Get unique users from activities
  getUniqueUsers(): any[] {
    const users = this.activities.map(log => log.user);
    return Array.from(new Set(users.map(u => u.id))).map(id =>
      users.find(user => user.id === id)
    );
  }

  // Toggle filter menu visibility
  toggleFilterMenu() {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
  }

  // Handle filter change
  onFilterChange() {
    if (this.selectedUserId) {
      this.filteredLogs = this.activities.filter(log => log.user.id === this.selectedUserId);
    } else {
      this.filteredLogs = [...this.activities]; // Show all activities when no user is selected
    }
    this.currentIndex = 0; // Reset pagination to first page
    this.saveIndexToLocalStorage(); // Save the reset index
  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  get username(): string {
    return this.userService.user?.username || '';
  }

  // Get activities to display considering filtered logs
  get displayedActivities() {
    return this.filteredLogs.slice(this.currentIndex, this.currentIndex + this.postsPerPage);
  }

  getSubscribedThemesFromStorage(): string[] {
    const themes = JSON.parse(localStorage.getItem(`subscribedThemes_${this.userId}`) || '[]');
    return themes;
  }

  manageThemes(): void {
    this.router.navigate([`/${this.username}/themes`]);
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  // Load older posts (next set of activities)
  loadMore() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
    this.currentIndex += this.postsPerPage;
    this.saveIndexToLocalStorage();
  }

  // Load newer posts (previous set of activities)
  loadNewer() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
    if (this.currentIndex - this.postsPerPage >= 0) {
      this.currentIndex -= this.postsPerPage;
      this.saveIndexToLocalStorage();
    }
  }

  // Save the current pagination index to local storage
  saveIndexToLocalStorage() {
    localStorage.setItem('currentIndex', this.currentIndex.toString());
  }

  // Load the saved pagination index from local storage
  loadIndexFromLocalStorage() {
    const storedIndex = localStorage.getItem('currentIndex');
    if (storedIndex) {
      this.currentIndex = parseInt(storedIndex, 10);
    }
  }
}
