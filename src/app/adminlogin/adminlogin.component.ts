import { Component, OnInit, OnDestroy } from "@angular/core";
import { AdminLoginService } from "../service/adminLogin.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Admin } from "../model/admin.model";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-adminlogin",
  templateUrl: "./adminlogin.component.html",
  styleUrls: ["./adminlogin.component.scss"]
})
export class AdminloginComponent implements OnInit, OnDestroy {
  adminLoginForm: FormGroup;
  admin = new Admin();
  loading: boolean = false;
  invalidLogin: boolean = false;

  subscription = new Subscription();
  constructor(public adminService: AdminLoginService, private router: Router) { }

  ngOnInit() {
    this.adminLoginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.subscription.add(this.adminLoginForm.valueChanges.subscribe(() => {
      this.invalidLogin = false;
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async onSubmit() {
    try {
      this.loading = true;
      this.adminLoginForm.markAllAsTouched();
      if (!this.adminLoginForm.valid) {
        return;
      }
      this.admin.username = this.adminLoginForm.get("username").value;
      this.admin.password = this.adminLoginForm.get("password").value;
      const response = await this.adminService.loginAdmin(this.admin).toPromise();
      if (!response) {
        this.invalidLogin = true;
        return;
      }
      this.router.navigate(["/userList"]);
    } catch (ex) {
      console.error(ex.message);
    } finally {
      this.loading = false;
    }
  }
}
