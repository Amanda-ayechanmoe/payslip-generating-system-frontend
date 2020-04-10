import { Component, Input } from "@angular/core";
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AdminLoginService } from '../service/adminLogin.service';
import { UserService } from '../service/user.service';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
  @Input() mode: string = '';
  @Input() admin: boolean = false;
  faLogout = faPowerOff;

  constructor(
    private adminLoginService: AdminLoginService,
    private userLoginService: UserService,
  ){}

  logout() {
    if (this.admin) {
      this.doAdminLogout();
      return;
    }
    this.doClientLogout();
  }

  doAdminLogout() {
    this.adminLoginService.logout();
  }

  doClientLogout() {
    this.userLoginService.logout();
  }
}
