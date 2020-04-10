import { Component, OnInit } from "@angular/core";
import { User } from "../model/user.model";
import { UserService } from "../service/user.service";
import { DatePipe } from "@angular/common";
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Router } from '@angular/router';

@Component({
  selector: "app-userlist",
  templateUrl: "./userlist.component.html",
  styleUrls: ["./userlist.component.scss"],
  providers: [UserService]
})
export class UserlistComponent implements OnInit {
  UserList: User[];
  startDate: String;
  faPlus = faPlus;

  constructor(
    private userService: UserService,
    public datepipe: DatePipe,
    private router: Router
    ) {}

  ngOnInit() {
    this.userService
      .getAllUser()
      .toPromise()
      .then(
        (response: User[]) => {
          this.UserList = response;
          for (const user of this.UserList) {
            user.displayStartDate = this.datepipe.transform(
              user.startDate,
              "yyyy/MM/dd"
            );
            user.displayDoB = this.datepipe.transform(
              user.dateOfBirth,
              "yyyy/MM/dd"
            );
          }
          console.log(this.UserList);
        },
        error => {
          console.log("something went wrong");
        }
      );
  }

  routeToCreate() {
    this.router.navigateByUrl('/createUser')
  }
}
