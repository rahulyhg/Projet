import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AppComponent } from '../app.component';
import { User } from '../User/User';

@Component({
  templateUrl: './accueil.component.html'
})
export class AccueilComponent implements OnInit {
  private _currentUser: User;

  constructor(private app:AppComponent, private router: Router) {
    this._currentUser = new User(null);
  }

  ngOnInit(): void { 
    this.app.ngOnInit();
    this._currentUser = this.app._currentUser;

    if(!this._currentUser.group.rightGroupPage.access_Accueil) {
      console.log("Vous n'avez pas la permission d'accedez à cette page");
      this.router.navigate(['/Accueil']);
      this.ngOnInit();
    }
  }
}
