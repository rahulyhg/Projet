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

  // Temporaire en attendant le style dynamique
  public style_m: boolean;
  
  constructor(private userApi: UserService, private router: Router, private pageApi: PageService, private titleService: Title) { 
    this.Reponse_getUserById = null;
    this.Reponse_getPageByRoute = null;
    this._currentUser = new User(null);
    this._GestionSitePopupStatut = false;
    this._currentPage = new Page(null);

    // Temporaire en attendant le style dynamique
    this.style_m = false;

    this.changeStyle();
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
      data.data.statut = false
      this.userApi.putUser(data.data.id, data.data, false).subscribe()
    })

    this._GestionSitePopupStatut = false;
    localStorage.clear();
    this.router.navigate(['/Accueil']);
    this.ngOnInit();
  }

  private GestionSitePopup(): void {
    this._GestionSitePopupStatut = !(this._GestionSitePopupStatut);
  }

  private changeStyle(): void {
    var style = null;

    // Temporaire en attendant le style dynamique
    this.style_m = !(this.style_m);
    if(this.style_m) {
      style = {
        "general_background" : "#FFF",
        "general_font_color" : "#000",
        "general_border" : "2px solid #000",
        "general_border_color" : "#000",
        "devPopup" : "#AFAFAF",
        "general_shadow" : "#888888",
        "general_list_hover" : "#f5f5f5",
        "general_slide_bar_disabled" : "#dcdcdc",
        "clock" : "#888888"
      }
    } else {
      style = {
        "general_background" : "#222222",
        "general_font_color" : "#ccc",
        "general_border" : "2px solid #ccc",
        "general_border_color" : "#ccc",
        "devPopup" : "#444444",
        "general_shadow" : "#000",
        "general_list_hover" : "#383838",
        "general_slide_bar_disabled" : "#272727",
        "clock" : "#888888"
      }
    }
    
    var linkfav = document.head.querySelector("#style");
    if (linkfav) { document.head.removeChild(linkfav) }

    var linkElement = document.createElement( "style" );
    linkElement.setAttribute( "type", "text/css" );
    linkElement.setAttribute( "id", "style" );
    var content:string = null;
    content = "html { background-color: " + style.general_background + "; color: " + style.general_font_color + "; }" + 
    "#page_header { background-color: " + style.general_background + "; color: " + style.general_font_color + "; border-bottom: " + style.general_border + "; }" + 
    // "#dev { border-top: " + style.general_border + "; }" + 
    "#page_nav { border-right: " + style.general_border + " !important; }" +
    ".EditBar { border-top: " + style.general_border + "; background-color: " + style.general_background + "; }" +
    "#devPopup { background-color: " + style.devPopup + "; border: " + style.general_border + "; }" +
    ".bar_content { border-bottom: " + style.general_border + "; } " +
    ".profile_mon_compte img { border: " + style.general_border + "; box-shadow: 5px 5px 5px " + style.general_shadow + "; } " +
    ".profile img { border: " + style.general_border + "; box-shadow: 5px 5px 5px " + style.general_shadow + "; } " +
    "input:-webkit-autofill { -webkit-box-shadow: 0 0 0 30px " + style.general_background + " inset; background-color: " + style.general_background + "; -webkit-text-fill-color: " + style.general_font_color + " !important; }" +
    "label, span, .mat-select-arrow, h2, li, mat-panel-title, mat-panel-description, th, td, button { color: " + style.general_font_color + "!important; }" + 
    ".mat-form-field-underline { background-color: " + style.general_border_color + " !important; }" + 
    "mat-option { background: " + style.general_background + " !important; }" + 
    ".mat-option.mat-selected:hover:not(.mat-option-multiple):not(.mat-option-disabled) { background: " + style.general_list_hover + " !important; }" + 
    ".mat-option:hover:not(.mat-option-disabled) { background: " + style.general_list_hover + " !important; }" + 
    ".mat-disabled .mat-slide-toggle-bar { background-color: " + style.general_slide_bar_disabled + "; }" + 
    "mat-expansion-panel { background: " + style.general_list_hover + " !important; }" + 
    "table { background: " + style.general_list_hover + " !important; }" + 
    ".profile:hover img { border: 2px dotted " + style.general_border_color + " !important; }" + 
    ".mat-calendar-body-cell-content, .mat-calendar-arrow { color: " + style.general_font_color + "; }" + 
    ".mat-calendar-arrow { border-top-color: unset; }" +
    "mat-datepicker-content { background: " + style.general_list_hover + " !important; }" + 
    "#time-picker { background: " + style.general_list_hover + " !important; } " + 
    ".time-picker-clock { background: " + style.general_background + " !important; }" + 
    ".time-picker-clock-origin, .time-picker-clock-arrow, #time-picker-wrapper.light[_ngcontent-c13] #time-picker[_ngcontent-c13] .time-picker-clock[_ngcontent-c13] > button.active[_ngcontent-c13] { background: white !important; }";
    linkElement.textContent = content;
    document.head.appendChild( linkElement ); 
  }
}