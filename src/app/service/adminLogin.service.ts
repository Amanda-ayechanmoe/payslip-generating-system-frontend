import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Admin } from "../model/admin.model";
import { map, catchError } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class AdminLoginService {
  private BASE_URL = environment.baseUrl;
  public isAuthorized$ = new BehaviorSubject(true);

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  loginAdmin(admin: Admin) {
    return this.httpClient.post(`${this.BASE_URL}/api/adminLogin`, admin).pipe(
      map((response: boolean) => {
        if (response === true) {
          this.isAuthorized$.next(true);
        }
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  logout() {
    this.isAuthorized$.next(false);
    this.router.navigateByUrl('/');
  }
}
