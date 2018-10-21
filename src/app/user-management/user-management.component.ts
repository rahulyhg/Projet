import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AppComponent } from '../app.component';
import { User } from '../User/User';
import { UserService } from '../User/user.service';

@Component({
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit {
  public _currentUser: User;
  private UserList: User[];

  constructor(private app:AppComponent, private router: Router, private userApi: UserService) {
    this._currentUser = new User(null);
    this.UserList = null;
  }

  ngOnInit(): void { 
    this.app.ngOnInit();
    this._currentUser = this.app._currentUser;

    if(!this._currentUser.group.rightGroupPage.UserManagement_Access) {
      console.log("Vous n'avez pas la permission d'accedez à cette page");
      this.router.navigate(['/Accueil']);
    }
    this.getUserList();
  }

  private getUserList(): void {
    this.UserList = this.userApi.getUserList();
    var i: number = 0;
    for(var user of this.UserList) {
      var pass: string = "";
      var j: number = 0;
      while(j < user.password.length) {
        pass += "*";
        j++;
      }
      this.UserList[i].password = pass;
      i++
    }
  }
}
