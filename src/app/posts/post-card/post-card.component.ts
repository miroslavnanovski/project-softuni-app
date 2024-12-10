import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Post } from '../../types/posts';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmptyPostComponent } from './empty-post/empty-post.component';


@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [LoaderComponent,RouterLink,EmptyPostComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent implements OnInit {
  @Input() post: Post | undefined;

  posts: Post[] = [];
  isLoading = true;
 

  constructor(private apiService:ApiService,private route: ActivatedRoute ) {}



  ngOnInit(): void {
      this.apiService.getPosts(7).subscribe((posts) => {
        this.posts = posts;

      })

  
  }


}
