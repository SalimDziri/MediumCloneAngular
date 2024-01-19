import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { mergeMap, retry, catchError, tap } from 'rxjs/operators';

@Injectable()
export class TimeoutRetryInterceptor implements HttpInterceptor {
  private readonly MAX_RETRIES = 5; // Maximum number of retries
  private readonly RETRY_DELAY = 1000; // Delay between retries in milliseconds

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(this.MAX_RETRIES),
        tap(() => console.log('retrying...')),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 408) {
            return timer(this.RETRY_DELAY).pipe(
              mergeMap(() => this.intercept(request, next))
            );
          }
          return throwError(() => error);
        })
      );
  }
}