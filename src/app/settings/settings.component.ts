import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { Observable, Subscription } from 'rxjs';

import { GenericModule } from '../generic/generic.modules';

import { AppComponent } from '../app.component';

import { User } from '../Class/User';

@Component({
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  @ViewChild('EditBar') private EditBar: ElementRef;

  private Reponse_getUserById: Observable<Object>;
  private subscribe: Subscription;

  public _currentUser: User;
  private statut: boolean;
  private try: number;

  constructor(private app:AppComponent, private router: Router, private generic: GenericModule) {
    this.Reponse_getUserById = new Observable<Object>();
    this._currentUser = new User(null);
    this.statut = true;
    this.try = 0;
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
      if(events.ok && events.body !== undefined) {
        var data: any = events.body;
        var data_r: User = null;
        data_r = this.generic.createUser(data.data);
        if(data_r !== null) {
          this._currentUser = data_r;
          statut_Reponse_getUserById = true;
        }
      }
    })

    this.subscribe = this.Reponse_getUserById.subscribe((data) => {
      var b = setInterval(() => {
        if(statut_Reponse_getUserById) {
          clearInterval(b);
  
          if(!this._currentUser.group.rightGroupPage.Settings_Access) {
            console.log("Vous n'avez pas la permission d'accedez à cette page");
            this.router.navigate(['/Accueil']);
          }
  
          if(this.EditBar.nativeElement !== null)
            document.getElementById("footer").style.marginBottom = this.EditBar.nativeElement.offsetHeight - 6 + "px";
          
            this.app.stopLoadingPage();
        }
      }, 1);
    })
  }

  // Traitement a la fermeture de l'application
  public ngOnDestroy(): void {
    this.statut = false;
    if(this.subscribe !== undefined)
      this.subscribe.unsubscribe();
  }
}
