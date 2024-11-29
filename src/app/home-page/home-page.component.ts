import { Component, OnInit } from '@angular/core';
import { ThemeCardComponent } from "../themes/theme-box/theme-card.component";
import { PostCardComponent } from '../posts/post-card/post-card.component';
import { HeaderComponent } from '../core/header/header.component';
import { HomeCardsComponent } from "../shared/home-cards/home-cards.component";
import { userService } from '../user/user-service.service';
import { CreatePostComponent } from '../posts/create-post/create-post.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ThemeCardComponent, PostCardComponent, HeaderComponent, HomeCardsComponent,CreatePostComponent],
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
