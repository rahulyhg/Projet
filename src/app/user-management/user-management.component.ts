import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { User } from '../Class/User';
import { UserService } from '../user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  constructor(public app: AppComponent, public userApi: UserService, private router: Router) { }

  _currentUser: User;
  UserList: User[];

  ngOnInit() {
    this.app.ngOnInit();
    this._currentUser = this.app._currentUser;
    this.userApi.getUserList(this._currentUser.login, this._currentUser.password).subscribe((data) => {this.create(data)});

    if(this._currentUser.group.rightGroupPage.access_UserManagement !== "1") {
      this.router.navigate(['/Accueil']);
    }
  }

  create(att) {
    if(att !== null) {
      if(att.api) {
        if(att.auth) {
          if(att.data !== null) {
            this.UserList = att.data;
          } else {
            console.log("Error : No Data");
          }
        } else {
          console.log("Error: You can not access the API if you are not authenticated! ");
        }
      } else {
        console.log("Error : Could not join API");
      }
    }
  }

}
