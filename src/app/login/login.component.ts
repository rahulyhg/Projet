import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../Class/User';
import { AppComponent } from '../app.component';
import { Router } from "@angular/router";
  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _currentUser: User;
  private LoginForm : FormGroup;
  private post: any;
  private login: string;
  private password: string;
  private ErrorMsg: string;

  private statut_requete: boolean;

  constructor(private fb: FormBuilder, private userApi: UserService, private app:AppComponent, private router: Router) { 
      this.LoginForm = fb.group({
        'login': '',
        'password': ''
      })
      this.statut_requete = false;
    }

  ngOnInit(): void {
    this.app.ngOnInit();
    this._currentUser = this.app._currentUser;

    if(this._currentUser.statut) {
      this.router.navigate(['/Accueil']);
    }

    if(!this._currentUser.group.rightGroupPage.access_Login) {
      console.log("Vous n'avez pas la permission d'accedez à cette page");
      this.router.navigate(['/Accueil']);
      this.ngOnInit();
    }
  }

  private logIn(post): void {
    if(!this.statut_requete) {
      this.statut_requete = true;
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
