import { HttpInterceptorFn } from '@angular/common/http';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const newReq = req.clone({
    setHeaders:{
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
    return next(newReq);
};
