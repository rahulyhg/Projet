import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AppComponent } from '../app.component';

import { User } from '../Class/User'; 
import { Group } from '../Class/Group';

import { GroupService } from '../Services/group.service';
import { UserService } from '../Services/user.service';

@Component({
  templateUrl: './group-management.component.html'
})
export class GroupManagementComponent implements OnInit {
  public _currentUser: User;
  private GroupList: Group[];
  private UserList: User[];

  constructor(private app:AppComponent, private router: Router, private groupApi: GroupService, private userApi: UserService) {
    this._currentUser = new User(null);
    this.GroupList = []
    this.UserList = null;
  }

  ngOnInit(): void { 
    this.app.ngOnInit();
    this._currentUser = this.app._currentUser;

    if(!this._currentUser.group.rightGroupPage.GroupManagement_Access) {
      console.log("Vous n'avez pas la permission d'accedez à cette page");
      this.router.navigate(['/Accueil']);
    }

    this.getUserList();
    
    // for(let group of this.getGroupList()) {
    //   if(group.name.split('_')[1] === "user") {
    //     group.name = "Groupe personnel de droit de " + this.UserList[this.UserList.findIndex(d => d.id === Number(group.name.split('_')[2]))].login;
    //     group.rightGroupPage.name = group.name
    //     this.GroupList.push(group);
    //   }
    //   else
    //     this.GroupList.push(group);
    // }
  }

  // private getGroupList(): Group[] {
  //   return this.groupApi.getGroupList();
  // }

  private getUserList(): void {
    //this.UserList = this.userApi.getUserList();
  }
}
