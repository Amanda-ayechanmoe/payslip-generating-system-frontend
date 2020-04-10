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
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import html2canvas from 'html2canvas';

@Component({
  selector: "app-payslipdetail",
  templateUrl: "./payslipdetail.component.html",
  styleUrls: ["./payslipdetail.component.scss"]
})
export class PayslipdetailComponent implements OnInit {
  payslipDetailForm: FormGroup;
  userId: number;
  payslipId: number;
  responsePayslip: Payslip;
  responseUser: User;
  faDownload = faDownload;
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
      .toPromise().then((responese: Payslip) => {
        this.responsePayslip = responese;
        console.log(responese);
        this.responsePayslip.displayissueDate = this.datepipe.transform(
          this.responsePayslip.issueDate,
          "yyyy/MM/dd"
        );
        this.userId = this.userSharedService.SharedUser.userId;
        this.userService
          .getUserbyId(this.userId)
          .toPromise().then((response: User) => {
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

    //doc.addHTML(content.innerHTML, 15, 15, {
    //  width: 400,
    //  elementHandlers: specialElementHandlers
    //});
    //doc.save(`PAYSLIP_${this.payslipId}.pdf`);
    const options = {
      background: 'white',
      scale: 3
    };

    html2canvas(content, options).then((canvas) => {

      var img = canvas.toDataURL("image/PNG");
      var doc = new jsPDF('l', 'mm', 'a4', 1);

      // Add image Canvas to PDF
      const bufferX = 5;
      const bufferY = 5;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

      return doc;
    }).then((doc) => {
      doc.save(`PAYSLIP_${this.userId}_${this.payslipId}.pdf`);  
    });
  }
}
