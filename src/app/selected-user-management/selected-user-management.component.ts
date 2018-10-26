import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UploadEvent, FileSystemFileEntry } from '../../../node_modules/ngx-file-drop';

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
  private selectedFile: File;
  private MsgGroupPerso: string;

  constructor(private route: ActivatedRoute, private app: AppComponent, private userApi: UserService, private router: Router,
    private fb: FormBuilder, private groupApi: GroupService, private rightGroupPageApi: RightGroupPageService, private http: HttpClient) { 
      this._currentUser = new User(null);
      this._RightEdit = false;
      this.change_defaut_rightGroupPage = false;
      this.RightGroupPageList = null;
      this.GroupList = null;
      this.post = null;
      this.SelectedUserManagementForm = null;
      this.user = new User(null);
      if(this.route.snapshot.paramMap.get('id') !== "New")
        this.initial_user = new User(this.userApi.getUserById(Number(this.route.snapshot.paramMap.get('id'))));
      this.isPassword = true;
      this.MsgGroupDelete = null;
      this.MsgGroupPerso = null;
    }

  ngOnInit(): void { 
    this.app.ngOnInit();
    this._currentUser = this.app._currentUser;

    if(!this._currentUser.group.rightGroupPage.SelectedUserManagement_Access) {
      console.log("Vous n'avez pas la permission d'accedez à cette page");
      this.router.navigate(['/Accueil']);
    }

    if(Number(this.route.snapshot.paramMap.get('id')) === 1 && !this._currentUser.group.rightGroupPage.UserManagement_EditDefaultUser) {
      console.log("Vous n'avez pas la permission d'accedez à cette page");
      this.router.navigate(['/Accueil']);
    }

    if(this.route.snapshot.paramMap.get('id') === "New" && !this._currentUser.group.rightGroupPage.UserManagement_AddUser) {
      console.log("Vous n'avez pas la permission d'accedez à cette page");
      this.router.navigate(['/Accueil']);
    }

    this.getUserById();
    
    if(!this._currentUser.group.rightGroupPage.SelectedUserManagement_ViewPassword) {
      this.user.password = "";
      this.initial_user.password = "";
    }

    this.getGroupList();
    this.getRightGroupPageList();
      
    this.initData();

    var index: number = this.RightGroupPageList.findIndex(d => d.id === this.user.group.rightGroupPage.id);
    this.setRightEditSelected(index);

    if(this.route.snapshot.paramMap.get('id') !== "New") {
      if(this.initial_user.group.rightGroupPage.name.split('_')[1] === "user") {
        var index: number = this.GroupList.findIndex(d => d.id === this.user.group.id);
        var index1: number = this.RightGroupPageList.findIndex(d => d.id === this.user.group.rightGroupPage.id);
        this.GroupList[index].name = this.user.login;
        this.RightGroupPageList[index1].name = this.user.login;
        this.SelectedUserManagementForm.get('group').setValue(this.GroupList[index]);
        this.SelectedUserManagementForm.get('rightGroupPage').setValue(this.RightGroupPageList[index1]);
        this.MsgGroupPerso = "Groupe personnel de droit";
      }
    }

    if(this.route.snapshot.paramMap.get('id') === "New" || this.route.snapshot.paramMap.get('id') === "1")
      this._currentUser.group.rightGroupPage.SelectedUserManagement_DeleteUser = false; //Pour enlever le bouton supprimer
  }

  private getUserById(): void {
    if(this.route.snapshot.paramMap.get('id') !== "New")
      this.user = new User(this.userApi.getUserById(Number(this.route.snapshot.paramMap.get('id'))));
  }

  private getGroupList(): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser)
      this.GroupList = this.groupApi.getGroupList();
  }

  private getRightGroupPageList(): void {
    this.RightGroupPageList = this.rightGroupPageApi.getRightGroupPageList();
  }

  private setRightEditSelected(idd: any): void {
    this.change_defaut_rightGroupPage = false;
    var value = "" + idd;
    var id: number = Number(value.split(":")[0]);
    this.user.group.rightGroupPage = this.RightGroupPageList[id];
    this.initData();
  }

  private setGroupSelected(idd: any): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser) {
      this._RightEdit = true;
      var value = "" + idd;
      var id: number = Number(value.split(":")[0]);
      this.user.group = this.GroupList[id];
      this.initData();

      if(this.GroupList[id].name === this.user.login)
        this.MsgGroupPerso = "Groupe personnel de droit";
      else
        this.MsgGroupPerso = null;
    } else
      console.log("Vous n'avez pas la permission pour effectuer cette action");
  }

  private initData(): void {
    this.SelectedUserManagementForm = this.fb.group({
      'id': this.user.id,
      'statut': this.user.statut,
      'login' : this.user.login,
      'password' : this.user.password,
      'date_signIn' : this.user.date_time_signIn.split(' ')[0],
      'time_signIn' : this.user.date_time_signIn.split(' ')[1],
      'date_logIn' : this.user.date_time_logIn.split(' ')[0],
      'time_logIn' : this.user.date_time_logIn.split(' ')[1],
      'group' : this.user.group,
      'gameTag' : this.user.gameTag,
      'name' : this.user.name,
      'firstName' : this.user.firstName,
      'birthDate' : this.user.birthDate,
      'rightGroupPage' : this.user.group.rightGroupPage,
      'Main_Access' : this.user.group.rightGroupPage.Main_Access,
      'Accueil_Access' : this.user.group.rightGroupPage.Accueil_Access,
      'Login_Access' : this.user.group.rightGroupPage.Login_Access,
      'MonCompte_Access' : this.user.group.rightGroupPage.MonCompte_Access,
      'EditBar_Access' : this.user.group.rightGroupPage.EditBar_Access,
      'SelectedUserManagement_Access' : this.user.group.rightGroupPage.SelectedUserManagement_Access,
      'SelectedUserManagement_ViewPassword' : this.user.group.rightGroupPage.SelectedUserManagement_ViewPassword,
      'SelectedUserManagement_ShowPasswordButton' : this.user.group.rightGroupPage.SelectedUserManagement_ShowPasswordButton,
      'SelectedUserManagement_EditRightGroupPageUser' : this.user.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser,
      'SelectedUserManagement_DeleteUser' : this.user.group.rightGroupPage.SelectedUserManagement_DeleteUser,
      'SelectedUserManagement_EditUser' : this.user.group.rightGroupPage.SelectedUserManagement_EditUser,
      'UserManagement_Access' : this.user.group.rightGroupPage.UserManagement_Access,
      'UserManagement_AddUser' : this.user.group.rightGroupPage.UserManagement_AddUser,
      'UserManagement_EditDefaultUser' : this.user.group.rightGroupPage.UserManagement_EditDefaultUser,
      'GroupManagement_Access' : this.user.group.rightGroupPage.GroupManagement_Access,
      'GroupManagement_AddGroup' : this.user.group.rightGroupPage.GroupManagement_AddGroup,
      'GroupManagement_EditDefaultGroup' : this.user.group.rightGroupPage.GroupManagement_EditDefaultGroup,
      'SelectedGroupManagement_Access' : this.user.group.rightGroupPage.SelectedGroupManagement_Access,
      'SelectedGroupManagement_EditGroup' : this.user.group.rightGroupPage.SelectedGroupManagement_EditGroup,
      'SelectedGroupManagement_DeleteGroup' : this.user.group.rightGroupPage.SelectedGroupManagement_DeleteGroup,
      'SelectedGroupManagement_EditRightPage' : this.user.group.rightGroupPage.SelectedGroupManagement_EditRightPage,
      'EditBar_Dev' : this.user.group.rightGroupPage.EditBar_Dev,
      'EditBar_Edit' : this.user.group.rightGroupPage.EditBar_Edit
      //'EditBar_Edit' : 
    });

    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser) {
      var index: number = this.GroupList.findIndex(d => d.id === this.user.group.id);
      this.SelectedUserManagementForm.get('group').setValue(this.GroupList[index]);

      if(this.route.snapshot.paramMap.get('id') !== "New") {
        if(this.initial_user.group.rightGroupPage.name.split('_')[1] === "user" && this.user.group.rightGroupPage.name.split('_').length === 1) {
          this.MsgGroupDelete = "En séléctionnant un group prédefinit, vous allez supprimer le groupe personnalisé de l'utiliateur";
        } else {
          this.MsgGroupDelete = null;
        }
      }
    }

    var index = this.RightGroupPageList.findIndex(d => d.id === this.user.group.rightGroupPage.id);
    this.SelectedUserManagementForm.get('rightGroupPage').setValue(this.RightGroupPageList[index]);

    if(!this._currentUser.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser) {
      this.SelectedUserManagementForm.disable();
      this.SelectedUserManagementForm.get('id').enable();
      this.SelectedUserManagementForm.get('statut').enable();
      this.SelectedUserManagementForm.get('login').enable();
      this.SelectedUserManagementForm.get('password').enable();
      this.SelectedUserManagementForm.get('date_signIn').enable();
      this.SelectedUserManagementForm.get('time_signIn').enable();
      this.SelectedUserManagementForm.get('date_logIn').enable();
      this.SelectedUserManagementForm.get('time_logIn').enable();
      this.SelectedUserManagementForm.get('gameTag').enable();
      this.SelectedUserManagementForm.get('name').enable();
      this.SelectedUserManagementForm.get('firstName').enable();
      this.SelectedUserManagementForm.get('birthDate').enable();
      this._RightEdit = true;
    }
  }

  private ChangeRightEdit(): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser)
      this._RightEdit = !(this._RightEdit);
    else 
      console.log("Vous n'avez pas la permission pour effectuer cette action");
  }

  private editUse(post: any): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditUser || this._currentUser.group.rightGroupPage.UserManagement_AddUser || this._currentUser.group.rightGroupPage.UserManagement_EditDefaultUser) {
      if(this.route.snapshot.paramMap.get('id') === "New") {

        post.date_time_logIn = post.date_logIn + " " + post.time_logIn;
        post.date_time_signIn = post.date_signIn + " " + post.time_signIn;
    
        this.user = new User(post);
        this.user.id = 1;
  
        this.userApi.postUser(this.user);
        this.router.navigate(['/UserManagement']);
      } else {
        post.date_time_logIn = post.date_logIn + " " + post.time_logIn;
        post.date_time_signIn = post.date_signIn + " " + post.time_signIn;
    
        this.user = new User(post);
    
        if(this.initial_user.group.rightGroupPage.name.split('_')[1] === "user" && this.change_defaut_rightGroupPage && this._currentUser.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser) {
          console.log("modification du groupe perso de d'utilisateur");
          var rightGroupPage: RightGroupPage = new RightGroupPage(post);
          rightGroupPage.id = this.initial_user.group.rightGroupPage.id,
          rightGroupPage.name = this.initial_user.group.rightGroupPage.name;
          this.rightGroupPageApi.putRightGroupPage(this.initial_user.group.rightGroupPage.id, rightGroupPage);
        }
        if(this.change_defaut_rightGroupPage && this.initial_user.group.rightGroupPage.name.split('_')[1] !== "user" && this._currentUser.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser) {
          console.log("Nouveau groupe perso pour l'utilisateur");
    
          var index = this.RightGroupPageList.findIndex(d => d.name === "_user_" + this.initial_user.id);
          if(index === -1) {
            var rightGroupPage: RightGroupPage = new RightGroupPage(post);
            rightGroupPage.id = 1,
            rightGroupPage.name = "_user_" + this.initial_user.id;
            this.rightGroupPageApi.postRightGroupPage(rightGroupPage);
          }
    
          index = this.GroupList.findIndex(d => d.name === "_user_" + this.initial_user.id);
          if(index === -1) {
            var group: Group = new Group(null);
            group.id = 1;
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
  
        if(this.selectedFile !== null && this.selectedFile !== undefined)
          this.onUpload();
  
        this.userApi.putUser(post.id, this.user);
        this.router.navigate(['/UserManagement']);
        if(this.user.id === this._currentUser.id)
          this.app.logOut();
      }
    } else
      console.log("Vous n'avez pas la permission pour effectuer cette action");
  }

  private showPassword(): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_ShowPasswordButton)
      this.isPassword = !(this.isPassword);
    else
      console.log("Vous n'avez pas la permission pour effectuer cette action");
  }

  private DeleteUser(): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_DeleteUser) {
      this.userApi.deleteUser(this.user.id);

      this.router.navigate(['/UserManagement']);
      if(this.user.id === this._currentUser.id)
        this.app.logOut();
    } else 
      console.log("Vous n'avez pas la permission pour effectuer cette action");
  }

  private imageChangeClick(event): void {
    this.selectedFile = event.target.files[0];
    this.onUpload();
  }

  private onUpload(): void {
    var uploadData: FormData = new FormData();
    var name: string = "profile" + Math.random() * 1000 + ".jpg";
    uploadData.append('myFile', this.selectedFile, name);
    this.http.post('https://dev.kevin-c.fr/api/file.php', uploadData, { observe: 'events' })
    .subscribe(event => {
      if(event)
        this.newImage(event, name);
    });
  }

  private newImage(ok: any, name: string): void {
    if(ok.ok)
      this.user.profile = "https://dev.kevin-c.fr/api/uploads/" + name;
  }

  public imageChangeDrag(event: UploadEvent): void {
    (event.files[0].fileEntry as FileSystemFileEntry).file((file: File) => { this.selectedFile = file; this.onUpload(); });
  }
}
