import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { Api } from './Class/Api';
import { User } from './Class/User';
import { Page } from './Class/Page';

import { UserService } from './Services/user.service';
import { PageService } from './Services/page.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public Reponse_getUserById: Observable<Api>;
  private Reponse_getPageByRoute:Observable<Api>;

  public _currentUser: User;
  public _currentPage: Page;
  public _GestionSitePopupStatut: boolean;
  
  constructor(private userApi: UserService, private router: Router, private pageApi: PageService, private titleService: Title) { 
    this.Reponse_getUserById = null;
    this.Reponse_getPageByRoute = null;
    
    this._currentUser = new User(null);
    this._GestionSitePopupStatut = false;
    this._currentPage = new Page(null);
  }

  ngOnInit(): void {
    this.Init(); 
  }

  private Init(): void {
    if(localStorage.getItem('isLoggedIn') === "true") {
      var user: string = localStorage.getItem('user');
      if(user !== null && user !== undefined && user !== "") {
        var user_tab: string[] = user.split("/\\");
        var id: number = Number(user_tab[0]);
        //var login: string = user[1];
        //var password: string = user[2];
        this.Reponse_getUserById = this.userApi.getUserById(id);
        this.Reponse_getUserById.subscribe((data: Api) => {
          this._currentUser = data.data

          if(!this._currentUser.statut)
            this.logOut();
        })
      }
    } else
      this._currentUser = new User(null);

    this.Reponse_getPageByRoute = this.pageApi.getPageByRoute(this.router.url.split("/")[1]);
    this.Reponse_getPageByRoute.subscribe((data: Api) => {
      this._currentPage = data.data
      if(this.Reponse_getUserById === null) {
        if(data.data.needLogIn && !this._currentUser.statut && data.data.id !== 1) {
          console.log("Vous devez être connecté pour accedez à cette page");
          this.router.navigate(['/Accueil']);
        }
      } else {
        this.Reponse_getUserById.subscribe((user: Api) => {
          if(data.data.needLogIn && !user.data.statut) {
            console.log("Vous devez être connecté pour accedez à cette page");
            this.router.navigate(['/Accueil']);
          }
        })
      }

      this.titleService.setTitle( data.data.title );
      
      var linkfav = document.head.querySelector("#favicon");
      if (linkfav) { document.head.removeChild(linkfav) }
      
      var linkElement = document.createElement( "link" );
      linkElement.setAttribute( "id", "favicon" );
      linkElement.setAttribute( "rel", "icon" );
      linkElement.setAttribute( "type", "image/x-icon" );
      linkElement.setAttribute( "href", data.data.favicon );
      document.head.appendChild( linkElement );
    })
  }

  public logOut(): void {
    console.log("deconnection");
    this.Reponse_getUserById.subscribe((data: Api) => {
      data.data.statut = false;
      this.userApi.putUser(data.data.id, data.data, false);
    })

    this._GestionSitePopupStatut = false;
    localStorage.clear();
    this.router.navigate(['/Accueil']);
    this.ngOnInit();
  }

  private GestionSitePopup(): void {
    this._GestionSitePopupStatut = !(this._GestionSitePopupStatut);
  }
}