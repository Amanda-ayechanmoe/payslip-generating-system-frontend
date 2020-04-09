import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewChildren
} from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { UserService } from "src/app/service/user.service";
import { UserSharedService } from "src/app/service/sharedservice";
import { ActivatedRoute } from "@angular/router";
import { User } from "src/app/model/user.model";
import { Payslip } from "src/app/model/payslip.model";
import { DatePipe } from "@angular/common";
import * as jsPDF from "jspdf";

@Component({
  selector: "app-payslipdetail",
  templateUrl: "./payslipdetail.component.html",
  styleUrls: ["./payslipdetail.component.css"]
})
export class PayslipdetailComponent implements OnInit {
  payslipDetailForm: FormGroup;
  userId: number;
  payslipId: number;
  responsePayslip: Payslip;
  responseUser: User;
  constructor(
    private userService: UserService,
    private userSharedService: UserSharedService,
    private route: ActivatedRoute,
    public datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.payslipDetailForm = new FormGroup({
      name: new FormControl(null),
      address: new FormControl(null),
      dateOfBirth: new FormControl(null),
      department: new FormControl(null),
      jobTitle: new FormControl(null),
      bankAccount: new FormControl(null),
      startDate: new FormControl(null),
      username: new FormControl(null),
      password: new FormControl(null),
      issueDate: new FormControl(null),
      basicPay: new FormControl(null),
      overTime: new FormControl(null),
      bonus: new FormControl(null),
      grossPay: new FormControl(null),
      tax: new FormControl(null),
      cpf: new FormControl(null),
      netPay: new FormControl(null)
    });
    this.payslipId = this.route.snapshot.params["payslipId"];
    console.log(this.payslipId);
    this.userService
      .getPayslipById(this.payslipId)
      .subscribe((responese: Payslip) => {
        this.responsePayslip = responese;
        console.log(responese);
        this.responsePayslip.displayissueDate = this.datepipe.transform(
          this.responsePayslip.issueDate,
          "yyyy/MM/dd"
        );
        this.userId = this.userSharedService.SharedUser.userId;
        this.userService
          .getUserbyId(this.userId)
          .subscribe((response: User) => {
            this.responseUser = response;
            this.responseUser.displayDoB = this.datepipe.transform(
              this.responseUser.dateOfBirth,
              "yyyy/MM/dd"
            );
            this.responseUser.displayStartDate = this.datepipe.transform(
              this.responseUser.startDate,
              "yyyy/MM/dd"
            );
            this.payslipDetailForm.patchValue({
              issueDate: this.responsePayslip.displayissueDate,
              basicPay: this.responsePayslip.basicPay,
              overTime: this.responsePayslip.overTime,
              bonus: this.responsePayslip.bonus,
              grossPay: this.responsePayslip.grossPay,
              tax: this.responsePayslip.tax,
              cpf: this.responsePayslip.cpf,
              netPay: this.responsePayslip.netPay,
              name: this.responseUser.name,
              address: this.responseUser.address,
              dateOfBirth: this.responseUser.displayDoB,
              department: this.responseUser.department,
              jobTitle: this.responseUser.jobTitle,
              bankAccount: this.responseUser.bankAccount,
              startDate: this.responseUser.displayStartDate
            });
          });
      });
  }
  @ViewChild("content",{static:false})content: ElementRef;

  onDownload() {
    console.log("in download function");
    const doc = new jsPDF();
    let specialElementHandlers = {
      "#editor": function(element, renderer) {
        return true;
      }
    };
    let content = this.content.nativeElement;

    doc.fromHTML(content.innerHTML, 15, 15, {
      width: 190,
      elementHandlers: specialElementHandlers
    });
    doc.save("test.pdf");
  }
}
