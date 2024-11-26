import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,ReactiveFormsModule, Validators, EmailValidator } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserForAuth } from '../../../types/user';
import { EmailValidatorDirective } from '../../../directives/email.directive';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.css'
})
export class ProfileSettingsComponent implements OnInit {

  user:UserForAuth | null = null;

  

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData) as UserForAuth;
  }
}




  editForm = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.minLength(5)]),
    email:new FormControl('',[Validators.required]),
    telephone:new FormControl('',[Validators.required])
  })


  isEdited:boolean = false;

  toggleEdit(){
    this.isEdited = !this.isEdited;
  }

  saveChanges(){
    
  }

}
