import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesService } from '../services/services.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private service: ServicesService,private router: Router,private toast: NgToastService) {

  }

  canActivate(): boolean {
    if (this.service.isLoggedIn()) {
      return true;
    }

    else {
      this.toast.error({ detail: "ERROR", summary: "Please Login First!", duration: 5000 })
      this.router.navigate([''])
      return false;
    }
  }
}


