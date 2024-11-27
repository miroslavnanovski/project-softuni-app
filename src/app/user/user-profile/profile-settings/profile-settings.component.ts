import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserForAuth } from '../../../types/user';


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
    const userData = localStorage.getItem('[user]');
    
    if (userData) {
      this.user = JSON.parse(userData) as UserForAuth;
      

      this.editForm.patchValue({
        username: this.user.username,
        email: this.user.email,
        telephone: this.user.telephone
      });
  }
}




  editForm = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.minLength(3)]),
    email:new FormControl('',[Validators.required]),
    telephone:new FormControl('',[Validators.required])
  })


  isEdited:boolean = false;

  toggleEdit(){
    this.isEdited = !this.isEdited;
  }

  saveChanges(){

    if(this.editForm.valid && this.user){
      const updatedUser: UserForAuth  = {
        ...this.user, // Keep other properties unchanged
        username: this.editForm.get('username')?.value || '', // Ensure value is a string
        email: this.editForm.get('email')?.value || '',
        telephone: this.editForm.get('telephone')?.value || '',
        password: this.user.password
      };


      this.user = updatedUser;
      localStorage.setItem('[user]', JSON.stringify(updatedUser));

      this.isEdited = false;

  }

}}
