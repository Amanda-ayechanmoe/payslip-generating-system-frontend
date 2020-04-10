import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminLoginService } from './service/adminLogin.service';
import { UserService } from './service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private adminService: AdminLoginService) { }
  canActivate() {
    if (this.adminService.isAuthorized$.value) {
      return true;
    }
    this.router.navigateByUrl('/adminLogin');
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService) { }
  canActivate() {
    if (this.userService.isAuthorized$.value) {
      return true;
    }
    this.router.navigateByUrl('/userLogin');
    return false;
  }
}


