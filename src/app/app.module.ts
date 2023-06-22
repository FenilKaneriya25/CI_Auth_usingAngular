import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './account/components/login/login.component';
import { RegistrationComponent } from './account/components/registration/registration.component';
import { LostPasswordComponent } from './account/components/lost-password/lost-password.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { BannerComponent } from './account/components/banner/banner.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';
import { NgToastModule } from 'ng-angular-popup';
import {NgIf} from '@angular/common';
import { HomeComponent } from './mission/components/home/home.component'
import { TokenInterceptor } from './account/interceptors/token.interceptor';
import { ResetPasswordComponent } from './account/components/reset-password/reset-password.component';
import { MatIconModule } from '@angular/material/icon';
import { ValidationComponent } from './account/components/validation/validation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    LostPasswordComponent,
    BannerComponent,
    HomeComponent,
    ResetPasswordComponent,
    ValidationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatGridListModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    ToastrModule.forRoot(),
    NgToastModule,
    NgIf,
    MatIconModule
  
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
