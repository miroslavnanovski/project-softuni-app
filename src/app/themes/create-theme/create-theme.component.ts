import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { userService } from '../../user/user-service.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-create-theme',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,FormsModule],
  templateUrl: './create-theme.component.html',
  styleUrl: './create-theme.component.css'
})
export class CreateThemeComponent {

  creationForm: FormGroup;

  constructor(private fb: FormBuilder, private userService:userService,private apiService:ApiService,private router:Router){
    this.creationForm = this.fb.group({
      themeName: ['', [Validators.required, Validators.minLength(5)]],
      postText: ['', [Validators.required, Validators.minLength(5)]],
    });
  }


  createForm(){
    if (this.creationForm.valid){
      const {themeName,postText,} = this.creationForm.value;
      this.router.navigate(['/themes']);
      return this.apiService.createTheme(themeName,postText).subscribe();
      
    }
      return null;
  }

}
