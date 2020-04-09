import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { UserService } from "src/app/service/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "src/app/model/user.model";

@Component({
  selector: "app-delete-user",
  templateUrl: "./delete-user.component.html",
  styleUrls: ["./delete-user.component.css"]
})
export class DeleteUserComponent implements OnInit {
  userDeleteForm: FormGroup;
  userId: number;
  responseUser: User;
  displayDOB: string;
  displaySD: string;

  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userDeleteForm = new FormGroup({
      name: new FormControl({ value: "null", disabled: true }),
      address: new FormControl({ value: "null", disabled: true }),
      dateOfBirth: new FormControl({ value: "null", disabled: true }),
      department: new FormControl({ value: "null", disabled: true }),
      jobTitle: new FormControl({ value: "null", disabled: true }),
      bankAccount: new FormControl({ value: "null", disabled: true }),
      startDate: new FormControl({ value: "null", disabled: true }),
      username: new FormControl({ value: "null", disabled: true }),
      password: new FormControl({ value: "null", disabled: true })
    });
    this.userId = this.route.snapshot.params["userId"];
    this.userService.getUserbyId(this.userId).subscribe((response: User) => {
      this.responseUser = response;
      this.displayDOB = this.responseUser.dateOfBirth
        .toString()
        .substring(0, 10);
      this.displaySD = this.responseUser.startDate.toString().substring(0, 10);
      console.log(this.responseUser);

      this.userDeleteForm.patchValue({
        name: this.responseUser.name,
        address: this.responseUser.address,
        dateOfBirth: this.displayDOB,
        department: this.responseUser.department,
        jobTitle: this.responseUser.jobTitle,
        bankAccount: this.responseUser.bankAccount,
        startDate: this.displaySD,
        username: this.responseUser.username,
        password: this.responseUser.password
      });
    });
  }

  onSubmit() {
    this.userService.deleteUser(this.userId).subscribe((response: any) => {
      this.router.navigate(["/userList"]);
      console.log(response);
    });
  }
}
