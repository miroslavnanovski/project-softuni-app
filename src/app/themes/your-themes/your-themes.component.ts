import { Component, OnInit } from '@angular/core';
import { Theme } from '../../types/themes';
import { userService } from '../../user/user-service.service';
import { User, UserForAuth } from '../../types/user';
import { ApiService } from '../../api.service';
import { Router, RouterLink } from '@angular/router';
import { EmptyThemePageComponent } from '../empty-theme-page/empty-theme-page.component';


@Component({
  selector: 'app-your-themes',
  standalone: true,
  imports: [RouterLink,EmptyThemePageComponent],
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

constructor(private userService:userService,private apiService:ApiService,private router:Router){}

ngOnInit(): void {

  // Fetch user profile
  this.userService.getProfile().subscribe({
    next: (userData: UserForAuth) => {
      this.user = userData;
      this.currentUserId = this.user._id;
      this.currentUsername = this.user.username;

      // Fetch themes only after user data is available
      this.apiService.getThemes().subscribe({
        next: (themes: Theme[]) => {
          this.themes = themes;
          

          // Filter themes for the current user
          this.userThemes = this.themes.filter(
            (theme) => theme.userId._id === this.currentUserId
          );
          if(this.userThemes.length === 0){
            this.isEmpty = true;
          }
          
          
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



// deleteTheme(themeId: string): void {
//   this.apiService.deleteTheme(themeId).subscribe({
//     next: () => {
//       console.log(`Theme with ID ${themeId} deleted successfully`);
//     },
//     error: (err) => console.error('Error deleting theme:', err),
//   });
// }

}