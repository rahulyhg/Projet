import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

import { AppComponent } from '../app.component';

import { Api } from '../Class/Api';
import { User } from '../Class/User'; 
import { Group } from '../Class/Group';

import { GroupService } from '../Services/group.service';
import { UserService } from '../Services/user.service';

@Component({
  templateUrl: './group-management.component.html'
})
export class GroupManagementComponent implements OnInit {
  private Reponse_getUserById: Observable<Api>;
  private Reponse_getUserList: Observable<Api>;
  private Reponse_getGroupList: Observable<Api>;

  public _currentUser: User;
  private GroupList: Group[];
  private UserList: User[];

  constructor(private app:AppComponent, private router: Router, private groupApi: GroupService, private userApi: UserService) {
    this.Reponse_getUserById = null;
    this.Reponse_getUserList = null;
    this.Reponse_getGroupList = null;

    this._currentUser = new User(null);
    this.GroupList = []
    this.UserList = null;
  }

  ngOnInit(): void { 
    this.app.ngOnInit();
    this.Reponse_getUserById = this.app.Reponse_getUserById;

    if(this.Reponse_getUserById === null) {
      this._currentUser = new User(null);

      if(!this._currentUser.group.rightGroupPage.GroupManagement_Access) {
        console.log("Vous n'avez pas la permission d'accedez à cette page");
        this.router.navigate(['/Accueil']);
      }
    } else {
      this.Reponse_getUserById.subscribe((data: Api) => {
        this._currentUser = data.data

        if(!data.data.group.rightGroupPage.GroupManagement_Access) {
          console.log("Vous n'avez pas la permission d'accedez à cette page");
          this.router.navigate(['/Accueil']);
        }
      })
    }

    this.getGroupList();
  }

  private getGroupList(): void {
    this.Reponse_getUserList = this.userApi.getUserList();
    this.Reponse_getUserList.subscribe((data: Api) => {
      this.UserList = data.data
    })

    this.Reponse_getGroupList = this.groupApi.getGroupList();
    this.Reponse_getGroupList.subscribe((data: Api) => {
      this.GroupList = data.data

      for(let group of data.data) {
        if(group.name.split('_')[1] === "user") {
          group.name = "Groupe personnel de droit de " + this.UserList[this.UserList.findIndex(d => d.id === Number(group.name.split('_')[2]))].login;
          group.rightGroupPage.name = group.name
        }
      }
    })
  }
}
