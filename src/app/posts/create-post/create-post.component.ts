import { Component, OnInit } from '@angular/core';
import { userService } from '../../user/user-service.service';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/themes';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';

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

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router:Router,private userService:userService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
     this.username = params['username'];
      this.themeId = params['themeId'];
    });

    this.apiService.getSingleTheme(this.themeId).subscribe((data) => {
      this.theme = data;
    });
  }

  postComment(form: NgForm) {
    if (form.valid) {
      const commentText = form.value.body;
      console.log(commentText);
      
      this.apiService.postComment(commentText,this.themeId).subscribe(response => {
        console.log('Comment posted successfully!');
      })
      this.router.navigate([`${this.username}/themes`])
    } else {
      console.log('Form is invalid.');
    }
  }
}