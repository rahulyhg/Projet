import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';

import { FileSystemFileEntry } from '../../../node_modules/ngx-file-drop';

import { GenericModule } from '../generic/generic.modules';

import { AppComponent } from '../app.component';

import { User } from '../Class/User';

import { UserService } from '../Services/user.service';
import { UploadService } from '../Services/uploads.service';
import { Setting } from '../Class/Setting';

@Component({
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  @ViewChild('EditBar') private EditBar: ElementRef;

  private Reponse_getUserById: Observable<Object>;
  private Reponse_getUserById_form: Observable<Object>;
  private Reponse_getUserById_initial: Observable<Object>;
  private subscribe: Subscription;

  public UserForm: FormGroup;
  private initial_User: User;
  private _currentUser: User;
  private user: User;
  private one: string;
  public canEdit: boolean;
  public edit: boolean;
  public statutButton: boolean;
  public setting: Setting;
  private statut: boolean;
  private try: number;

  constructor(private app: AppComponent, private router: Router, private userApi: UserService, private route: ActivatedRoute, private fb: FormBuilder, private uploadApi: UploadService, private generic: GenericModule, private dialog: MatDialog) { 
    this.Reponse_getUserById = new Observable<Object>();
    this.Reponse_getUserById_form = new Observable<Object>();
    this.Reponse_getUserById_initial = new Observable<Object>();

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
    this.statutButton = false;
    this.setting = new Setting(null);
    this.statut = true;
    this.try = 0;
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(NewPasswordPopup);

    this.subscribe = dialogRef.keydownEvents().subscribe(event => {
      if(event.key === "Enter") {
        if(this.verifNewPassword())
          dialogRef.close();
      }
    })

    this.subscribe = dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.verifNewPassword();
      }
    });
  }

  public ngOnInit(): void { 
    var t = setInterval(() => {
      if(this.app.statut_app && this.statut) {
        clearInterval(t);
  
        this.app.ngOnInit();
  
        var statut: boolean = false;
        var a = setInterval(() => {
          if(!statut) {
            if(this.app.statut) {
              statut = true;
              clearInterval(a);
              this.Init();
            }
          }
        }, 1);
      }
    }, 1);
  }

  private Init(): void {
    this.setting = this.app.setting;
    this.Reponse_getUserById = this.app.Reponse_getUserById;

    var statut_Reponse_getUserById: boolean = false;
    var statut_Reponse_getUserById_form: boolean = false;
    var statut_Reponse_getUserById_initial: boolean = false;

    this.subscribe = this.Reponse_getUserById.subscribe((events: Response) => {
      if(events.ok && events.body !== undefined) {
        var data: any = events.body;
        var data_r: User = null;
        var obs: Observable<Object> = null;
        data_r = this.generic.createUser(data.data);

        this.userApi.token = this._currentUser.token;

        if(this.router.url !== "/User/MonCompte")
          obs = this.userApi.getUserById(Number(this.route.snapshot.paramMap.get('id')));
        else
          obs = this.userApi.getUserById(data.data.id);

        if(data_r !== null && obs !== null) {
          this._currentUser = data_r;
          this.Reponse_getUserById_form = obs;
          statut_Reponse_getUserById = true;
        }
      }
    })

    var b = setInterval(() => { 
      if(statut_Reponse_getUserById) {
        clearInterval(b);
        this.Reponse_getUserById_initial = this.Reponse_getUserById_form;
        this.subscribe = this.Reponse_getUserById_form.subscribe((events: Response) => {
          if(events.ok && events.body !== undefined) {
            var data: any = events.body;
            if(data.data !== null) {
              var data_r: User = null;
              data.data.birthDate = this.generic.changeDateTimeFormatFromBdd(data.data.birthDate);
              data_r = this.generic.createUser(data.data);
      
              this.canEdit = false;
      
              if(this._currentUser.id === data_r.id)
                this.canEdit = true;
              
              if(data_r !== null) {
                this.user = data_r;
                this.initial_User = data_r;
      
                statut_Reponse_getUserById_form = true;
              }
            } else
              this.router.navigate(['/Accueil']);
          }
        })
      }
    }, 1);

    var c = setInterval(() => { 
      if(statut_Reponse_getUserById_form) {
        clearInterval(c);

        this.subscribe = this.Reponse_getUserById_initial.subscribe((events: Response) => {
          if(events.ok && events.body !== undefined) {
            var data: any = events.body;

            var data_r: User = null;
            data.data.birthDate = this.generic.changeDateTimeFormatFromBdd(data.data.birthDate);
            data_r = this.generic.createUser(data.data);
    
            if(data_r !== null) {
              this.initial_User = data_r;
              statut_Reponse_getUserById_initial = true;
            }
          }
        })
      }
    }, 1);

    this.subscribe = this.Reponse_getUserById.subscribe((data) => {
      var d = setInterval(() => {
        if(statut_Reponse_getUserById_initial) {
          clearInterval(d);

          if(!this._currentUser.group.rightGroupPage.User_Access) {
            console.log("Vous n'avez pas la permission d'accedez à cette page");
            this.router.navigate(['/Accueil']);
          }

          this.subscribe = this.router.events.subscribe((path: any) => {
            if(path.url !== undefined && path.url !== this.one && path.url.split("/")[1] === "User") {
              this.one = path.url;
              this.ngOnInit();
            }
          });

          if(this.EditBar.nativeElement !== null)
            document.getElementById("footer").style.marginBottom = this.EditBar.nativeElement.offsetHeight - 6 + "px";

          this.app.stopLoadingPage();
          this.initData();
        }
      }, 1);
    })
  }

  private initData(): void {
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
  }

  public editUser(post: any): void {
    post.birthDate = this.generic.changeDateTimeFormatForBdd(post.birthDate, null);

    this.user = new User(post);
    this.user.id = this.initial_User.id;
    this.user.group = this.initial_User.group;

    var regenerate_password: boolean = false;
    if(this.user.password !== this.initial_User.password)
      regenerate_password = true;

    this.userApi.token = this._currentUser.token;
    this.subscribe = this.userApi.putUser(this.user.id, this.user, regenerate_password).subscribe((data) => { 
      if(data.ok) {
        this.edit = false;
        this.ngOnInit();
      }
    });
  }

  private imageChangeClick(event, value): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditUser) {
      this.user = new User(value);

      this.generic.startUploadAnimation("profile");
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profile = e.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);

      var name: string = "profile" + Math.random() * 1000 + ".jpg";
      if(event.target.files[0] !==undefined) {
        this.uploadApi.token = this._currentUser.token;
        this.subscribe = this.uploadApi.UploadFile(event.target.files[0], name).subscribe(event => {
          this.statutButton = true;
          var load: any = event;
          var a: number = load.loaded * 100 / load.total;
          this.generic.updateLoadUploade(a, "profile");
          if(a === 100)
            this.generic.startTritementUpload();
          if(load.ok)
            this.generic.stopUploadAnimation("profile");
          if(event)
            this.newImage(event, name);
        });
      }
    } else 
      console.log("Vous n'avez pas la permission de modifier l'image de profile de cette utilisateur");
  }

  private newImage(ok: any, name: string): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditUser) {
      if(ok.ok) {
        this.statutButton = false;
        this.user.profile = "https://dev.kevin-c.fr/uploads/" + name;
        this.initData();
      }
    } else 
      console.log("Vous n'avez pas la permission de modifier l'image de profile de cette utilisateur");
  }

  private imageChangeDrag(event, value): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditUser) {
      // On Met dans l'object user les données que l'on a deja rentré
      this.user = new User(value);

      this.generic.startUploadAnimation("profile");

      (event.files[0].fileEntry as FileSystemFileEntry).file((file: File) => { 
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.user.profile = e.target.result;
        }
        reader.readAsDataURL(file);
      })
      var name: string = "profile" + Math.random() * 1000 + ".jpg";
      this.uploadApi.token = this._currentUser.token;
      (event.files[0].fileEntry as FileSystemFileEntry).file((file: File) => { this.subscribe = this.uploadApi.UploadFile(file, name).subscribe(event => {
        this.statutButton = true;
        var load: any = event;
        var a: number = load.loaded * 100 / load.total;
        this.generic.updateLoadUploade(a, "profile");
        if(a === 100)
          this.generic.startTritementUpload();
        if(load.ok)
          this.generic.stopUploadAnimation("profile");
        if(event)
          this.newImage(event, name);
      }); });
    } else 
      console.log("Vous n'avez pas la permission de modifier l'image de profile de cette utilisateur");
  }

  public clearValue(data: string): void {
    this.UserForm.get(data).setValue("");
    this.InputChange(this.UserForm.value);
  }

  private verifNewPassword(): boolean {
    var obj1 = Object(document.getElementById("1")).value;
    var obj2 = Object(document.getElementById("2")).value;
    if(obj1 !== undefined && obj2 !== undefined) {
      var password1: string = obj1;
      var password2: string = obj2;
      if(password1 === password2 && password1.length >= this.app.setting.minLengthPassword && password2.length >= this.app.setting.minLengthPassword) {
        this.user.password = password1;
        this.initData();
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public InputChange(value: any): void {
    if(value.login.length < this.app.setting.minLengthLogin || value.gameTag.length < this.app.setting.minLengthGameTag ||
      value.name.length < this.app.setting.minLengthName || value.firstName.length < this.app.setting.minLengthFirstName)
      this.statutButton = true;
    if(value.login.length >= this.app.setting.minLengthLogin && value.gameTag.length >= this.app.setting.minLengthGameTag &&
      value.name.length >= this.app.setting.minLengthName && value.firstName.length >= this.app.setting.minLengthFirstName)
      this.statutButton = false;
  }

  // Traitement a la fermeture de l'application
  public ngOnDestroy(): void {
    this.statut = false;
    if(this.subscribe !== undefined)
      this.subscribe.unsubscribe();
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `<h2 mat-dialog-title>Création d'un nouveau mot de passe</h2>
  <mat-dialog-content class="mat-typography">

  <mat-form-field class="example-form-field">
    <input matInput minlength="6" maxlength="20" #newpassword1 placeholder="Mot de passe" (keyup)="InputChange('newpassword1', newpassword1.value, newpassword2.value)" id="1">
    <mat-icon mat-button matSuffix mat-icon-button (click)="newpassword1.value = ''">close</mat-icon>
    <mat-hint *ngIf="newpassword1.value.length >= 6" align="start">Limite de caractères pour le nouveau mot de passe</mat-hint>
    <mat-hint *ngIf="newpassword1.value.length >= 6" align="end">{{ newpassword1.value.length }} / 20</mat-hint>
    <mat-hint *ngIf="newpassword1.value.length < 6" align="end">Trop court</mat-hint>
  </mat-form-field>

  <mat-form-field class="example-form-field" style="margin-top: 10px;">
    <input matInput maxlength="20" #newpassword2 placeholder="Validez le mot de passe" (keyup)="InputChange('newpassword2', newpassword1.value, newpassword2.value)" id="2">
    <mat-icon mat-button matSuffix mat-icon-button (click)="newpassword2.value = ''">close</mat-icon>
    <mat-hint align="start" *ngIf="newpassword1.value !== newpassword2.value">Le mot de passe saisit est different</mat-hint>
  </mat-form-field>

  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-raised-button mat-dialog-close type="button" color="primary">Annuler</button>
    <button mat-raised-button cdkFocusInitial [mat-dialog-close]="true" type="button" color="primary" [disabled]="statutButton" #buttonS>Valider</button>
  </mat-dialog-actions>`
})
export class NewPasswordPopup implements OnInit { 
  @ViewChild('newpassword1') private newpassword1: ElementRef;
  public statutButton: boolean = true;

  constructor() { }

  ngOnInit() {
  this.newpassword1.nativeElement.focus();
  }

  public InputChange(element: string, data1: string, data2: string) {
    if(data1 !== data2 || data1.length < 6 || data2.length < 6 ) {
      this.statutButton = true;
    } else {
      this.statutButton = false;
    }
  }
 }