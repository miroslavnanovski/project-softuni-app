import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserForAuth } from '../../../types/user';
import { userService } from '../../user-service.service';
import { ActivityLoggerService } from '../../activity-logger.service';


@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css'
})
export class ProfileSettingsComponent implements OnInit {

  user:UserForAuth | null = null;
  username:string = '';
  userId:string = '';

  constructor(private userService:userService, private activityLoggerService:ActivityLoggerService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (userData: UserForAuth) => {
        this.user = userData;
        this.username = this.user.username;
        this.userId = this.user._id;
  
        this.editForm.patchValue({
          username: this.user.username,
          email: this.user.email,
          tel: this.user.tel
        });
      },
      error: (err) => {
        console.error('Failed to load user profile:', err);
      }
    });
  }
  
  editForm = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.minLength(3)]),
    email:new FormControl('',[Validators.required]),
    tel:new FormControl('',[Validators.required])
  })


  isEdited:boolean = false;

  toggleEdit(){
    this.isEdited = !this.isEdited;
  }

  saveChanges(): void {
    const { username, email, tel } = this.editForm.value;

    this.userService.updateProfile(username?? '', email?? '', tel?? '').subscribe({
      next: (updatedUser: UserForAuth) => {
        this.user = updatedUser; // Update local user data
        console.log('Profile updated successfully:', updatedUser);
        this.activityLoggerService.logActivity(`updated his profile!`,this.userId,this.username);

        this.editForm.patchValue({
          username: updatedUser.username,
          email: updatedUser.email,
          tel: updatedUser.tel
        });

        this.isEdited = false; // Exit edit mode
      },
      error: (err) => {
        console.error('Failed to update profile:', err);
      }
    });
  }

 }
