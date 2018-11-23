import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { FileSystemFileEntry } from '../../../node_modules/ngx-file-drop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { GenericModule } from '../generic/generic.modules';

import { AppComponent } from '../app.component';

import { User } from '../Class/User';
import { Page } from '../Class/Page';

import { PageService } from '../Services/page.service';
import { UploadService } from '../Services/uploads.service';
import { Setting } from '../Class/Setting';

@Component({
  templateUrl: './selected-page-management.component.html',
})
export class SelectedPageManagementComponent implements OnInit {
  @ViewChild('EditBar') private EditBar: ElementRef;

  private Reponse_getUserById: Observable<Object>;
  private Reponse_getPageById: Observable<Object>;
  private Reponse_getPageById_initial: Observable<Object>;

  public _currentUser: User;
  public page: Page;
  private initial_page: Page;
  public SelectedPageManagementForm: FormGroup;
  public setting: Setting;
  private one: string;
  private statutButton: boolean;
  private try: number;

  constructor(private app: AppComponent, private router: Router, private pageApi: PageService, private route: ActivatedRoute, private fb: FormBuilder, private uploadApi: UploadService, private generic: GenericModule, private location: Location) { 
    this.Reponse_getUserById = new Observable<Object>();
    this.Reponse_getPageById = new Observable<Object>();
    
    this._currentUser = new User(null);
    this.page = new Page(null);
    this.initial_page = new Page(null);
    this.SelectedPageManagementForm = this.fb.group({'id': null, 'title': null, 'favicon': null, 'refresh': null, 'route': null, 'needLogIn': null});
    this.setting = new Setting(null);
    this.one = null;
    this.statutButton = false;
    this.try = 0;
  }

  public ngOnInit(): void {
    // Initialisation de la page
    this.app.ngOnInit();

    var statut: boolean = false;
    var a = setInterval(() => {
      if(!statut) {
        if(this.app.statut) {
          clearInterval(a);
          statut = true;
          this.Init();
        }
      }
    }, 1);
  }

  private Init(): void {
    this.setting = this.app.setting;

    var statut_Reponse_getUserById: boolean = false;
    var statut_Reponse_getPageById: boolean = false;
    var statut_Reponse_getPageById_initial: boolean = false;

    this.Reponse_getUserById = this.app.Reponse_getUserById;
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

    var b = setInterval(() => {
      if(statut_Reponse_getUserById) {
        clearInterval(b);

        this.Reponse_getPageById = this.pageApi.getPageById(Number(this.route.snapshot.paramMap.get('id')));
        this.Reponse_getPageById_initial = this.Reponse_getPageById;

        this.Reponse_getPageById.subscribe((events: Response) => {
          if(event && events.body !== undefined) {
            var data: any = events.body;
            if(data.data !== null) {
              var data_r: Page = null;
              data_r = this.generic.createPage(data.data);

              if(data_r !== null) {
                this.page = data_r;
                statut_Reponse_getPageById = true;
              }
            } else
              this.router.navigate(['/Accueil']);
          }
        })
      }
    }, 1);

    var c = setInterval(() => {
      if(statut_Reponse_getPageById) {
        clearInterval(c);

        this.Reponse_getPageById_initial.subscribe((events: Response) => {
          if(event && events.body !== undefined) {
            var data: any = events.body;
            var data_r: Page = null;
            data_r = this.generic.createPage(data.data);
    
            if(data_r !== null) {
              this.initial_page = data_r;
              statut_Reponse_getPageById_initial = true;
            }
          }
        })
      }
    }, 1);

    var d = setInterval(() => {
      if(statut_Reponse_getPageById_initial) {
        clearInterval(d);

        this.Reponse_getUserById.subscribe((data) => {
          this.router.events.subscribe((path: any) => {
            if(path.url !== undefined && path.url !== this.one) {
              this.one = path.url;
              this.ngOnInit();
            }
          });

          // Vérification des droit d'acces a cette page pour _currentUser
          if(!this._currentUser.group.rightGroupPage.SelectedPageManagement_Access) {
            console.log("Vous n'avez pas la permission d'accedez à cette page");
            this.router.navigate(['/Accueil']);
          }

          if(!this._currentUser.group.rightGroupPage.SelectedPageManagement_EditRoute)
            this.SelectedPageManagementForm.get('refresh').disable();
  
          if(!this._currentUser.group.rightGroupPage.SelectedPageManagement_EditRoute)
            this.SelectedPageManagementForm.get('route').disable();
    
          if(!this._currentUser.group.rightGroupPage.SelectedPageManagement_EditNeedLogIn)
            this.SelectedPageManagementForm.get('needLogIn').disable();

          if(this.EditBar.nativeElement !== null)
            document.getElementById("footer").style.marginBottom = this.EditBar.nativeElement.offsetHeight - 6 + "px";

          this.app.stopLoadingPage();
          this.initData();
        })
      }
    }, 1);
  }

  private initData(): void {
    this.SelectedPageManagementForm = this.fb.group({
      'id': this.page.id,
      'title': this.page.title,
      'favicon': this.page.favicon,
      'refresh': this.page.refresh,
      'route': this.page.route,
      'needLogIn': this.page.needLogIn
    });
  }

  public imageChangeClick(event, value): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditUser) {
      this.page = new Page(value);

      this.generic.startUploadAnimation("favicon");
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.page.favicon = e.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);

      var name: string = "faviconPage" + Math.random() * 1000 + ".ico";
      if(event.target.files[0] !==undefined) {
        this.uploadApi.UploadFile(event.target.files[0], name).subscribe(event => {
          this.statutButton = true;
          var load: any = event;
          var a: number = load.loaded * 100 / load.total;
          this.generic.updateLoadUploade(a, "favicon");
          if(a === 100)
            this.generic.startTritementUpload();
          if(load.ok)
            this.generic.stopUploadAnimation("favicon");
          if(event)
            this.newImage(event, name);
        });
      }
    } else 
      console.log("Vous n'avez pas la permission de modifier le logo de cette page");
  }

  private newImage(ok: any, name: string): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditUser) {
      if(ok.ok) {
        this.statutButton = false;
        this.page.favicon = "https://dev.kevin-c.fr/uploads/" + name;
        this.initData();
      }
    } else 
      console.log("Vous n'avez pas la permission de modifier le logo de cette page");
  }

  public imageChangeDrag(event, value): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditUser) {
      this.page = new Page(value);

      this.generic.startUploadAnimation("favicon");

      (event.files[0].fileEntry as FileSystemFileEntry).file((file: File) => { 
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.page.favicon = e.target.result;
        }
        reader.readAsDataURL(file);
      })
      var name: string = "faviconPage" + Math.random() * 1000 + ".ico";
      (event.files[0].fileEntry as FileSystemFileEntry).file((file: File) => { this.uploadApi.UploadFile(file, name).subscribe(event => {
        this.statutButton = true;
        var load: any = event;
        var a: number = load.loaded * 100 / load.total;
        this.generic.updateLoadUploade(a, "favicon");
        if(a === 100)
          this.generic.startTritementUpload();
        if(load.ok)
          this.generic.stopUploadAnimation("favicon");
        if(event)
          this.newImage(event, name);
      }); });
    } else 
      console.log("Vous n'avez pas la permission de modifier le logo de cette page");
  }

  public TitleChange(value: any): void {
    var title: string = null;
    if(value.length > 24)
      title = value.substring(0,21) + " ...";
    else
      title = value;

    this.page.title = title;
    this.SelectedPageManagementForm.get("title").setValue(this.page.title);
    this.InputChange(this.page);
  }

  public editPage(value: any): void {
    if(this._currentUser.group.rightGroupPage.SelectedPageManagement_EditPage) {
      this.page = new Page(value);

      if(!this._currentUser.group.rightGroupPage.SelectedPageManagement_EditRefresh)
        this.page.refresh = this.initial_page.refresh;
      if(!this._currentUser.group.rightGroupPage.SelectedPageManagement_EditRoute)
        this.page.route = this.initial_page.route;
      if(!this._currentUser.group.rightGroupPage.SelectedPageManagement_EditNeedLogIn)
        this.page.needLogIn = this.initial_page.needLogIn;

      this.pageApi.putPage(this.page.id, this.page).subscribe((data) => { 
        if(data.ok)
          this.location.back();
      });
    } else
      console.log("Vous n'avez pas la permission de modifier cette page");
  }

  public InputChange(value: any): void {
    if(value.title.length < this.app.setting.minLengthTitle || value.route.length < this.app.setting.minLengthRoute)
      this.statutButton = true;
    if(value.title.length >= this.app.setting.minLengthTitle && value.route.length >= this.app.setting.minLengthRoute)
      this.statutButton = false;
  }

  private clearValue(data: string): void {
    this.SelectedPageManagementForm.get(data).setValue("");
    this.InputChange(this.SelectedPageManagementForm.value);
  }
}
