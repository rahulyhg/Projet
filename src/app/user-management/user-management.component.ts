import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

import { GenericModule } from '../generic/generic.modules';

import { AppComponent } from '../app.component';

import { User } from '../Class/User';

import { UserService } from '../Services/user.service';

@Component({
  templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit {
  private Reponse_getUserById: Observable<Object>;
  private Reponse_getUserList: Observable<Object>;

  private displayedColumns: string[];
  public _currentUser: User;
  private UserList: User[];
  private try: number;

  constructor(private app:AppComponent, private router: Router, private userApi: UserService, private generic: GenericModule) {
    this.Reponse_getUserById = new Observable<Object>();
    this.Reponse_getUserList = new Observable<Object>();

    this.displayedColumns = ['id', 'login', 'inscription', 'connection', 'group'];
    this._currentUser = new User(null);
    this.UserList = new User(null)[2];
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
    var statut_Reponse_getUserList: boolean;

    this.Reponse_getUserById = this.app.Reponse_getUserById;
    this.Reponse_getUserById.subscribe((events: Response) => {
      if(event && events.body !== undefined) {
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

        this.Reponse_getUserList = this.userApi.getUserList();
        this.Reponse_getUserList.subscribe((events: Response) => {
          if(event && events.body !== undefined) {
            var data: any = events.body;
            var data_r: User[] = null;
            for(let user of data.data) {
              if(user.group.name.split('_')[1] === "user") {
                user.group.name = "Groupe personnel de droit de " + user.login;
                user.group.rightGroupPage.name = user.group.name
              }
            }
            data_r = this.generic.createUserList(data.data);
            if(data_r !== null) {
              this.UserList = data_r;
              statut_Reponse_getUserList = true;
            }
          }
        })
      }
    }, 1);

    this.Reponse_getUserById.subscribe((data) => {
      var c = setInterval(() => {
        if(statut_Reponse_getUserById) {
          clearInterval(c);

          if(!this._currentUser.group.rightGroupPage.UserManagement_Access) {
            console.log("Vous n'avez pas la permission d'accedez à cette page");
            this.router.navigate(['/Accueil']);
          }

          this.app.stopLoadingPage();
        }
      }, 1);
    })
  }
}
