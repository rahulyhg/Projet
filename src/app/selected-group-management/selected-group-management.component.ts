import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UploadEvent, FileSystemFileEntry } from '../../../node_modules/ngx-file-drop';

import { AppComponent } from '../app.component';

import { User } from '../User/User';
import { Group } from '../Group/Group';
import { RightGroupPage } from '../RightGroupPage/RightGroupPage';

import { GroupService } from '../Group/group.service';
import { RightGroupPageService } from '../RightGroupPage/RightGroupPage.service';

@Component({
  templateUrl: './selected-group-management.component.html'
})
export class SelectedGroupManagementComponent implements OnInit {
  public _currentUser: User;
  private change_defaut_rightGroupPage: boolean;
  private RightGroupPageList: RightGroupPage[];
  private post: any;
  private SelectedGroupManagementForm: FormGroup;
  private group: Group;
  private initial_group: Group;
  private MsgRightGroupPageDelete: string;

  constructor(private route: ActivatedRoute, private app: AppComponent, private router: Router,
    private fb: FormBuilder, private groupApi: GroupService, private rightGroupPageApi: RightGroupPageService) { 
      this._currentUser = new User(null);
      this.change_defaut_rightGroupPage = false;
      this.RightGroupPageList = null;
      this.post = null;
      this.SelectedGroupManagementForm = null;
      this.group = new Group(null);
      this.initial_group = new Group(this.groupApi.getGroupById(Number(this.route.snapshot.paramMap.get('id'))));
      this.MsgRightGroupPageDelete = null;
    }

  ngOnInit(): void { 
    this.app.ngOnInit();
    this._currentUser = this.app._currentUser;

    if(!this._currentUser.group.rightGroupPage.SelectedGroupManagement_Access) {
      console.log("Vous n'avez pas la permission d'accedez à cette page");
      this.router.navigate(['/Accueil']);
    }
    if(Number(this.route.snapshot.paramMap.get('id')) === 1 && !this._currentUser.group.rightGroupPage.GroupManagement_EditDefaultGroup) {
      console.log("Vous n'avez pas la permission d'accedez à cette page");
      this.router.navigate(['/Accueil']);
    }
    if(this.route.snapshot.paramMap.get('id') === "New" && !this._currentUser.group.rightGroupPage.GroupManagement_AddGroup) {
      console.log("Vous n'avez pas la permission d'accedez à cette page");
      this.router.navigate(['/Accueil']);
    }

    if(this.route.snapshot.paramMap.get('id') !== "New")
      this.getGroupById();

    if(this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditRightPage) {
      this.getRightGroupPageList();
    }
      
    this.initData();

    if(this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditRightPage) {
      var index: number = this.RightGroupPageList.findIndex(d => d.id === this.group.rightGroupPage.id);
      this.setRightEditSelected(index, null);
    }
  }

  private getGroupById(): void {
    this.group = new Group(this.groupApi.getGroupById(Number(this.route.snapshot.paramMap.get('id'))));
  }

  private getRightGroupPageList(): void {
    if(this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditRightPage)
      this.RightGroupPageList = this.rightGroupPageApi.getRightGroupPageList();
  }

  private setRightEditSelected(idd: any, post: any): void {
    if(this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditRightPage) {
      if(post !== null && post !== undefined)
        this.group.name = post.name;
      this.change_defaut_rightGroupPage = false;
      var value = "" + idd;
      var id: number = Number(value.split(":")[0]);
      this.group.rightGroupPage = this.RightGroupPageList[id];
      this.initData();
    } else
      console.log("Vous n'avez pas la permission pour effectuer cette action");
  }

  private initData(): void {
    this.SelectedGroupManagementForm = this.fb.group({
      'id': this.group.id,
      'name': this.group.name,
      'RightGroupPage' : this.group.rightGroupPage,
      'access_Main' : this.group.rightGroupPage.access_Main,
      'access_Accueil' : this.group.rightGroupPage.access_Accueil,
      'access_Login' : this.group.rightGroupPage.access_Login,
      'access_MonCompte' : this.group.rightGroupPage.access_MonCompte,
      'access_Main_EditBar' : this.group.rightGroupPage.access_Main_EditBar,
      'access_Main_EditBar_Dev' : this.group.rightGroupPage.access_Main_EditBar_Dev,
      'access_Main_EditBar_Edit' : this.group.rightGroupPage.access_Main_EditBar_Edit,
      'SelectedUserManagement_Access' : this.group.rightGroupPage.SelectedUserManagement_Access,
      'UserManagement_Access' : this.group.rightGroupPage.UserManagement_Access
    });

    if(this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditRightPage) {
      var index = this.RightGroupPageList.findIndex(d => d.id === this.group.rightGroupPage.id);
      this.SelectedGroupManagementForm.get('RightGroupPage').setValue(this.RightGroupPageList[index]);
    }
  }

  private NameChange(post: string): void {
    if(this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditRightPage) {
      this.RightGroupPageList[0].name = post;
      this.SelectedGroupManagementForm.get('RightGroupPage').setValue(this.RightGroupPageList[0]);
    }
  }

  private editUse(post: any): void {
    // ##
    if(this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditGroup || this._currentUser.group.rightGroupPage.GroupManagement_AddGroup || this._currentUser.group.rightGroupPage.GroupManagement_EditDefaultGroup) {
      var rightGroupPage: RightGroupPage = new RightGroupPage(post);
      this.group = new Group(post);
      this.group.rightGroupPage = rightGroupPage;
      this.group.rightGroupPage.name = this.group.name;

      if(this.route.snapshot.paramMap.get('id') === "New") {
        this.group.id = 3;
        this.groupApi.postGroup(this.group);
        this.router.navigate(['/GroupManagement']);
      } else {
        this.groupApi.putGroup(this.group.id, this.group);
        this.rightGroupPageApi.putRightGroupPage(this.group.rightGroupPage.id, this.group.rightGroupPage);
        this.router.navigate(['/GroupManagement']);
        if(this.group.id === this._currentUser.group.id)
          this.app.logOut();
      }
    } else
      console.log("Vous n'avez pas la permission pour effectuer cette action");
  }

  private DeleteGroup(): void {
    if(this._currentUser.group.rightGroupPage.SelectedGroupManagement_DeleteGroup) {
      this.groupApi.deleteGroup(this.group.id);

      this.router.navigate(['/GroupManagement']);
      if(this.group.id === this._currentUser.id)
        this.app.logOut();
    } else 
      console.log("Vous n'avez pas la permission pour effectuer cette action");
  }
}
