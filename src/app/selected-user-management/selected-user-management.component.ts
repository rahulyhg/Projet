import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AppComponent } from '../app.component';

import { User } from '../User/User';
import { Group } from '../Group/Group';

import { UserService } from '../User/user.service';
import { GroupService } from '../Group/group.service';


@Component({
  templateUrl: './selected-user-management.component.html'
})
export class SelectedUserManagementComponent implements OnInit {
  private _currentUser: User;
  private _RightEdit: boolean;
  private GroupList: Group[];
  private post: any;
  private SelectedUserManagementForm: FormGroup;
  private user: User;
  private isPassword: boolean;

  constructor(private route: ActivatedRoute, private app: AppComponent, private userApi: UserService, private router: Router,
    private fb: FormBuilder, private groupApi: GroupService) { 
      this._currentUser = new User(null);
      this._RightEdit = false;
      this.GroupList = null;
      this.post = null;
      this.SelectedUserManagementForm = null;
      this.user = new User(null);
      this.isPassword = true;
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
    this.SelectedUserManagementForm = this.fb.group({
      'id': this.user.id,
      'statut': this.user.statut,
      'login' : this.user.login,
      'password' : this.user.password,
      'date_time_signIn' : this.ConvertDate(this.user.date_time_signIn),
      'date_time_logIn' : this.ConvertDate(this.user.date_time_logIn),
      'group' : this.user.group,
      'profile' : this.user.profile,
      'gameTag' : this.user.gameTag,
      'name' : this.user.name,
      'firstName' : this.user.firstName,
      'birthDate' : this.user.birthDate
    });

    this.SelectedUserManagementForm.get('statut').setValue(this.user.statut);

    for (var group of this.GroupList) {
      if(group.id === this.user.group.id) 
        this.SelectedUserManagementForm.get('group').setValue(group);
    }
  }

  private ConvertDate(date: string): string {
    if(date !== null) {
      var date_t: string[] = (date.split(' ')[0]).split('-');
      var time_t: string[] = (date.split(' ')[1]).split(':');
      return date_t[0]+"-"+date_t[1]+"-"+date_t[2]+"T"+time_t[0]+":"+time_t[1]+":"+time_t[2];
    }
  }

  private ConvertDateInverse(date: string): string {
    if(date !== null) {
      var date_tab: string[] = date.split('T');
      return date_tab[0] + " " + date_tab[1];
    }
  }

  private ChangeRightEdit(): void {
    this._RightEdit = !(this._RightEdit);
  }

  private editUse(post: any): void {
    post.date_time_logIn = this.ConvertDateInverse(post.date_time_logIn);
    post.date_time_signIn = this.ConvertDateInverse(post.date_time_signIn);
    this.user = new User(post);
    this.userApi.putUser(post.id, this.user);
    this.router.navigate(['/UserManagement']);
    if(this.user.id === this._currentUser.id)
      this.app.logOut();
  }

  private showPassword(): void {
    this.isPassword = !(this.isPassword);
  }
}
