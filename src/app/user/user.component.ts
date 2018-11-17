import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { FileSystemFileEntry } from '../../../node_modules/ngx-file-drop';

import { GenericModule } from '../generic/generic.modules';

import { AppComponent } from '../app.component';

import { Api } from '../Class/Api';
import { User } from '../Class/User';

import { UserService } from '../Services/user.service';
import { UploadService } from '../Services/uploads.service';

@Component({
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  @ViewChild('EditBar') private EditBar: ElementRef;

  private Reponse_getUserById: Observable<Api>;
  private Reponse_getUserById_form: Observable<Api>;
  private Reponse_getUserById_initial: Observable<Api>;

  public UserForm: FormGroup;
  private initial_User: User;
  private _currentUser: User;
  private user: User;
  private one: string;
  public canEdit: boolean;
  public edit: boolean;

  constructor(private app: AppComponent, private router: Router, private userApi: UserService, private route: ActivatedRoute, private fb: FormBuilder, private uploadApi: UploadService, private generic: GenericModule) { 
    this.Reponse_getUserById = new Observable<Api>();
    this.Reponse_getUserById_form = new Observable<Api>();
    this.Reponse_getUserById_initial = new Observable<Api>();

    this.UserForm = this.fb.group({
      'id': null, 'statut': null, 'login' : null, 'password' : null, 'profile': null, 'date_signIn' : null, 'time_signIn' : null,
      'date_logIn' : null, 'time_logIn' : null, 'gameTag' : null, 'name' : null, 'firstName' : null,
      'birthDate' : null});
    this.initial_User = new User(null);
    this._currentUser = new User(null);
    this.user = new User(null);
    this.one = null;
    this.canEdit = false;
    this.edit = false;
  }

  public ngOnInit(): void {
    this.router.events.subscribe((path: any) => {
      if(path.url !== undefined && path.url !== this.one && path.url.split("/")[1] === "User") {
        this.one = path.url;
        this.ngOnInit();
      }
    });

    this.app.ngOnInit();
    this.Reponse_getUserById = this.app.Reponse_getUserById;

    if(this.Reponse_getUserById === null) {
      this._currentUser = new User(null);

      if(!this._currentUser.group.rightGroupPage.User_Access) {
        console.log("Vous n'avez pas la permission d'accedez à cette page");
        this.router.navigate(['/Accueil']);
      }
    } else {
      this.Reponse_getUserById.subscribe((data: Api) => {
        this._currentUser = data.data

        if(!data.data.group.rightGroupPage.User_Access) {
          console.log("Vous n'avez pas la permission d'accedez à cette page");
          this.router.navigate(['/Accueil']);
        }

        this.verifRight(this._currentUser);
      })
    }
    if(this.EditBar.nativeElement !== null)
      document.getElementById("footer").style.marginBottom = this.EditBar.nativeElement.offsetHeight - 6 + "px";
  }

  private verifRight(user: User): void {
    if(this.router.url !== "/User/MonCompte")
      this.Reponse_getUserById_form = this.userApi.getUserById(Number(this.route.snapshot.paramMap.get('id')));
    else
      this.Reponse_getUserById_form = this.userApi.getUserById(user.id);

    this.Reponse_getUserById_initial = this.Reponse_getUserById_form;
    this.Reponse_getUserById_form.subscribe((data: Api) => {
      this.user = data.data;
      this.initial_User = data.data;
      
      this.user.birthDate = this.generic.changeDateTimeFormatFromBdd(this.user.birthDate);

      this.canEdit = false;

      if(this._currentUser.id === this.user.id) {
        this.canEdit = true;
        this.initData();
      }
    })
  }

  private initData(): void {
    this.Reponse_getUserById_form.subscribe((data: Api) => {
      this.UserForm = this.fb.group({
        'id': this.user.id,
        'statut': this.user.statut,
        'login' : this.user.login,
        'password' : this.user.password,
        'profile': this.user.profile,
        'gameTag' : this.user.gameTag,
        'name' : this.user.name,
        'firstName' : this.user.firstName,
        'birthDate' : this.user.birthDate
      });
    })
  }

  public editUser(post: any): void {
    this.Reponse_getUserById_form.subscribe((data: Api) => {
      post.birthDate = this.generic.changeDateTimeFormatForBdd(post.birthDate, null);

      this.user = new User(post);
      this.user.id = this.initial_User.id;
      this.user.group = this.initial_User.group;

      var regenerate_password: boolean = false;
      if(this.user.password !== this.initial_User.password)
        regenerate_password = true;

      this.userApi.putUser(this.user.id, this.user, regenerate_password).subscribe();
      this.edit = false;
    })
  }

  private imageChangeClick(event, value): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditUser) {
      this.user = new User(value);

      var name: string = "profile" + Math.random() * 1000 + ".jpg";
      if(event.target.files[0] !==undefined) {
        this.uploadApi.UploadFile(event.target.files[0], name).subscribe(event => {
          if(event)
            this.newImage(event, name);
        });
      }
    } else 
      console.log("Vous n'avez pas la permission de modifier l'image de profile de cette utilisateur");
  }

  private newImage(ok: any, name: string): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditUser) {
      if(ok.ok)
        this.user.profile = "https://dev.kevin-c.fr/uploads/" + name;
      this.initData();
    } else 
      console.log("Vous n'avez pas la permission de modifier l'image de profile de cette utilisateur");
  }

  private imageChangeDrag(event, value): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditUser) {
      // On Met dans l'object user les données que l'on a deja rentré
      this.user = new User(value);

      var name: string = "profile" + Math.random() * 1000 + ".jpg";
      (event.files[0].fileEntry as FileSystemFileEntry).file((file: File) => { this.uploadApi.UploadFile(file, name).subscribe(event => {
        if(event)
          this.newImage(event, name);
      }); });
    } else 
      console.log("Vous n'avez pas la permission de modifier l'image de profile de cette utilisateur");
  }
}