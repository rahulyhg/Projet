import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { Observable, Subscription } from 'rxjs';

import { GenericModule } from '../generic/generic.modules';

import { AppComponent } from '../app.component';

import { User } from '../Class/User';

@Component({
  templateUrl: './accueil.component.html'
})
export class AccueilComponent implements OnInit {
  private Reponse_getUserById: Observable<Object>;
  private subscribe: Subscription;
  public _currentUser: User;
  private statut: boolean;

  constructor(private app:AppComponent, private router: Router, private generic: GenericModule) {
    this.Reponse_getUserById = new Observable<Object>();
    this._currentUser = new User(null);
    this.statut = true;
  }

  public ngOnInit(): void { 
    var t = setInterval(() => {
      if(this.app.statut_app && this.statut) {
        clearInterval(t);
  
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
    }, 1);
  }

  private Init(): void {
    var statut_Reponse_getUserById: boolean = false;

    this.Reponse_getUserById = this.app.Reponse_getUserById;
    var data_r: User = null;
    data_r = this.generic.createUser(this.app._currentUser);

    if(data_r !== null) {
      this._currentUser = data_r;
      statut_Reponse_getUserById = true;
    }

    var b = setInterval(() => {
      if(statut_Reponse_getUserById) {
        clearInterval(b);

        this.subscribe = this.Reponse_getUserById.subscribe((data) => { 
          if(!this._currentUser.group.rightGroupPage.Accueil_Access) {
            console.log("Vous n'avez pas la permission d'accedez à cette page");
            this.router.navigate(['/Accueil']);
          }

          this.app.stopLoadingPage();
        })
      }
    }, 1);
  }

  // Traitement a la fermeture de l'application
  public ngOnDestroy(): void {
    this.statut = false;
    if(this.subscribe !== undefined)
      this.subscribe.unsubscribe();
  }
}
