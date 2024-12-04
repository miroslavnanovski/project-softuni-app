import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { userService } from '../../user/user-service.service';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { UserForAuth } from '../../types/user';
import { Theme } from '../../types/themes';
import { ActivityLoggerService } from '../../user/activity-logger.service';

@Component({
  selector: 'app-create-theme',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,FormsModule],
  templateUrl: './create-theme.component.html',
  styleUrl: './create-theme.component.css'
})
export class CreateThemeComponent implements OnInit {
  @Output() themeCreated = new EventEmitter<Theme>();

  user:UserForAuth | null = null;
  currentUsername:string = '';
  userId:string = '';

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
  }


  createForm() {
    if (this.creationForm.valid) {
      const { themeName, postText } = this.creationForm.value;
  
      this.apiService.createTheme(themeName, postText).subscribe({
        next: (newTheme: Theme) => {
          
          this.activityLoggerService.logActivity(`created a theme called: ${themeName}`,this.userId,this.currentUsername);

          this.themeCreated.emit(newTheme);  // Emit the newly created theme
  
          // Navigate to themes page
          this.router.navigate([`${this.currentUsername}/themes`]);
        },
        error: (err) => {
          console.error('Error creating theme:', err);
        },
      });
    }
  }
  

}
