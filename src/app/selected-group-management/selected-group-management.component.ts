import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';

import { AppComponent } from '../app.component';

import { Api } from '../Class/Api';
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
  @ViewChild('name') private name: ElementRef;
  
  private Reponse_getUserById: Observable<Api>;
  private Reponse_getGroupById_form: Observable<Api>;
  private Reponse_getGroupById_initial: Observable<Api>;
  private Reponse_getRightGroupPageList: Observable<Api>;

  public _currentUser: User;
  private _ChangeRightPage: boolean;
  private RightGroupPageList: RightGroupPage[];
  private SelectedGroupManagementForm: FormGroup;
  private group: Group;
  private initial_group: Group;
  private PlaceHolder: Group;
  private one: boolean;

  constructor(private route: ActivatedRoute, private app: AppComponent, private router: Router,
    private fb: FormBuilder, private groupApi: GroupService, private rightGroupPageApi: RightGroupPageService,private userApi: UserService) { 
      this.Reponse_getUserById = null;
      this.Reponse_getGroupById_form = null;
      this.Reponse_getGroupById_initial = null;
      this.Reponse_getRightGroupPageList = null;
      this._currentUser = new User(null);
      this._ChangeRightPage = false;
      this.RightGroupPageList = null;
      this.SelectedGroupManagementForm = this.fb.group({
        'id': null, 'name' : null, 'RightGroupPage' : null, 'Main_Access' : null, 'Accueil_Access' : null, 'Login_Access' : null,
        'User_Access' : null, 'EditBar_Access' : null, 'SelectedUserManagement_Access' : null,
        'SelectedUserManagement_ViewPassword' : null, 'SelectedUserManagement_ShowPasswordButton' : null,
        'SelectedUserManagement_EditRightGroupPageUser' : null, 'SelectedUserManagement_DeleteUser' : null,
        'SelectedUserManagement_EditUser' : null, 'UserManagement_Access' : null, 'UserManagement_AddUser' : null,
        'UserManagement_EditDefaultUser' : null, 'GroupManagement_Access' : null, 'GroupManagement_AddGroup' : null,
        'GroupManagement_EditDefaultGroup' : null, 'SelectedGroupManagement_Access' : null,
        'SelectedGroupManagement_EditGroup' : null, 'SelectedGroupManagement_DeleteGroup' : null,
        'SelectedGroupManagement_EditRightPage' : null, 'EditBar_Dev' : null, 'EditBar_Edit' : null, 
        'SelectedPageManagement_Access': null, 'SelectedPageManagement_EditPage': null, 'SelectedPageManagement_EditRefresh': null,
        'SelectedPageManagement_EditRoute': null, 'SelectedPageManagement_EditNeedLogIn': null});
      this.group = new Group(null);
      var id: number = 1;
      if(this.route.snapshot.paramMap.get('id') !== "New") { id = Number(this.route.snapshot.paramMap.get('id')) }
      this.Reponse_getGroupById_initial = this.groupApi.getGroupById(id);
      this.Reponse_getGroupById_initial.subscribe((data: Api) => {
        this.initial_group = data.data
      })
      this.PlaceHolder = new Group(null);
      this.one = false;
    }

  ngOnInit(): void { 
    // Initialisation de la page
    this.app.ngOnInit();
    this.Reponse_getUserById = this.app.Reponse_getUserById;

    // Vérification des droit d'acces a cette page pour _currentUser
    // Vérification des droit d'acces a la création d'un nouveux group pour _currentUser
    // Vérification des droit d'acces a la modification du group par defaut pour _currentUser
    // Vérification des droit pour savoir si l'utilisateur peux recurerer les données
    if(this.Reponse_getUserById === null) {
      this._currentUser = new User(null);

      this.verifRight(this._currentUser.group.rightGroupPage);
    } else {
      this.Reponse_getUserById.subscribe((data: Api) => {
        this._currentUser = data.data

        this.verifRight(data.data.group.rightGroupPage);
      })
    }
  }

  private verifRight(rightGroupPage: RightGroupPage) {
    if(!rightGroupPage.SelectedGroupManagement_Access) {
      console.log("Vous n'avez pas la permission d'accedez à la page de Gestion de ce groupe");
      this.router.navigate(['/Accueil']);
    }
    
    if(!rightGroupPage.GroupManagement_AddGroup && this.route.snapshot.paramMap.get('id') === "New") {
      console.log("Vous n'avez pas la permission de creer de nouveau groupe");
      this.router.navigate(['/Accueil']);
    }
    
    if(!rightGroupPage.GroupManagement_EditDefaultGroup && Number(this.route.snapshot.paramMap.get('id')) === 1) {
      console.log("Vous n'avez pas la permission de modifier le groupe par defaut");
      this.router.navigate(['/Accueil']);
    }
 
    if(rightGroupPage.SelectedGroupManagement_Access) {
      // Récupération des données du groupe que l'on va modiifier UNIQUEMENT si ce n'est pas la création d'un nouveau groupe
      if(this.route.snapshot.paramMap.get('id') !== "New") {
        this.Reponse_getGroupById_form = this.groupApi.getGroupById(Number(this.route.snapshot.paramMap.get('id')));
        this.Reponse_getGroupById_form.subscribe((data: Api) => {
          this.group = data.data
        })
      }
      else {
        this.Reponse_getGroupById_form = this.groupApi.getGroupById(1);
        this.Reponse_getGroupById_form.subscribe((data: Api) => {
          this.group = data.data
        })
      }
    } else 
      console.log("Vous n'avez pas la permission d'accedez à la page de Gestion de ce groupe");

    this.Reponse_getGroupById_form.subscribe((data: Api) => {
      // On vérifit que le groupe que l'on veux éditer réellement
      if(this.group.id !== Number(this.route.snapshot.paramMap.get('id')) && this.route.snapshot.paramMap.get('id') !== "New")
        this.router.navigate(['/GroupManagement']);

      // Si on créer un groupe ou que l'on edite de le groupe par defaut, on enlève le bouton supprimers
      if(this.route.snapshot.paramMap.get('id') === "New" || this.route.snapshot.paramMap.get('id') === "1")
        this._currentUser.group.rightGroupPage.SelectedGroupManagement_DeleteGroup = false; //Pour enlever le bouton supprimer

      if(this.route.snapshot.paramMap.get('id') === "New")
        this.group.name = null;
    })

    if(rightGroupPage.SelectedGroupManagement_Access) {
      // Récupération de la liste des groupes de droits de pages
      this.Reponse_getRightGroupPageList = this.rightGroupPageApi.getRightGroupPageList();
      this.Reponse_getRightGroupPageList.subscribe((data: Api) => {
        this.RightGroupPageList = data.data

        // On enlève les groupe perso de la liste de groupe de droit de page a afficher Que si on est sur un groupe generique
        var RightGroupPageList: RightGroupPage[] = [];
        for(var i: number = 0; i < this.RightGroupPageList.length; i++) {
          if(this.RightGroupPageList[i].name.split('_')[1] === "user") {
            var id_user = Number(this.group.name.split('_')[2]);
            if(Number(id_user) === Number(this.RightGroupPageList[i].name.split('_')[2])) {
              this.group.name = "Groupe personelle de l'utilisateur id: " + id_user;
              this.RightGroupPageList[i].name = this.group.name;
              RightGroupPageList.push(this.RightGroupPageList[i]);
            }
          } else
          RightGroupPageList.push(this.RightGroupPageList[i]);
        }
        this.RightGroupPageList = RightGroupPageList;
      })
    } else 
      console.log("Vous n'avez pas la permission d'accedez à la page de Gestion de ce groupe");

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
    this.Reponse_getGroupById_form.subscribe((data: Api) => {
      this._ChangeRightPage = true;

      var rightGroupPage: RightGroupPage = new RightGroupPage(value);
      this.group.name = value.name;

      rightGroupPage.name = this.group.name;

      if(this.initial_group.name.split('_')[1] === "user") {
        this.group.name = "Groupe personelle de l'utilisateur id: " + this.initial_group.name.split('_')[2];
        rightGroupPage.name = this.initial_group.rightGroupPage.name;
        rightGroupPage.id = this.initial_group.rightGroupPage.id;
      }

      // Accueil Page
      if(element === "Accueil_Access")
        rightGroupPage.Accueil_Access = !(rightGroupPage.Accueil_Access);

      // Login Page
      if(element === "Login_Access")
        rightGroupPage.Login_Access = !(rightGroupPage.Login_Access);

      // User/{{ _currentUser.id }} Page
      if(element === "User_Access")
        rightGroupPage.User_Access = !(rightGroupPage.User_Access);

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

      // SelectedPageManagement Page
      if(element === "SelectedPageManagement_Access"){
        if(rightGroupPage.SelectedPageManagement_Access) {
          rightGroupPage.SelectedPageManagement_EditPage = false;
          rightGroupPage.SelectedPageManagement_EditRefresh = false;
          rightGroupPage.SelectedPageManagement_EditRoute = false;
          rightGroupPage.SelectedPageManagement_EditNeedLogIn = false;
        }
        rightGroupPage.SelectedPageManagement_Access = !(rightGroupPage.SelectedPageManagement_Access);
      } else if(element === "SelectedPageManagement_EditPage") {
        if(!rightGroupPage.SelectedPageManagement_EditPage) {
          rightGroupPage.SelectedPageManagement_Access = true;
        } else {
          rightGroupPage.SelectedPageManagement_EditRefresh = false;
          rightGroupPage.SelectedPageManagement_EditRoute = false;
          rightGroupPage.SelectedPageManagement_EditNeedLogIn = false;
        }
        rightGroupPage.SelectedPageManagement_EditPage = !(rightGroupPage.SelectedPageManagement_EditPage);
      }
      else if(element === "SelectedPageManagement_EditRefresh") {
        if(!rightGroupPage.SelectedPageManagement_EditRefresh) {
          rightGroupPage.SelectedPageManagement_Access = true;
          rightGroupPage.SelectedPageManagement_EditPage = true;
        }
        rightGroupPage.SelectedPageManagement_EditRefresh = !(rightGroupPage.SelectedPageManagement_EditRefresh);
      }
      else if(element === "SelectedPageManagement_EditRoute") {
        if(!rightGroupPage.SelectedPageManagement_EditRoute) {
          rightGroupPage.SelectedPageManagement_Access = true;
          rightGroupPage.SelectedPageManagement_EditPage = true;
        }
        rightGroupPage.SelectedPageManagement_EditRoute = !(rightGroupPage.SelectedPageManagement_EditRoute);
      }
      else if(element === "SelectedPageManagement_EditNeedLogIn") {
        if(!rightGroupPage.SelectedPageManagement_EditNeedLogIn) {
          rightGroupPage.SelectedPageManagement_Access = true;
          rightGroupPage.SelectedPageManagement_EditPage = true;
        }
        rightGroupPage.SelectedPageManagement_EditNeedLogIn = !(rightGroupPage.SelectedPageManagement_EditNeedLogIn);
      }
      if(rightGroupPage.SelectedPageManagement_EditPage || rightGroupPage.SelectedPageManagement_EditRefresh ||
        rightGroupPage.SelectedPageManagement_EditRoute || rightGroupPage.SelectedPageManagement_EditNeedLogIn)
        rightGroupPage.SelectedPageManagement_Access = true;
      if(!rightGroupPage.SelectedPageManagement_EditPage && !rightGroupPage.SelectedPageManagement_EditRefresh &&
        !rightGroupPage.SelectedPageManagement_EditRoute && !rightGroupPage.SelectedPageManagement_EditNeedLogIn)
        rightGroupPage.SelectedPageManagement_Access = false;

      // EditBar
      if(element === "EditBar_Dev")
        rightGroupPage.EditBar_Dev = !(rightGroupPage.EditBar_Dev);
      if(rightGroupPage.SelectedGroupManagement_Access || rightGroupPage.SelectedUserManagement_Access ||
        rightGroupPage.UserManagement_Access || rightGroupPage.GroupManagement_Access || rightGroupPage.SelectedPageManagement_Access)
        rightGroupPage.EditBar_Edit = true;
      if(!rightGroupPage.SelectedGroupManagement_Access && !rightGroupPage.SelectedUserManagement_Access &&
        !rightGroupPage.UserManagement_Access && !rightGroupPage.GroupManagement_Access && !rightGroupPage.SelectedPageManagement_Access)
        rightGroupPage.EditBar_Edit = false;

      if(rightGroupPage.EditBar_Dev || rightGroupPage.EditBar_Edit)
        rightGroupPage.EditBar_Access = true;
      if(!rightGroupPage.EditBar_Dev && !rightGroupPage.EditBar_Edit)
        rightGroupPage.EditBar_Access = false;

      // Main Page
      if(rightGroupPage.Accueil_Access || rightGroupPage.Login_Access || rightGroupPage.User_Access || 
        rightGroupPage.EditBar_Access || rightGroupPage.SelectedUserManagement_Access || rightGroupPage.UserManagement_Access ||
        rightGroupPage.SelectedGroupManagement_Access || rightGroupPage.GroupManagement_Access || rightGroupPage.SelectedPageManagement_Access)
        rightGroupPage.Main_Access = true;
      if(!rightGroupPage.Accueil_Access && !rightGroupPage.Login_Access && !rightGroupPage.User_Access && 
        !rightGroupPage.EditBar_Access && !rightGroupPage.SelectedUserManagement_Access && !rightGroupPage.UserManagement_Access &&
        !rightGroupPage.SelectedGroupManagement_Access && !rightGroupPage.GroupManagement_Access && !rightGroupPage.SelectedPageManagement_Access)
        rightGroupPage.Main_Access = false;

      // On definit le group de droit de page de l'utilisateur par celui que l'on vient de créer et modifier
      this.group.rightGroupPage = rightGroupPage;

      // Initialisation des données à afficher dans le formulaire
      this.initData();
    })
  }

  private initData(): void {
    this.Reponse_getGroupById_form.subscribe((data: Api) => {
      this.SelectedGroupManagementForm = this.fb.group({
        'id': this.group.id,
        'name': this.group.name,
        'RightGroupPage' : this.group.rightGroupPage,
        'Main_Access' : this.group.rightGroupPage.Main_Access,
        'Accueil_Access' : this.group.rightGroupPage.Accueil_Access,
        'Login_Access' : this.group.rightGroupPage.Login_Access,
        'User_Access' : this.group.rightGroupPage.User_Access,
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
        'EditBar_Edit' : this.group.rightGroupPage.EditBar_Edit,
        'SelectedPageManagement_Access' : this.group.rightGroupPage.SelectedPageManagement_Access,
        'SelectedPageManagement_EditPage' : this.group.rightGroupPage.SelectedPageManagement_EditPage,
        'SelectedPageManagement_EditRefresh' : this.group.rightGroupPage.SelectedPageManagement_EditRefresh,
        'SelectedPageManagement_EditRoute' : this.group.rightGroupPage.SelectedPageManagement_EditRoute,
        'SelectedPageManagement_EditNeedLogIn' : this.group.rightGroupPage.SelectedPageManagement_EditNeedLogIn
      });

      if(!this.one) {
        this.name.nativeElement.focus();
        this.one = !(this.one);
      }
  
      // On enlève la valeur par defaut et on la met dans le placeHolder pour la création de nouveau groupe
      if(this.route.snapshot.paramMap.get('id') === "New")
        this.PlaceHolder = this.initial_group;
  
      // On bloque la modification du nom et du groupe de droit de page pour le groupe par defaut ou pour un groupe personelle
      if(Number(this.route.snapshot.paramMap.get('id')) === 1 || this.initial_group.name.split('_').length !== 1) {
        this.SelectedGroupManagementForm.get('name').disable();
        this.SelectedGroupManagementForm.get('RightGroupPage').disable();
      }
  
      // Definit quelle groupe de droit de page a selectionner par defaut dans la liste de groupe de droit de page
      this.SelectedGroupManagementForm.get('RightGroupPage').setValue(this.RightGroupPageList[this.RightGroupPageList.findIndex(d => d.id === this.group.rightGroupPage.id)]);
  
      if(!this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditRightPage) {
        this.SelectedGroupManagementForm.disable();
        this.SelectedGroupManagementForm.get('name').enable();
      }
    })

    if(!this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditGroup)
      this.SelectedGroupManagementForm.disable();

    if(!this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditRightPage) {
      this.SelectedGroupManagementForm.disable();
      this.SelectedGroupManagementForm.get('name').enable();
    }

    this.SelectedGroupManagementForm.get('EditBar_Edit').disable();
    this.SelectedGroupManagementForm.get('EditBar_Access').disable();
    this.SelectedGroupManagementForm.get('Main_Access').disable();
    this.SelectedGroupManagementForm.get('SelectedPageManagement_Access').disable();

    // On bloque la modification du nom et du groupe de droit de page pour le groupe par defaut ou pour un groupe personelle
    if(Number(this.route.snapshot.paramMap.get('id')) === 1 || this.initial_group.name.split('_').length !== 1) {
      this.SelectedGroupManagementForm.get('name').disable();
      this.SelectedGroupManagementForm.get('RightGroupPage').disable();
    }
  }

  // Permet de modifier le nom du groupe de droit de page en meme temps que celui du groupe
  private NameChange(post: string): void {
    this.RightGroupPageList[0].name = post;
    if(post === "")
      this.RightGroupPageList[0].name = "default";
    this.SelectedGroupManagementForm.get('RightGroupPage').setValue(this.RightGroupPageList[0]);
  }

  private editGroup(post: any): void {
    this.Reponse_getGroupById_form.subscribe((data: Api) => {

      var same: boolean = false;

      if(this.route.snapshot.paramMap.get('id') !== "New") {
        if(this.initial_group.name.split('_').length !== 1) {
          this.group.rightGroupPage = new RightGroupPage(post);
  
          this.group.id = this.initial_group.id;
          this.group.name = this.initial_group.name;
  
          if(!this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditRightPage)
            this.group.rightGroupPage = this.initial_group.rightGroupPage;
  
          this.group.rightGroupPage.id = this.initial_group.rightGroupPage.id;
          this.group.rightGroupPage.name = this.initial_group.rightGroupPage.name;
  
          if(this.create_md5(JSON.stringify(new Group(this.group))) === this.create_md5(JSON.stringify(new Group(this.initial_group)))) {
            console.log("Aucune modification");
            same = true;
            this.router.navigate(['/GroupManagement']);
          }
        } else {
          if(this.create_md5(JSON.stringify(new Group(this.group))) === this.create_md5(JSON.stringify(new Group(this.initial_group)))) {
            console.log("Aucune modification");
            same = true;
            this.router.navigate(['/GroupManagement']);
          }
        }
      }

      if(!same) {
        if(this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditGroup) {
          if(Number(this.route.snapshot.paramMap.get('id')) === 1) {
            if(this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditGroup) {
              this.group.rightGroupPage = new RightGroupPage(post);
      
              this.group.id = 1;
              this.group.name = "default";
  
              if(!this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditRightPage)
                this.group.rightGroupPage = this.initial_group.rightGroupPage;

              this.group.rightGroupPage.id = 1;
              this.group.rightGroupPage.name = this.group.name;
  
              this.groupApi.putGroup(this.group.id, this.group).subscribe();;
              this.router.navigate(['/GroupManagement']);
            } else 
              console.log("Vous n'avez pas la permission de modifier le groupe par defaut");
          } else if(this.route.snapshot.paramMap.get('id') === "New") {
            if(this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditGroup) {
              this.group.rightGroupPage = new RightGroupPage(post);
      
              this.group.id = 0;
              this.group.name = post.name;
  
              if(!this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditRightPage)
                this.group.rightGroupPage = this.initial_group.rightGroupPage;
              
              this.group.rightGroupPage.id = this.group.id;
              this.group.rightGroupPage.name = this.group.name;
        
              this.groupApi.postGroup(this.group);
              this.router.navigate(['/GroupManagement']);
            } else 
              console.log("Vous n'avez pas la permission d'ajouter un groupe");
          } else {
            this.group.id = this.initial_group.id;
            this.group.name = post.name;
  
            if(!this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditRightPage)
              this.group.rightGroupPage = this.initial_group.rightGroupPage;
  
            this.group.rightGroupPage.id = this.initial_group.rightGroupPage.id;
            this.group.rightGroupPage.name = this.group.name;

            if(this.initial_group.name.split('_')[1] === "user") {
              this.group.id = this.initial_group.id;
              this.group.name = this.initial_group.name;

              if(!this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditRightPage)
                this.group.rightGroupPage = this.initial_group.rightGroupPage;

              this.group.rightGroupPage.name = this.initial_group.rightGroupPage.name;
              this.group.rightGroupPage.id = this.initial_group.rightGroupPage.id;
            }
  
            this.groupApi.putGroup(this.initial_group.id, this.group).subscribe((data) => {
              if(data.ok) {
                this.router.navigate(['/GroupManagement']);
                if(this.group.id === this._currentUser.group.id)
                  this.app.logOut();
              }
            });
          }
        } else 
          console.log("Vous n'avez pas la permission d'accedez à la page de Gestion de ce groupe");  
      }
    })
  }

  private DeleteGroup(): void {
    if(this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditGroup) {
      this.groupApi.deleteGroup(this.group.id);

      this.router.navigate(['/GroupManagement']);
      if(this.group.id === this._currentUser.id)
        this.app.logOut();
    } else 
      console.log("Vous n'avez pas la permission de supprimer ce groupe");
  }

  private create_md5(attrib: string): any {
    const md5 = new Md5();
    return md5.appendStr(attrib).end();
  }
}
