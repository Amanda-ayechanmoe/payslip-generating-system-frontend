import { Component, OnInit } from "@angular/core";
import { UserSharedService } from "../service/sharedservice";
import { Router, ActivatedRoute } from "@angular/router";
import { Payslip } from "../model/payslip.model";
import { DatePipe } from "@angular/common";
import { UserService } from "../service/user.service";

@Component({
  selector: "app-payslip-list",
  templateUrl: "./payslip-list.component.html",
  styleUrls: ["./payslip-list.component.css"]
})
export class PayslipListComponent implements OnInit {
  payslipList: Payslip[];
  userId: number;

  constructor(
    private userService: UserService,
    private userSharedService: UserSharedService,
    private router: Router,
    public datepipe: DatePipe,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.params["userId"];

    console.log(this.userId);
    this.userService
      .getPayslipByUserId(this.userId)
      .subscribe((response: Payslip[]) => {
        this.payslipList = response;
        console.log(this.payslipList);
        for (const ps of this.payslipList) {
          ps.displayissueDate = this.datepipe.transform(
            ps.issueDate,
            "yyyy/MM/dd"
          );
        }
      });
    this.userSharedService.SharedUser.userId = this.userId;
    console.log(this.userSharedService.SharedUser);
  }
}
