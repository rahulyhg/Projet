import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { AppComponent } from '../app.component';

import { Api } from '../Class/Api';
import { User } from '../Class/User';

import { UserService } from '../Services/user.service';

@Component({
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  private Reponse_getUserById: Observable<Api>;
  private Reponse_getUserById_form: Observable<Api>;

  public _currentUser: User;
  private user: User;
  private one: string;
  private canEdit: boolean;

  constructor(private app:AppComponent, private router: Router, private userApi: UserService, private route: ActivatedRoute) { 
    this.Reponse_getUserById = null;
    this._currentUser = new User(null);
    this.user = new User(null);
    this.one = null;
    this.canEdit = false;
  }

  ngOnInit(): void { 
    this.router.events.subscribe((path: any) => {
      if(path.url !== undefined && path.url !== this.one && path.url.split("/")[1] === "User") {
        this.one = path.url
        this.ngOnInit();
      }
    });

    this.app.ngOnInit();
    this.Reponse_getUserById = this.app.Reponse_getUserById;

    if(this.Reponse_getUserById === null) {
      this._currentUser = new User(null);

      if(!this._currentUser.group.rightGroupPage.User_Access) {
        console.log("Vous n'avez pas la permission d'accedez à cette page");
        this.router.navigate(['/Accueil']);
      }
    } else {
      this.Reponse_getUserById.subscribe((data: Api) => {
        this._currentUser = data.data

        if(!data.data.group.rightGroupPage.User_Access) {
          console.log("Vous n'avez pas la permission d'accedez à cette page");
          this.router.navigate(['/Accueil']);
        }

        if(this.router.url !== "/User/MonCompte")
          this.Reponse_getUserById_form = this.userApi.getUserById(Number(this.route.snapshot.paramMap.get('id')));
        else
          this.Reponse_getUserById_form = this.userApi.getUserById(this._currentUser.id);

        this.Reponse_getUserById_form.subscribe((data: Api) => {
          this.user = data.data;

          this.canEdit = false;

          if(this._currentUser.id === this.user.id) {
            this.canEdit = true;
          }
        })
      })
    }
  }

  private editUser(): void {
    console.log("editer mon compte");
  }
}