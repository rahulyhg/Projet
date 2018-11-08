import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

import { AppComponent } from '../app.component';

import { Api } from '../Class/Api';
import { User } from '../Class/User';

import { UserService } from '../Services/user.service';

@Component({
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit {
  private Reponse_getUserById: Observable<Api>;
  private Reponse_getUserList: Observable<Api>;

  displayedColumns: string[] = ['id', 'login', 'inscription', 'connection', 'group'];

  public _currentUser: User;
  private UserList: User[];

  constructor(private app:AppComponent, private router: Router, private userApi: UserService) {
    this.Reponse_getUserById = null;
    this.Reponse_getUserList = null;

    this._currentUser = new User(null);
    this.UserList = null;
  }

  ngOnInit(): void { 
    this.app.ngOnInit();
    this.Reponse_getUserById = this.app.Reponse_getUserById;

    if(this.Reponse_getUserById === null) {
      this._currentUser = new User(null);

      if(!this._currentUser.group.rightGroupPage.UserManagement_Access) {
        console.log("Vous n'avez pas la permission d'accedez à cette page");
        this.router.navigate(['/Accueil']);
      }
    } else {
      this.Reponse_getUserById.subscribe((data: Api) => {
        this._currentUser = data.data

        if(!data.data.group.rightGroupPage.UserManagement_Access) {
          console.log("Vous n'avez pas la permission d'accedez à cette page");
          this.router.navigate(['/Accueil']);
        }
      })
    }
    this.getUserList();
  }

  private getUserList(): void {
    this.Reponse_getUserList = this.userApi.getUserList();
    this.Reponse_getUserList.subscribe((data: Api) => {
      this.UserList = data.data

      for(var user of this.UserList) {
        if(user.group.rightGroupPage.name.split('_')[1] === "user")
          user.group.name = "Groupe personnel de droit de " + user.login;
      }
    })
  }
}
