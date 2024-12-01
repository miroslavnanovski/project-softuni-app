import { Component, EventEmitter, Output } from '@angular/core';
import { CreateThemeComponent } from '../create-theme/create-theme.component';
import { Theme } from '../../types/themes';

@Component({
  selector: 'app-empty-theme-page',
  standalone: true,
  imports: [CreateThemeComponent],
  templateUrl: './empty-theme-page.component.html',
  styleUrl: './empty-theme-page.component.css'
})
export class EmptyThemePageComponent {
  @Output() themeCreated = new EventEmitter<Theme>();

  onThemeCreated(newTheme: Theme): void {
    this.themeCreated.emit(newTheme); // Re-emit the event
  }
}