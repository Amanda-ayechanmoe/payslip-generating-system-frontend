import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "src/app/model/user.model";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { DateMustNotGreaterThanToday } from 'src/app/validators/date.validator';
import { Location } from '@angular/common';



@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.css"]
})
export class CreateUserComponent implements OnInit {
  userRegisterForm: FormGroup;
  user = new User();
  loading: boolean = false;
  faCalendar = faCalendar;

  @ViewChild('content', { static: true }) content;


  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location) { }

  ngOnInit() {
    this.userRegisterForm = new FormGroup({
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('',Validators.required),
      department: new FormControl('', Validators.required),
      jobTitle: new FormControl('', Validators.required),
      bankAccount: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  async onSubmit() {
    try {
      this.userRegisterForm.markAllAsTouched();
      if (!this.userRegisterForm.valid) {
        return;
      }
      this.loading = true;
      this.user.name = this.userRegisterForm.get("name").value;
      this.user.address = this.userRegisterForm.get("address").value;
      this.user.dateOfBirth = this.userRegisterForm.get("dateOfBirth").value;
      this.user.department = this.userRegisterForm.get("department").value;
      this.user.jobTitle = this.userRegisterForm.get("jobTitle").value;
      this.user.bankAccount = this.userRegisterForm.get("bankAccount").value;
      this.user.startDate = this.userRegisterForm.get("startDate").value;
      this.user.username = this.userRegisterForm.get("username").value;
      this.user.password = this.userRegisterForm.get("password").value;

      const response = await this.userService.createUser(this.user).toPromise();
      if (!response) {
        return;
      }
      this.router.navigateByUrl('/userList');
    } catch (ex) {
      console.error(ex.message);
    } finally {
      this.loading = false;
    }
  }

  back() {
    this.location.back();
  }
}
