import { Component, OnInit } from '@angular/core';
import { UserService } from './User/user.service';
import { User } from './User/User';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
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
  }

  private getCurrentUser(): void {
    if(localStorage.getItem('isLoggedIn') === "true") {
      var user: string = localStorage.getItem('user');
      if(user !== null && user !== undefined && user !== "") {
        var user_tab: string[] = user.split("/\\");
        var id: number = Number(user_tab[0]);
        //var login: string = user[1];
        //var password: string = user[2];
        this._currentUser =  this.userApi.getUserById(id);
        if(!this._currentUser.statut)
          this.logOut();
      }
    } else
      this._currentUser = new User(null);
  }

  public logOut(): void {
    console.log("deconnection");
    this._currentUser.statut = false;
    this.userApi.putUser(this._currentUser.id, this._currentUser);
    this._GestionSitePopupStatut = false;
    localStorage.clear();
    this.router.navigate(['/Accueil']);
    this.ngOnInit();
  }

  private GestionSitePopup(): void {
    this._GestionSitePopupStatut = !(this._GestionSitePopupStatut);
  }
}
