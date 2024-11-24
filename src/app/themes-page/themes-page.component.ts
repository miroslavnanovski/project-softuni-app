import { Component } from '@angular/core';
import { ThemeCardComponent } from '../themes/theme-box/theme-card.component';
import { PostCardComponent } from '../posts/post-card/post-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-themes-page',
  standalone: true,
  imports: [ThemeCardComponent,PostCardComponent,RouterLink],
  templateUrl: './themes-page.component.html',
  styleUrl: './themes-page.component.css'
})
export class ThemesPageComponent {

}
