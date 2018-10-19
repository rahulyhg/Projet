import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './Class/User';
import { Router } from "@angular/router";
import { Data } from './Data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public _currentUser: User;
  private _GestionSitePopupStatut: boolean;
  
  constructor(private userApi: UserService, private router: Router) { 
    this._currentUser = new User(null);
    this._GestionSitePopupStatut = false;
  }

  ngOnInit(): void {
    this.getCurrentUser();
    //console.log(this._currentUser);
  }

  private getCurrentUser(): void {
    if(localStorage.getItem('isLoggedIn') === "true") {
      var user = localStorage.getItem('user');
      if(user !== null && user !== undefined) {
        var user_tab = user.split("/\\");
        var id = Number(user_tab[0]);
        // var login = user[1];
        // var password = user[2];
        this._currentUser =  this.userApi.getUserById(id);
        if(!this._currentUser.statut)
          this.logOut();
      }
    } else {
      this._currentUser = new User(null);
    }
  }

  public logOut(): void {
    this._currentUser.statut = false;
    this.userApi.putUser(this._currentUser.id, this._currentUser);
    console.log("deconnection");
    this.GestionSitePopupClose();
    localStorage.clear();
    this.router.navigate(['/Accueil']);
    this.ngOnInit();
  }

  private GestionSitePopup(): void {
    if(!this._GestionSitePopupStatut)
      this._GestionSitePopupStatut = true;
    else
      this.GestionSitePopupClose();
  }

  private GestionSitePopupClose():void {
    this._GestionSitePopupStatut = false;
  }
}
