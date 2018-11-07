import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileSystemFileEntry } from '../../../node_modules/ngx-file-drop';
import { Md5 } from 'ts-md5/dist/md5';

import { AppComponent } from '../app.component';

import { Api } from '../Class/Api';
import { User } from '../Class/User';

import { UserService } from '../Services/user.service';

@Component({
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  private Reponse_getUserById: Observable<Api>;
  private Reponse_getUserById_form: Observable<Api>;
  private Reponse_getUserById_initial: Observable<Api>;

  private UserForm: FormGroup;
  private initial_User: User;
  public _currentUser: User;
  private user: User;
  private one: string;
  private canEdit: boolean;

  private edit: boolean;

  constructor(private app:AppComponent, private router: Router, private userApi: UserService, private route: ActivatedRoute, 
    private fb: FormBuilder) { 
    this.Reponse_getUserById = null;
    this.Reponse_getUserById_form = null;
    this.Reponse_getUserById_initial = null;

    this._currentUser = new User(null);
    this.user = new User(null);
    this.one = null;
    this.canEdit = false;
    this.edit = false;
    this.initial_User = new User(null);
    this.UserForm = this.fb.group({
      'id': null, 'statut': null, 'login' : null, 'password' : null, 'profile': null, 'date_signIn' : null, 'time_signIn' : null,
        'date_logIn' : null, 'time_logIn' : null, 'gameTag' : null, 'name' : null, 'firstName' : null,
        'birthDate' : null});
  }

  ngOnInit(): void {
    this.router.events.subscribe((path: any) => {
      if(path.url !== undefined && path.url !== this.one && path.url.split("/")[1] === "User") {
        this.one = path.url
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

        if(this.router.url !== "/User/MonCompte") {
          this.Reponse_getUserById_form = this.userApi.getUserById(Number(this.route.snapshot.paramMap.get('id')));
          this.Reponse_getUserById_initial = this.Reponse_getUserById_form;
        }
        else {
          this.Reponse_getUserById_form = this.userApi.getUserById(this._currentUser.id);
          this.Reponse_getUserById_initial = this.Reponse_getUserById_form;
        }

        this.Reponse_getUserById_form.subscribe((data: Api) => {
          this.user = data.data;
          this.initial_User = data.data;

          this.canEdit = false;

          if(this._currentUser.id === this.user.id) {
            this.canEdit = true;
            this.initData();
          }
        })
      })
    }
  }

  private initData(): void {
    this.Reponse_getUserById_form.subscribe((data: Api) => {
      this.UserForm = this.fb.group({
        'id': this.user.id,
        'statut': this.user.statut,
        'login' : this.user.login,
        'password' : this.user.password,
        'profile': this.user.profile,
        'date_signIn' : this.user.date_time_signIn.split(' ')[0],
        'time_signIn' : this.user.date_time_signIn.split(' ')[1],
        'date_logIn' : this.user.date_time_logIn.split(' ')[0],
        'time_logIn' : this.user.date_time_logIn.split(' ')[1],
        'gameTag' : this.user.gameTag,
        'name' : this.user.name,
        'firstName' : this.user.firstName,
        'birthDate' : this.user.birthDate
      });
    })
  }

  private editUser(post: any): void {
    this.Reponse_getUserById_form.subscribe((data: Api) => {
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
}