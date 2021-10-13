import { UserService } from 'src/app/services/user.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { Observable, of } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) { }

  //home dont need a token 
  // request.url.match('/home')


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.headers.get("skip")) {
      return next.handle(request);
    }
    else {
      request = request.clone({
        headers: request.headers.set('Authorization', this.userService.getToken())
      });
      return next.handle(request);
    }
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
}
