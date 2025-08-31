// import { inject, Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { HttpStatusService } from './http-status.service';
// import { ErrorComponent } from '../../../components/dialog/error/error.component';

import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { catchError, Observable, throwError } from "rxjs";
import { HttpStatusService } from "./http-status.service";
import { ErrorComponent } from "../../../components/dialog/error/error.component";

// @Injectable({ providedIn: 'root' })
// export class HttpErrorInterceptor implements HttpInterceptor {
//     //Service injection
//     dialog = inject(MatDialog);
//     httpStatus = inject(HttpStatusService);
//     router = inject(Router);
//   constructor(
//   ) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(req).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status >= 400) {
//           const message = this.httpStatus.getMessage(error.status);
//           this.dialog.open(ErrorComponent, {
//             data: { status: error.status, message }
//           });
//         }

//         return throwError(() => error);
//       })
//     );
//   }
// }


/**
 * Intercept
 *
 * @param req
 * @param next
 */
export const errorInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

    // Clone the request object
    let newReq = req.clone();

    let dialog = inject(MatDialog);
    let httpStatus = inject(HttpStatusService);

    // Response
    return next(newReq).pipe(
        catchError((error) => {
            if (error instanceof HttpErrorResponse && (error.status >= 400 || error.status == 0)) {
                const message = httpStatus.getMessage(error.status);
                dialog.open(ErrorComponent, {
                    data: { status: error.status, message }
                });

                return throwError(() => error);
            }

            return throwError(() => error);
        })
    );
};
