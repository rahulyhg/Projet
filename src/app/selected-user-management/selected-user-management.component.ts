import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AppComponent } from '../app.component';
import { UserManagementComponent } from '../user-management/user-management.component';

import { User } from '../Class/User';
import { Group } from '../Class/Group';

import { UserService } from '../user.service';
import { GroupService } from '../group.service';


@Component({
  selector: 'app-selected-user-management',
  templateUrl: './selected-user-management.component.html',
  styleUrls: ['./selected-user-management.component.css']
})
export class SelectedUserManagementComponent implements OnInit {
  private _currentUser: User;
  private _RightEdit: boolean;
  private GroupList: Group[];
  private post: any;
  private SelectedUserManagementForm: FormGroup;
  private user: User;

  constructor(private route: ActivatedRoute, private app: AppComponent, private userApi: UserService, private router: Router,
    private fb: FormBuilder, private groupApi: GroupService) { 
      this.user = new User(null);
      this._currentUser = new User(null);
      this._RightEdit = false;
    }


  ngOnInit(): void { 
    this.app.ngOnInit();
    this._currentUser = this.app._currentUser;

    if(!this._currentUser.group.rightGroupPage.access_MonCompte) {
      console.log("Vous n'avez pas la permission d'accedez à cette page");
      this.router.navigate(['/Accueil']);
      this.ngOnInit();
    }

    this.getUserById();
    this.getGroupList();
    
    this.initData();
  }

  private getUserById(): void {
    this.user = new User(this.userApi.getUserById(Number(this.route.snapshot.paramMap.get('id'))));
  }

  private getGroupList(): void {
    this.GroupList = this.groupApi.getGroupList();
  }

  private initData(): void {
    this._RightEdit = false;
    this.SelectedUserManagementForm = this.fb.group({
      'id': this.user.id,
      'statut': this.user.statut,
      'login' : this.user.login,
      'password' : this.user.password,
      'date_time_signIn' : this.ConvertDate(this.user.date_time_signIn),
      'date_time_logIn' : this.ConvertDate(this.user.date_time_logIn),
      'group' : new FormControl(this.user.group),
      'profile' : this.user.profile,
      'gameTag' : this.user.gameTag,
      'name' : this.user.name,
      'firstName' : this.user.firstName,
      'birthDate' : this.user.birthDate
    });
  }

  private ConvertDate(date: string): string {
    if(date !== null) {
      var date_t = (date.split(' ')[0]).split('-');
      var time_t = (date.split(' ')[1]).split(':');
      return date_t[0]+"-"+date_t[1]+"-"+date_t[2]+"T"+time_t[0]+":"+time_t[1]+":"+time_t[2];
    }
  }

  private ChangeRightEdit(): void {
    if(!this._RightEdit) {
      this._RightEdit = true;
    } else {
      this._RightEdit = false;
    }
  }

  private editUse(post: any): void {
    this.user = new User(post);
    console.log(this.user);
  }
}
