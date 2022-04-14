import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { AuthGuard } from '../../services/auth-guard.services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    // httpOptions = {
    //     headers: new HttpHeaders({
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*",

    //     }).set("Authorization", `Bearer ${this.authGuard.getToken()}`),
    // };

    constructor(
        // private http: HttpClient,
        private authGuard: AuthGuard
    ) { }

    // private formatErrors(error: any) {
    //     return throwError(error.error);
    // }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authGuard.getToken()) {
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authGuard.getToken()}`
                }
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req)
                .pipe(
                    retry(1),
                    catchError((error: HttpErrorResponse) => {
                        let errorMessage = '';
                        if (error.error instanceof ErrorEvent) {
                            // client-side error
                            errorMessage = `Error: ${error.error.message}`;
                        } else {
                            // server-side error
                            errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
                        }
                        console.log(errorMessage);
                        return throwError(errorMessage);
                    })
                );
        }
    }

    // get(path: string): Observable<any> {
    //     return this.http.get(path, this.httpOptions).pipe(catchError(this.formatErrors));
    // }

    // put(path: string, body: Object = {}): Observable<any> {
    //     return this.http.put(path, body, this.httpOptions).pipe(catchError(this.formatErrors));
    // }

    // post(path: string, body: any) {
    //     return this.http.post(path, body, this.httpOptions).pipe(catchError(this.formatErrors));
    // }

    // delete(path: any): Observable<any> {
    //     return this.http.delete(path).pipe(catchError(this.formatErrors));
    // }
}