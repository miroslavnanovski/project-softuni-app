import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Post } from '../../types/posts';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent implements OnInit {
  posts: Post[] = [];
  isLoading = true;

  constructor(private apiService:ApiService,private route: ActivatedRoute ) {}

  isTruncated:boolean = true;

  ngOnInit(): void {
      this.apiService.getPosts(3).subscribe((posts) => {
        this.posts = posts;
        console.log(posts);
        
        setTimeout(() => {
          this.isLoading=false;
        }, 500);
      })

  }

  togglePost():void {
    
    this.isTruncated = !this.isTruncated;
    
  }

}
