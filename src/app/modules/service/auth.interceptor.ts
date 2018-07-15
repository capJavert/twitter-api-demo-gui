import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {UserInstance} from "../user/user.instance";

export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpEventType.Response>> {
    if (UserInstance.isAuth) {
      const authReq = req.clone({
        setHeaders: UserInstance.session.headers
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }

}
