import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../service/user.service";
import { Payslip } from "../model/payslip.model";
import { User } from "../model/user.model";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-userlogin",
  templateUrl: "./userlogin.component.html",
  styleUrls: ["./userlogin.component.scss"]
})
export class UserloginComponent implements OnInit, OnDestroy {
  userLoginForm: FormGroup;
  user = new User();
  loading: boolean = false;
  invalidLogin: boolean = false;
  subscription = new Subscription();
  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userLoginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    });

    this.subscription.add(this.userLoginForm.valueChanges.subscribe(() => {
      this.invalidLogin = false;
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async onSubmit() {
    try {
      this.loading = true;
      this.user.username = this.userLoginForm.get("username").value;
      this.user.password = this.userLoginForm.get("password").value;

      const response = await this.userService.loginUser(this.user).toPromise();
      if (!response) {
        this.invalidLogin = true;
        return;
      }

      this.router.navigate(["/payslipList", response]);
    } catch (ex) {
      console.error(ex.message);
    } finally {
      this.loading = false;
    }
  }
}
