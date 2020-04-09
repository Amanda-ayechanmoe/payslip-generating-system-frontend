import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Admin } from "../model/admin.model";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AdminLoginService {
  private BASE_URL = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  loginAdmin(admin: Admin) {
    return this.httpClient.post(`${this.BASE_URL}/api/adminLogin`, admin).pipe(
      map((response: boolean) => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
