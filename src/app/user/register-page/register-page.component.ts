import { Component } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { PasswordValidatorDirective } from '../../directives/password.directive';
import { EmailValidatorDirective } from '../../directives/email.directive';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule,PasswordValidatorDirective,EmailValidatorDirective,NgClass],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

    register(form: NgForm) {
      if (form.valid) {
        console.log('Form Submitted:', form.value);
      } else {
        console.log('Form is invalid.');
      }
    }

}
