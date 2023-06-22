import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ServicesService } from '../services/services.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private service: ServicesService, private router: Router, private toast: NgToastService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.service.getToken();

    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: 'Bearer ${myToken}' }
      })
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpResponse) {
          if (err.status === 401) {
            this.toast.warning({ detail: "Warning", summary: "Token is expired, Login again" });
            this.router.navigate([''])
          }
        }
        return throwError(() => new Error("Some error occured"))
      })
    );
  }
}
