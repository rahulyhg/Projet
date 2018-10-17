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

  LoginForm : FormGroup;
  post:any;
  login:string = '';
  password:string = '';
  
  _currentUser:User;
  ErrorMsg = null;

  constructor(
    private fb: FormBuilder,
    public userApi: UserService,
    public app:AppComponent,
    private router: Router)
    {
    this.LoginForm = fb.group({
      'login': '',
      'password': ''
    })
  }

  ngOnInit() {
    this._currentUser = this.app._currentUser;

    if(localStorage.getItem('isLoggedIn') === "true") {
      this.router.navigate(['/Accueil']);
    }
  }

  logIn(post) {
    if(post.login !== "") {
      if(post.password !== "") {
        this.userApi.auth(post.login, post.password).subscribe((data) => {this.create(data)});
      } else {
        console.log("Error : No Password Enter");
      }
    } else {
      console.log("Error : No Login Enter");
    }
  }
  
  create(att) {
    if(att !== null) {
      if(att.api) {
        if(att.auth) {
          if(att.data !== null) {
            this._currentUser = att.data;
            this.app._currentUser = this._currentUser;
            localStorage.setItem('isLoggedIn', "true");
            localStorage.setItem('User', this._currentUser.id  + "/\\" +  this._currentUser.login + "/\\" + this._currentUser.password);
            this.router.navigate(['/Accueil']);
          } else {
            console.log("Error : No Data");
          }
        } else {
          console.log("Error: Login or password False ");
          this.ErrorMsg = att.ErrorMsg;
        }
      } else {
        console.log("Error : Could not join API");
      }
    }
  }
}
