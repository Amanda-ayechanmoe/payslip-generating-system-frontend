import { Component, OnInit } from "@angular/core";
import { User } from "../model/user.model";
import { UserService } from "../service/user.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-userlist",
  templateUrl: "./userlist.component.html",
  styleUrls: ["./userlist.component.css"],
  providers: [UserService]
})
export class UserlistComponent implements OnInit {
  UserList: User[];
  startDate: String;

  constructor(public userService: UserService, public datepipe: DatePipe) {}

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
}
