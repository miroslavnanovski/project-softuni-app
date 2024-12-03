import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/themes';
import { Location } from '@angular/common';
import { Post } from '../../types/posts';
import { userService } from '../../user/user-service.service';
import { UserForAuth } from '../../types/user';


@Component({
  selector: 'app-current-theme',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './current-theme.component.html',
  styleUrl: './current-theme.component.css'
})
export class CurrentThemeComponent implements OnInit {
  user:UserForAuth | null = null;
  posts: Post[] = [];
  userId: string = '';

  theme = {} as Theme; // Casting Theme to be and object of type Theme

  constructor(private route: ActivatedRoute, private apiService:ApiService,private location:Location,private userService:userService) {}


  
ngOnInit(): void {
  const id = this.route.snapshot.params['themeId'];
 
  this.apiService.getSingleTheme(id).subscribe(themeData => {
    this.theme = themeData;
    this.posts = themeData.posts;

    // Initialize the liked flag for each post (false by default)
    this.posts.forEach(post => {
      post.liked = false;  // Initialize liked state for each post
    });
  });

  this.userService.getProfile().subscribe({
    next: (userData: UserForAuth) => {
      this.user = userData;
      this.userId = this.user._id;
      
}});   

this.posts.forEach(post => {
  post.liked = post.likes.includes(this.userId); // Dynamically check if the user has liked the post
});
}


isPostLikedByUser(post: any): boolean {
  // Check if the current user's ID exists in the post's likes array
  return post.likes?.includes(this.userId) || false;
}


goBack(): void {
  this.location.back();
}

likeAPost(postId: string, post: Post) {
  console.log(`likeAPost triggered for postId: ${postId}`);
  this.apiService.likePost(postId).subscribe({
    next: response => {
      console.log('Post liked successfully:', response);

      // Update the UI to reflect the like action
      post.liked = true; 
      post.likes.push(this.userId); // Add the current user ID to the likes array
    },
    error: error => {
      console.error('Error liking post:', error);
    }
  });
}

}
