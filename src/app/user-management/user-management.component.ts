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
  private _currentUser: User;
  private UserList: User[];

  constructor(private app:AppComponent, private router: Router, private userApi: UserService) {
    this._currentUser = new User(null);
  }

  ngOnInit(): void { 
    this.app.ngOnInit();
    this._currentUser = this.app._currentUser;

    if(!this._currentUser.group.rightGroupPage.access_UserManagement) {
      console.log("Vous n'avez pas la permission d'accedez à cette page");
      this.router.navigate(['/Accueil']);
      this.ngOnInit();
    }
    this.getUserList();
  }

  private getUserList(): void {
    this.UserList = this.userApi.getUserList();
  }
}
