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

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [PostCardComponent, HeaderComponent, HomeCardsComponent,CreatePostComponent,LoginPageComponent,CommonModule,RouterLink,FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{

  activities:Activity [] = [];
  dropdownVisible = false;
  filteredActivities = this.activities;
  filterUsername = '';
  currentIndex:number = 0;  // Keeps track of where we are in the activities array
  postsPerPage:number = 5;


  constructor(private userService:userService,private ActivityLoggerService:ActivityLoggerService,private router:Router ){}

  ngOnInit(): void {
    this.activities = this.ActivityLoggerService.getActivities();
    this.loadIndexFromLocalStorage();
  }

  get isLoggedIn():boolean {
    return this.userService.isLoggedIn;
  }

  get username():string {
    return this.userService.user?.username || '';
  }

  get displayedActivities() {
    return this.activities.slice(this.currentIndex, this.currentIndex + this.postsPerPage);
  }

  manageThemes(): void {
    this.router.navigate([`/${this.username}/themes`]);
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }
  
  // applyFilter(filterType: string) {
  //   this.filteredActivities = this.activities.filter(activity => {
  //     let matchesType = filterType === 'all';
  //     let matchesUsername = this.filterUsername ? activity.user.name.toLowerCase().includes(this.filterUsername.toLowerCase()) : true;
  //     return matchesType && matchesUsername;
  //   });
  //   this.dropdownVisible = false; // Close dropdown after selection
    
  // }

  loadMore() {
    // Update currentIndex to load the next set of activities
    this.currentIndex += this.postsPerPage;
    this.saveIndexToLocalStorage();
  }

  loadNewer() {
    // Ensure we do not go past the start of the array
    if (this.currentIndex - this.postsPerPage >= 0) {
      this.currentIndex -= this.postsPerPage;
      this.saveIndexToLocalStorage();  // Save the updated index to localStorage
    }
  }
  
  saveIndexToLocalStorage() { 
    localStorage.setItem('currentIndex', this.currentIndex.toString());
  }

  loadIndexFromLocalStorage() {
    const storedIndex = localStorage.getItem('currentIndex');
    if (storedIndex) {
      this.currentIndex = parseInt(storedIndex, 10);
    }

}
}
