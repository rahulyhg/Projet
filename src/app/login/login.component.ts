import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";

import { UserService } from '../User/user.service';
import { User } from '../User/User';
import { AppComponent } from '../app.component';
  
@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public _currentUser: User;
  private LoginForm : FormGroup;
  private post: any;
  private ErrorMsg: string;
  private statut_requete: boolean;

  constructor(private fb: FormBuilder, private userApi: UserService, private app:AppComponent, private router: Router) { 
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
    this._currentUser = this.app._currentUser;

    if(this._currentUser.statut)
      this.router.navigate(['/Accueil']);

    if(!this._currentUser.group.rightGroupPage.access_Login) {
      console.log("Vous n'avez pas la permission d'accedez à cette page");
      this.router.navigate(['/Accueil']);
    }
  }

  private logIn(post): void {
    if(!this.statut_requete) {
      if(post.login !== "" && post.login !== null && post.login !== undefined) {
        if(post.password !== "" && post.password !== null && post.password !== undefined) {
          this._currentUser = new User(this.userApi.Auth(post.login, post.password));
          localStorage.setItem('isLoggedIn', "true");
          localStorage.setItem('user', this._currentUser.id  + "/\\" +  this._currentUser.login + "/\\" + this._currentUser.password);
          this.app.ngOnInit();
          this.app._currentUser = this._currentUser;
          this.router.navigate(['/Accueil']);
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
