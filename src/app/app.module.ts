import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { UserlistComponent } from "./userlist/userlist.component";
import { CreateUserComponent } from "./userlist/create-user/create-user.component";
import { UserService } from "./service/user.service";
import { CreatePayslipComponent } from "./userlist/create-payslip/create-payslip.component";
import { EditUserComponent } from "./userlist/edit-user/edit-user.component";
import { DeleteUserComponent } from "./userlist/delete-user/delete-user.component";
import { UserloginComponent } from "./userlogin/userlogin.component";
import { PayslipListComponent } from "./payslip-list/payslip-list.component";
import { HomeComponent } from "./home/home.component";
import { AdminloginComponent } from "./adminlogin/adminlogin.component";
import { AdminLoginService } from "./service/adminLogin.service";
import { PayslipdetailComponent } from "./payslip-list/payslipdetail/payslipdetail.component";
import { UserSharedService } from "./service/sharedservice";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgBootstrapModule } from './ngbootstrap.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserlistComponent,
    CreateUserComponent,
    CreatePayslipComponent,
    EditUserComponent,
    DeleteUserComponent,
    UserloginComponent,
    PayslipListComponent,
    HomeComponent,
    AdminloginComponent,
    PayslipdetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,

    //*NgBootstrap*//
    NgBootstrapModule,
    InlineSVGModule.forRoot({ baseUrl: '/assets/' })
  ],
  providers: [UserService, DatePipe, AdminLoginService, UserSharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
