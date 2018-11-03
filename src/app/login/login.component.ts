import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

import { AppComponent } from '../app.component';

import { Api } from '../Class/Api';
import { User } from '../Class/User';
import { Group } from '../Class/Group';

import { UserService } from '../Services/user.service';
  
@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public Reponse_getUserById: Observable<Api>;
  private Reponse_Aut: Observable<Api>;

  public _currentUser: User;
  private LoginForm : FormGroup;
  private post: any;
  private ErrorMsg: string;
  private statut_requete: boolean;

  constructor(private fb: FormBuilder, private userApi: UserService, private app:AppComponent, private router: Router) { 
    this.Reponse_getUserById = null;
    this.Reponse_Aut = null;

    this._currentUser = new User(null);
    this.LoginForm = fb.group({
      'login': '',
      'password': ''
    });
    this.post = null;
    this.ErrorMsg = null;
    this.statut_requete = false;
  }

  ngOnInit(): void {
    this.app.ngOnInit();
    this.Reponse_getUserById = this.app.Reponse_getUserById;

    if(this.Reponse_getUserById === null)
      this._currentUser = new User(null);
    else {
      this.Reponse_getUserById.subscribe((data: Api) => {
        this._currentUser = data.data

        if(data.data.statut) {
          console.log("Vous êtes déjà connecté");
          this.router.navigate(['/Accueil']);
        }
        
        if(!data.data.group.rightGroupPage.Login_Access) {
          console.log("Vous n'avez pas la permission d'accedez à cette page");
          this.router.navigate(['/Accueil']);
        }
      })
    }
  }

  private logIn(post): void {
    if(!this.statut_requete) {
      if(post.login !== "" && post.login !== null && post.login !== undefined) {
        if(post.password !== "" && post.password !== null && post.password !== undefined) {
          this.Reponse_Aut = this.userApi.Auth(post.login, post.password);
          this.Reponse_Aut.subscribe((data: Api) => {
            this._currentUser = data.data
            localStorage.setItem('isLoggedIn', "true");
            localStorage.setItem('user', data.data.id  + "/\\" +  data.data.login + "/\\" + data.data.password);  
            this.app.ngOnInit();
            this.app._currentUser = data.data;
            this.router.navigate(['/Accueil']);
          })
        } else {
          this.statut_requete = false;
          console.log("Error : No Password Enter");
        }
      } else {
        this.statut_requete = false;
        console.log("Error : No Login Enter");
      }
    }
  }
}
