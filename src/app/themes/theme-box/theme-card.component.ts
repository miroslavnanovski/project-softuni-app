import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/themes';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-theme-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './theme-card.component.html',
  styleUrl: './theme-card.component.css'
})
export class ThemeCardComponent {

  themes: Theme[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(){
    this.apiService.getThemes().subscribe((themes) => {
      this.themes = themes;
    })
  }
}
