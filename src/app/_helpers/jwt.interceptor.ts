import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CurrentUser} from '../_dto/model/CurrentUser';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser: CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.accessToken) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${currentUser.accessToken}`,
          'Content-Type' : 'application/json; charset=utf-8',
          'Accept'       : 'application/json',
          'Access-Control-Allow-Origin': 'http://51.38.239.141:8080',
          'Access-Control-Allow-Headers': '*'
        }
      });
    }

    return next.handle(request);
  }
}
