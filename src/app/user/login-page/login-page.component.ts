import { Component } from '@angular/core';
import { userService } from '../user-service.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { EmailValidatorDirective } from '../../directives/email.directive';
import { PasswordValidatorDirective } from '../../directives/password.directive';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink,FormsModule,NgIf,EmailValidatorDirective,PasswordValidatorDirective,NgClass],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent {

  errorMessage: string = '';

  constructor(private userService:userService, private router: Router){}

  login(form: NgForm) {
    if (form.invalid) {
      console.log('Form is invalid.');
      return;
    }


    this.errorMessage = ''; 
    const {email, password} = form.value;


    this.userService.login(email, password).pipe(
      catchError((err) => {
        // Handle errors
        if (err && err.error && err.error.message) {
          this.errorMessage = err.error.message; 
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
        return of(null); // Return null to prevent further propagation
      })
    ).subscribe({
      next: (response) => {
        if (response) { // Only navigate if the response is valid
          this.router.navigate(['/home']);
        }
      }
    });
  }
  
}


