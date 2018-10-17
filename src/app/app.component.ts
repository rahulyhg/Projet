import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './Class/User';
import { Router } from "@angular/router";

interface Data {
  data: Object;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  _GestionSitePopupStatut = false;
  public _currentUser: User;

  constructor(public userApi: UserService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('isLoggedIn') === "true") {
      if(localStorage.getItem('User') !== null ) {
        var id = Number(localStorage.getItem('User').split("/\\")[0]);
        var login = localStorage.getItem('User').split("/\\")[1];
        var password = localStorage.getItem('User').split("/\\")[2];
        this.userApi.getUserById(id, login, password).subscribe((data) => {this.create(data)});
      }
    } else {
      this._currentUser = new User();
    }
  }

  create(att) {
    if(att !== null) {
      if(att.api) {
        if(att.auth) {
          if(att.data[0] !== null) {
            if(att.data[0].statut === "1") {
              this._currentUser = att.data[0];
            } else {
              this.logOut();
            }
          } else {
            console.log("Error : No Data");
          }
        } else {
          console.log("Error: You can not access the API if you are not authenticated! ");
        }
      } else {
        console.log("Error : Could not join API");
      }
    }
  }

  logOut() {
    this.userApi.logOut(this._currentUser.id, this._currentUser.login, this._currentUser.password).subscribe();
    localStorage.clear();
    this.router.navigate(['/Accueil']);
    this.ngOnInit();
  }

  GestionSitePopup() {
    if(!this._GestionSitePopupStatut) {
      this._GestionSitePopupStatut = true;
    } else { this.GestionSitePopupClose(); }
  }

  GestionSitePopupClose() {
    this._GestionSitePopupStatut = false;
  }
}
