import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

import { GenericModule } from '../generic/generic.modules';

import { AppComponent } from '../app.component';

import { User } from '../Class/User';

@Component({
  templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent implements OnInit {
  public _currentUser: User;
  public Reponse_getUserById: Observable<Object>;

  constructor(private app: AppComponent, private generic: GenericModule, private router: Router) { 
    this.Reponse_getUserById = new Observable<Object>();
    this._currentUser = new User(null);
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
          this.app.stopLoadingPage();
        })
      }
    }, 1);
  }

}
