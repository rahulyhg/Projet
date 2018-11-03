import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

import { AppComponent } from '../app.component';

import { Api } from '../Class/Api';
import { Page } from '../Class/Page';
import { User } from '../Class/User';

import { PageService } from '../Services/page.service';

@Component({
  templateUrl: './page-management.component.html',
})
export class PageManagementComponent implements OnInit {
  private Reponse_getUserById: Observable<Api>;
  private Reponse_getPageList:Observable<Api>;

  public _currentUser: User;
  private PageList: Page[];

  constructor(private app:AppComponent, private router: Router, private pageApi: PageService) {
    this.Reponse_getUserById = null;
    this.Reponse_getPageList = null;

    this._currentUser = new User(null);
    this.PageList = null;
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
    this.Reponse_getPageList = this.pageApi.getPageList();
    this.Reponse_getPageList.subscribe((data: Api) => {
      this.PageList = data.data
    })
  }
}
