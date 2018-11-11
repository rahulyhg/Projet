import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FileSystemFileEntry } from '../../../node_modules/ngx-file-drop';
import { Observable } from 'rxjs';

import { GenericModule } from '../generic/generic.modules';

import { AppComponent } from '../app.component';

import { Api } from '../Class/Api';
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
  @ViewChild('login') private login: ElementRef;

  private Reponse_getUserById: Observable<Api>;
  private Reponse_getUserById_initial: Observable<Api>;
  private Reponse_getUserById_form: Observable<Api>;
  private Reponse_getRightGroupPageList: Observable<Api>;
  private Reponse_getGroupList: Observable<Api>;

  public _currentUser: User;
  private _RightEdit: boolean;
  private _ChangeRightPage: boolean;
  private RightGroupPageList: RightGroupPage[];
  private GroupList: Group[];
  private SelectedUserManagementForm: FormGroup;
  private user: User;
  private initial_user: User;
  private MsgGroupDelete: string;
  private MsgGroupPerso: string;
  private PlaceHolder: User;
  private one: boolean;

  constructor(private route: ActivatedRoute, private app: AppComponent, private userApi: UserService, private router: Router,
    private fb: FormBuilder, private groupApi: GroupService, private rightGroupPageApi: RightGroupPageService, 
    private uploadApi: UploadService, private date: DatePipe, private generic: GenericModule) { 
      this.Reponse_getUserById = null;
      this.Reponse_getUserById_initial = null;
      this.Reponse_getUserById_form = null;
      this.Reponse_getRightGroupPageList = null;
      this.Reponse_getGroupList = null;
      this._currentUser = new User(null);
      this._RightEdit = false;
      this._ChangeRightPage = false;
      this.RightGroupPageList = null;
      this.GroupList = null;
      this.SelectedUserManagementForm = this.fb.group({
        'id': null, 'statut': null, 'login' : null, 'password' : null, 'profile': null, 'date_signIn' : null, 'time_signIn' : null,
        'date_logIn' : null, 'time_logIn' : null, 'group' : null, 'gameTag' : null, 'name' : null, 'firstName' : null,
        'birthDate' : null, 'rightGroupPage' : null, 'Main_Access' : null, 'Accueil_Access' : null, 'Login_Access' : null,
        'User_Access' : null, 'EditBar_Access' : null, 'SelectedUserManagement_Access' : null,
        'SelectedUserManagement_ViewPassword' : null, 'SelectedUserManagement_ShowPasswordButton' : null,
        'SelectedUserManagement_EditRightGroupPageUser' : null, 'SelectedUserManagement_DeleteUser' : null,
        'SelectedUserManagement_EditUser' : null, 'UserManagement_Access' : null, 'UserManagement_AddUser' : null,
        'UserManagement_EditDefaultUser' : null, 'GroupManagement_Access' : null, 'GroupManagement_AddGroup' : null,
        'GroupManagement_EditDefaultGroup' : null, 'SelectedGroupManagement_Access' : null,
        'SelectedGroupManagement_EditGroup' : null, 'SelectedGroupManagement_DeleteGroup' : null,
        'SelectedGroupManagement_EditRightPage' : null, 'EditBar_Dev' : null, 'EditBar_Edit' : null, 
        'SelectedPageManagement_Access': null, 'SelectedPageManagement_EditPage': null, 'SelectedPageManagement_EditRefresh': null,
        'SelectedPageManagement_EditRoute': null, 'SelectedPageManagement_EditNeedLogIn': null, 'Settings_Access': null});
      this.user = new User(null);
      var id: number = 1;
      this.initial_user = new User(null);
      if(this.route.snapshot.paramMap.get('id') !== "New") { id = Number(this.route.snapshot.paramMap.get('id')) }
      this.Reponse_getUserById_initial = this.userApi.getUserById(id);
      this.Reponse_getUserById_initial.subscribe((data: Api) => {
        this.initial_user = data.data
      })
      this.MsgGroupDelete = null;
      this.MsgGroupPerso = null;
      this.PlaceHolder = new User(null);
      this.one = false;
    }

  ngOnInit(): void { 
    // Initialisation de la page
    this.app.ngOnInit();
    this.Reponse_getUserById = this.app.Reponse_getUserById;

    // Vérification des droit d'acces a cette page pour _currentUser
    // Vérification des droit d'acces a la création d'un nouveux utilisateur pour _currentUser
    // Vérification des droit d'acces a la modification de l'utilisateur par defaut pour _currentUser
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
    if(!rightGroupPage.SelectedUserManagement_Access) {
      console.log("Vous n'avez pas la permission d'accedez à la page de Gestion de cette utilisateur");
      this.router.navigate(['/Accueil']);
    }
    
    if(!rightGroupPage.UserManagement_AddUser && this.route.snapshot.paramMap.get('id') === "New") {
      console.log("Vous n'avez pas la permission de creer de nouveau Utilisateur");
      this.router.navigate(['/Accueil']);
    }
    
    if(!rightGroupPage.UserManagement_EditDefaultUser && Number(this.route.snapshot.paramMap.get('id')) === 1) {
      console.log("Vous n'avez pas la permission de modifier l'utilisateur par defaut");
      this.router.navigate(['/Accueil']);
    }

    if(rightGroupPage.SelectedUserManagement_Access) {
      // Récupération des données de l'utilisateur que l'on va modifier UNIQUEMENT si ce n'est pas la création d'un nouveau user
      // On indique également si il sagit d'un groupe perso ou pas
      if(this.route.snapshot.paramMap.get('id') !== "New") {
        this.Reponse_getUserById_form = this.userApi.getUserById(Number(this.route.snapshot.paramMap.get('id')));
        this.Reponse_getUserById_form.subscribe((data: Api) => {
          this.user = data.data

          if(this.initial_user.group.name === this.initial_user.login)
            this.MsgGroupPerso = "Groupe personnel de droit";
        })
      } else {
        this.Reponse_getUserById_form = this.userApi.getUserById(1);
        this.Reponse_getUserById_form.subscribe((data: Api) => {
          this.user = data.data

          if(this.initial_user.group.name === this.initial_user.login)
            this.MsgGroupPerso = "Groupe personnel de droit";
        })
      }

      this.Reponse_getUserById_form.subscribe((data: Api) => {
        if(data.data.id !== Number(this.route.snapshot.paramMap.get('id')) && this.route.snapshot.paramMap.get('id') !== "New") {
          console.log("L'utilisateur que vous voullez editer n'existe pas pas ou n'existe plus");
          this.router.navigate(['/UserManagement']);
        }
      })
        
      // Si on créer un utilisateur ou que l'on edite l'utilisateur par defaut, on enlève le bouton supprimer
      if(this.route.snapshot.paramMap.get('id') === "New" || this.route.snapshot.paramMap.get('id') === "1")
        this._currentUser.group.rightGroupPage.SelectedUserManagement_DeleteUser = false;

      // Récupération de la liste des groupes
      this.Reponse_getGroupList = this.groupApi.getGroupList();
      this.Reponse_getGroupList.subscribe((data: Api) => {
        this.GroupList = data.data
        
        // Supprime de la liste les groupes perso (autre que celui en cours) et remplace le nom du groupe perso du user actuel par son login
        var GroupList: Group[] = [];
        for(var i: number = 0; i < this.GroupList.length; i++) {
          if(this.GroupList[i].name.split('_')[1] === "user") {
            if(Number(this.GroupList[i].name.split('_')[2]) === this.user.id) {
              this.GroupList[i].name = this.user.login;
              this.GroupList[i].rightGroupPage.name = this.GroupList[i].name;
              GroupList.push(this.GroupList[i]);
            }
          } else
            GroupList.push(this.GroupList[i]);
        }
        this.GroupList = GroupList;
      })

      // Récupération de la liste des groupes de droit de pages
      this.Reponse_getRightGroupPageList = this.rightGroupPageApi.getRightGroupPageList();
      this.Reponse_getRightGroupPageList.subscribe((data: Api) => {
        this.RightGroupPageList = data.data

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
      })

      this.Reponse_getUserById_form.subscribe((data: Api) => {
        if(this.route.snapshot.paramMap.get('id') === "New") {
          this.user.login = "";
          this.user.password = "";
          this.user.gameTag = "";
          this.user.name = "";
          this.user.firstName = "";
        }

        this.user.date_time_logIn = this.generic.changeDateTimeFormatFromBdd(this.user.date_time_logIn);
        this.user.date_time_signIn = this.generic.changeDateTimeFormatFromBdd(this.user.date_time_signIn);
        this.user.birthDate = this.generic.changeDateTimeFormatFromBdd(this.user.birthDate);

        this.initial_user.date_time_logIn = this.generic.changeDateTimeFormatFromBdd(this.initial_user.date_time_logIn);
        this.initial_user.date_time_signIn = this.generic.changeDateTimeFormatFromBdd(this.initial_user.date_time_signIn);
        this.initial_user.birthDate = this.generic.changeDateTimeFormatFromBdd(this.initial_user.birthDate);
      })

      // Initialisation des données à afficher dans le formulaire
      this.initData();
    }
  }

  // Permet de changer la valeur du groupe de droit de page de l'utilisateur par celui séléctionné (change l'object)
  private setRightGroupPageSelected(id: any, value: any): void {
    this._ChangeRightPage = true;

    // On Met dans l'object user les données que l'on a deja rentré
    value.date_time_logIn = this.date.transform(value.date_logIn, 'yyyy-MM-dd') + " " + value.time_logIn;
    value.date_time_signIn = this.date.transform(value.date_signIn, 'yyyy-MM-dd') + " " + value.time_signIn;
    value.birthDate = this.date.transform(value.birthDate, 'yyyy-MM-dd');
    this.user = new User(value);

    this.user.group.rightGroupPage = new RightGroupPage(id);

    // Initialisation des données à afficher dans le formulaire
    this.initData();
  }

  // Permet de changer la valeur du groupe de l'utilisateur par celui séléctionné (change l'object)
  private setGroupSelected(id: any, value: any): void {
    // Permet de déplier la liste avec les different droit par page
    this._RightEdit = true;

    // On Met dans l'object user les données que l'on a deja rentré
    value.date_time_logIn = this.date.transform(value.date_logIn, 'yyyy-MM-dd') + " " + value.time_logIn;
    value.date_time_signIn = this.date.transform(value.date_signIn, 'yyyy-MM-dd') + " " + value.time_signIn;
    value.birthDate = this.date.transform(value.birthDate, 'yyyy-MM-dd');
    this.user = new User(value);
    this.user.group = new Group(id);
    
    // Affiche en fonction du groupe choisi s'il sagit d'un groupe perso ou non
    if(this.user.group.name === this.user.login)
      this.MsgGroupPerso = "Groupe personnel de droit";
    else
      this.MsgGroupPerso = null;

    // Initialisation des données à afficher dans le formulaire
    this.initData();
  }

  private setRightSelected(value: any, element: any): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser) {
      this._ChangeRightPage = true;

      value.date_time_logIn = this.date.transform(value.date_logIn, 'yyyy-MM-dd') + " " + value.time_logIn;
      value.date_time_signIn = this.date.transform(value.date_signIn, 'yyyy-MM-dd') + " " + value.time_signIn;
      value.birthDate = this.date.transform(value.birthDate, 'yyyy-MM-dd');
      this.user = new User(value);
  
      var rightGroupPage: RightGroupPage = new RightGroupPage(value);
      if(Number(this.route.snapshot.paramMap.get('id')) === 1)
        rightGroupPage.name = this.initial_user.group.rightGroupPage.name;
      else
        rightGroupPage.name = "Nouveau groupe personnel de droit";

      rightGroupPage.id = this.initial_user.group.rightGroupPage.id;

      // On definit le group de droit de page de l'utilisateur par celui que l'on vient de créer et modifier
      this.user.group.rightGroupPage = this.generic.setRightSelected(value, element, rightGroupPage);
  
      // Initialisation des données à afficher dans le formulaire
      this.initData();  
    }
  }

  public initData(): void {
    this.Reponse_getUserById_form.subscribe((data: Api) => {
      if(this.user.login === "") { this.user.login = null }
      if(this.user.password === "") { this.user.password = null }
      if(this.user.gameTag === "") { this.user.gameTag = null }
      if(this.user.name === "") { this.user.name = null }
      if(this.user.firstName === "") { this.user.firstName = null }

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
        'User_Access' : this.user.group.rightGroupPage.User_Access,
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
        'EditBar_Edit' : this.user.group.rightGroupPage.EditBar_Edit,
        'SelectedPageManagement_Access' : this.user.group.rightGroupPage.SelectedPageManagement_Access,
        'SelectedPageManagement_EditPage' : this.user.group.rightGroupPage.SelectedPageManagement_EditPage,
        'SelectedPageManagement_EditRefresh' : this.user.group.rightGroupPage.SelectedPageManagement_EditRefresh,
        'SelectedPageManagement_EditRoute' : this.user.group.rightGroupPage.SelectedPageManagement_EditRoute,
        'SelectedPageManagement_EditNeedLogIn' : this.user.group.rightGroupPage.SelectedPageManagement_EditNeedLogIn,
        'Settings_Access' : this.user.group.rightGroupPage.Settings_Access
      });

      if(this.route.snapshot.paramMap.get('id') === "New") {
        if(!this.one) {
          this.login.nativeElement.focus();
          this.one = !(this.one);
        }
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
          this.MsgGroupDelete = "En séléctionnant un groupe prédefini, vous allez supprimer le groupe personnalisé de l'utiliateur";
      }

      // On Bloque la modification du groupe et du login pour l'utilisateur par defaut
      if(Number(this.route.snapshot.paramMap.get('id')) === 1)
        this.SelectedUserManagementForm.get('rightGroupPage').disable();
    })

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

    this.SelectedUserManagementForm.get('EditBar_Access').disable();
    this.SelectedUserManagementForm.get('Main_Access').disable();

    if(Number(this.route.snapshot.paramMap.get('id')) === 1)
      this.SelectedUserManagementForm.get('group').disable();
  }

  private ChangeRightEdit(): void {
    this._RightEdit = !(this._RightEdit);
  }

  private editUse(post: any): void {
    this.Reponse_getUserById_initial.subscribe((data: Api) => {
      var same: boolean = false;

      post.date_time_logIn = this.generic.changeDateTimeFormatForBdd(post.date_logIn, post.time_logIn);
      post.date_time_signIn = this.generic.changeDateTimeFormatForBdd(post.date_signIn, post.time_signIn);
      post.birthDate = this.generic.changeDateTimeFormatForBdd(post.birthDate, null);

      this.user = new User(post);

      if(!this._RightEdit) {
        this.user.group.name = this.initial_user.group.name;
        this.user.group.rightGroupPage.name = this.user.group.name;
      }

      if(this.generic.create_md5(JSON.stringify(new User(this.user))) === this.generic.create_md5(JSON.stringify(new User(this.initial_user)))) {
        same = true;
        this.router.navigate(['/UserManagement']);
      }

      if(!same) {
        if(this.route.snapshot.paramMap.get('id') === "New") {
          if(this._currentUser.group.rightGroupPage.UserManagement_AddUser) {
        
            this.user = new User(post);
            if(this._ChangeRightPage || post.group.name !== post.group.rightGroupPage.name) {
              this.user.id = 0;
              this.user.group = new Group(null);
              if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser) {
                this.user.group.id = this.user.id;
                this.user.group.name = "_user_" + this.user.id;
                this.user.group.rightGroupPage = new RightGroupPage(post);
                this.user.group.rightGroupPage.id = this.user.id;
                this.user.group.rightGroupPage.name = this.user.group.name;
              }
            }
            this.userApi.postUser(this.user);
            this.router.navigate(['/UserManagement']);
          } else
            console.log("Vous n'avez pas la permission de créer un nouvelle utilisateur");
        }
        else if(Number(this.route.snapshot.paramMap.get('id')) === 1) {
          if(this._currentUser.group.rightGroupPage.UserManagement_EditDefaultUser) {
    
            this.user = new User(post);
            this.user.id = 1;
            this.user.group = new Group(null);
    
            if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser) {
              this.user.group.id = 1;
              this.user.group.name = "default";
              this.user.group.rightGroupPage = new RightGroupPage(post);
              this.user.group.rightGroupPage.id = 1;
              this.user.group.rightGroupPage.name = "default";
            }
    
            var regenerate_password: boolean = false;
            if(this.user.password !== this.initial_user.password)
              regenerate_password = true;
            
            this.userApi.putUser(1, this.user, regenerate_password).subscribe();
            this.router.navigate(['/UserManagement']);
          } else
            console.log("Vous n'avez pas la permission de créer un nouvelle utilisateur");
        } else {
          if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditUser) {
      
            this.user = new User(post);
    
            if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser) {
              if(this.initial_user.group.name.split('_').length === 1) {
                if(this._ChangeRightPage || post.group.name !== post.group.rightGroupPage.name) {
                  // Création d'un nouveau groupe perso
                  this.user.group = post.group;
                  this.user.group.rightGroupPage = post.group.rightGroupPage;
                  this.user.group.rightGroupPage.id = 0;
                  this.user.group.rightGroupPage.name = "_user_"+this.user.id;
                  this.user.group.id = 0;
                  this.user.group.name = "_user_"+this.user.id;
                } else if(this.initial_user.group.name !== post.group.name) {
                  // Attribution d'un group generique
                  this.user.group = post.group;
                }
              } else {
                if(post.group.name !== this.initial_user.login) {
                  // Attribution d'un group generique
                  // Supression du groupe perso
                  this.user.group = post.group;
                }
                else {
                  if(this._ChangeRightPage || (Number(post.group.rightGroupPage.name.split('_')[2]) !== this.initial_user.id && post.group.rightGroupPage.name !== this.initial_user.login) && post.group.name === this.initial_user.login) {
                    // Modification du group perso
                    this.user.group = post.group;
                    this.user.group.rightGroupPage = post.group.rightGroupPage;

                    this.user.group.id = this.initial_user.group.id;
                    this.user.group.name = this.initial_user.group.name;
                    
                    this.user.group.rightGroupPage.name = this.initial_user.group.name;
                    this.user.group.rightGroupPage.id = this.initial_user.group.rightGroupPage.id;
                  } 
                }
              }
            } else
              this.user.group = this.initial_user.group;
    
            var regenerate_password: boolean = false;
            if(this.user.password !== this.initial_user.password)
              regenerate_password = true;
    
            this.userApi.putUser(this.initial_user.id, this.user, regenerate_password).subscribe((data) => {
              if(data.ok) {
                this.router.navigate(['/UserManagement'])
                if(this.user.id === this._currentUser.id) {
                  this.app.logOut()
                }
              }
            });
          } else
            console.log("Vous n'avez pas la permission de modifier cette utilisateur");
        }
      }
    })
  }

  private DeleteUser(): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_DeleteUser && Number(this.route.snapshot.paramMap.get('id')) !== 1 && this.route.snapshot.paramMap.get('id') !== "New") {
      this.userApi.deleteUser(this.user.id);

      this.router.navigate(['/UserManagement']);
      if(this.user.id === this._currentUser.id)
        this.app.logOut();
    } else 
      console.log("Vous n'avez pas la permission de supprimer cette utilisateurs");
  }

  private imageChangeClick(event, value): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditUser) {
      // On Met dans l'object user les données que l'on a deja rentré
      value.date_time_logIn = this.date.transform(value.date_logIn, 'yyyy-MM-dd') + " " + value.time_logIn;
      value.date_time_signIn = this.date.transform(value.date_signIn, 'yyyy-MM-dd') + " " + value.time_signIn;
      value.birthDate = this.date.transform(value.birthDate, 'yyyy-MM-dd');
      if(value.login === null) { value.login = "null" }
      if(value.password === null) { value.password = "null" }
      if(value.gameTag === null) { value.gameTag = "null" }
      if(value.name === null) { value.name = "null" }
      if(value.firstName === null) { value.firstName = "null" }
      this.user = new User(value);

      var name: string = "profile" + Math.random() * 1000 + ".jpg";
      if(event.target.files[0] !==undefined) {
        this.uploadApi.UploadFile(event.target.files[0], name).subscribe(event => {
          if(event)
            this.newImage(event, name);
        });
      }
    } else 
      console.log("Vous n'avez pas la permission de modifier l'image de profile de cette utilisateur");
  }

  private newImage(ok: any, name: string): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditUser) {
      if(ok.ok)
        this.user.profile = "https://dev.kevin-c.fr/uploads/" + name;
      this.initData();
    } else 
      console.log("Vous n'avez pas la permission de modifier l'image de profile de cette utilisateur");
  }

  public imageChangeDrag(event, value): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditUser) {
      // On Met dans l'object user les données que l'on a deja rentré
      value.date_time_logIn = this.date.transform(value.date_logIn, 'yyyy-MM-dd') + " " + value.time_logIn;
      value.date_time_signIn = this.date.transform(value.date_signIn, 'yyyy-MM-dd') + " " + value.time_signIn;
      value.birthDate = this.date.transform(value.birthDate, 'yyyy-MM-dd');
      if(value.login === null) { value.login = "null" }
      if(value.password === null) { value.password = "null" }
      if(value.gameTag === null) { value.gameTag = "null" }
      if(value.name === null) { value.name = "null" }
      if(value.firstName === null) { value.firstName = "null" }
      this.user = new User(value);

      var name: string = "profile" + Math.random() * 1000 + ".jpg";
      (event.files[0].fileEntry as FileSystemFileEntry).file((file: File) => { this.uploadApi.UploadFile(file, name).subscribe(event => {
        if(event)
          this.newImage(event, name);
      }); });
    } else 
      console.log("Vous n'avez pas la permission de modifier l'image de profile de cette utilisateur");
  }
}
