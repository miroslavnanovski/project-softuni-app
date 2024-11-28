import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule,NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordValidatorDirective } from '../../directives/password.directive';
import { EmailValidatorDirective } from '../../directives/email.directive';
import { NgClass, NgIf } from '@angular/common';
import { passwordMatchValidator } from '../../utils/password-match.validator';
import { userService } from '../user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule,PasswordValidatorDirective,EmailValidatorDirective,NgClass,NgIf,ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private userService:userService,private router:Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, new EmailValidatorDirective]],
      telephone: [''],
      passGroup: this.fb.group(
        {
          password: ['', [Validators.required, new PasswordValidatorDirective]],
          rePassword: ['', Validators.required],
        },
        { validators: passwordMatchValidator() }
      )
    });
  }

  register() {
    if (this.registerForm.valid) {
      console.log('Form Submitted', this.registerForm.value);
    } else {
      console.log('Form Invalid');
    }

    const {
      username,
      email,
      telephone,
      passGroup: { password, rePassword },
    } = this.registerForm.value;

    this.userService.register(username,email,telephone,password,rePassword).subscribe( ()=> {
      this.router.navigate(['/home'])
    });

  }





}