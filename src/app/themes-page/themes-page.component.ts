import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from '../posts/post-card/post-card.component';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../api.service';
import { Theme } from '../types/themes';
import { IMAGE_URLS } from '../shared/image-urls';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-themes-page',
  standalone: true,
  imports: [PostCardComponent,RouterLink,CommonModule],
  templateUrl: './themes-page.component.html',
  styleUrl: './themes-page.component.css'
})
export class ThemesPageComponent implements OnInit{

constructor(private apiService:ApiService,private router:Router){}
themes:Theme[] = [];
randomImageUrl: string = '';
imageUrls: string[] = IMAGE_URLS;
themeImages: { [key: string]: string } = {}; // Mapping theme IDs to image URLs

currentPage: number = 1;
itemsPerPage: number = 10;



ngOnInit(): void {
  // Fetch the themes from the API
  this.apiService.getThemes().subscribe((data: Theme[]) => {
    this.themes = data;
    this.themes.forEach(theme => {
      const randomImage = this.getRandomImage();
      this.themeImages[theme._id] = randomImage;
    })
  });
}
  viewTheme(themeId: string): void {
   this.router.navigate([`/themes/${themeId}`])
  }

  getRandomImage(): string {
    // Generate a random index within the range of the array
    const randomIndex = Math.floor(Math.random() * this.imageUrls.length);
    return this.imageUrls[randomIndex];
  }

  get paginatedThemes(): Theme[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.themes.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Move to the next page
  nextPage(): void {
    if (this.currentPage * this.itemsPerPage < this.themes.length) {
      this.currentPage++;
    }
  }

  // Move to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

}
