import { Component, OnInit } from "@angular/core";
import { AdminLoginService } from "../service/adminLogin.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { Admin } from "../model/admin.model";

@Component({
  selector: "app-adminlogin",
  templateUrl: "./adminlogin.component.html",
  styleUrls: ["./adminlogin.component.css"]
})
export class AdminloginComponent implements OnInit {
  adminLoginForm: FormGroup;
  admin = new Admin();
  isValidAdmin: boolean;
  vaildCheck: boolean;
  constructor(public adminService: AdminLoginService, private router: Router) {}

  ngOnInit() {
    this.adminLoginForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null)
    });
  }

  onSubmit() {
    this.admin.username = this.adminLoginForm.get("username").value;
    this.admin.password = this.adminLoginForm.get("password").value;
    this.adminService.loginAdmin(this.admin).subscribe((respone: boolean) => {
      this.isValidAdmin = respone;
      console.log(this.isValidAdmin);
      if (this.isValidAdmin == true) {
        this.vaildCheck = true;
        this.router.navigate(["/userList"]);
      } else {
        this.vaildCheck = false;
      }
    });
  }
}
