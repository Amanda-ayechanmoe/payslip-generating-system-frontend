import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { UserService } from "src/app/service/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "src/app/model/user.model";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.css"]
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  userId: number;
  user = new User();
  responseUser: User;
  responseEditUser: User;
  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.editUserForm = new FormGroup({
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
    this.userId = this.route.snapshot.params["userId"];
    console.log(this.userId);
    this.userService.getUserbyId(this.userId).subscribe((response: User) => {
      this.responseUser = response;
      console.log(this.responseUser);
      this.editUserForm.patchValue({
        name: this.responseUser.name,
        address: this.responseUser.address,
        dateOfBirth: this.responseUser.dateOfBirth,
        department: this.responseUser.department,
        jobTitle: this.responseUser.jobTitle,
        bankAccount: this.responseUser.bankAccount,
        startDate: this.responseUser.startDate,
        username: this.responseUser.username,
        password: this.responseUser.password
      });
    });
  }
  onSubmit() {
    this.user.userId = this.userId;
    this.user.name = this.editUserForm.get("name").value;
    this.user.address = this.editUserForm.get("address").value;
    this.user.dateOfBirth = this.editUserForm.get("dateOfBirth").value;
    this.user.department = this.editUserForm.get("department").value;
    this.user.jobTitle = this.editUserForm.get("jobTitle").value;
    this.user.bankAccount = this.editUserForm.get("bankAccount").value;
    this.user.startDate = this.editUserForm.get("startDate").value;
    this.user.username = this.editUserForm.get("username").value;
    this.user.password = this.editUserForm.get("password").value;
    this.userService.editUser(this.user).subscribe((response: User) => {
      this.responseEditUser = response;
      this.router.navigate(["/userList"]);
      console.log(this.responseEditUser);
    });
  }
}
