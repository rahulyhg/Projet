import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Title } from '@angular/platform-browser';

import { User } from './User/User';
import { Page } from './Page/Page';

import { UserService } from './User/user.service';
import { PageService } from './Page/page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public _currentUser: User;
  public _currentPage: Page;
  public _GestionSitePopupStatut: boolean;
  
  constructor(private userApi: UserService, private router: Router, private pageApi: PageService, private titleService: Title) { 
    this._currentUser = new User(null);
    this._GestionSitePopupStatut = false;
    this._currentPage = new Page(null);
  }

  ngOnInit(): void {
    //console.log(this.userApi.test(4));
    this.Init();
    this.getCurrentUser();
  }

  private Init(): void {
    this._currentPage = this.pageApi.getPageByRoute("/" + this.router.url.split("/")[1]);
    this.titleService.setTitle( this._currentPage.title );
    
    var linkfav = document.head.querySelector("#favicon");
		if (linkfav) { document.head.removeChild(linkfav) }
    
    var linkElement = document.createElement( "link" );
		linkElement.setAttribute( "id", "favicon" );
		linkElement.setAttribute( "rel", "icon" );
		linkElement.setAttribute( "type", "image/x-icon" );
		linkElement.setAttribute( "href", this._currentPage.favicon );
    document.head.appendChild( linkElement );
  }

  private getCurrentUser(): void {
    if(localStorage.getItem('isLoggedIn') === "true") {
      var user: string = localStorage.getItem('user');
      if(user !== null && user !== undefined && user !== "") {
        var user_tab: string[] = user.split("/\\");
        var id: number = Number(user_tab[0]);
        //var login: string = user[1];
        //var password: string = user[2];
        this._currentUser =  this.userApi.getUserById(id);
        if(!this._currentUser.statut)
          this.logOut();
      }
    } else
      this._currentUser = new User(null);
  }

  public logOut(): void {
    console.log("deconnection");
    this._currentUser.statut = false;
    this.userApi.putUser(this._currentUser.id, this._currentUser);
    this._GestionSitePopupStatut = false;
    localStorage.clear();
    this.router.navigate(['/Accueil']);
    this.ngOnInit();
  }

  private GestionSitePopup(): void {
    this._GestionSitePopupStatut = !(this._GestionSitePopupStatut);
  }
}
