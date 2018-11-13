import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FileSystemFileEntry } from '../../../node_modules/ngx-file-drop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { AppComponent } from '../app.component';

import { Api } from '../Class/Api';
import { User } from '../Class/User';
import { Page } from '../Class/Page';

import { PageService } from '../Services/page.service';
import { RightGroupPage } from '../Class/RightGroupPage';
import { UploadService } from '../Services/uploads.service';

@Component({
  templateUrl: './selected-page-management.component.html',
})
export class SelectedPageManagementComponent implements OnInit {
  @ViewChild('EditBar') public EditBar: ElementRef;

  public Reponse_getUserById: Observable<Api>;
  public Reponse_getPageById: Observable<Api>;
  public Reponse_getPageById_initial: Observable<Api>;

  public _currentUser: User;
  public page: Page;
  public initial_page: Page;
  public SelectedPageManagementForm: FormGroup;

  constructor(public app:AppComponent, public router: Router, public pageApi: PageService, public route: ActivatedRoute, 
    public fb: FormBuilder, public uploadApi: UploadService) { 
    this.Reponse_getUserById = null;
    this.Reponse_getPageById = null;
    this.Reponse_getPageById_initial = null;
    
    this._currentUser = new User(null);
    this.page = new Page(null);
    this.initial_page = new Page(null);
    this.SelectedPageManagementForm = null;
    this.SelectedPageManagementForm = this.fb.group({'id': null, 'title': null, 'favicon': null, 'refresh': null, 
    'route': null, 'needLogIn': null});

    this.Reponse_getPageById_initial = this.pageApi.getPageById(Number(this.route.snapshot.paramMap.get('id')));
    this.Reponse_getPageById_initial.subscribe((data: Api) => {
      this.initial_page = data.data
    })
  }

  ngOnInit(): void { 
    // Initialisation de la page
    this.app.ngOnInit();
    this.Reponse_getUserById = this.app.Reponse_getUserById;

    // Vérification des droit d'acces a cette page pour _currentUser
    // Vérification des droit pour savoir si l'utilisateur peux recurerer les données
    if(this.Reponse_getUserById === null) {
      this._currentUser = new User(null);

      this.verifRight(this._currentUser.group.rightGroupPage);
    } else {
      this.Reponse_getUserById.subscribe((data: Api) => {
        this._currentUser = data.data

        this.verifRight(data.data.group.rightGroupPage);
      })
    }

    if(this.EditBar.nativeElement !== null)
      document.getElementById("footer").style.marginBottom = this.EditBar.nativeElement.offsetHeight - 6 + "px";
  }

  public verifRight(rightGroupPage: RightGroupPage) {
    if(!this._currentUser.group.rightGroupPage.SelectedPageManagement_Access) {
      console.log("Vous n'avez pas la permission d'accedez à cette page");
      this.router.navigate(['/Accueil']);
    } else {
      this.Reponse_getPageById = this.pageApi.getPageById(Number(this.route.snapshot.paramMap.get('id')));
      this.Reponse_getPageById.subscribe((data: Api) => {
        this.page = data.data
      })
    }

    this.initData();
  }

  public initData(): void {
    this.Reponse_getPageById.subscribe((data: Api) => {
      this.SelectedPageManagementForm = this.fb.group({
        'id': this.page.id,
        'title': this.page.title,
        'favicon': this.page.favicon,
        'refresh': this.page.refresh,
        'route': this.page.route,
        'needLogIn': this.page.needLogIn
      });

      if(this.initial_page.refresh !== this.page.refresh) {
        if(!this._currentUser.group.rightGroupPage.SelectedPageManagement_EditRoute) {
          this.SelectedPageManagementForm.get('refresh').disable();
          this.page.refresh = this.initial_page.refresh;
          console.log("Vous n'avez pas la permission de modifier le temps de refersh des données de cette page");
        }
      }

      if(this.initial_page.route !== this.page.route) {
        if(!this._currentUser.group.rightGroupPage.SelectedPageManagement_EditRoute) {
          this.SelectedPageManagementForm.get('route').disable();
          this.page.refresh = this.initial_page.refresh;
          console.log("Vous n'avez pas la permission de modifier la route de cette page");
        }
      }

      if(this.initial_page.needLogIn !== this.page.needLogIn) {
        if(!this._currentUser.group.rightGroupPage.SelectedPageManagement_EditNeedLogIn) {
          this.SelectedPageManagementForm.get('needLogIn').disable();
          this.page.refresh = this.initial_page.refresh;
          console.log("Vous n'avez pas la permission de modifier la condition de connexion pour cette page");
        }
      }
    })
  }

  public imageChangeClick(event, value): void {
    this.Reponse_getUserById.subscribe((data: Api) => {
      if(this._currentUser.group.rightGroupPage.SelectedPageManagement_EditPage) {
        this.page = new Page(value);

        var name: string = "faviconPage" + Math.random() * 1000 + ".jpg";
        if(event.target.files[0] !==undefined) {
          this.uploadApi.UploadFile(event.target.files[0], name).subscribe(event => {
            if(event)
              this.newImage(event, name);
          });
        }
      } else
        console.log("Vous n'avez pas la permission de modifier cette page");
    })
  }

  public newImage(ok: any, name: string): void {
    this.Reponse_getUserById.subscribe((data: Api) => {
      if(this._currentUser.group.rightGroupPage.SelectedPageManagement_EditPage) {
        if(ok.ok)
          this.page.favicon = "https://dev.kevin-c.fr/uploads/" + name;
        this.initData();
      } else
        console.log("Vous n'avez pas la permission de modifier cette page");
    })
  }

  public imageChangeDrag(event, value): void {
    this.Reponse_getUserById.subscribe((data: Api) => {
      if(this._currentUser.group.rightGroupPage.SelectedPageManagement_EditPage) {
        this.page = new Page(value);

        var name: string = "faviconPage" + Math.random() * 1000 + ".jpg";
        (event.files[0].fileEntry as FileSystemFileEntry).file((file: File) => { this.uploadApi.UploadFile(file, name).subscribe(event => {
          if(event)
            this.newImage(event, name);
        }); });
      } else
        console.log("Vous n'avez pas la permission de modifier cette page");
    })
  }

  public TitleChange(value: any): void {
    this.Reponse_getUserById.subscribe((data: Api) => {
      if(this._currentUser.group.rightGroupPage.SelectedPageManagement_EditPage) {
        if(value.length > 24)
          this.page.title = value.substring(0,21) + " ...";
        else
          this.page.title = value;
      } else
        console.log("Vous n'avez pas la permission de modifier cette page");
    })
  }

  public editPage(value: any): void {
    this.Reponse_getUserById.subscribe((data: Api) => {
      this.page = new Page(value);
      if(this._currentUser.group.rightGroupPage.SelectedPageManagement_EditPage) {
        if(this.initial_page.refresh !== this.page.refresh) {
          if(!this._currentUser.group.rightGroupPage.SelectedPageManagement_EditRefresh) {
            this.page.refresh = this.initial_page.refresh;
            console.log("Vous n'avez pas la permission de modifier le temps de refersh des données de cette page");
          }
        }
        if(this.initial_page.route !== this.page.route) {
          if(!this._currentUser.group.rightGroupPage.SelectedPageManagement_EditRoute) {
            this.page.route = this.initial_page.route;
            console.log("Vous n'avez pas la permission de modifier la route de cette page");
          }
        }
        if(this.initial_page.needLogIn !== this.page.needLogIn) {
          if(!this._currentUser.group.rightGroupPage.SelectedPageManagement_EditNeedLogIn) {
            this.page.needLogIn = this.initial_page.needLogIn;
            console.log("Vous n'avez pas la permission de modifier la condition de connexion pour cette page");
          }
        }
        this.pageApi.putPage(this.page.id, this.page);
      } else
        console.log("Vous n'avez pas la permission de modifier cette page");
    })
  }
}
