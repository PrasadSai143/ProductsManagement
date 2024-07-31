import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const auth_token = JSON.parse(this.authService.getToken());
    if (auth_token) {
      const clone_request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${JSON.parse(auth_token)}`
        },
      });
      return next.handle(clone_request);
    }
    return next.handle(request);
  }
}
