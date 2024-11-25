import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';

@Directive({
  selector: '[validPassword]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidatorDirective,
      multi: true,
    },
  ],
})
export class PasswordValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    const valid = passwordRegex.test(control.value);
    return valid ? null : { invalidPassword: true };
  }
}