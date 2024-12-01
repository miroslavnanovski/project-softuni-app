import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Post } from '../../types/posts';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ActivatedRoute, RouterLink } from '@angular/router';


@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [LoaderComponent,RouterLink],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent implements OnInit {
  posts: Post[] = [];
  isLoading = true;

  constructor(private apiService:ApiService,private route: ActivatedRoute ) {}

  isTruncated:boolean = true;

  ngOnInit(): void {
      this.apiService.getPosts(7).subscribe((posts) => {
        this.posts = posts;
        
         setTimeout(() => {
           this.isLoading=false;
        }, 500);
      })

  }

}
