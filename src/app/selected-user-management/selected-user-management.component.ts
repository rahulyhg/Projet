import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileSystemFileEntry } from '../../../node_modules/ngx-file-drop';
import { HttpClient } from '@angular/common/http';

import { AppComponent } from '../app.component';

import { User } from '../Class/User';
import { Group } from '../Class/Group';
import { RightGroupPage } from '../Class/RightGroupPage';

import { UserService } from '../Services/user.service';
import { GroupService } from '../Services/group.service';
import { RightGroupPageService } from '../Services/RightGroupPage.service';
import { UploadService } from '../Services/uploads.service';

@Component({
  templateUrl: './selected-user-management.component.html'
})
export class SelectedUserManagementComponent implements OnInit {
  public _currentUser: User;
  private _RightEdit: boolean;
  private _ChangeRightPage: boolean;
  private RightGroupPageList: RightGroupPage[];
  private GroupList: Group[];
  private SelectedUserManagementForm: FormGroup;
  private user: User;
  private initial_user: User;
  private isPassword: boolean;
  private MsgGroupDelete: string;
  private MsgGroupPerso: string;
  private PlaceHolder: User;

  constructor(private route: ActivatedRoute, private app: AppComponent, private userApi: UserService, private router: Router,
    private fb: FormBuilder, private groupApi: GroupService, private rightGroupPageApi: RightGroupPageService, private uploadApi: UploadService) { 
      this._currentUser = new User(null);
      this._RightEdit = false;
      this._ChangeRightPage = false;
      this.RightGroupPageList = null;
      this.GroupList = null;
      this.SelectedUserManagementForm = null;
      this.user = new User(null);
      var id: number = 2;
      if(this.route.snapshot.paramMap.get('id') !== "New") { id = Number(this.route.snapshot.paramMap.get('id')) }
      this.initial_user = new User(this.userApi.getUserById(id));
      this.isPassword = true;
      this.MsgGroupDelete = null;
      this.MsgGroupPerso = null;
      this.PlaceHolder = new User(null);
    }

  ngOnInit(): void { 
    // Initialisation de la page
    this.app.ngOnInit();
    this._currentUser = this.app._currentUser;

    // Récupération des données de l'utilisateur que l'on va modifier UNIQUEMENT si ce n'est pas la création d'un nouveau user
    // On indique également si il sagit d'un groupe perso ou pas
    if(this.route.snapshot.paramMap.get('id') !== "New") {
      this.user = new User(this.userApi.getUserById(Number(this.route.snapshot.paramMap.get('id'))));
      if(this.initial_user.group.name === this.initial_user.login)
        this.MsgGroupPerso = "Groupe personnel de droit";
    } else 
      this.user = new User(this.userApi.getUserById(1));

    // On verifit que l'utilisateur que l'on veut editer existe reellement
    if(this.user.id !== Number(this.route.snapshot.paramMap.get('id')) && this.route.snapshot.paramMap.get('id') !== "New")
      this.router.navigate(['/UserManagement']);

    // Si on modifie un utilisateur ou que l'on edite l'utilisateur par defaut, on enlève le bouton supprimer
    if(this.route.snapshot.paramMap.get('id') === "New" || this.route.snapshot.paramMap.get('id') === "1")
      this._currentUser.group.rightGroupPage.SelectedUserManagement_DeleteUser = false;

    // Récupération de la liste des groupes
    this.GroupList = this.groupApi.getGroupList();

    // Récupération de la liste des groupes de droit de pages
    this.RightGroupPageList = this.rightGroupPageApi.getRightGroupPageList();

    // Supprime de la liste les groupes perso (autre que celui en cours) et remplace le nom du groupe perso du user actuel par son login
    var GroupList: Group[] = [];
    for(var i: number = 0; i < this.GroupList.length; i++) {
      if(this.GroupList[i].name.split('_')[1] === "user") {
        if(Number(this.GroupList[i].name.split('_')[2]) === this.user.id) {
          this.GroupList[i].name = this.user.login;
          GroupList.push(this.GroupList[i]);
        }
      } else
        GroupList.push(this.GroupList[i]);
    }
    this.GroupList = GroupList;

    // Remplace le nom des groupe de droit perso (_user_:id) par le login de ce meme user
    var RightGroupPageList: RightGroupPage[] = [];
    for(var i: number = 0; i < this.RightGroupPageList.length; i++) {
      if(this.RightGroupPageList[i].name.split('_')[1] === "user") {
        if(Number(this.RightGroupPageList[i].name.split('_')[2]) === this.user.id) {
          this.RightGroupPageList[i].name = this.user.login;
          RightGroupPageList.push(this.RightGroupPageList[i]);
        }
      } else
      RightGroupPageList.push(this.RightGroupPageList[i]);
    }
    this.RightGroupPageList = RightGroupPageList;

    // Initialisation des données à afficher dans le formulaire
    this.initData();
  }

  // Permet de changer la valeur du groupe de droit de page de l'utilisateur par celui séléctionné (change l'object)
  private setRightGroupPageSelected(id: any, value: any): void {
    // On Met dans l'object user les données que l'on a deja rentré
    value.date_time_logIn = value.date_logIn + " " + value.time_logIn;
    value.date_time_signIn = value.date_signIn + " " + value.time_signIn;
    this.user = new User(value);

    this.user.group.rightGroupPage = this.RightGroupPageList[Number(id.split(":")[0])];

    // Initialisation des données à afficher dans le formulaire
    this.initData();
  }

  // Permet de changer la valeur du groupe de l'utilisateur par celui séléctionné (change l'object)
  private setGroupSelected(id: any, value: any): void {
    // Permet de déplier la liste avec les different droit par page
    this._RightEdit = true;

    // On Met dans l'object user les données que l'on a deja rentré
    value.date_time_logIn = value.date_logIn + " " + value.time_logIn;
    value.date_time_signIn = value.date_signIn + " " + value.time_signIn;
    this.user = new User(value);

    this.user.group = this.GroupList[Number(id.split(":")[0])];
    
    // Affiche en fonction du groupe choisi s'il sagit d'un groupe perso ou non
    if(this.user.group.name === this.user.login)
      this.MsgGroupPerso = "Groupe personnel de droit";
    else
      this.MsgGroupPerso = null;

    // Initialisation des données à afficher dans le formulaire
    this.initData();
  }

  private setRightSelected(value: any, element: any): void {
    this._ChangeRightPage = true;
  
    value.date_time_logIn = value.date_logIn + " " + value.time_logIn;
    value.date_time_signIn = value.date_signIn + " " + value.time_signIn;
    this.user = new User(value);

    var rightGroupPage: RightGroupPage = new RightGroupPage(value);
    rightGroupPage.name = this.initial_user.group.rightGroupPage.name;
    rightGroupPage.id = this.initial_user.group.rightGroupPage.id;

    // Accueil Page
    if(element === "Accueil_Access")
      rightGroupPage.Accueil_Access = !(rightGroupPage.Accueil_Access);

    // Login Page
    if(element === "Login_Access")
      rightGroupPage.Login_Access = !(rightGroupPage.Login_Access);

    // MonCompte Page
    if(element === "MonCompte_Access")
      rightGroupPage.MonCompte_Access = !(rightGroupPage.MonCompte_Access);

    // SelectedUserManagement Page
    if(element === "SelectedUserManagement_Access") {
      if(rightGroupPage.SelectedUserManagement_Access) {
        rightGroupPage.SelectedUserManagement_DeleteUser = false;
        rightGroupPage.SelectedUserManagement_EditRightGroupPageUser = false;
        rightGroupPage.SelectedUserManagement_EditUser = false;
        rightGroupPage.SelectedUserManagement_ShowPasswordButton = false;
        rightGroupPage.SelectedUserManagement_ViewPassword = false;
        rightGroupPage.UserManagement_AddUser = false;
        rightGroupPage.UserManagement_EditDefaultUser = false;
      }
      rightGroupPage.SelectedUserManagement_Access = !(rightGroupPage.SelectedUserManagement_Access);
    } else if(element === "SelectedUserManagement_ViewPassword") {
      if(rightGroupPage.SelectedUserManagement_ViewPassword)
        rightGroupPage.SelectedUserManagement_ShowPasswordButton = false;
      rightGroupPage.SelectedUserManagement_ViewPassword = !(rightGroupPage.SelectedUserManagement_ViewPassword);
    } else if(element === "SelectedUserManagement_ShowPasswordButton") {
      if(!rightGroupPage.SelectedUserManagement_ShowPasswordButton)
        rightGroupPage.SelectedUserManagement_ViewPassword = true;
      rightGroupPage.SelectedUserManagement_ShowPasswordButton = !(rightGroupPage.SelectedUserManagement_ShowPasswordButton);
    } else if(element === "SelectedUserManagement_EditRightGroupPageUser") {
      if(!rightGroupPage.SelectedUserManagement_EditRightGroupPageUser)
        rightGroupPage.SelectedUserManagement_EditUser = true;
      rightGroupPage.SelectedUserManagement_EditRightGroupPageUser = !(rightGroupPage.SelectedUserManagement_EditRightGroupPageUser);
    } else if(element === "SelectedUserManagement_EditUser") {
      if(rightGroupPage.SelectedUserManagement_EditUser) {
        rightGroupPage.SelectedUserManagement_EditRightGroupPageUser = false;
        rightGroupPage.UserManagement_AddUser = false;
        rightGroupPage.UserManagement_EditDefaultUser = false;
      }
      rightGroupPage.SelectedUserManagement_EditUser = !(rightGroupPage.SelectedUserManagement_EditUser);
    } else if(element === "SelectedUserManagement_DeleteUser")
      rightGroupPage.SelectedUserManagement_DeleteUser = !(rightGroupPage.SelectedUserManagement_DeleteUser);
    if(rightGroupPage.SelectedUserManagement_ViewPassword || rightGroupPage.SelectedUserManagement_ShowPasswordButton || 
      rightGroupPage.SelectedUserManagement_EditRightGroupPageUser || rightGroupPage.SelectedUserManagement_DeleteUser || 
      rightGroupPage.SelectedUserManagement_EditUser) {
        rightGroupPage.SelectedUserManagement_Access = true;
      }
    
    // UserManagement Page
    if(element === "UserManagement_Access") {
      if(rightGroupPage.UserManagement_Access) {
        rightGroupPage.UserManagement_AddUser = false;
        rightGroupPage.UserManagement_EditDefaultUser = false;
      }
      rightGroupPage.UserManagement_Access = !(rightGroupPage.UserManagement_Access);
    } else if(element === "UserManagement_AddUser") {
      if(!rightGroupPage.UserManagement_AddUser) {
        rightGroupPage.SelectedUserManagement_Access = true;
        rightGroupPage.SelectedUserManagement_EditUser = true;
      }
      rightGroupPage.UserManagement_AddUser = !(rightGroupPage.UserManagement_AddUser);
    } else if(element === "UserManagement_EditDefaultUser") {
      if(!rightGroupPage.UserManagement_EditDefaultUser){
        rightGroupPage.SelectedUserManagement_Access = true;
        rightGroupPage.SelectedUserManagement_EditUser = true;
      }
      rightGroupPage.UserManagement_EditDefaultUser = !(rightGroupPage.UserManagement_EditDefaultUser);
    }
    if(rightGroupPage.UserManagement_AddUser || rightGroupPage.UserManagement_EditDefaultUser)
      rightGroupPage.UserManagement_Access = true;

    // SelectedGroupManagement Page
    if(element === "SelectedGroupManagement_Access"){
      if(rightGroupPage.SelectedGroupManagement_Access) {
        rightGroupPage.SelectedGroupManagement_EditGroup = false;
        rightGroupPage.SelectedGroupManagement_DeleteGroup = false;
        rightGroupPage.SelectedGroupManagement_EditRightPage = false;
        rightGroupPage.GroupManagement_AddGroup = false;
        rightGroupPage.GroupManagement_EditDefaultGroup = false;
      }
      rightGroupPage.SelectedGroupManagement_Access = !(rightGroupPage.SelectedGroupManagement_Access);
    } else if(element === "SelectedGroupManagement_EditGroup") {
      if(rightGroupPage.SelectedGroupManagement_EditGroup) {
        rightGroupPage.SelectedGroupManagement_EditRightPage = false;
        rightGroupPage.GroupManagement_AddGroup = false;
        rightGroupPage.GroupManagement_EditDefaultGroup = false;
      }
      rightGroupPage.SelectedGroupManagement_EditGroup = !(rightGroupPage.SelectedGroupManagement_EditGroup);
    } else if(element === "SelectedGroupManagement_DeleteGroup")
      rightGroupPage.SelectedGroupManagement_DeleteGroup = !(rightGroupPage.SelectedGroupManagement_DeleteGroup);
    else if(element === "SelectedGroupManagement_EditRightPage") {
      if(!rightGroupPage.SelectedGroupManagement_EditRightPage)
        rightGroupPage.SelectedGroupManagement_EditGroup = true;
      rightGroupPage.SelectedGroupManagement_EditRightPage = !(rightGroupPage.SelectedGroupManagement_EditRightPage);
    }
    if(rightGroupPage.SelectedGroupManagement_DeleteGroup || rightGroupPage.SelectedGroupManagement_EditGroup ||
      rightGroupPage.SelectedGroupManagement_EditRightPage)
      rightGroupPage.SelectedGroupManagement_Access = true;
    
    // GroupManagement Page
    if(element === "GroupManagement_Access") {
      if(rightGroupPage.GroupManagement_Access) {
        rightGroupPage.GroupManagement_AddGroup = false;
        rightGroupPage.GroupManagement_EditDefaultGroup = false;
      }
      rightGroupPage.GroupManagement_Access = !(rightGroupPage.GroupManagement_Access);
    } else if(element === "GroupManagement_AddGroup") {
      if(!rightGroupPage.GroupManagement_AddGroup) {
        rightGroupPage.SelectedGroupManagement_Access = true;
        rightGroupPage.SelectedGroupManagement_EditGroup = true;
      }
      rightGroupPage.GroupManagement_AddGroup = !(rightGroupPage.GroupManagement_AddGroup);
    } else if(element === "GroupManagement_EditDefaultGroup") {
      if(!rightGroupPage.GroupManagement_EditDefaultGroup) {
        rightGroupPage.SelectedGroupManagement_Access = true;
        rightGroupPage.SelectedGroupManagement_EditGroup = true;
      }
      rightGroupPage.GroupManagement_EditDefaultGroup = !(rightGroupPage.GroupManagement_EditDefaultGroup);
    }
    if(rightGroupPage.GroupManagement_AddGroup || rightGroupPage.GroupManagement_EditDefaultGroup)
      rightGroupPage.GroupManagement_Access = true;
      
    // EditBar
    if(element === "EditBar_Dev")
      rightGroupPage.EditBar_Dev = !(rightGroupPage.EditBar_Dev);
    if(rightGroupPage.SelectedGroupManagement_Access || rightGroupPage.SelectedUserManagement_Access ||
      rightGroupPage.UserManagement_Access || rightGroupPage.GroupManagement_Access)
      rightGroupPage.EditBar_Edit = true;
    if(!rightGroupPage.SelectedGroupManagement_Access && !rightGroupPage.SelectedUserManagement_Access &&
      !rightGroupPage.UserManagement_Access && !rightGroupPage.GroupManagement_Access)
      rightGroupPage.EditBar_Edit = false;

    if(rightGroupPage.EditBar_Dev || rightGroupPage.EditBar_Edit)
      rightGroupPage.EditBar_Access = true;
    if(!rightGroupPage.EditBar_Dev && !rightGroupPage.EditBar_Edit)
      rightGroupPage.EditBar_Access = false;

    // Main Page
    if(rightGroupPage.Accueil_Access || rightGroupPage.Login_Access || rightGroupPage.MonCompte_Access || 
      rightGroupPage.EditBar_Access || rightGroupPage.SelectedUserManagement_Access || rightGroupPage.UserManagement_Access ||
      rightGroupPage.SelectedGroupManagement_Access || rightGroupPage.GroupManagement_Access)
      rightGroupPage.Main_Access = true;
    if(!rightGroupPage.Accueil_Access && !rightGroupPage.Login_Access && !rightGroupPage.MonCompte_Access && 
      !rightGroupPage.EditBar_Access && !rightGroupPage.SelectedUserManagement_Access && !rightGroupPage.UserManagement_Access &&
      !rightGroupPage.SelectedGroupManagement_Access && !rightGroupPage.GroupManagement_Access)
      rightGroupPage.Main_Access = false;

    // On definit le group de droit de page de l'utilisateur par celui que l'on vient de créer et modifier
    this.user.group.rightGroupPage = rightGroupPage;

    // Initialisation des données à afficher dans le formulaire
    this.initData();

    this.SelectedUserManagementForm.get('EditBar_Edit').disable();
    this.SelectedUserManagementForm.get('EditBar_Access').disable();
    this.SelectedUserManagementForm.get('Main_Access').disable();
  }

  private initData(): void {
    this.SelectedUserManagementForm = this.fb.group({
      'id': this.user.id,
      'statut': this.user.statut,
      'login' : this.user.login,
      'password' : this.user.password,
      'profile': this.user.profile,
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
    });

    if(this.route.snapshot.paramMap.get('id') === "New") {
      this.SelectedUserManagementForm.get('login').setValue(null);
      this.SelectedUserManagementForm.get('password').setValue(null);
      this.SelectedUserManagementForm.get('gameTag').setValue(null);
      this.SelectedUserManagementForm.get('name').setValue(null);
      this.SelectedUserManagementForm.get('firstName').setValue(null);

      this.PlaceHolder = this.user;
    }

    // On Bloque la modification du groupe et du login pour l'utilisateur par defaut
    if(Number(this.route.snapshot.paramMap.get('id')) === 1) {
      this.SelectedUserManagementForm.get('group').disable();
      this.SelectedUserManagementForm.get('login').disable();
    }

    // Definit quelle groupe est a séléctionner par defaut dans la liste des groupes
    this.SelectedUserManagementForm.get('group').setValue(this.GroupList[this.GroupList.findIndex(d => d.id === this.user.group.id)]);

    // Definit quelle groupe de droit de page a selectionner par defaut dans la liste de groupes de droit de page
    this.SelectedUserManagementForm.get('rightGroupPage').setValue(this.RightGroupPageList[this.RightGroupPageList.findIndex(d => d.id === this.user.group.rightGroupPage.id)]);

    // On indique a l'administrateur que si il selectionne un autre groupe que le groupe perso du user, que le groupe perso sera supprimé
    if(this.initial_user.group.name.split('_')[1] === "user" && Number(this.initial_user.group.name.split('_')[2]) === this.initial_user.id) {
      if(this.user.group.name === this.initial_user.login || Number(this.user.group.name.split('_')[2]) === this.initial_user.id)
        this.MsgGroupDelete = null;
      else
        this.MsgGroupDelete = "En séléctionnant un group prédefinit, vous allez supprimer le groupe personnalisé de l'utiliateur";
    }

    // if(!this._currentUser.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser) {
    //   this.SelectedUserManagementForm.disable();
    //   this.SelectedUserManagementForm.get('id').enable();
    //   this.SelectedUserManagementForm.get('statut').enable();
    //   this.SelectedUserManagementForm.get('login').enable();
    //   this.SelectedUserManagementForm.get('password').enable();
    //   this.SelectedUserManagementForm.get('date_signIn').enable();
    //   this.SelectedUserManagementForm.get('time_signIn').enable();
    //   this.SelectedUserManagementForm.get('date_logIn').enable();
    //   this.SelectedUserManagementForm.get('time_logIn').enable();
    //   this.SelectedUserManagementForm.get('gameTag').enable();
    //   this.SelectedUserManagementForm.get('name').enable();
    //   this.SelectedUserManagementForm.get('firstName').enable();
    //   this.SelectedUserManagementForm.get('birthDate').enable();
    //   this._RightEdit = true;
    // }
  }

  private ChangeRightEdit(): void {
    this._RightEdit = !(this._RightEdit);
  }

  private editUse(post: any): void {
    if(this.route.snapshot.paramMap.get('id') === "New") {
      post.date_time_logIn = post.date_logIn + " " + post.time_logIn;
      post.date_time_signIn = post.date_signIn + " " + post.time_signIn;
  
      this.user = new User(post);
      if(this._ChangeRightPage || post.group.name !== post.group.rightGroupPage.name) {
        this.user.group = new Group(null);
        this.user.group.id = 0;
        this.user.group.rightGroupPage = new RightGroupPage(post);
      }

      this.userApi.postUser(this.user);
      this.router.navigate(['/UserManagement']);
    }
    else if(Number(this.route.snapshot.paramMap.get('id')) === 1) {
      post.date_time_logIn = post.date_logIn + " " + post.time_logIn;
      post.date_time_signIn = post.date_signIn + " " + post.time_signIn;

      this.user = new User(post);
      this.user.id = 1;
      this.user.login = "default";
      this.user.group = new Group(null);
      this.user.group.id = 1;
      this.user.group.name = "default";
      this.user.group.rightGroupPage = new RightGroupPage(post);
      this.user.group.rightGroupPage.id = 1;
      this.user.group.rightGroupPage.name = "default";

      this.userApi.putUser(1, this.user);
      this.router.navigate(['/UserManagement']);
    } else {
      post.date_time_logIn = post.date_logIn + " " + post.time_logIn;
      post.date_time_signIn = post.date_signIn + " " + post.time_signIn;

      this.user = new User(post);

      if(this.initial_user.group.name.split('_').length === 1) {
        if(this._ChangeRightPage || post.group.name !== post.group.rightGroupPage.name) {
          this.user.group = post.group;
          this.user.group.rightGroupPage = post.group.rightGroupPage;
          this.user.group.rightGroupPage.name = "_user_"+this.user.id;
          this.rightGroupPageApi.postRightGroupPage(this.user.group.rightGroupPage);
          this.user.group.name = "_user_"+this.user.id;
          this.groupApi.postGroup(this.user.group);
        } else if(this.initial_user.group.name !== post.group.name) {
          this.user.group = post.group;
        } else {
          this.user.group = this.initial_user.group;
        }
      } else {
        if(post.group.name !== this.initial_user.login) {
          this.user.group = post.group;
          this.rightGroupPageApi.deleteRightGroupPage(this.initial_user.group.rightGroupPage.id);
          this.groupApi.deleteGroup(this.initial_user.group.id);
        } else {
          if(this._ChangeRightPage || (Number(post.group.rightGroupPage.name.split('_')[2]) !== this.initial_user.id && post.group.rightGroupPage.name !== this.initial_user.login) && post.group.name === this.initial_user.login) {
            this.user.group.rightGroupPage = post.group.rightGroupPage;
            this.rightGroupPageApi.putRightGroupPage(this.initial_user.group.rightGroupPage.id, this.user.group.rightGroupPage);
          } else {
            this.user.group = this.initial_user.group;
          }
        }
      }

      this.userApi.putUser(this.initial_user.id, this.user);
      this.router.navigate(['/UserManagement']);
      if(this.user.id === this._currentUser.id)
        this.app.logOut();
    }
  }

  private showPassword(): void {
    this.isPassword = !(this.isPassword);
  }

  private DeleteUser(): void {
    this.userApi.deleteUser(this.user.id);

    this.router.navigate(['/UserManagement']);
    if(this.user.id === this._currentUser.id)
      this.app.logOut();
  }

  private imageChangeClick(event): void {
    var name: string = "profile" + Math.random() * 1000 + ".jpg";
     this.uploadApi.UploadFile(event.target.files[0], name).subscribe(event => {
      if(event)
        this.newImage(event, name);
    });
  }

  private newImage(ok: any, name: string): void {
    if(ok.ok)
      this.user.profile = "https://dev.kevin-c.fr/api/uploads/" + name;
    this.initData();
  }

  public imageChangeDrag(event): void {
    var name: string = "profile" + Math.random() * 1000 + ".jpg";
    (event.files[0].fileEntry as FileSystemFileEntry).file((file: File) => { this.uploadApi.UploadFile(file, name).subscribe(event => {
      if(event)
        this.newImage(event, name);
    }); });
  }
}
