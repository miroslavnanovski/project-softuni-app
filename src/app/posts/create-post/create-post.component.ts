import { Component, OnInit } from '@angular/core';
import { userService } from '../../user/user-service.service';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/themes';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {

  themes: Theme[] = [];
  selectedTheme:string = '';

  constructor(private apiService:ApiService){}

  ngOnInit(): void {
      this.getThemes().subscribe({
        next: (data) =>(this.themes = data),
        error: (err) => console.error('Failed to fetch themes', err)
      })

      
  }

  getThemes(){
    return this.apiService.getThemes();
  }




}

