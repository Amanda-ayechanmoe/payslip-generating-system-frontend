import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Payslip } from "src/app/model/payslip.model";
import { UserService } from "src/app/service/user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: "app-create-payslip",
  templateUrl: "./create-payslip.component.html",
  styleUrls: ["./create-payslip.component.css"]
})
export class CreatePayslipComponent implements OnInit {
  paySlipForm: FormGroup;
  payslip = new Payslip();
  resoponsePayslip: Payslip;
  userId: number;

  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.paySlipForm = new FormGroup({
      issueDate: new FormControl(null),
      basicPay: new FormControl(null),
      overTime: new FormControl(null),
      bonus: new FormControl(null),
      grossPay: new FormControl(null),
      tax: new FormControl(null),
      cpf: new FormControl(null),
      netPay: new FormControl(null)
    });
    this.userId = this.route.snapshot.params["userId"];
  }

  calculateGrossPay() {
    var bp = this.paySlipForm.get("basicPay").value;
    var OT = this.paySlipForm.get("overTime").value;
    var bonus = this.paySlipForm.get("bonus").value;
    this.paySlipForm.patchValue({
      grossPay: bp + OT + bonus
    });
  }

  calculateNetPay() {
    var grossPay = this.paySlipForm.get("grossPay").value;
    var tax = this.paySlipForm.get("tax").value;
    var cpf = this.paySlipForm.get("cpf").value;
    this.paySlipForm.patchValue({
      netPay: grossPay - (tax + cpf)
    });
  }

  onSubmit() {
    this.payslip.userId = this.userId;
    this.payslip.issueDate = this.paySlipForm.get("issueDate").value;
    this.payslip.basicPay = this.paySlipForm.get("basicPay").value;
    this.payslip.overTime = this.paySlipForm.get("overTime").value;
    this.payslip.bonus = this.paySlipForm.get("bonus").value;
    this.payslip.grossPay = this.paySlipForm.get("grossPay").value;
    this.payslip.tax = this.paySlipForm.get("tax").value;
    this.payslip.cpf = this.paySlipForm.get("cpf").value;
    this.payslip.netPay = this.paySlipForm.get("netPay").value;
    //console.log(this.payslip);
    this.userService
      .createPayslip(this.payslip)
      .subscribe((response: Payslip) => {
        this.resoponsePayslip = response;
        this.router.navigate(["/userList"]);
        console.log(this.resoponsePayslip);
      });
  }

  back() {
    this.location.back();
  }
}
