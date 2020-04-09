import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../service/user.service";
import { Payslip } from "../model/payslip.model";
import { User } from "../model/user.model";

@Component({
  selector: "app-userlogin",
  templateUrl: "./userlogin.component.html",
  styleUrls: ["./userlogin.component.css"]
})
export class UserloginComponent implements OnInit {
  userLoginForm: FormGroup;
  responseUser: User[];
  user = new User();
  userId: number;
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userLoginForm = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null)
    });
  }

  onSubmit() {
    this.user.username = this.userLoginForm.get("username").value;
    this.user.password = this.userLoginForm.get("password").value;
    //console.log(this.user);
    this.userService.loginUser(this.user).subscribe((response: User[]) => {
      this.responseUser = response;
      for (const u of this.responseUser) {
        this.userId = u.userId;
      }
      this.router.navigate(["/payslipList", this.userId]);
      console.log(this.responseUser);
      console.log(this.userId);
    });
  }
}
