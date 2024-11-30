import { Component } from '@angular/core';
import { CreateThemeComponent } from '../create-theme/create-theme.component';

@Component({
  selector: 'app-empty-theme-page',
  standalone: true,
  imports: [CreateThemeComponent],
  templateUrl: './empty-theme-page.component.html',
  styleUrl: './empty-theme-page.component.css'
})
export class EmptyThemePageComponent {

}
