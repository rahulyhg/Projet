import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AppComponent } from '../app.component';

import { User } from '../User/User';
import { Group } from '../Group/Group';
import { RightGroupPage } from '../RightGroupPage/RightGroupPage';

import { UserService } from '../User/user.service';
import { GroupService } from '../Group/group.service';
import { RightGroupPageService } from '../RightGroupPage/RightGroupPage.service';

@Component({
  templateUrl: './selected-user-management.component.html'
})
export class SelectedUserManagementComponent implements OnInit {
  public _currentUser: User;
  private _RightEdit: boolean;
  private change_defaut_rightGroupPage: boolean;
  private RightGroupPageList: RightGroupPage[];
  private GroupList: Group[];
  private post: any;
  private SelectedUserManagementForm: FormGroup;
  private user: User;
  private initial_user: User;
  private isPassword: boolean;
  private MsgGroupDelete: string;

  constructor(private route: ActivatedRoute, private app: AppComponent, private userApi: UserService, private router: Router,
    private fb: FormBuilder, private groupApi: GroupService, private rightGroupPageApi: RightGroupPageService) { 
      this._currentUser = new User(null);
      this._RightEdit = false;
      this.change_defaut_rightGroupPage = false;
      this.RightGroupPageList = null;
      this.GroupList = null;
      this.post = null;
      this.SelectedUserManagementForm = null;
      this.user = new User(null);
      this.initial_user = new User(this.userApi.getUserById(Number(this.route.snapshot.paramMap.get('id'))));
      this.isPassword = true;
      this.MsgGroupDelete = null;
    }

  ngOnInit(): void { 
    this.app.ngOnInit();
    this._currentUser = this.app._currentUser;

    if(!this._currentUser.group.rightGroupPage.access_MonCompte) {
      console.log("Vous n'avez pas la permission d'accedez à cette page");
      this.router.navigate(['/Accueil']);
      this.ngOnInit();
    }

    //this.getUserById();
    this.user = new User(this.userApi.getUserById(Number(this.route.snapshot.paramMap.get('id'))));
    //this.initial_user = this.user;

    this.getGroupList();
    this.getRightGroupPageList();
    this.initData();

    var index: number = this.RightGroupPageList.findIndex(d => d.id === this.user.group.rightGroupPage.id);
    this.setRightEditSelected(index);
  }

  private getUserById(): void {
    
  }

  private getGroupList(): void {
    this.GroupList = this.groupApi.getGroupList();
  }

  private getRightGroupPageList(): void {
    this.RightGroupPageList = this.rightGroupPageApi.getRightGroupPageList();
  }

  private setRightEditSelected(idd: any): void {
    this.change_defaut_rightGroupPage = false;
    var id: number = this.test(idd);
    this.user.group.rightGroupPage = this.RightGroupPageList[id];
    this.initData();
  }

  private setGroupSelected(idd: any): void {
    var id: number = this.test(idd);
    this.user.group = this.GroupList[id];
    this.initData();
  }

  private test(value: any): number {
    value = "" + value;
    return Number(value.split(":")[0]);
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
      'birthDate' : this.user.birthDate,
      'RightGroupPage' : this.user.group.rightGroupPage,
      'access_Main' : this.user.group.rightGroupPage.access_Main,
      'access_Accueil' : this.user.group.rightGroupPage.access_Accueil,
      'access_Login' : this.user.group.rightGroupPage.access_Login,
      'access_MonCompte' : this.user.group.rightGroupPage.access_MonCompte,
      'access_Main_EditBar' : this.user.group.rightGroupPage.access_Main_EditBar,
      'access_Main_EditBar_Dev' : this.user.group.rightGroupPage.access_Main_EditBar_Dev,
      'access_Main_EditBar_Edit' : this.user.group.rightGroupPage.access_Main_EditBar_Edit,
      'access_SelectedUserManagement' : this.user.group.rightGroupPage.access_SelectedUserManagement,
      'access_UserManagement' : this.user.group.rightGroupPage.access_UserManagement
    });

    var index: number = this.GroupList.findIndex(d => d.id === this.user.group.id);
    this.SelectedUserManagementForm.get('group').setValue(this.GroupList[index]);

    var index = this.RightGroupPageList.findIndex(d => d.id === this.user.group.rightGroupPage.id);
    this.SelectedUserManagementForm.get('RightGroupPage').setValue(this.RightGroupPageList[index]);

    if(this.initial_user.group.rightGroupPage.name.split('_')[1] === "user" && this.user.group.rightGroupPage.name.split('_').length === 1) {
      this.MsgGroupDelete = "En séléctionnant un group prédefinit, vous allez supprimer le groupe personnalisé de l'utiliateur";
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

    if(this.initial_user.group.rightGroupPage.name.split('_')[1] === "user" && this.change_defaut_rightGroupPage) {
      console.log("modification du groupe perso de d'utilisateur");
      var rightGroupPage: RightGroupPage = new RightGroupPage(post);
      rightGroupPage.id = this.initial_user.group.rightGroupPage.id,
      rightGroupPage.name = this.initial_user.group.rightGroupPage.name;
      this.rightGroupPageApi.putRightGroupPage(this.initial_user.group.rightGroupPage.id, rightGroupPage);
    }
    if(this.change_defaut_rightGroupPage && this.initial_user.group.rightGroupPage.name.split('_')[1] !== "user") {
      console.log("Nouveau groupe perso pour l'utilisateur");

      var index = this.RightGroupPageList.findIndex(d => d.name === "_user_" + this.initial_user.id);
      if(index === -1) {
        var rightGroupPage: RightGroupPage = new RightGroupPage(post);
        rightGroupPage.id = 3,
        rightGroupPage.name = "_user_" + this.initial_user.id;
        this.rightGroupPageApi.postRightGroupPage(rightGroupPage);
      }

      index = this.GroupList.findIndex(d => d.name === "_user_" + this.initial_user.id);
      if(index === -1) {
        var group: Group = new Group(null);
        group.id = 3;
        group.name = "_user_" + this.initial_user.id;
        group.rightGroupPage = rightGroupPage;
        this.groupApi.postGroup(group);
      }

      this.user.group = group;
    }
    if(this.user.group.rightGroupPage.name.split('_')[1] !== "user" && this.initial_user.group.rightGroupPage.name.split('_')[1] === "user") {
      console.log("Attribution d'un group générique à l'utilisateur");
      this.groupApi.deleteGroup(this.initial_user.group.id);
      this.rightGroupPageApi.deleteRightGroupPage(this.initial_user.group.rightGroupPage.id);
    }

    this.userApi.putUser(post.id, this.user);
    this.router.navigate(['/UserManagement']);
    if(this.user.id === this._currentUser.id)
      this.app.logOut();
  }

  private showPassword(): void {
    this.isPassword = !(this.isPassword);
  }
}
