import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

import { GenericModule } from '../generic/generic.modules';

import { AppComponent } from '../app.component';

import { User } from '../Class/User';

import { UserService } from '../Services/user.service';
  
@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @ViewChild('login') private login: ElementRef;

  private Reponse_getUserById: Observable<Object>;
  private Reponse_Aut: Observable<Object>;

  public _currentUser: User;
  public LoginForm : FormGroup;
  private statut_requete: boolean;
  public MsgPassword: string;
  public MsgLogin: string;
  public statutButton: boolean;
  private try: number;

  constructor(private fb: FormBuilder, private userApi: UserService, private app:AppComponent, private router: Router, private generic: GenericModule) { 
    this.Reponse_getUserById = new Observable<Object>();
    this.Reponse_Aut = new Observable<Object>();

    this._currentUser = new User(null);
    this.LoginForm = fb.group({'login': '', 'password': ''});
    this.statut_requete = false;
    this.MsgLogin = null;
    this.MsgPassword = null;
    this.statutButton = false;
    this.try = 0;
  }

  public ngOnInit(): void {
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

  private Init(): void {
    var statut_Reponse_getUserById: boolean = false;

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

        this.Reponse_getUserById.subscribe((data) => { 
          if(!this._currentUser.group.rightGroupPage.Login_Access) {
            console.log("Vous n'avez pas la permission d'accedez à cette page");
            this.router.navigate(['/Accueil']);
          }
  
          if(this._currentUser.statut) {
            console.log("Vous êtes déjà connecté");
            this.router.navigate(['/Accueil']);
          }

          this.login.nativeElement.focus();

          this.app.stopLoadingPage();
        })
      }
    }, 1);
  }

  public InputChange(data: string, value: any): void {    
    if(value.login === "" || value.login === " " || value.password === "" || value.password === " ")
      this.statutButton = true;
    if(value.login !== "" && value.login !==  " " && value.password !== "" && value.password !== " ")
      this.statutButton = false;

    if(data === "login") {
      if(value.login === "" || value.login === " ")
        this.MsgLogin = "Veillez saisir un Login !";
      else
        this.MsgLogin = null;
    }
    if(data === "password") {
      if(value.password === "" || value.password === " ")
        this.MsgPassword = "Veillez saisir un Mot de passe !";
      else
        this.MsgPassword = null;
    }
  }

  public logIn(post): void {
    if(post.login !== "" && post.login !== " " && post.password !== "" && post.password !== " ") {
      this.Reponse_Aut = this.userApi.Auth(post.login, post.password);
      this.Reponse_Aut.subscribe((events: Response) => {
        if(event && events.body !== undefined) {
          var data: any = events.body;
          if(data.ErrorMsg !== null) {
            this.statutButton = true;
            if(data.ErrorMsg === 1)
              this.MsgLogin = "Le Login saisit est Invalide !";
            if(data.ErrorMsg === 2)
              this.MsgPassword = "Le Mot de passe saisit est Invalide !";
            if(data.ErrorMsg === 3) {
              this.MsgLogin = "Le Login saisit est Invalide !";
              this.MsgPassword = "Le Mot de passe saisit est Invalide !";
            }
          } else {
            this._currentUser = data.data
            localStorage.setItem('isLoggedIn', "true");
            localStorage.setItem('user', data.data.id  + "/\\" +  data.data.login + "/\\" + data.data.password);  
            this.app.ngOnInit();
            this.app._currentUser = data.data;
            this.router.navigate(['/Accueil']);
          }
        }
      })
    } else {
      this.InputChange("login", { login: "", password: ""});
      this.InputChange("password", { login: "", password: ""});
    }
  }

  public clearValue(data: string): void {
    this.LoginForm.get(data).setValue("");
    this.InputChange(data, { login: "", password: ""});
  }
}
