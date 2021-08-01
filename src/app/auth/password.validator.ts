import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

export interface ValidationResult {
  [key: string]: boolean;
}

export class AuthValidator {
  public static password(control: FormControl): ValidationResult {
    const hasNumber = /\d/.test(control.value);
    const hasUpper = /[A-Z]/.test(control.value);
    const hasLower = /[a-z]/.test(control.value);
    const valid = hasNumber && hasUpper && hasLower;
    return !valid ? { strong: true } : null;
  }

  public static matchValue(
    matchTo: string
  ): (AbstractControl) => ValidationResult {
    return (control: AbstractControl): ValidationResult =>
      !!control.parent &&
      !!control.parent.value &&
      control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
  }
}
