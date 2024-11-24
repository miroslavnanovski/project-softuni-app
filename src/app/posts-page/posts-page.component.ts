import { Component, OnInit } from '@angular/core';
import { PostBoxComponent } from '../posts/post-box/post-box.component';
import { Post } from '../types/posts';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-posts-page',
  standalone: true,
  imports: [PostBoxComponent],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.css'
})
export class PostsPageComponent implements OnInit {
  posts: Post[] = [];
  
  constructor(private apiService:ApiService) {}
 
  ngOnInit(){
    this.apiService.getPosts().subscribe((posts) => {
      this.posts = posts;
    })
}
}
