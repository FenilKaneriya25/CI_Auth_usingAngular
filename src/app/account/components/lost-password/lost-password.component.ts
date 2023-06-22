import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ValidationService } from '../../services/validation.service';
import { ValidationMessages } from '../../models/validationMessage';
import { Pattern } from '../../models/pattern';

@Component({
  selector: 'app-lost-password',
  templateUrl: './lost-password.component.html',
  styleUrls: ['./lost-password.component.scss']
})
export class LostPasswordComponent implements OnInit {
  lostPasswordForm!: FormGroup;
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
    this.lostPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(Pattern.email)]]
    });
  }

  get formData() {
    return this.lostPasswordForm.controls;
  }

  lostPassword() {
    this.submitted = true;
    this.lostPasswordForm.markAllAsTouched();
    if (this.lostPasswordForm.valid) {
      this.service.lostPasswordService(this.lostPasswordForm.value)
        .subscribe({
          next: (res => {
            // alert(res.message)
            if (res.success) {
              this.router.navigate(['']);
              this.toast.success({  detail: res.message, duration: 5000 });
              console.log(this.lostPasswordForm.value.email);
              this.lostPasswordForm.reset();
            }
            else {
              this.toast.error({ detail: "User not found !", summary: res.message, duration: 5000 })
            }
          }),
          error: (res => {
            this.toast.error({ detail: "User not found !", summary: res.message, duration: 5000 })
          })
        })
    }
  }
}
