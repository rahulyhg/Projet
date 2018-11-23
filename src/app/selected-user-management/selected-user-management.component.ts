import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';

import { FileSystemFileEntry } from '../../../node_modules/ngx-file-drop';

import { GenericModule } from '../generic/generic.modules';

import { AppComponent } from '../app.component';

import { User } from '../Class/User';
import { Group } from '../Class/Group';
import { RightGroupPage } from '../Class/RightGroupPage';

import { UserService } from '../Services/user.service';
import { GroupService } from '../Services/group.service';
import { RightGroupPageService } from '../Services/RightGroupPage.service';
import { UploadService } from '../Services/uploads.service';
import { Setting } from '../Class/Setting';

@Component({
  templateUrl: './selected-user-management.component.html'
})
export class SelectedUserManagementComponent implements OnInit {
  @ViewChild('login') private login: ElementRef;
  @ViewChild('EditBar') private EditBar: ElementRef;

  private Reponse_getUserById: Observable<Object>;
  private Reponse_getUserById_initial: Observable<Object>;
  private Reponse_getUserById_form: Observable<Object>;
  private Reponse_getGroupList: Observable<Object>;

  public _currentUser: User;
  public _RightEdit: boolean;
  private _ChangeRightPage: boolean;
  public RightGroupPageList: RightGroupPage[];
  private GroupList: Group[];
  private initial_GroupList: Group[];
  public SelectedUserManagementForm: FormGroup;
  private user: User;
  private initial_user: User;
  private MsgGroupDelete: string;
  private MsgGroupPerso: string;
  private canChangeLogin: boolean;
  public MsgTemplate: string;
  private statutButton: boolean;
  private setting: Setting;
  private try: number;

  constructor(private route: ActivatedRoute, private app: AppComponent, private userApi: UserService, private router: Router, private fb: FormBuilder, private groupApi: GroupService, private rightGroupPageApi: RightGroupPageService, private uploadApi: UploadService, private date: DatePipe, private generic: GenericModule, private dialog: MatDialog) { 
      this.Reponse_getUserById = new Observable<Object>();
      this.Reponse_getUserById_initial = new Observable<Object>();
      this.Reponse_getUserById_form = new Observable<Object>();
      this.Reponse_getGroupList = new Observable<Object>();

      this._currentUser = new User(null);
      this._RightEdit = false;
      this._ChangeRightPage = false;
      this.RightGroupPageList = new RightGroupPage(null)[2];
      this.GroupList = new Group(null)[2];
      this.initial_GroupList = new Group(null)[2];
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
      this.MsgGroupDelete = null;
      this.MsgGroupPerso = "Editer ce groupe";
      this.canChangeLogin = false;
      this.MsgTemplate = null;
      this.statutButton = false;
      this.setting = new Setting(null);
      this.try = 0;
    }

  private openDialog(): void {
    const dialogRef = this.dialog.open(DeleteUserPopup);

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.DeleteUser();
    });
  }

  private ChangePassword(): void {
    const dialogRef = this.dialog.open(NewPasswordPopupUser);

    dialogRef.keydownEvents().subscribe(event => {
      if(event.key === "Enter") {
        if(this.verifNewPassword())
          dialogRef.close();
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.verifNewPassword();
    });
  }

  // Initialisation de la page
  public ngOnInit(): void {
    this.app.ngOnInit();

    var statut: boolean = false;
    var a = setInterval(() => {
      if(!statut) {
        if(this.app.statut) {
          statut = true;
          clearInterval(a);
          this.Init();
        }
      }
    }, 1);
  }

  private Init(): void {
    this.setting = this.app.setting;
    this.Reponse_getUserById = this.app.Reponse_getUserById;

    var statut_Reponse_getUserById: boolean = false;
    var statut_Reponse_getUserById_initial :boolean = false;
    var statut_Reponse_getUserById_form :boolean = false;
    var statut_Reponse_getRightGroupPageList :boolean = false;
    var statut_Reponse_getGroupList :boolean = false;

    this.Reponse_getUserById.subscribe((events: Response) => {
      if(event && events.body !== undefined) {
        var data: any = events.body;
        var data_r: User = null;
        data_r = this.generic.createUser(data.data);
        if(data_r !== null) {
          this._currentUser = data_r;
          statut_Reponse_getUserById = true;
        }
      }
    })

    var id_user: string | number = this.route.snapshot.paramMap.get('id');

    var b = setInterval(() => {
      if(statut_Reponse_getUserById) {
        clearInterval(b);

        if(String(id_user) === "New" || Number(id_user) === 1)
          this.Reponse_getUserById_form = this.userApi.getUserById(1);
        else
          this.Reponse_getUserById_form = this.userApi.getUserById(Number(id_user));

        this.Reponse_getUserById_initial = this.Reponse_getUserById_form;
        this.Reponse_getUserById_form.subscribe((events: Response) => {
          if(event && events.body !== undefined) {
            var data: any = events.body;

            var data: any = events.body;
            if(data.data !== null) {
              data.data.date_time_logIn = this.generic.changeDateTimeFormatFromBdd(data.data.date_time_logIn);
              data.data.date_time_signIn = this.generic.changeDateTimeFormatFromBdd(data.data.date_time_signIn);
              data.data.birthDate = this.generic.changeDateTimeFormatFromBdd(data.data.birthDate);
  
              if(data.data.group.name.split("_").length !== 1) {
                data.data.group.name = "Groupe personelle de l'utilisateur";
                data.data.group.rightGroupPage.name = data.data.group.name;
              }

              var data_r: User = null;
              data_r = this.generic.createUser(data.data);
              if(data_r !== null) {
                this.user = data_r;
                statut_Reponse_getUserById_form = true;
              }
            } else
              this.router.navigate(['/Accueil']);
          }
        })
      }
    }, 1);

    var c = setInterval(() => {
      if(statut_Reponse_getUserById_form) {
        clearInterval(c);

        // On place dans un deuxième objet les valeurs initial de l'utilisateur
        this.Reponse_getUserById_initial.subscribe((events: Response) => {
          if(event && events.body !== undefined) {
            var data: any = events.body;

            data.data.date_time_logIn = this.generic.changeDateTimeFormatFromBdd(data.data.date_time_logIn);
            data.data.date_time_signIn = this.generic.changeDateTimeFormatFromBdd(data.data.date_time_signIn);
            data.data.birthDate = this.generic.changeDateTimeFormatFromBdd(data.data.birthDate);

            var data_r: User = null;
            data_r = this.generic.createUser(data.data);
            if(data_r !== null) {
              this.initial_user = data_r;
              statut_Reponse_getUserById_initial = true;
            }
          }
        })
      }
    }, 1);

    var d = setInterval(() => {
      if(statut_Reponse_getUserById_form) {
        clearInterval(d);

        // Récupération de la liste des groupes
        this.Reponse_getGroupList = this.groupApi.getGroupList();
        var Reponse_getGroupList_initial: Observable<Object> = this.Reponse_getGroupList;
        this.Reponse_getGroupList.subscribe((events: Response) => {
          if(event && events.body !== undefined) {
            var data: any = events.body;
            var groupList: Group[] = [];
            var rightGroupPageList: RightGroupPage[] = [];

            for(var i: number = 0; i < data.data.length; i++) {
              if(data.data[i].name.split('_').length !== 1) {
                if(String(id_user) !== "New") {
                  if(this.user.id === Number(data.data[i].name.split('_')[2])) {
                    data.data[i].name = "Groupe personelle de l'utilisateur";
                    this.MsgGroupPerso = "Editer ce groupe personnel de droit";
                    data.data[i].rightGroupPage.name = data.data[i].name;
                    groupList.push(data.data[i]);
                    rightGroupPageList.push(data.data[i].rightGroupPage);
                  }
                }
              } else {
                groupList.push(data.data[i]);
                rightGroupPageList.push(data.data[i].rightGroupPage);
              }
            }

            var data_r: RightGroupPage[] = null;
            var data_r_r: Group[] = null;
            data_r = this.generic.createRightGroupPageList(rightGroupPageList);
            data_r_r = this.generic.createGroupList(groupList);
            if(data_r !== null && data_r_r !== null) {
              this.GroupList = data_r_r;
              this.RightGroupPageList = data_r;

              statut_Reponse_getRightGroupPageList = true;
              statut_Reponse_getGroupList = true;
            }
          }
        })

        Reponse_getGroupList_initial.subscribe((events: Response) => {
          if(event && events.body !== undefined) {
            var data: any = events.body;
    
            var data_r: Group[] = null;
            data_r = this.generic.createGroupList(data.data);
            if(data_r !== null)
              this.initial_GroupList = data_r;
          }
        })
      }
    }, 1);

    var e = setInterval(() => {
      this.Reponse_getUserById_form.subscribe(data => {
        if(statut_Reponse_getRightGroupPageList && statut_Reponse_getGroupList) {
          clearInterval(e);

          // Adaptation du DOOM (footer) car il y a la bar d'edition
          if(this.EditBar.nativeElement !== null)
            document.getElementById("footer").style.marginBottom = this.EditBar.nativeElement.offsetHeight - 6 + "px";
  
          if(!this._currentUser.group.rightGroupPage.SelectedUserManagement_Access) {
            console.log("Vous n'avez pas la permission d'accedez à la page de Gestion de cette utilisateur");
            this.router.navigate(['/Accueil']);
          }
          
          if(!this._currentUser.group.rightGroupPage.UserManagement_AddUser && this.route.snapshot.paramMap.get('id') === "New") {
            console.log("Vous n'avez pas la permission de creer de nouveau Utilisateur");
            this.router.navigate(['/Accueil']);
          }
          
          if(!this._currentUser.group.rightGroupPage.UserManagement_EditDefaultUser && Number(this.route.snapshot.paramMap.get('id')) === 1) {
            console.log("Vous n'avez pas la permission de modifier l'utilisateur par defaut");
            this.router.navigate(['/Accueil']);
          }

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

          // Traitement pour l'edition de l'utilisateur par defaut
          if(Number(id_user) === 1) {
            this.MsgGroupPerso = "Editer le groupe par defaut";

            this.SelectedUserManagementForm.get('rightGroupPage').disable();
            this.SelectedUserManagementForm.get('group').disable();
          } else 
            this.canChangeLogin = true;

          // Traitement pour la création d'un nouveau utilisateur
          if(String(id_user) === "New") {
            this.login.nativeElement.focus();

            this.user.login = "";
            this.user.password = "";
            this.user.gameTag = "";
            this.user.name = "";
            this.user.firstName = "";

            this.statutButton = true;
          }

          // Traitement pour n'importe quelle utilisateur
          this.SelectedUserManagementForm.get('EditBar_Access').disable();
          this.SelectedUserManagementForm.get('Main_Access').disable();
            
          // Si on créer un utilisateur ou que l'on edite l'utilisateur par defaut, on enlève le bouton supprimer
          if(this.route.snapshot.paramMap.get('id') === "New" || this.route.snapshot.paramMap.get('id') === "1")
            this._currentUser.group.rightGroupPage.SelectedUserManagement_DeleteUser = false;

          this.app.stopLoadingPage();
          this.initData();
        }
      })
    }, 1);
  }

  // Permet de changer la valeur du groupe de droit de page de l'utilisateur par celui séléctionné (change l'object)
  private setRightGroupPageSelected(value: any, post: any): void {
    // Récupération des données initial de l'utilisateur
    var group_id: number = this.initial_user.group.id;
    var rightGroupPage_id: number = this.initial_user.group.rightGroupPage.id;
    var group_name: string = this.initial_user.group.name;
    if(group_name.split('_').length !== 1)
      group_name = "Groupe personelle de l'utilisateur";

    // Création d'un nouveau utilisateur avec les valeurs deja rentré
    this.user = this.formatData(post);

    // Si l'on click sur le groupe de base, il reprend ses valeur de base
    if(value.id !== this.user.group.rightGroupPage.id) {
      this.user.group.rightGroupPage = new RightGroupPage(value);

      // Si l'on selectionne un template de group de droit et que l'on est pas dans la 
      // création d'un nouveau droit, on idique sur quelle template est basé le droit que l'on modifie
      if(this.route.snapshot.paramMap.get('id') !== "New")
        this.MsgTemplate = "(Sur exemple de " + value.name + ")";
    } else {
      this.user.group.rightGroupPage = this.initial_user.group.rightGroupPage;
      this.MsgTemplate = null;
    }

    // Ré-importation des données de base dans le nouveau groupe
    this.user.group.id = group_id;
    this.user.group.name = group_name;
    this.user.group.rightGroupPage.id = rightGroupPage_id;
    this.user.group.rightGroupPage.name = this.user.group.name;

    this._ChangeRightPage = true;

    // Initialisation des données à afficher dans le formulaire
    this.initData();    
  }

  // Permet de changer la valeur du groupe de l'utilisateur par celui séléctionné (change l'object)
  private setGroupSelected(value: any, post: any): void {
    // Permet de déplier la liste avec les different droit par page
    this._RightEdit = true;

    this._ChangeRightPage = false;

    // Création d'un nouveau utilisateur avec les valeurs deja rentré
    this.user = this.formatData(post);

    if(this.initial_user.group.name.split("_").length !== 1) {
      if(this.initial_user.group.id !== value.id)
        this.MsgGroupDelete = "En séléctionnant un groupe prédefini, vous allez supprimer le groupe personnalisé de l'utiliateur";
      else
        this.MsgGroupDelete = null;
    }

    this.user.group = new Group(value);
    
    // Affiche en fonction du groupe choisi s'il sagit d'un groupe perso ou non
    if(value.name === "Groupe personelle de l'utilisateur")
      this.MsgGroupPerso = "Editer ce groupe personnel de droit";
    else {
      this.MsgGroupPerso = "Editer ce groupe";
      if(this.user.group.id === 1)
        this.MsgGroupPerso = "Editer le groupe par defaut";
    }

    // Initialisation des données à afficher dans le formulaire
    this.initData();
  }

  // Traitement de gestion automatique des droits et de leur dependence
  public setRightSelected(value: any, element: any): void {
    this._ChangeRightPage = true;

    // Récupération des données initial de l'utilisateur
    var group_id: number = this.initial_user.group.id;
    var rightGroupPage_id: number = this.initial_user.group.rightGroupPage.id;
    var group_name: string = this.initial_user.group.name;
    if(group_name.split('_').length !== 1)
      group_name = "Groupe personelle de l'utilisateur";

    // Création d'un nouveau utilisateur avec les valeurs deja rentré
    var user: User = this.formatData(value);

    user.group.rightGroupPage = new RightGroupPage(value);

    // Appel de la methode qui gère automatiquement les droits et leur dépendence
    user.group.rightGroupPage = this.generic.setRightSelected(element, user.group.rightGroupPage);

    // Ré-importation des données de base dans le nouveau groupe
    this.user = user;
    this.user.group = user.group;
    this.user.group.id = group_id;
    this.user.group.name = group_name;
    this.user.group.rightGroupPage.id = rightGroupPage_id;
    this.user.group.rightGroupPage.name = this.user.group.name;

    // Initialisation des données à afficher dans le formulaire
    this.initData();
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

    // Definit quelle groupe est a séléctionner par defaut dans la liste des groupes
    this.SelectedUserManagementForm.get('group').setValue(this.GroupList[this.GroupList.findIndex(d => d.id === this.user.group.id)]);

    // Definit quelle groupe de droit de page a selectionner par defaut dans la liste de groupes de droit de page
    this.SelectedUserManagementForm.get('rightGroupPage').setValue(this.RightGroupPageList[this.RightGroupPageList.findIndex(d => d.id === this.user.group.rightGroupPage.id)]);

    if(Number(this.route.snapshot.paramMap.get('id')) === 1)
      this.SelectedUserManagementForm.get('login').disable();
  }

  public editUser(post: any): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditUser) {
      var same: boolean = false;

      var user: User = new User(post);
      user.date_time_logIn = this.generic.changeDateTimeFormatForBdd(post.date_logIn, post.time_logIn);
      user.date_time_signIn = this.generic.changeDateTimeFormatForBdd(post.date_signIn, post.time_signIn);
      user.birthDate = this.generic.changeDateTimeFormatForBdd(post.birthDate, null);

      if(this.initial_user.group.name.split("_").length !== 1) {
        user.group.name = this.initial_user.group.name;
        user.group.rightGroupPage.name = user.group.name;
      }

      if(!this._currentUser.group.rightGroupPage.SelectedUserManagement_EditRightGroupPageUser)
        user.group = this.initial_user.group;

      if(this.generic.create_md5(JSON.stringify(user)) === this.generic.create_md5(JSON.stringify(this.initial_user))) {
        this.router.navigate(['/UserManagement']);
        same = true;
      }
        

      if(!same) {
        console.log("modification");
        // Detection du traitement a faire pour les groupes
        if(user.group !== this.initial_user.group) {
          if(this.initial_user.group.name.split('_').length === 1) {
            // Création d'un nouveau groupe perso
            if(this._ChangeRightPage && user.group.rightGroupPage !== this.initial_user.group.rightGroupPage) {
              user.group.id = 0;
              user.group.rightGroupPage.id = user.group.id;
              user.group.name = "_user_" + user.id;
              user.group.rightGroupPage.name = user.group.name;
            }
          } else {
            // Supression du groupe perso et Attribution d'un group generique
            if(user.group.id !== this.initial_user.group.id)
              user.group = this.initial_GroupList[this.initial_GroupList.findIndex(d => d.id === user.group.id)];
          }
        } else
          user.group = this.initial_user.group;

        var regenerate_password: boolean = false;
        if(user.password !== this.initial_user.password)
          regenerate_password = true;

        if(this.route.snapshot.paramMap.get('id') === "New") {
          if(this._currentUser.group.rightGroupPage.UserManagement_AddUser) {
            this.userApi.postUser(user).subscribe((data) => { 
              if(data.ok)
                this.router.navigate(['/UserManagement']);
            });
          } else
            console.log("Vous n'avez pas la permission de créer un nouvelle utilisateur");
        } else {
          if(Number(this.route.snapshot.paramMap.get('id')) === 1) {
            user.id = 1;
            user.login = "default";
            user.group.id = user.id;
            user.group.name = user.login;
            user.group.rightGroupPage.id = user.id;
            user.group.rightGroupPage.name = user.login;
          } else
            user.id = this.initial_user.id;

          this.userApi.putUser(this.user.id, user, regenerate_password).subscribe(data => {
            if(data.ok) {
              this.router.navigate(['/UserManagement'])
              if(this.user.id === this._currentUser.id)
                this.app.logOut()
            }
          })
        }
      }
    } else
      console.log("Vous n'avez pas la permission de modifier des utilisateur");
  }

  private DeleteUser(): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_DeleteUser) {
      this.userApi.deleteUser(this.user.id).subscribe(data => {
        if(data.ok) {
          this.router.navigate(['/UserManagement']);
          if(this.user.id === this._currentUser.id)
            this.app.logOut();
        }
      })
    } else 
      console.log("Vous n'avez pas la permission de supprimer cette utilisateurs");
  }

  private imageChangeClick(event, value): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditUser) {
      // Création d'un nouveau utilisateur avec les valeurs deja rentré
      this.user = this.formatData(value);

      this.generic.startUploadAnimation("profile");
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profile = e.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);

      var name: string = "profile" + Math.random() * 1000 + ".jpg";
      if(event.target.files[0] !==undefined) {
        this.uploadApi.UploadFile(event.target.files[0], name).subscribe(event => {
          this.statutButton = true;
          var load: any = event;
          var a: number = load.loaded * 100 / load.total;
          this.generic.updateLoadUploade(a, "profile");
          if(a === 100)
            this.generic.startTritementUpload();
          if(load.ok)
            this.generic.stopUploadAnimation("profile");
          if(event)
            this.newImage(event, name);
        });
      }
    } else 
      console.log("Vous n'avez pas la permission de modifier l'image de profile de cette utilisateur");
  }

  private newImage(ok: any, name: string): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditUser) {
      if(ok.ok) {
        this.statutButton = false;
        this.user.profile = "https://dev.kevin-c.fr/uploads/" + name;
        this.initData();
      }
    } else 
      console.log("Vous n'avez pas la permission de modifier l'image de profile de cette utilisateur");
  }

  private imageChangeDrag(event, value): void {
    if(this._currentUser.group.rightGroupPage.SelectedUserManagement_EditUser) {
      // Création d'un nouveau utilisateur avec les valeurs deja rentré
      this.user = this.formatData(value);

      this.generic.startUploadAnimation("profile");

      (event.files[0].fileEntry as FileSystemFileEntry).file((file: File) => { 
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.user.profile = e.target.result;
        }
        reader.readAsDataURL(file);
      })
      var name: string = "profile" + Math.random() * 1000 + ".jpg";
      (event.files[0].fileEntry as FileSystemFileEntry).file((file: File) => { this.uploadApi.UploadFile(file, name).subscribe(event => {
        this.statutButton = true;
        var load: any = event;
        var a: number = load.loaded * 100 / load.total;
        this.generic.updateLoadUploade(a, "profile");
        if(a === 100)
          this.generic.startTritementUpload();
        if(load.ok)
          this.generic.stopUploadAnimation("profile");
        if(event)
          this.newImage(event, name);
      }); });
    } else 
      console.log("Vous n'avez pas la permission de modifier l'image de profile de cette utilisateur");
  }

  private verifNewPassword(): boolean {
    var obj1 = Object(document.getElementById("1")).value;
    var obj2 = Object(document.getElementById("2")).value;
    if(obj1 !== undefined && obj2 !== undefined) {
      var password1: string = obj1;
      var password2: string = obj2;
      if(password1 === password2 && password1.length >= this.app.setting.minLengthPassword && password2.length >= this.app.setting.minLengthPassword) {
        this.user.password = password1;
        this.initData();
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  private InputChange(value: any): void {
    if(value.login === undefined)
      value.login = this.initial_user.login;
    if(value.login.length < this.app.setting.minLengthLogin || value.gameTag.length < this.app.setting.minLengthGameTag ||
      value.name.length < this.app.setting.minLengthName || value.firstName.length < this.app.setting.minLengthFirstName)
      this.statutButton = true;
    if(value.login.length >= this.app.setting.minLengthLogin && value.gameTag.length >= this.app.setting.minLengthGameTag &&
      value.name.length >= this.app.setting.minLengthName && value.firstName.length >= this.app.setting.minLengthFirstName)
      this.statutButton = false;
  }

  private clearValue(data: string): void {
    this.SelectedUserManagementForm.get(data).setValue("");
    this.InputChange(this.SelectedUserManagementForm.value);
  }

  private formatData(value: any): User {
    value.date_time_logIn = this.date.transform(value.date_logIn, 'yyyy-MM-dd') + " " + value.time_logIn;
    value.date_time_signIn = this.date.transform(value.date_signIn, 'yyyy-MM-dd') + " " + value.time_signIn;
    value.birthDate = this.date.transform(value.birthDate, 'yyyy-MM-dd');

    var user: User = new User(null);

    if(this.route.snapshot.paramMap.get('id') !== "New")
      user = new User(value);
    else {
      user.id = value.id;
      user.login = value.login;
      user.password = value.password;
      user.profile = value.profile;
      user.statut = value.statut;
      user.date_time_logIn = value.date_time_logIn;
      user.date_time_signIn = value.date_time_signIn;
      user.gameTag = value.gameTag;
      user.name = value.name;
      user.firstName = value.name;
      user.birthDate = value.birthDate;
    }
    return user;
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `<h2 mat-dialog-title>Voulez vous vraiment supprimer cette utilisateur ?</h2>
  <mat-dialog-content class="mat-typography">
    <p>Confirmez-vous la suppression ?</p>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-raised-button mat-dialog-close color="primary">Cancel</button>
    <button mat-raised-button [mat-dialog-close]="true" color="warn" cdkFocusInitial>Supprimer</button>
  </mat-dialog-actions>`,
})
export class DeleteUserPopup { }


@Component({
  selector: 'dialog-content-example-dialog',
  template: `<h2 mat-dialog-title>Création d'un nouveau mot de passe</h2>
  <mat-dialog-content class="mat-typography">

  <mat-form-field class="example-form-field">
    <input matInput minlength="6" maxlength="20" #newpassword1 placeholder="Mot de passe" (keyup)="InputChange('newpassword1', newpassword1.value, newpassword2.value)" id="1">
    <mat-icon mat-button matSuffix mat-icon-button (click)="newpassword1.value = ''">close</mat-icon>
    <mat-hint *ngIf="newpassword1.value.length >= 6" align="start">Limite de caractères pour le nouveau mot de passe</mat-hint>
    <mat-hint *ngIf="newpassword1.value.length >= 6" align="end">{{ newpassword1.value.length }} / 20</mat-hint>
    <mat-hint *ngIf="newpassword1.value.length < 6" align="end">Trop court</mat-hint>
  </mat-form-field>

  <mat-form-field class="example-form-field" style="margin-top: 10px;">
    <input matInput maxlength="20" #newpassword2 placeholder="Validez le mot de passe" (keyup)="InputChange('newpassword2', newpassword1.value, newpassword2.value)" id="2">
    <mat-icon mat-button matSuffix mat-icon-button (click)="newpassword2.value = ''">close</mat-icon>
    <mat-hint align="start" *ngIf="newpassword1.value !== newpassword2.value">Le mot de passe saisit est different</mat-hint>
  </mat-form-field>

  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-raised-button mat-dialog-close type="button" color="primary">Annuler</button>
    <button mat-raised-button cdkFocusInitial [mat-dialog-close]="true" type="button" color="primary" [disabled]="statutButton" #buttonS>Valider</button>
  </mat-dialog-actions>`
})
export class NewPasswordPopupUser implements OnInit { 
  @ViewChild('newpassword1') private newpassword1: ElementRef;
  public statutButton: boolean = true;

  constructor() { }

  ngOnInit() {
  this.newpassword1.nativeElement.focus();
  }

  public InputChange(element: string, data1: string, data2: string) {
    if(data1 !== data2 || data1.length < 6 || data2.length < 6 ) {
      this.statutButton = true;
    } else {
      this.statutButton = false;
    }
  }
 }