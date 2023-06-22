import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/components/login/login.component';
import { LostPasswordComponent } from './account/components/lost-password/lost-password.component';
import { RegistrationComponent } from './account/components/registration/registration.component';
import { HomeComponent } from './mission/components/home/home.component';
import { AuthGuard } from './account/guards/auth.guard';
import { ResetPasswordComponent } from './account/components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path : '',
    component : LoginComponent
  },

  {
    path : 'lost-password',
    component : LostPasswordComponent
  },

  {
    path : 'registration',
    component : RegistrationComponent
  },

  {
    path : 'home',
    component : HomeComponent,
    canActivate : [AuthGuard]
  },

  {
    path : 'reset-password',
    component : ResetPasswordComponent
  },

  {
    path : 'reset-password/:token',
    component : ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
