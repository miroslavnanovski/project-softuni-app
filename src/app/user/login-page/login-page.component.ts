import { Component } from '@angular/core';
import { userService } from '../user-service.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';
import { EmailValidatorDirective } from '../../directives/email.directive';
import { PasswordValidatorDirective } from '../../directives/password.directive';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink,FormsModule,NgIf,EmailValidatorDirective,PasswordValidatorDirective,NgClass],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent {

  constructor(private userService:userService, private router: Router){}

  login(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted:', form.value);
    } else {
      console.log('Form is invalid.');
    }

    const {email, password} = form.value;


    this.userService.login(email,password).subscribe(()=>{
      this.router.navigate(['/home'])
    });
    
  }

  
}


