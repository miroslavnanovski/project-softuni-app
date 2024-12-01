import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from '../posts/post-card/post-card.component';
import { HeaderComponent } from '../core/header/header.component';
import { HomeCardsComponent } from "../shared/home-cards/home-cards.component";
import { userService } from '../user/user-service.service';
import { CreatePostComponent } from '../posts/create-post/create-post.component';
import { LoginPageComponent } from '../user/login-page/login-page.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [PostCardComponent, HeaderComponent, HomeCardsComponent,CreatePostComponent,LoginPageComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private userService:userService){}

  get isLoggedIn():boolean {
    return this.userService.isLoggedIn;
  }

  get username():string {
    return this.userService.user?.username || '';
  }

}
