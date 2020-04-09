import { Injectable } from "@angular/core";
import { User } from "../model/user.model";

@Injectable()
export class UserSharedService {
  SharedUser = new User();
}
