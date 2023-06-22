import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable, map, of, timer } from 'rxjs';
import { ValidationService } from '../../services/validation.service';
import { ValidationMessages } from '../../models/validationMessage';
import { Pattern } from '../../models/pattern';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {

  token !: string;
  resetPasswordForm!: FormGroup;
  submitted = false;
  ValidationMessages = ValidationMessages;
  Pattern = Pattern;

  constructor(
    private formBuilder: FormBuilder,
    public service: ServicesService,
    private router: Router,
    private toast: NgToastService,
    private activatedRoute: ActivatedRoute,
    public validationService: ValidationService,

  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token']

    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(Pattern.password)]],
      confirmPassword: ['', [Validators.required], [passwordMatchValidator()]],
      token: []
    });
  }

  hidePassword: boolean = true;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  get formData() {
    return this.resetPasswordForm.controls;
  }

  resetPassword() {
    this.submitted = true;
    this.resetPasswordForm.markAllAsTouched();
    if (this.resetPasswordForm.valid) {

      if (this.token) {

        const payload = {
          newPassword: this.resetPasswordForm.value.password,
          confirmPassword: this.resetPasswordForm.value.confirmPassword,
          timeAtReset: new Date(),
          token: this.token
        }
        this.service.resetPasswordService(payload)
          .subscribe({
            next: (res => {
              if (res.success) {
                this.router.navigate(['']);
                this.toast.success({ detail: "Password changed successfully!", duration: 5000 });
                this.resetPasswordForm.reset();
              } else {
                this.toast.error({ detail: res.message, duration: 5000 });
                console.log("error1");
              }
            }),
            error: (res => {
              this.toast.error({ detail: res.message, duration: 5000 });
              console.log("error2");
            })
          });
      } else {
        console.log("Token not available");
      }
    }
  }

}

export function passwordMatchValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const password = control.parent?.get('password')?.value;

    const confirmPassword = control.value;
    if (password === confirmPassword) {
      return of(null); // Passwords match
    } else {
      return of({ passwordMismatch: true }); // Passwords do not match
    }
  };
}