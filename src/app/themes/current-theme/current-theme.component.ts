import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/themes';
import { CommonModule, Location } from '@angular/common';
import { Post } from '../../types/posts';
import { userService } from '../../user/user-service.service';
import { UserForAuth } from '../../types/user';
import { ActivityLoggerService } from '../../user/activity-logger.service';
import { EmptyPostComponent } from "../../posts/post-card/empty-post/empty-post.component";
import { FormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';



@Component({
  selector: 'app-current-theme',
  standalone: true,
  imports: [RouterLink, EmptyPostComponent,FormsModule,CommonModule],
  templateUrl: './current-theme.component.html',
  styleUrl: './current-theme.component.css'
})
export class CurrentThemeComponent implements OnInit {
  user:UserForAuth | null = null;
  posts: Post[] = [];
  userId: string = '';
  username:string = '';
  areTherePosts:boolean = true;
  isLoggedIn:boolean = false;
  isUserTheme: boolean = false;
  isValid: boolean = false;
  subscribedTheme:string [] = [];
  isSubscribed:boolean = false;


  editingState = new Map<string, boolean>(); // Map to track the editing state of each post
  postNewText = new Map<string, string>(); // Tracks the new text for each post
  editText: string = ''; // Local variable for editing text
  
  isOwner(postUserId: string): boolean {
    return postUserId === this.userId;  // Check if the current post's userId matches the logged-in userId
  }
  

  theme = {} as Theme; // Casting Theme to be and object of type Theme

  constructor(private route: ActivatedRoute,
    private apiService:ApiService,
    private location:Location,
    private userService:userService,
    private activityLoggerService:ActivityLoggerService,
    private cdr: ChangeDetectorRef,
    private router:Router) {}


  
ngOnInit(): void {
  const id = this.route.snapshot.params['themeId'];
  
 
  this.apiService.getSingleTheme(id).subscribe(themeData => {
    this.theme = themeData;
    this.posts = themeData.posts;
    this.theme.subscribers = this.theme.subscribers || [];
    this.areTherePosts = this.posts.length > 0;

    this.checkSubscriptionStatus(this.theme._id);

    // Initialize the liked flag for each post (false by default)
    this.posts.forEach(post => {
      post.liked = false;  // Initialize liked state for each post
    });
  });

  this.userService.getProfile().subscribe({
    next: (userData: UserForAuth) => {
      if(userData) {
        this.isLoggedIn = true;
      }     
      this.user = userData;
      this.userId = this.user._id;
      const username = this.user.username;
      this.username = username;
    
      this.checkSubscriptionStatus(id);

      
}});   

this.posts.forEach(post => {
  post.liked = post.likes.includes(this.userId); // Dynamically check if the user has liked the post
});
}

toggleEditMode(post: any): void {
    const isEditing = this.editingState.get(post._id) || false;
    this.editingState.set(post._id, !isEditing);

    if (!isEditing) {
      // Enter edit mode and pre-fill input field
      this.editText = post.text; // Assign the current text to local variable
    } else {
      // Exit edit mode and update the post if the text has changed
      const newText = this.editText;
      if (post.text !== newText) {
        this.apiService.updatePost(newText, this.theme._id, post._id).subscribe(
          (response) => {
            post.text = newText;
            this.postNewText.set(post._id, newText); // Save updated text
          },
          (error) => {
            console.error('Failed to update the post:', error);
          }
        );
      }
    }
  }

isPostEditing(postId: string): boolean {
  return this.editingState.get(postId) || false;
}

getPostNewText(postId: string): string {
  return this.postNewText.get(postId) || '';
}

setPostNewText(postId: string, newText: string): void {
  this.postNewText.set(postId, newText);
}

isPostLikedByUser(post: any): boolean {
  // Check if the current user's ID exists in the post's likes array
  return post.likes?.includes(this.userId) || false;
}


goBack(): void {
  this.location.back();
}

goToCreatePost(){
  this.router.navigate([`/themes/${this.theme._id}/create-post`]);
}   


likeAPost(postId: string, post: Post) {
  console.log(`likeAPost triggered for postId: ${postId}`);
  this.apiService.likePost(postId).subscribe({
    next: response => {
      console.log('Post liked successfully:', response);

      // Update the UI to reflect the like action
      post.liked = true; 
      post.likes.push(this.userId); // Add the current user ID to the likes array
      this.activityLoggerService.logActivity(`liked the post: ${post.text}`,this.userId,this.username);
    },
    error: error => {
      console.error('Error liking post:', error);
    }
  });
}

removePost(themeId: string, postId: string, postText: string): void {
  this.apiService.deletePost(themeId, postId).subscribe({
    next: () => {
      this.activityLoggerService.logActivity(
        `deleted the post: ${postText}!`,
        this.userId,
        this.username
      );

      // Update the posts array to remove the deleted post
      this.theme.posts = this.theme.posts.filter((post) => post._id !== postId);

      // Update the `areTherePosts` flag
      this.areTherePosts = this.theme.posts.length > 0;

      // Trigger change detection to update the UI
      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error('Error deleting post:', error);
    },
  });
}

trackById(index: number, post: any): string {
  return post._id;
}


subscribeToTheme(themeId: string) {
  const subscribedThemes = JSON.parse(localStorage.getItem(`subscribedThemes_${this.userId}`) || '[]');

  if (!subscribedThemes.includes(themeId)) {
    this.apiService.subscribeToTheme(themeId).subscribe({
      next: () => {
        // Add to localStorage
        subscribedThemes.push(themeId);
        localStorage.setItem(`subscribedThemes_${this.userId}`, JSON.stringify(subscribedThemes));

        this.activityLoggerService.logActivity(
          `subscribed to theme: ${this.theme.themeName}!`,
          this.userId,
          this.username
        );

        // Update theme subscribers dynamically
        this.theme.subscribers.push(this.userId); // Add current user to the subscribers list
        this.isSubscribed = true;
        this.cdr.detectChanges(); // Trigger change detection to update UI
      },
      error: (error) => {
        console.error('Error subscribing to theme:', error);
      },
    });
  }
}

checkSubscriptionStatus(themeId: string) {
  const subscribedThemes = JSON.parse(localStorage.getItem(`subscribedThemes_${this.userId}`) || '[]');
  this.isSubscribed = subscribedThemes.includes(themeId);
}


loadTheme(themeId: string) {
  this.apiService.getSingleTheme(themeId).subscribe((updatedTheme: any) => {
    this.theme = updatedTheme; // Update the local theme state
  });
}


}


