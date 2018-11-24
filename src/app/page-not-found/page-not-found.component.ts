import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable, Subscription } from 'rxjs';

import { GenericModule } from '../generic/generic.modules';

import { AppComponent } from '../app.component';

import { User } from '../Class/User';

@Component({
  templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent implements OnInit {
  public _currentUser: User;
  public Reponse_getUserById: Observable<Object>;
  private subscribe: Subscription;
  private statut: boolean;

  constructor(private app: AppComponent, private generic: GenericModule, private router: Router) { 
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
    this.subscribe = this.Reponse_getUserById.subscribe((events: Response) => {
      if(events.ok && events.body !== undefined && this.app.statut) {
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

        this.subscribe = this.Reponse_getUserById.subscribe((data) => { 
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
