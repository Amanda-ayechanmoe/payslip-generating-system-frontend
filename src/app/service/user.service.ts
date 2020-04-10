import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { User } from "../model/user.model";
import { map, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Payslip } from "../model/payslip.model";
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class UserService {
  private BASE_URL = environment.baseUrl;
  public isAuthorized$ = new BehaviorSubject(false);
  userId: number;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  getAllUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.BASE_URL}/api/userList`).pipe(
      map(data => {
        return data;
      })
    );
  }
  createUser(user: User) {
    return this.httpClient.post(`${this.BASE_URL}/api/userRegister`, user).pipe(
      map((response: User) => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
  createPayslip(payslip: Payslip) {
    return this.httpClient.post(`${this.BASE_URL}/api/Payslip`, payslip).pipe(
      map((response: Payslip) => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
  getUserbyId(userId: number) {
    return this.httpClient
      .get<User>(`${this.BASE_URL}/api/Payslip/${userId}`)
      .pipe(
        map((response: User) => {
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
  editUser(user: User) {
    return this.httpClient
      .put<User>(`${this.BASE_URL}/api/userUpdate/${user.userId}`, user)
      .pipe(
        map((response: User) => {
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
  deleteUser(userId: number) {
    return this.httpClient
      .delete(`${this.BASE_URL}/api/userDelete/${userId}`)
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
  loginUser(user: User) {
    return this.httpClient
      .post<User[]>(`${this.BASE_URL}/api/userLogin/`, user)
      .pipe(
        map((response: User[]) => {
          if (response && response.length && response[0]) {
            this.isAuthorized$.next(true);
            return response[0].userId;
          }
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
  getPayslipByUserId(userId: number): Observable<Payslip[]> {
    return this.httpClient
      .get<Payslip[]>(`${this.BASE_URL}/api/userHome/${userId}`)
      .pipe(
        map((response: Payslip[]) => {
          return response;
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
  getPayslipById(payslipId: number) {
    return this.httpClient
      .get<Payslip>(`${this.BASE_URL}/api/getPayslip/${payslipId}`)
      .pipe(
        map((response: Payslip) => {
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
