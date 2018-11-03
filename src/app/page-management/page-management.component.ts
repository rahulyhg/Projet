import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AppComponent } from '../app.component';

import { Page } from '../Class/Page';
import { User } from '../Class/User';

import { PageService } from '../Services/page.service';

@Component({
  templateUrl: './page-management.component.html',
})
export class PageManagementComponent implements OnInit {
  public _currentUser: User;
  private PageList: Page[];

  constructor(private app:AppComponent, private router: Router, private pageApi: PageService) {
    this._currentUser = new User(null);
    this.PageList = null;
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
    //this.PageList = this.pageApi.getPageList();
  }
}
