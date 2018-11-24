import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable, Subscription } from 'rxjs';

import { GenericModule } from '../generic/generic.modules';

import { AppComponent } from '../app.component';

import { Api } from '../Class/Api';
import { User } from '../Class/User'; 
import { Group } from '../Class/Group';

import { GroupService } from '../Services/group.service';
import { UserService } from '../Services/user.service';

@Component({
  templateUrl: './group-management.component.html'
})
export class GroupManagementComponent implements OnInit {
  private Reponse_getUserById: Observable<Object>;
  private Reponse_getUserList: Observable<Object>;
  private Reponse_getGroupList: Observable<Object>;
  private subscribe: Subscription;

  private displayedColumns: string[];
  public _currentUser: User;
  private GroupList: Group[];
  private UserList: User[];
  private statut: boolean;
  private try: number;

  constructor(private app: AppComponent, private router: Router, private groupApi: GroupService, private userApi: UserService, private generic: GenericModule) {
    this.Reponse_getUserById = new Observable<Object>();
    this.Reponse_getUserList = new Observable<Object>();
    this.Reponse_getGroupList = new Observable<Object>();

    this.displayedColumns = ['id', 'name', 'rightGroupPage'];

    this._currentUser = new User(null);
    this.GroupList = new Group(null)[2];
    this.UserList = new User(null)[2];
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
    var statut_Reponse_getUserList: boolean = false;
    var statut_Reponse_getGroupList: boolean = false;

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

    var b = setInterval(() => {
      if(statut_Reponse_getUserById) {
        clearInterval(b);

        this.userApi.token = this._currentUser.token;

        this.Reponse_getUserList = this.userApi.getUserList();
        this.subscribe = this.Reponse_getUserList.subscribe((events: Response) => {
          if(events.ok && events.body !== undefined && statut_Reponse_getUserById) {
            var data: any = events.body;
            var data_r: User[] = null;
            data_r = this.generic.createUserList(data.data);
            if(data_r !== null) {
              this.UserList = data_r;
              statut_Reponse_getUserList = true;
            }
          }
        })
      }
    }, 1);

    var c = setInterval(() => {
      if(statut_Reponse_getUserList) {
        clearInterval(c);

        this.groupApi.token = this._currentUser.token;

        this.Reponse_getGroupList = this.groupApi.getGroupList();
        this.subscribe = this.Reponse_getGroupList.subscribe((events: Response) => {
          if(events.ok && events.body !== undefined && statut_Reponse_getUserList) {
            var data: any = events.body;
            var data_r: Group[] = null;
            for(let group of data.data) {
              if(group.name.split('_')[1] === "user") {
                group.name = "Groupe personnel de droit de " + this.UserList[this.UserList.findIndex(d => d.id === Number(group.name.split('_')[2]))].login;
                group.rightGroupPage.name = group.name
              }
            }
            data_r = this.generic.createGroupList(data.data);
            if(data_r !== null) {
              this.GroupList = data_r;
              statut_Reponse_getGroupList = true;
            }
          }
        })
      }
    }, 1);

    var d = setInterval(() => {
      if(statut_Reponse_getUserById) {
        clearInterval(d);

        this.subscribe = this.Reponse_getUserById.subscribe((data) => { 
          if(!this._currentUser.group.rightGroupPage.GroupManagement_Access) {
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
