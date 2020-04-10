import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  faUsers = faUsers;
  faUser = faUser;

  constructor(private router: Router) {}

  ngOnInit() {}

  routeToAdmin() {
    this.router.navigate(["/adminLogin"]);
  }

  routeToClient() {
    this.router.navigate(["/userLogin"]);
  }
}
