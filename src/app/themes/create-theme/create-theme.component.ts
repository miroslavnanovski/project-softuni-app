import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { userService } from '../../user/user-service.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { UserForAuth } from '../../types/user';
import { Theme } from '../../types/themes';
import { ActivityLoggerService } from '../../user/activity-logger.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-theme',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './create-theme.component.html',
  styleUrl: './create-theme.component.css'
})
export class CreateThemeComponent implements OnInit {
  @Output() themeCreated = new EventEmitter<Theme>();
  themes:Theme[] = [];
  user:UserForAuth | null = null;
  currentUsername:string = '';
  userId:string = '';
  isDuplicate:boolean = false;

  creationForm: FormGroup;

  constructor(private fb: FormBuilder, private userService:userService,private apiService:ApiService,private router:Router, private activityLoggerService:ActivityLoggerService){
    this.creationForm = this.fb.group({
      themeName: ['', [Validators.required, Validators.minLength(5)]],
      postText: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {

    this.userService.getProfile().subscribe({
      next: (userData: UserForAuth) => {
        this.user = userData;
        this.currentUsername = this.user.username;
        this.userId = this.user._id;
        
  }});   

  this.apiService.getThemes().subscribe((data: Theme[]) => {
    this.themes = data;
  });
}


createForm() {
  if (this.creationForm.valid) {
    const { themeName, postText } = this.creationForm.value;

    // Check for duplicates
    const isDuplicate = this.themes.some(
      (theme) => theme.themeName.toLowerCase() === themeName.toLowerCase()
    );

    if (isDuplicate) {
      this.isDuplicate = true; // Set the duplicate flag to show an error in the template
      console.error('A theme with this name already exists.');
      return; // Stop further execution if a duplicate is found
    }

    // If not a duplicate, proceed with theme creation
    this.apiService.createTheme(themeName, postText).subscribe({
      next: (newTheme: Theme) => {
        this.activityLoggerService.logActivity(
          `Created a theme called: ${themeName}`,
          this.userId,
          this.currentUsername
        );

        this.themeCreated.emit(newTheme); // Emit the newly created theme

        // Navigate to the user's themes page
        this.router.navigate([`${this.currentUsername}/themes`]);
      },
      error: (err) => {
        console.error('Error creating theme:', err);
      },
    });
  }
}

  

}
