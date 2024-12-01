import {  ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Theme } from '../../types/themes';
import { userService } from '../../user/user-service.service';
import { User, UserForAuth } from '../../types/user';
import { ApiService } from '../../api.service';
import { Router, RouterLink } from '@angular/router';
import { EmptyThemePageComponent } from '../empty-theme-page/empty-theme-page.component';
import { NgFor, NgIf } from '@angular/common';



@Component({
  selector: 'app-your-themes',
  standalone: true,
  imports: [RouterLink,EmptyThemePageComponent,NgIf,NgFor],
  templateUrl: './your-themes.component.html',
  styleUrl: './your-themes.component.css'
})
export class YourThemesComponent implements OnInit{

  user:UserForAuth | null = null;
  themes:Theme[] = [];
  userThemes:Theme[] = [];
  currentUserId: string = '';
  currentUsername:string = '';
  currentThemeId: string = '';
  isEmpty:boolean = false;

constructor(private userService:userService,
  private apiService:ApiService,
  private router:Router,
  private ngZone: NgZone,
  private cdr: ChangeDetectorRef,){}

ngOnInit(): void {

  // Fetch user profile
  this.userService.getProfile().subscribe({
    next: (userData: UserForAuth) => {
      this.user = userData;
      this.currentUserId = this.user._id;
      this.currentUsername = this.user.username;

      // Loading themes only after user data is available
      this.apiService.getThemes().subscribe({
        next: (themes: Theme[]) => {
          this.themes = themes;
          

          // Filter themes for the current user
          this.userThemes = this.themes.filter(
            (theme) => theme.userId._id === this.currentUserId
          );
          
          this.isEmpty = this.userThemes.length === 0;
          
        },
        error: (err) => {
          console.error('Failed to load themes:', err);
        },
      });
    },
    error: (err) => {
      console.error('Failed to load user profile:', err);
    },
  });
}



createPost(themeId: string): void {
  this.router.navigate([`/${this.currentUsername}/themes/${themeId}/create-post`]);
}

viewPosts(themeId: string){
  this.router.navigate([`/${this.currentUsername}/themes/${themeId}`])
}

onThemeCreated(newTheme: Theme): void {

  this.ngZone.run(() => {
    // Add the new theme to the user's themes array
    this.userThemes.push(newTheme);

    // Update the empty state
    this.isEmpty = this.userThemes.length === 0;

    // Manually trigger change detection
    this.cdr.detectChanges(); 
  });
}


deleteTheme(themeId: string): void {
  this.apiService.deleteTheme(themeId).subscribe({
    next: () => {
      console.log(`Theme ${themeId} deleted successfully!`);

      this.themes = this.themes.filter(theme => theme._id !== themeId);
      this.userThemes = this.userThemes.filter(theme => theme._id !== themeId);

      this.isEmpty = this.userThemes.length === 0;

      this.ngZone.run(() => {});
      this.cdr.detectChanges();
          

    },
    error: (err) => {
      console.error('Error deleting theme:', err);
      if (err.status === 500) {
        console.warn('Theme deleted, but backend reported an error.');
        // Force UI update even if backend reports 500
        this.userThemes = this.userThemes.filter((theme) => theme._id !== themeId);

         // Update the empty state
         this.isEmpty = this.userThemes.length === 0;

        
      }
    },
  });
}

trackByIndex(index: number): number {
  return index;
}

}