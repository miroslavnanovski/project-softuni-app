import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../api.service';
import { Theme } from '../../types/themes';
import { Location } from '@angular/common';


@Component({
  selector: 'app-current-theme',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './current-theme.component.html',
  styleUrl: './current-theme.component.css'
})
export class CurrentThemeComponent implements OnInit {

  theme = {} as Theme; // Casting Theme to be and object of type Theme

  constructor(private route: ActivatedRoute, private apiService:ApiService,private location:Location) {}


  
ngOnInit(): void {
  const id = this.route.snapshot.params['themeId'];
  
 
  this.apiService.getSingleTheme(id).subscribe(data => {
    this.theme = data;
    
  })
}

goBack(): void {
  this.location.back();
}

}
