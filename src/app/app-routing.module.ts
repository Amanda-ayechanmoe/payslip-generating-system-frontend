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
import { AdminAuthGuard, UserAuthGuard } from './auth.guard';

const routes: Routes = [
  { path: "", component: HomeComponent },

  //**Employee Routes**//
  { path: "userLogin", component: UserloginComponent},
  { path: "payslipList/:userId", component: PayslipListComponent, canActivate: [UserAuthGuard] },
  { path: "payslipDetail/:payslipId", component: PayslipdetailComponent, canActivate: [UserAuthGuard] },

  //**Admin Routes**//
  { path: "adminLogin", component: AdminloginComponent },
  { path: "userList", component: UserlistComponent, canActivate: [AdminAuthGuard] },
  { path: "createPayslip/:userId", component: CreatePayslipComponent, canActivate: [AdminAuthGuard] },
  { path: "createUser", component: CreateUserComponent, canActivate: [AdminAuthGuard] },
  { path: "editUser/:userId", component: EditUserComponent, canActivate: [AdminAuthGuard] },
  { path: "deleteUser/:userId", component: DeleteUserComponent, canActivate: [AdminAuthGuard] },
  { path: "**", redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
