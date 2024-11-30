import { Component } from '@angular/core';
import { PostCardComponent } from '../posts/post-card/post-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-themes-page',
  standalone: true,
  imports: [PostCardComponent,RouterLink],
  templateUrl: './themes-page.component.html',
  styleUrl: './themes-page.component.css'
})
export class ThemesPageComponent {

}
