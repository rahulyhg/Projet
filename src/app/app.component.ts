import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

import { NgxSpinnerService } from 'ngx-spinner';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { Api } from './Class/Api';
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
  public Reponse_getUserById: Observable<Api>;
  private Reponse_getPageByRoute: Observable<Api>;
  private Reponse_getSettingById: Observable<Api>;

  public _currentUser: User;
  private _currentPage: Page;
  public setting: Setting;
  public opened: boolean;
  public mobileQuery: MediaQueryList;
  
  constructor(private userApi: UserService, private router: Router, private pageApi: PageService, private titleService: Title, private settingApi: SettingService, media: MediaMatcher, changeDetectorRef: ChangeDetectorRef, private spinner: NgxSpinnerService, private loadingBar: LoadingBarService) { 
    this.Reponse_getUserById = new Observable<Api>();
    this.Reponse_getPageByRoute = new Observable<Api>();
    this.Reponse_getSettingById = new Observable<Api>();
    this._currentUser = new User(null);
    this._currentPage = new Page(null);
    this.setting = new Setting(null);
    this.opened = false;
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  private startInit(): void {
    this.spinner.show();
    document.getElementById('page_content').style.filter= "blur(40px)";
    document.getElementsByTagName('html')[0].style.overflow = "hidden";
  }

  private endInit(): void {
    setTimeout(() => {    
      document.getElementById('page_content').style.filter= "none";
      document.getElementsByTagName('html')[0].style.overflow = "visible";
      this.spinner.hide();
    }, 300);
  }

  public ngOnInit(): void {
    this.startInit();
    var d: number[] = [];
    this.loadingBar.progress$.subscribe(data => {
      d.push(data);
      if(d[d.length - 2] !== 100 && data !== 0)
        this.startInit();
      else
        this.endInit();
    })
    window.scroll(0,0);
    document.getElementById("footer").style.marginBottom = "-6px";
    document.getElementById('page_section').style.filter = "none";
    document.getElementById('footer').style.filter = "none";
    this.opened = false;
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
      
      var linkfav: Element = document.head.querySelector("#favicon");
      if (linkfav) { document.head.removeChild(linkfav) }
      
      var linkElement: HTMLStyleElement = document.createElement( "link" );
      linkElement.setAttribute( "id", "favicon" );
      linkElement.setAttribute( "rel", "icon" );
      linkElement.setAttribute( "type", "image/x-icon" );
      linkElement.setAttribute( "href", data.data.favicon );
      document.head.appendChild( linkElement );

      
    })

    this.Reponse_getSettingById = this.settingApi.getSettingById(1);
    this.Reponse_getSettingById.subscribe((data: Api) => {
      this.setting = data.data;
      this.changeStyle();
    })
  }

  public logOut(): void {
    console.log("deconnection");
    this.Reponse_getUserById.subscribe((data: Api) => {
      data.data.statut = false
      this.userApi.putUser(data.data.id, data.data, false).subscribe()
    })

    localStorage.clear();
    this.router.navigate(['/Accueil']);
  }

  private changeStyle(): void {
    this.Reponse_getSettingById.subscribe((data: Api) => { 
      var linkfav: Element = document.head.querySelector("#style");
      if (linkfav) { document.head.removeChild(linkfav) }
  
      var linkElement: HTMLStyleElement = document.createElement( "style" );
      linkElement.setAttribute( "type", "text/css" );
      linkElement.setAttribute( "id", "style" );
      var content: string = null;
      content = "html { background-color: " + this.setting.primary_background_color + "; color: " + this.setting.primary_font_color + "; }" + 
      "#page_header { background-color: " + this.setting.primary_background_color + "; color: " + this.setting.primary_font_color + "; border-bottom: 2px solid " + this.setting.primary_border_color + "; }" + 
      "#page_nav { border-right: 2px solid " + this.setting.primary_border_color + " !important; }" +
      ".EditBar { border-top: 2px solid " + this.setting.primary_border_color + "; background-color: " + this.setting.primary_background_color + "; }" +
      ".bar_content { border-bottom: 2px solid" + this.setting.primary_border_color + "; } " +
      ".profile_mon_compte img, .favicon img { border: 2px solid" + this.setting.primary_border_color + "; box-shadow: 5px 5px 5px " + this.setting.primary_shadow_color + "; } " +
      ".profile img { border: 2px solid" + this.setting.primary_border_color + "; box-shadow: 5px 5px 5px " + this.setting.primary_shadow_color + "; } " +
      "input:-webkit-autofill { -webkit-box-shadow: 0 0 0 30px " + this.setting.primary_background_color + " inset; background-color: " + this.setting.primary_background_color + "; -webkit-text-fill-color: " + this.setting.primary_font_color + " !important; }" +
      "label, span, .mat-select-arrow, h2, li, mat-panel-title, mat-panel-description, th, td, button, a, mat-icon, h4, p, h3, input, .mat-select-value-text, .mat-select-value { color: " + this.setting.primary_font_color + "!important; }" + 
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
      "footer { background-color: " + this.setting.secondary_background_color + "; }" + 
      "#time-picker-wrapper.light[_ngcontent-c13] #time-picker[_ngcontent-c13] .time-picker-header[_ngcontent-c13] .time-picker-selected-time[_ngcontent-c13] div.selected[_ngcontent-c13], #time-picker-wrapper.light[_ngcontent-c13] #time-picker[_ngcontent-c13] .time-picker-header[_ngcontent-c13] .time-picker-selected-ampm[_ngcontent-c13] div.selected[_ngcontent-c13] { color: " + this.setting.primary_font_color + " !important; }" + 
      "#time-picker-wrapper[_ngcontent-c13] #time-picker[_ngcontent-c13] .time-picker-header[_ngcontent-c13] .time-picker-selected-time[_ngcontent-c13] div[_ngcontent-c13], #time-picker-wrapper[_ngcontent-c13] #time-picker[_ngcontent-c13] .time-picker-header[_ngcontent-c13] .time-picker-selected-ampm[_ngcontent-c13] div[_ngcontent-c13] { color: " + this.setting.secondary_font_color + " !important; }";
      linkElement.textContent = content;
      document.head.appendChild( linkElement ); 
    });
  }

  private ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public nav_m_blur(): void {
    if(!this.opened) {
      document.getElementById('page_section').style.filter = "blur(4px)";
      document.getElementById('footer').style.filter = "blur(4px)";
    }
    else {
      document.getElementById('page_section').style.filter = "none";
      document.getElementById('footer').style.filter = "none";
    }
  }

  public nav_m_blur_click(): void {
    if(this.opened) {
      document.getElementById('page_section').style.filter = "none";
      document.getElementById('footer').style.filter = "none";
    }
  }
}