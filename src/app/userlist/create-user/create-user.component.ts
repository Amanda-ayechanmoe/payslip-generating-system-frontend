import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { User } from "src/app/model/user.model";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.css"]
})
export class CreateUserComponent implements OnInit {
  userRegisterForm: FormGroup;
  user = new User();
  responseUser: User;
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userRegisterForm = new FormGroup({
      name: new FormControl(null),
      address: new FormControl(null),
      dateOfBirth: new FormControl(null),
      department: new FormControl(null),
      jobTitle: new FormControl(null),
      bankAccount: new FormControl(null),
      startDate: new FormControl(null),
      username: new FormControl(null),
      password: new FormControl(null)
    });
  }

  onSubmit() {
    this.user.name = this.userRegisterForm.get("name").value;
    this.user.address = this.userRegisterForm.get("address").value;
    this.user.dateOfBirth = this.userRegisterForm.get("dateOfBirth").value;
    this.user.department = this.userRegisterForm.get("department").value;
    this.user.jobTitle = this.userRegisterForm.get("jobTitle").value;
    this.user.bankAccount = this.userRegisterForm.get("bankAccount").value;
    this.user.startDate = this.userRegisterForm.get("startDate").value;
    this.user.username = this.userRegisterForm.get("username").value;
    this.user.password = this.userRegisterForm.get("password").value;
    console.log(this.user);
    this.userService.createUser(this.user).subscribe((response: User) => {
      this.responseUser = response;
      this.router.navigate(["/userList"]);
      console.log(this.responseUser);
    });
  }
}
