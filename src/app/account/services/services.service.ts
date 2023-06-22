
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {
  private baseUrl: string = 'https://localhost:7077/api/Account/';

  constructor(private http: HttpClient,private router: Router) { }

  loginService(loginModel: any) {

    return this.http.post<any>(`${this.baseUrl}login`, loginModel);
  }

  registrationService(registrationModel: any) {
    return this.http.post<any>(`${this.baseUrl}registration`, registrationModel);
  }

  lostPasswordService(lostPasswordModel: any) {
    return this.http.post<any>(`${this.baseUrl}lostPassword`, lostPasswordModel);
  }

  resetPasswordService(resetPasswordModel: any) {
    return this.http.post<any>(`${this.baseUrl}resetPassword`, resetPasswordModel);
  }
  

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  isLoggedIn(): boolean {
    return !! localStorage.getItem('token')
  }

  logoutService(){
    localStorage.clear();
    this.router.navigate([''])

  }
}
