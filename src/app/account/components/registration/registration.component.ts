import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ServicesService } from '../../../account/services/services.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable, map, of, timer } from 'rxjs';
import { ValidationService } from '../../services/validation.service';
import { ValidationMessages } from '../../models/validationMessage';
import { Pattern } from '../../models/pattern';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;
  ValidationMessages = ValidationMessages;
  Pattern = Pattern;

  constructor(
    private formBuilder: FormBuilder,
    private service: ServicesService,
    private router: Router,
    private toast: NgToastService,
    public validationService: ValidationService,
  ) { }
  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(Pattern.phoneNumber)]],
      email: ['', [Validators.required, Validators.pattern(Pattern.email)]],
      password: ['', [Validators.required, Validators.pattern(Pattern.password)]],
      confirmPassword: ['', [Validators.required], [passwordMatchValidator()]],
    });
  }

  hidePassword: boolean = true;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  get formData() {
    return this.registrationForm.controls;
  }

  restrictInput(event: KeyboardEvent): void {
    const pattern = /[0-9]/;
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];

    if (!pattern.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }


  registration() {
    this.submitted = true;
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.valid) {
      this.service.registrationService(this.registrationForm.value)
        .subscribe({
          next: (res => {
            // alert(res.message)
            if (res.success) {
              this.router.navigate(['']);
              this.toast.success({ detail: res.message, duration: 5000 });
              this.registrationForm.reset();
            }
            else {
              this.toast.error({ detail: res.message, duration: 5000 })
            }
          }),
          error: (res => {
            this.toast.error({ detail: res.message, duration: 5000 })
          })
        })
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

