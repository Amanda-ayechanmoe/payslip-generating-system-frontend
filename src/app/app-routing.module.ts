import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CreateUserComponent } from "./userlist/create-user/create-user.component";
import { UserlistComponent } from "./userlist/userlist.component";
import { CreatePayslipComponent } from "./userlist/create-payslip/create-payslip.component";
import { EditUserComponent } from "./userlist/edit-user/edit-user.component";
import { DeleteUserComponent } from "./userlist/delete-user/delete-user.component";
import { UserloginComponent } from "./userlogin/userlogin.component";
import { PayslipListComponent } from "./payslip-list/payslip-list.component";
import { AdminloginComponent } from "./adminlogin/adminlogin.component";
import { HomeComponent } from "./home/home.component";
import { PayslipdetailComponent } from "./payslip-list/payslipdetail/payslipdetail.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "adminLogin", component: AdminloginComponent },
  { path: "userLogin", component: UserloginComponent },
  { path: "payslipList/:userId", component: PayslipListComponent },
  {
    path: "payslipDetail/:payslipId",
    component: PayslipdetailComponent
  },
  { path: "userList", component: UserlistComponent },
  { path: "createUser", component: CreateUserComponent },
  { path: "editUser/:userId", component: EditUserComponent },
  { path: "deleteUser/:userId", component: DeleteUserComponent },
  { path: "createPayslip/:userId", component: CreatePayslipComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
