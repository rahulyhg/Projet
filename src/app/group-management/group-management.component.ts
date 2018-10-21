import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AppComponent } from '../app.component';
import { User } from '../User/User'; 
import { Group } from '../Group/Group';
import { GroupService } from '../Group/group.service';

@Component({
  templateUrl: './group-management.component.html'
})
export class GroupManagementComponent implements OnInit {
  public _currentUser: User;
  private GroupList: Group[];

  constructor(private app:AppComponent, private router: Router, private groupApi: GroupService) {
    this._currentUser = new User(null);
    this.GroupList = null;
  }

  ngOnInit(): void { 
    this.app.ngOnInit();
    this._currentUser = this.app._currentUser;

    if(!this._currentUser.group.rightGroupPage.GroupManagement_Access) {
      console.log("Vous n'avez pas la permission d'accedez à cette page");
      this.router.navigate(['/Accueil']);
    }
    this.getGroupList();
  }

  private getGroupList(): void {
    this.GroupList = this.groupApi.getGroupList();
  }
}
