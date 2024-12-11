import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { userService } from '../../user/user-service.service';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/themes';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { ActivityLoggerService } from '../../user/activity-logger.service';
import { UserForAuth } from '../../types/user';
import { Post } from '../../types/posts';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {
  theme = {} as Theme;
  themeId: string = '';
  username:string = '';
  user:UserForAuth | null = null;
  userId:string = '';
  areTherePosts: boolean = true;

  constructor(private route: ActivatedRoute,
     private apiService: ApiService,
      private router:Router,
      private userService:userService,
      private activityLoggerService:ActivityLoggerService,
      private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
     this.username = params['username'];
      this.themeId = params['themeId'];
    });

    this.userService.getProfile().subscribe({
      next: (userData: UserForAuth) => {
        this.user = userData;
        this.userId = userData._id;
  }});   

    this.apiService.getSingleTheme(this.themeId).subscribe((data) => {
      this.theme = data;
    });
  }

  postComment(form: NgForm) {
    if (form.valid) {
      const commentText = form.value.body;
  
      // Post the comment to the server
      this.apiService.postComment(commentText, this.themeId).subscribe({
        next: (response: Post) => { 
          const newPost = response; 
  
          // Add the new post to the local posts array
          this.theme.posts.push(newPost);
          this.areTherePosts = this.theme.posts.length > 0; // Update the flag if posts exist
  
          // Log the activity
          this.activityLoggerService.logActivity(`created a post: ${commentText}`, this.userId, this.username);
  
          // Manually trigger change detection to update the UI immediately
          this.cdr.detectChanges();
  
          
          this.router.navigate([`/themes/${this.themeId}`]);
        },
        error: (error) => {
          console.error('Failed to post comment:', error);
        }
      });
    } else {
      console.log('Form is invalid.');
    }
  }
  
  
  
}