import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function trimValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    if(!control.value.trim()) {
      control.setValue('')
    }

    const contentValid = value.trim()

    return !contentValid ? {trimValidator:true}: null;
  }
}
