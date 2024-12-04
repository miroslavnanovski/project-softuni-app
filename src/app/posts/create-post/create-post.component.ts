import { Component, OnInit } from '@angular/core';
import { userService } from '../../user/user-service.service';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/themes';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { ActivityLoggerService } from '../../user/activity-logger.service';
import { UserForAuth } from '../../types/user';

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

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router:Router,private userService:userService,private activityLoggerService:ActivityLoggerService) {}

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
      
      
      
      this.apiService.postComment(commentText,this.themeId).subscribe(response => {
        this.activityLoggerService.logActivity(`created a post:${commentText}`,this.userId,this.username);
      })
      this.router.navigate([`${this.username}/themes`])
    } else {
      console.log('Form is invalid.');
    }
  }
}