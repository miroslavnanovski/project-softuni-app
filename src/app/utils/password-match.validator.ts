import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const rePassword = control.get('rePassword');

    if (!password || !rePassword) {
      return null; // Return null if one of the controls is missing
    }

    return password.value === rePassword.value ? null : { passwordsMismatch: true };
  };
}
