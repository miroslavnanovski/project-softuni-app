import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function currentPasswordValidator(storedPassword: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || control.value === storedPassword) {
      return null; // Valid if the password matches or is empty (other validations handle required fields)
    }
    return { currentPasswordMismatch: true }; // Return an error if the passwords don't match
  };
}
