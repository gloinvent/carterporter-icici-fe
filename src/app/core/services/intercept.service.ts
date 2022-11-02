import { throwError as observableThrowError, Observable, BehaviorSubject } from 'rxjs';
import { take, filter, catchError, switchMap, finalize } from 'rxjs/operators';
import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { CrudService } from './crud.service';
import { MatSnackBar } from '@angular/material';
import { Router } from "@angular/router";
import { apis } from '../../config/apis';


@Injectable({
  providedIn: 'root'
})

export class InterceptService implements HttpInterceptor {
  count: number;
  accesToken: any;

  constructor(private _crudService: CrudService, private _snackbar: MatSnackBar, private _router: Router) {
    this.count = 0;
  }

//   private refreshapicall = (req: HttpRequest<any>, token: string) => {
 
//     if (token != "undefined") {
//     return req.clone({
//       headers: new HttpHeaders({
//         "Content-Type": "application/json",
// 		     access_token: token,
//       })
//     }); 
//   }
//   return req;
// }
  // intercept request and add token
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        console.log("error in interceptor", err);
        if (err instanceof HttpErrorResponse) {
          // if (err.error.error == "invalid_token" || err.status == 401 || err.status == 0) {
          //   let obj = JSON.parse(localStorage.getItem('accessTokenObj'));
          //   this._crudService.postJson(apis.GET_LOGIN_TOKEN, obj).subscribe(
          //     response => {
          //       this.accesToken = response;
          //       if (this.accesToken) {
          //         const key = 'accessToken';
          //         localStorage.setItem(key, this.accesToken.access_token);
          //       }
          //       // return next.handle(this.refreshapicall(req, this.accesToken))
          //     });
          // } else if (err.status == 0) {
          //   this._snackbar.open('Please Check Internet Connection Thank You !', 'X', {
          //     duration: 5000, verticalPosition: 'top'
          //   });
          // }
          return observableThrowError(err);
        }
      })
    );
  };
}