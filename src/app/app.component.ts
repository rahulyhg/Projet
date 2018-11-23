import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { GenericModule } from './generic/generic.modules';

import { User } from './Class/User';
import { Page } from './Class/Page';
import { Setting } from './Class/Setting'; 

import { UserService } from './Services/user.service';
import { PageService } from './Services/page.service';
import { SettingService } from './Services/setting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public Reponse_getUserById: Observable<Object>;
  private Reponse_getPageByRoute: Observable<Object>;
  private Reponse_getSettingById: Observable<Object>;

  private statut_Reponse_getSettingById: boolean;

  public _currentUser: User;
  public _currentPage: Page;
  public setting: Setting;
  public opened: boolean;
  public mobileQuery: MediaQueryList;

  private try: number;
  public statut: boolean;

  constructor(private userApi: UserService, private router: Router, private pageApi: PageService, private titleService: Title, private settingApi: SettingService, media: MediaMatcher, changeDetectorRef: ChangeDetectorRef, private spinner: NgxSpinnerService, private loadingBar: LoadingBarService, private generic: GenericModule) { 
    this.Reponse_getUserById = new Observable<Object>();
    this.Reponse_getPageByRoute = new Observable<Object>();
    this.Reponse_getSettingById = new Observable<Object>();
    this._currentUser = new User(null);
    this._currentPage = new Page(null);
    this.setting = new Setting(null);
    this.opened = false;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.statut_Reponse_getSettingById = false;
    this.try = 0;
    this.statut = false;
    this.initApp();
  }

  private _mobileQueryListener: () => void;

  private startLoadingPage(): void {
    document.getElementById('page_content').style.filter= "blur(40px)";
    document.getElementsByTagName('html')[0].style.overflow = "hidden";
    this.spinner.show();
  }

  public stopLoadingPage(): void {
    setTimeout(() => {    
      document.getElementById('page_content').style.filter= "none";
      document.getElementsByTagName('html')[0].style.overflow = "visible";
      this.spinner.hide();
    }, 300);
  }

  private InitDOM():void {
    window.scroll(0,0);
    document.getElementById("footer").style.marginBottom = "-6px";
    document.getElementById('page_section').style.filter = "none";
    document.getElementById('footer').style.filter = "none";
    this.opened = false;
  }

  private initApp(): void {
    // Récupération des paramètre du site
    this.Reponse_getSettingById = this.settingApi.getSetting();;
    this.Reponse_getSettingById.subscribe((events: Response) => {
      if(event && events.body !== undefined) {
        var data: any = events.body;
        var data_r: Setting = null;
        data_r = this.generic.createSetting(data.data);
        if(data_r !== null) {
          this.setting = data_r;
          this.changeStyle();
          this.statut_Reponse_getSettingById = true;
        }
      }
    })
  }

  public ngOnInit() {
    this.statut = false;

    // Démarage de l'animation de chargement de page
    this.startLoadingPage();

    // Initialisation du DOM et des elements HTML
    this.InitDOM();

    // var b = setInterval(() => {
    //   if(statut_Reponse_getUserById) {
    //     clearInterval(b);
    //   }
    // }, 1);

    var statut_find_user_id: boolean = false;
    var statut_Reponse_getUserById: boolean = false;
    var statut_Reponse_getPageByRoute: boolean = false;

    var a = setInterval(() => {
      if(this.statut_Reponse_getSettingById) {
        clearInterval(a);

        // Vérification de l'existence d'un utilisateur en cache
        var isLoggedIn: string = localStorage.getItem('isLoggedIn');
        var user: string = localStorage.getItem('user');
        
        this._currentUser = new User(null);
        if(isLoggedIn === "true") {
          if(user !== null) {
            var user_tab: string[] = user.split("/\\");
            this._currentUser = new User(null);
            var id: number = 0;
            id = Number(user_tab[0]);
            this._currentUser.login = user_tab[1];
            this._currentUser.password = user_tab[2];
            if(id !== 0) {
              this._currentUser.id = id;
              statut_find_user_id = true;
            }
          }
        } else
          statut_find_user_id = true;
      }
    }, 1);

    var b = setInterval(() => { 
      if(statut_find_user_id) {
        clearInterval(b);

        // Récupération de l'utilisateur
        this.Reponse_getUserById = this.userApi.getUserById(this._currentUser.id);
        this.Reponse_getUserById.subscribe((events: Response) => {
          if(event && events.body !== undefined) {
            var data: any = events.body;
            var data_r: User = null;
            data_r = this.generic.createUser(data.data);
            if(data_r !== null) {
              this._currentUser = data_r;
              statut_Reponse_getUserById = true;
            }
          }
        })
      }
    }, 1);
    
    var c = setInterval(() => { 
      if(statut_Reponse_getUserById) {
        clearInterval(c);
        // Récupération des information sur la page
        this._currentPage.route = this.router.url.split("/")[1];
        this.Reponse_getPageByRoute = this.pageApi.getPageByRoute(this._currentPage.route);
        this.Reponse_getPageByRoute.subscribe((events: Response) => {
          if(event && events.body !== undefined) {
            var data: any = events.body;
            var data_r: Page = null;
            data_r = this.generic.createPage(data.data);
            if(data_r !== null) {
              this._currentPage = data_r;
              statut_Reponse_getPageByRoute = true;
            }
          }
        })
      }
    }, 1);

    var d = setInterval(() => { 
      if(statut_Reponse_getPageByRoute) {
        clearInterval(d);

        this.Reponse_getPageByRoute.subscribe(data => {
          if(!this._currentUser.statut && this._currentUser.id !== 1)
            this.logOut();
    
          // Redirection vers la page d'acceuild e l'utilisateur si la page nessesite un utilisateur connécté
          if(this._currentPage.needLogIn && !this._currentUser.statut) {
            console.log(this._currentUser.login)
            console.log("Vous devez être connecté pour accedez à cette page");
            this.router.navigate(['/Accueil']);
          }

          // Changement du titre de la page
          this.titleService.setTitle( this._currentPage.title );
          
          // Récupération et suppression de l'icone de la page
          var linkfav: Element = document.head.querySelector("#favicon");
          if (linkfav) { document.head.removeChild(linkfav) }
          
          // Changement de l'icone de la page
          var linkElement: HTMLStyleElement = document.createElement( "link" );
          linkElement.setAttribute( "id", "favicon" );
          linkElement.setAttribute( "rel", "icon" );
          linkElement.setAttribute( "type", "image/x-icon" );
          linkElement.setAttribute( "href", this._currentPage.favicon );
          document.head.appendChild( linkElement );

          this.statut = true;
        })
      }
    }, 1);
  }

  public logOut(): void {
    this.startLoadingPage();
    this._currentUser.statut = false;
    this.userApi.putUser(this._currentUser.id, this._currentUser, false).subscribe((data) => { 
      if(data.ok) {
        console.log("Vous avez été deconécté");
        localStorage.clear();
        this.router.navigate(['/Accueil']);
        this.stopLoadingPage();
      }
    });
  }

  private changeStyle(): void {
    // Récupération et suppresion de la feuille de style dinamique deja existente
    var linkfav: Element = document.head.querySelector("#style");
    if (linkfav) { document.head.removeChild(linkfav) }

    // Création de la nouvelle feuille de style
    var linkElement: HTMLStyleElement = document.createElement( "style" );
    linkElement.setAttribute( "type", "text/css" );
    linkElement.setAttribute( "id", "style" );
    var content: string = null;
    content = "html, mat-dialog-container { background-color: " + this.setting.primary_background_color + " !important; color: " + this.setting.primary_font_color + "; }" + 
    "#page_header { background-color: " + this.setting.primary_background_color + "; color: " + this.setting.primary_font_color + "; border-bottom: 2px solid " + this.setting.primary_border_color + "; }" + 
    "#page_nav { border-right: 2px solid " + this.setting.primary_border_color + " !important; }" +
    ".EditBar { border-top: 2px solid " + this.setting.primary_border_color + "; background-color: " + this.setting.primary_background_color + "; }" +
    ".bar_content { border-bottom: 2px solid" + this.setting.primary_border_color + "; } " +
    ".profile_mon_compte img, .favicon img { border: 2px solid" + this.setting.primary_border_color + "; box-shadow: 5px 5px 5px " + this.setting.primary_shadow_color + "; } " +
    ".profile img { border: 2px solid" + this.setting.primary_border_color + "; box-shadow: 5px 5px 5px " + this.setting.primary_shadow_color + "; } " +
    "input:-webkit-autofill { -webkit-box-shadow: 0 0 0 30px " + this.setting.primary_background_color + " inset; background-color: " + this.setting.primary_background_color + "; -webkit-text-fill-color: " + this.setting.primary_font_color + " !important; }" +
    "label, span, .mat-select-arrow, h2, li, mat-panel-title, mat-panel-description, th, td, button, a, mat-icon, h4, p, h3, input, .mat-select-value-text, .mat-select-value, mat-hint { color: " + this.setting.primary_font_color + "!important; }" + 
    ".mat-form-field-underline { background-color: " + this.setting.primary_border_color + " !important; }" + 
    "mat-option { background: " + this.setting.primary_background_color + " !important; }" + 
    ".mat-option.mat-selected:hover:not(.mat-option-multiple):not(.mat-option-disabled) { background: " + this.setting.secondary_background_color + " !important; }" + 
    ".mat-option:hover:not(.mat-option-disabled) { background: " + this.setting.secondary_background_color + " !important; }" + 
    ".mat-disabled .mat-slide-toggle-bar { background-color: " + this.setting.primary_action_disabled_color + "; }" + 
    "mat-expansion-panel { background: " + this.setting.secondary_background_color + " !important; }" + 
    "table { background: " + this.setting.secondary_background_color + " !important; }" + 
    "file-drop:hover img { border: 2px dotted " + this.setting.primary_border_color + " !important; }" + 
    ".mat-calendar-body-cell-content, .mat-calendar-arrow { color: " + this.setting.primary_font_color + "; }" + 
    ".mat-calendar-arrow { border-top-color: unset; }" +
    "mat-datepicker-content { background: " + this.setting.secondary_background_color + " !important; }" + 
    "#time-picker { background: " + this.setting.secondary_background_color + " !important; } " + 
    ".time-picker-clock { background: " + this.setting.primary_background_color + " !important; }" + 
    ".time-picker-clock-origin, .time-picker-clock-arrow, #time-picker-wrapper.light[_ngcontent-c13] #time-picker[_ngcontent-c13] .time-picker-clock[_ngcontent-c13] > button.active[_ngcontent-c13] { background: " + this.setting.secondary_font_color + " !important; }" + 
    ".time-picker-footer button { background: " + this.setting.primary_background_color + " !important; }" +
    "footer, .mat-drawer { background-color: " + this.setting.secondary_background_color + "; }" + 
    "#time-picker-wrapper.light[_ngcontent-c13] #time-picker[_ngcontent-c13] .time-picker-header[_ngcontent-c13] .time-picker-selected-time[_ngcontent-c13] div.selected[_ngcontent-c13], #time-picker-wrapper.light[_ngcontent-c13] #time-picker[_ngcontent-c13] .time-picker-header[_ngcontent-c13] .time-picker-selected-ampm[_ngcontent-c13] div.selected[_ngcontent-c13] { color: " + this.setting.primary_font_color + " !important; }" + 
    "#time-picker-wrapper[_ngcontent-c13] #time-picker[_ngcontent-c13] .time-picker-header[_ngcontent-c13] .time-picker-selected-time[_ngcontent-c13] div[_ngcontent-c13], #time-picker-wrapper[_ngcontent-c13] #time-picker[_ngcontent-c13] .time-picker-header[_ngcontent-c13] .time-picker-selected-ampm[_ngcontent-c13] div[_ngcontent-c13] { color: " + this.setting.secondary_font_color + " !important; }" + 
    ".mat-button-wrapper { color: " + this.setting.primary_font_color + " !important; }" +
    ".la-ball-atom[_ngcontent-c1] > div[_ngcontent-c1]:nth-child(1) { background: " + this.setting.secondary_load_color + " !important; }";
    linkElement.textContent = content;
    document.head.appendChild( linkElement ); 
  }

  // Traitement a la fermeture de l'application
  private ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // Animation d'arrière plan l'or de louverture ou de la fermeture du menu sur mobile
  public nav_m_blur(): void {
    if(!this.opened) {
      document.getElementById('page_section').style.filter = "blur(4px)";
      document.getElementById('footer').style.filter = "blur(4px)";
      document.getElementsByTagName('html')[0].style.overflow = "hidden";
    }
    else {
      document.getElementById('page_section').style.filter = "none";
      document.getElementById('footer').style.filter = "none";
      document.getElementsByTagName('html')[0].style.overflow = "visible";
    }
  }

  // Action lorsque l'on click sur la page alors que le menu mobile et ouvert
  public nav_m_blur_click(): void {
    if(this.opened) {
      this.opened = !this.opened;
      document.getElementById('page_section').style.filter = "none";
      document.getElementById('footer').style.filter = "none";
      document.getElementsByTagName('html')[0].style.overflow = "visible";
    }
  }
}