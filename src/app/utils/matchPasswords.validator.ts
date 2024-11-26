import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const rePassword = control.get('rePassword')?.value;

  return password === rePassword ? null : { passwordsDoNotMatch: true };
}
