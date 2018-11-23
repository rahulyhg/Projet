import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

import { GenericModule } from '../generic/generic.modules';

import { AppComponent } from '../app.component';

import { User } from '../Class/User';

@Component({
  templateUrl: './accueil.component.html'
})
export class AccueilComponent implements OnInit {
  private Reponse_getUserById: Observable<Object>;
  public _currentUser: User;
  private try: number;

  constructor(private app:AppComponent, private router: Router, private generic: GenericModule) {
    this.Reponse_getUserById = new Observable<Object>();
    this._currentUser = new User(null);
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
      if(event && events.body !== undefined && this.app.statut) {
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
          if(!this._currentUser.group.rightGroupPage.Accueil_Access) {
            console.log("Vous n'avez pas la permission d'accedez à cette page");
            this.router.navigate(['/Accueil']);
          }

          this.app.stopLoadingPage();
        })
      }
    }, 1);
  }
}
