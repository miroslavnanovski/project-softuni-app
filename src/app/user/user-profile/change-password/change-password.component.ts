import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordValidatorDirective } from '../../../directives/password.directive';
import { NgIf } from '@angular/common';
import { passwordMatchValidator } from '../../../utils/password-match.validator';
import { UserForAuth } from '../../../types/user';
import { currentPasswordValidator } from '../../../utils/current-password.validator';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [PasswordValidatorDirective,NgIf,ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {

  user:UserForAuth | null = null;
  currentPasswordStored: string = '';
  changePasswordForm!: FormGroup;

  ngOnInit(): void {
    const userData = localStorage.getItem('[user]');

    if(userData){
      this.user = JSON.parse(userData) as UserForAuth;

      if(this.user.password) {
        this.currentPasswordStored = this.user.password;
        
      } else {
       console.error(`Password not available in stored user data`)
      }
    }

    this.changePasswordForm = new FormGroup(
      {
        currentPassword: new FormControl('', [Validators.required,currentPasswordValidator(this.currentPasswordStored)]),
        newPassword: new FormControl('',[ Validators.required, new PasswordValidatorDirective().validate]),
        confirmPassword: new FormControl('', Validators.required),
      },
      //// Custom validators ///
      { validators: passwordMatchValidator() } 
    );
    
  }

 

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const { newPassword } = this.changePasswordForm.value;
      // Update the user object with the new password

      if (this.user) {
        this.user.password = newPassword;

        // Save the updated user object back to localStorage

        localStorage.setItem('[user]', JSON.stringify(this.user));

        console.log('Password changed successfully!');
      }
    
      ;
    }
  }
}