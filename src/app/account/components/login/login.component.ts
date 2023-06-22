
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ServicesService } from '../../../account/services/services.service';
import { NgToastService } from 'ng-angular-popup';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from '../../services/validation.service';
import { ValidationMessages } from '../../models/validationMessage';
import { Pattern } from '../../models/pattern';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  ValidationMessages = ValidationMessages;
  Pattern = Pattern;

  constructor(
    private formBuilder: FormBuilder,
    private service: ServicesService,
    private toast: NgToastService,
    private router: Router,
    public validationService: ValidationService,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(Pattern.email)]],
      password: ['', [Validators.required, Validators.pattern(Pattern.password)]]
    });
  }

  hidePassword: boolean = true;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  get formData() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      // console.log(this.loginForm.value)
      this.service.loginService(this.loginForm.value)
        .subscribe({
          next: (res => {
            if (res.success) {
              this.toast.success({ detail: res.message, duration: 5000 });
              this.service.storeToken(res.token);
              this.loginForm.reset();
              this.router.navigate(['home']);
            }
            else {
              this.toast.error({ detail: res.message, duration: 5000 })
            }
          }),
          error: (res => {
            this.toast.error({ summary: res.message, duration: 5000 })
          })
        })
    }
  }
}

// export function passwordValidator(): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: boolean } | null => {
//     const password = control.value;

//     if (password === null) {
//       return null;
//     }

//     const hasUppercase = /[A-Z]/.test(password);
//     const hasLowercase = /[a-z]/.test(password);
//     const hasNumber = /\d/.test(password);
//     const hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"|,.<>/?]/.test(password);
//     const hasMinimumLength = password.length >= 8;
//     const valid = hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter && hasMinimumLength;

//     if (!valid) {
//       return { invalidPassword: true };
//     }

//     return null;
//   };
// }


