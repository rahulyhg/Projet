import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

import { AppComponent } from '../app.component';

import { Api } from '../Class/Api';
import { User } from '../Class/User';

@Component({
  templateUrl: './accueil.component.html'
})
export class AccueilComponent implements OnInit {
  private Reponse_getUserById: Observable<Api>;
  public _currentUser: User;

  constructor(private app:AppComponent, private router: Router) {
    this.Reponse_getUserById = new Observable<Api>();
    this._currentUser = new User(null);
  }

  public ngOnInit(): void { 
    this.app.ngOnInit();
    this.Reponse_getUserById = this.app.Reponse_getUserById;

    if(this.Reponse_getUserById === null) {
      this._currentUser = new User(null);

      if(!this._currentUser.group.rightGroupPage.Accueil_Access) {
        console.log("Vous n'avez pas la permission d'accedez à cette page");
        this.router.navigate(['/Accueil']);
      }
    } else {
      this.Reponse_getUserById.subscribe((data: Api) => {
        this._currentUser = data.data

        if(!data.data.group.rightGroupPage.Accueil_Access) {
          console.log("Vous n'avez pas la permission d'accedez à cette page");
          this.router.navigate(['/Accueil']);
        }
      })
    }
  }
}
