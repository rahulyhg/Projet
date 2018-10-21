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
      this.initial_user = new User(this.userApi.getUserById(Number(this.route.snapshot.paramMap.get('id'))));
      this.isPassword = true;
      this.MsgGroupDelete = null;
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

    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser) {
      this.getGroupList();
      this.getRightGroupPageList();
    }
      
    this.initData();

    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser) {
      var index: number = this.RightGroupPageList.findIndex(d => d.id === this.user.group.rightGroupPage.id);
      this.setRightEditSelected(index);
    }
  }

  private getUserById(): void {
    this.user = new User(this.userApi.getUserById(Number(this.route.snapshot.paramMap.get('id'))));
  }

  private getGroupList(): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser)
      this.GroupList = this.groupApi.getGroupList();
  }

  private getRightGroupPageList(): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser)
      this.RightGroupPageList = this.rightGroupPageApi.getRightGroupPageList();
  }

  private setRightEditSelected(idd: any): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser) {
      this.change_defaut_rightGroupPage = false;
      var value = "" + idd;
      var id: number = Number(value.split(":")[0]);
      this.user.group.rightGroupPage = this.RightGroupPageList[id];
      this.initData();
    } else
      console.log("Vous n'avez pas la permission pour effectuer cette action");
  }

  private setGroupSelected(idd: any): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser) {
      this._RightEdit = true;
      var value = "" + idd;
      var id: number = Number(value.split(":")[0]);
      this.user.group = this.GroupList[id];
      this.initData();
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
      'access_Main' : this.user.group.rightGroupPage.access_Main,
      'access_Accueil' : this.user.group.rightGroupPage.access_Accueil,
      'access_Login' : this.user.group.rightGroupPage.access_Login,
      'access_MonCompte' : this.user.group.rightGroupPage.access_MonCompte,
      'access_Main_EditBar' : this.user.group.rightGroupPage.access_Main_EditBar,
      'access_Main_EditBar_Dev' : this.user.group.rightGroupPage.access_Main_EditBar_Dev,
      'access_Main_EditBar_Edit' : this.user.group.rightGroupPage.access_Main_EditBar_Edit,
      'SelectedUserManagement_Access' : this.user.group.rightGroupPage.SelectedUserManagement_Access,
      'UserManagement_Access' : this.user.group.rightGroupPage.UserManagement_Access
    });

    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser) {
      var index: number = this.GroupList.findIndex(d => d.id === this.user.group.id);
      this.SelectedUserManagementForm.get('group').setValue(this.GroupList[index]);

      var index = this.RightGroupPageList.findIndex(d => d.id === this.user.group.rightGroupPage.id);
      this.SelectedUserManagementForm.get('rightGroupPage').setValue(this.RightGroupPageList[index]);

      if(this.initial_user.group.rightGroupPage.name.split('_')[1] === "user" && this.user.group.rightGroupPage.name.split('_').length === 1) {
        this.MsgGroupDelete = "En séléctionnant un group prédefinit, vous allez supprimer le groupe personnalisé de l'utiliateur";
      } else {
        this.MsgGroupDelete = null;
      }
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
        this.user.id = 3;
  
        this.userApi.postUser(this.user);
        this.router.navigate(['/UserManagement']);
      } else {
        post.date_time_logIn = post.date_logIn + " " + post.time_logIn;
        post.date_time_signIn = post.date_signIn + " " + post.time_signIn;
    
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
