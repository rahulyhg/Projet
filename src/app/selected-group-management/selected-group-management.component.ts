import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { AppComponent } from '../app.component';

import { User } from '../Class/User';
import { Group } from '../Class/Group';
import { RightGroupPage } from '../Class/RightGroupPage';

import { UserService } from '../Services/user.service';
import { GroupService } from '../Services/group.service';
import { RightGroupPageService } from '../Services/RightGroupPage.service';

@Component({
  templateUrl: './selected-group-management.component.html'
})
export class SelectedGroupManagementComponent implements OnInit {
  public _currentUser: User;
  private _ChangeRightPage: boolean;
  private RightGroupPageList: RightGroupPage[];
  private SelectedGroupManagementForm: FormGroup;
  private group: Group;
  private initial_group: Group;
  private PlaceHolder: Group;

  constructor(private route: ActivatedRoute, private app: AppComponent, private router: Router,
    private fb: FormBuilder, private groupApi: GroupService, private rightGroupPageApi: RightGroupPageService,private userApi: UserService) { 
      this._currentUser = new User(null);
      this._ChangeRightPage = false;
      this.RightGroupPageList = null;
      this.SelectedGroupManagementForm = null;
      this.group = new Group(null);
      var id: number = 1;
      if(this.route.snapshot.paramMap.get('id') !== "New") { id = Number(this.route.snapshot.paramMap.get('id')) }
      this.initial_group = new Group(this.groupApi.getGroupById(id));
      this.PlaceHolder = new Group(null);
    }

  ngOnInit(): void { 
    // Initialisation de la page
    this.app.ngOnInit();
    this._currentUser = this.app._currentUser;

    // Récupération des données du groupe que l'on va modiifier UNIQUEMENT si ce n'est pas la création d'un nouveau groupe
    if(this.route.snapshot.paramMap.get('id') !== "New")
      this.group = new Group(this.groupApi.getGroupById(Number(this.route.snapshot.paramMap.get('id'))));
    else
      //this.group = this.groupApi.getGroupById(1);

    // On vérifit que le groupe que l'on veux éditer réellement
    if(this.group.id !== Number(this.route.snapshot.paramMap.get('id')) && this.route.snapshot.paramMap.get('id') !== "New")
      this.router.navigate(['/GroupManagement']);

    // Si on créer un groupe ou que l'on edite de le groupe par defaut, on enlève le bouton supprimers
    if(this.route.snapshot.paramMap.get('id') === "New" || this.route.snapshot.paramMap.get('id') === "1")
      this._currentUser.group.rightGroupPage.SelectedGroupManagement_DeleteGroup = false; //Pour enlever le bouton supprimer

    // Récupération de la liste des groupes de droits de pages
    //this.RightGroupPageList = this.rightGroupPageApi.getRightGroupPageList();

    // On enlève les groupe perso de la liste de groupe de droit de page a afficher Que si on est sur un groupe generique
    var RightGroupPageList: RightGroupPage[] = [];
    for(var i: number = 0; i < this.RightGroupPageList.length; i++) {
      if(this.RightGroupPageList[i].name.split('_').length === 1)
        RightGroupPageList.push(this.RightGroupPageList[i]);
      else {
        var id_user = Number(this.group.name.split('_')[2]);
        if(Number(this.RightGroupPageList[i].name.split('_')[2]) === id_user) {
          this.group.name = "Groupe personelle de l'utilisateur id: " + id_user;
          this.RightGroupPageList[i].name = this.group.name;
          RightGroupPageList.push(this.RightGroupPageList[i]);
        }
      } 
    }
    this.RightGroupPageList = RightGroupPageList;

    if(this.route.snapshot.paramMap.get('id') === "New") {
      this.group.name = null;
    }

    // Initialisation des données à afficher dans le formulaire
    this.initData();
  }

  // Permet de changer la valeur du groupe de droit de page du group par celui séléctionné (change l'object)
  private setRightEditSelected(id: any, post: any): void {
    // On met dans l'object group les données que l'on a deja rentré
    this.group.name = post.name;
    this.group.rightGroupPage = this.RightGroupPageList[Number(id.split(":")[0])];

    // Initialisation des données à afficher dans le formulaire
    this.initData();
  }

  private setRightSelected(value: any, element: any): void {
    this._ChangeRightPage = true;

    this.group.name = value.name;

    var rightGroupPage: RightGroupPage = new RightGroupPage(value);
    rightGroupPage.name = this.initial_group.rightGroupPage.name;
    rightGroupPage.id = this.initial_group.rightGroupPage.id;

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
        rightGroupPage.GroupManagement_EditDefaultGroup = false;
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
        rightGroupPage.GroupManagement_EditDefaultGroup = false;
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
        rightGroupPage.GroupManagement_EditDefaultGroup = false;
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
        rightGroupPage.SelectedGroupManagement_Access = true;
        rightGroupPage.GroupManagement_EditDefaultGroup = true;
        rightGroupPage.SelectedGroupManagement_EditGroup = true;
      } else
        rightGroupPage.GroupManagement_EditDefaultGroup = false;
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
        rightGroupPage.UserManagement_EditDefaultUser = false;
      }
      rightGroupPage.SelectedGroupManagement_Access = !(rightGroupPage.SelectedGroupManagement_Access);
    } else if(element === "SelectedGroupManagement_EditGroup") {
      if(rightGroupPage.SelectedGroupManagement_EditGroup) {
        rightGroupPage.SelectedGroupManagement_EditRightPage = false;
        rightGroupPage.GroupManagement_AddGroup = false;
        rightGroupPage.GroupManagement_EditDefaultGroup = false;
        rightGroupPage.UserManagement_EditDefaultUser = false;
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
        rightGroupPage.UserManagement_EditDefaultUser = false;
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
        rightGroupPage.UserManagement_Access = true;
        rightGroupPage.UserManagement_EditDefaultUser = true;
        rightGroupPage.SelectedUserManagement_Access = true;
        rightGroupPage.SelectedUserManagement_EditUser = true;
      } else
        rightGroupPage.UserManagement_EditDefaultUser = false;
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
    this.group.rightGroupPage = rightGroupPage;

    // Initialisation des données à afficher dans le formulaire
    this.initData();

    this.SelectedGroupManagementForm.get('EditBar_Edit').disable();
    this.SelectedGroupManagementForm.get('EditBar_Access').disable();
    this.SelectedGroupManagementForm.get('Main_Access').disable();
  }

  private initData(): void {
    this.SelectedGroupManagementForm = this.fb.group({
      'id': this.group.id,
      'name': this.group.name,
      'RightGroupPage' : this.group.rightGroupPage,
      'Main_Access' : this.group.rightGroupPage.Main_Access,
      'Accueil_Access' : this.group.rightGroupPage.Accueil_Access,
      'Login_Access' : this.group.rightGroupPage.Login_Access,
      'MonCompte_Access' : this.group.rightGroupPage.MonCompte_Access,
      'EditBar_Access' : this.group.rightGroupPage.EditBar_Access,
      'SelectedUserManagement_Access' : this.group.rightGroupPage.SelectedUserManagement_Access,
      'SelectedUserManagement_ViewPassword' : this.group.rightGroupPage.SelectedUserManagement_ViewPassword,
      'SelectedUserManagement_ShowPasswordButton' : this.group.rightGroupPage.SelectedUserManagement_ShowPasswordButton,
      'SelectedUserManagement_EditRightGroupPageUser' : this.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser,
      'SelectedUserManagement_DeleteUser' : this.group.rightGroupPage.SelectedUserManagement_DeleteUser,
      'SelectedUserManagement_EditUser' : this.group.rightGroupPage.SelectedUserManagement_EditUser,
      'UserManagement_Access' : this.group.rightGroupPage.UserManagement_Access,
      'UserManagement_AddUser' : this.group.rightGroupPage.UserManagement_AddUser,
      'UserManagement_EditDefaultUser' : this.group.rightGroupPage.UserManagement_EditDefaultUser,
      'GroupManagement_Access' : this.group.rightGroupPage.GroupManagement_Access,
      'GroupManagement_AddGroup' : this.group.rightGroupPage.GroupManagement_AddGroup,
      'GroupManagement_EditDefaultGroup' : this.group.rightGroupPage.GroupManagement_EditDefaultGroup,
      'SelectedGroupManagement_Access' : this.group.rightGroupPage.SelectedGroupManagement_Access,
      'SelectedGroupManagement_EditGroup' : this.group.rightGroupPage.SelectedGroupManagement_EditGroup,
      'SelectedGroupManagement_DeleteGroup' : this.group.rightGroupPage.SelectedGroupManagement_DeleteGroup,
      'SelectedGroupManagement_EditRightPage' : this.group.rightGroupPage.SelectedGroupManagement_EditRightPage,
      'EditBar_Dev' : this.group.rightGroupPage.EditBar_Dev,
      'EditBar_Edit' : this.group.rightGroupPage.EditBar_Edit
    });

    // On enlève la valeur par defaut et on la met dans le placeHolder pour la création de nouveau groupe
    if(this.route.snapshot.paramMap.get('id') === "New") {
      this.PlaceHolder = this.initial_group;
    }

    // On bloque la modification du nom et du groupe de droit de page pour le groupe par defaut ou pour un groupe personelle
    if(Number(this.route.snapshot.paramMap.get('id')) === 1 || this.initial_group.name.split('_').length !== 1) {
      this.SelectedGroupManagementForm.get('name').disable();
      this.SelectedGroupManagementForm.get('RightGroupPage').disable();
    }

    // Definit quelle groupe de droit de page a selectionner par defaut dans la liste de groupe de droit de page
    this.SelectedGroupManagementForm.get('RightGroupPage').setValue(this.RightGroupPageList[this.RightGroupPageList.findIndex(d => d.id === this.group.rightGroupPage.id)]);

    // if(!this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditRightPage) {
    //   this.SelectedGroupManagementForm.disable();
    //   this.SelectedGroupManagementForm.get('name').enable();
    // }
  }

  // Permet de modifier le nom du groupe de droit de page en meme temps que celui du groupe
  private NameChange(post: string): void {
    this.RightGroupPageList[0].name = post;
    if(post === "")
      this.RightGroupPageList[0].name = "default";
    this.SelectedGroupManagementForm.get('RightGroupPage').setValue(this.RightGroupPageList[0]);
  }

  private editGroup(post: any): void {

    if(Number(this.route.snapshot.paramMap.get('id')) === 1) {
      this.group.id = 1;
      this.group.name = "default";
      this.group.rightGroupPage = new RightGroupPage(post);
      this.group.rightGroupPage.id = 1;
      this.group.rightGroupPage.name = this.group.name;

      this.groupApi.putGroup(this.group.id, this.group);
      this.rightGroupPageApi.putRightGroupPage(1, this.group.rightGroupPage);
      this.router.navigate(['/GroupManagement']);
    } else if(this.route.snapshot.paramMap.get('id') === "New") {
      this.group.id = 0;
      this.group.name = post.name;
      this.group.rightGroupPage = new RightGroupPage(post);
      this.group.rightGroupPage.name = this.group.name;

      this.groupApi.postGroup(this.group);
      this.router.navigate(['/GroupManagement']);
    } else {
      this.group.id = this.initial_group.id;
      this.group.name = post.name;
      this.group.rightGroupPage.id = this.initial_group.rightGroupPage.id;
      this.group.rightGroupPage.name = this.group.name;

      this.groupApi.putGroup(this.initial_group.id, this.group);
      this.rightGroupPageApi.putRightGroupPage(this.initial_group.rightGroupPage.id, this.group.rightGroupPage);

      this.router.navigate(['/GroupManagement']);
      if(this.group.id === this._currentUser.group.id)
        this.app.logOut();
    }
  }

  private DeleteGroup(): void {
    this.groupApi.deleteGroup(this.group.id);

    this.router.navigate(['/GroupManagement']);
    if(this.group.id === this._currentUser.id)
      this.app.logOut();
  }
}
