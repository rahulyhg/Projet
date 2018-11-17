import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';

import { GenericModule } from '../generic/generic.modules';

import { AppComponent } from '../app.component';

import { Api } from '../Class/Api';
import { User } from '../Class/User';
import { Group } from '../Class/Group';
import { RightGroupPage } from '../Class/RightGroupPage';

import { GroupService } from '../Services/group.service';
import { RightGroupPageService } from '../Services/RightGroupPage.service';

@Component({
  templateUrl: './selected-group-management.component.html'
})
export class SelectedGroupManagementComponent implements OnInit {
  @ViewChild('name') private name: ElementRef;
  @ViewChild('EditBar') private EditBar: ElementRef;
  
  private Reponse_getUserById: Observable<Api>;
  private Reponse_getGroupById_form: Observable<Object>;
  private Reponse_getGroupById_initial: Observable<Object>;
  private Reponse_getRightGroupPageList: Observable<Object>;

  public _currentUser: User;
  public RightGroupPageList: RightGroupPage[];
  public SelectedGroupManagementForm: FormGroup;
  private group: Group;
  private initial_group: Group;
  private one: boolean;
  public canChangeName: boolean;
  public MsgTemplate: string;

  constructor(private route: ActivatedRoute, private app: AppComponent, private router: Router, private fb: FormBuilder, private groupApi: GroupService, private rightGroupPageApi: RightGroupPageService, private generic: GenericModule, private dialog: MatDialog) { 
    this.Reponse_getUserById = new Observable<Api>();
    this.Reponse_getGroupById_form = new Observable<Api>();
    this.Reponse_getGroupById_initial = new Observable<Api>();
    this.Reponse_getRightGroupPageList = new Observable<Api>();

    this._currentUser = new User(null);
    this.RightGroupPageList = new RightGroupPage(null)[2];
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
      'SelectedPageManagement_EditRoute': null, 'SelectedPageManagement_EditNeedLogIn': null, 'Settings_Access': null});
    this.group = new Group(null);
    this.one = false;
    this.canChangeName = true;
    this.MsgTemplate = null;
  }

  // Affichage du popup lors de la suppression du groupe
  private openDialog(): void {
    const dialogRef = this.dialog.open(DeleteGroupPopup);

    dialogRef.afterClosed().subscribe(result => {
      if(result)
        this.DeleteGroup();
    });
  }

  // Initialisation de la page
  public ngOnInit(): void { 
    // Initialisation de la page
    this.app.ngOnInit();
    this.Reponse_getUserById = this.app.Reponse_getUserById;

    var statut_Reponse_getRightGroupPageList: boolean = false;
    var statut_Reponse_getGroupById_form: boolean = false;

    // Adaptation du DOOM (footer) car il y a la bar d'edition
    if(this.EditBar.nativeElement !== null)
      document.getElementById("footer").style.marginBottom = this.EditBar.nativeElement.offsetHeight - 6 + "px";

    this.Reponse_getUserById.subscribe((data: Api) => {
      // récupération de l'utilisateur connécté
      this._currentUser = data.data;
      
      // Vérification des droits de l'utilisateur pour acceder a cette page
      if(!this._currentUser.group.rightGroupPage.SelectedGroupManagement_Access) {
        console.log("Vous n'avez pas la permission d'accedez à la page de Gestion de ce groupe");
        this.router.navigate(['/Accueil']);
      }
      
      // Vérification des droits de l'utilisateur pour ajouter un groupe
      if(!this._currentUser.group.rightGroupPage.GroupManagement_AddGroup && this.route.snapshot.paramMap.get('id') === "New") {
        console.log("Vous n'avez pas la permission de creer de nouveau groupe");
        this.router.navigate(['/Accueil']);
      }
      
      // Vérification des droits de l'utilisateur pour modifier le groupe par defaut
      if(!this._currentUser.group.rightGroupPage.GroupManagement_EditDefaultGroup && Number(this.route.snapshot.paramMap.get('id')) === 1) {
        console.log("Vous n'avez pas la permission de modifier le groupe par defaut");
        this.router.navigate(['/Accueil']);
      }

      // Désactivation des slides pour modifier les droit si l'utilisateur n'as pas les droit de les modifier
      if(!this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditRightPage) {
        this.SelectedGroupManagementForm.disable();
        this.SelectedGroupManagementForm.get('name').enable();
      }

      // Désactivation du formulaire si l'utilisateur n'as pas les droit de modifier le groupe
      if(!this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditGroup)
        this.SelectedGroupManagementForm.disable();
    })

    // Récupération des données du groupe que l'on veut éditer
    var id_group: string | number = this.route.snapshot.paramMap.get('id');
    if(String(id_group) === "New" || Number(id_group) === 1)
      this.Reponse_getGroupById_form = this.groupApi.getGroupById(1);
    else
      this.Reponse_getGroupById_form = this.groupApi.getGroupById(Number(id_group));
    this.Reponse_getGroupById_initial = this.Reponse_getGroupById_form;
    this.Reponse_getGroupById_form.subscribe((events: Response) => {
      if(event && events.body !== undefined) {
        var data: any = events.body;
        var data_r: Group = null;
        data_r = this.generic.createGroup(data.data);
        if(data_r !== null) {
          this.group = data_r;
          statut_Reponse_getGroupById_form = true;
        }
      }
    })

    // On place dans un deuxième objet les valeurs initial du groupe
    this.Reponse_getGroupById_initial.subscribe((events: Response) => {
      if(event && events.body !== undefined) {
        var data: any = events.body;
        this.initial_group = this.generic.createGroup(data.data);
      }
    })

    // Récupération de la liste des groupes de droit de page
    this.Reponse_getRightGroupPageList = this.rightGroupPageApi.getRightGroupPageList();
    this.Reponse_getRightGroupPageList.subscribe((events: Response) => {
      if(event && events.body !== undefined && statut_Reponse_getGroupById_form) {
        var data: any = events.body;
        var list: RightGroupPage[] = [];

        // Si le groupe que l'on veut modifier est un groupe personel, on modifie le nom du groupe de droit le le nom du groupe par 
        // un nom plus joli et on enlève les autres groupe personel de la liste
        for(var i: number = 0; i < data.data.length; i++) {
          if(data.data[i].name.split('_')[1] === "user") {
            if(String(id_group) !== "New") {
              var id_user: number = Number(this.group.name.split('_')[2]);
              if(Number(id_user) === Number(data.data[i].name.split('_')[2])) {
                this.group.name = "Groupe personelle de l'utilisateur id: " + id_user;
                data.data[i].name = this.group.name;
                list.push(data.data[i]);
              }
            }
          } else
            list.push(data.data[i]);
        }
        var data_r: RightGroupPage[] = null;
        data_r = this.generic.createRightGroupPageList(list);
        if(data_r !== null) {
          this.RightGroupPageList = data_r;
          statut_Reponse_getRightGroupPageList = true;
        }
      }
    })


    this.Reponse_getUserById.subscribe((data: Api) => {
      // Vérification de l'existence du groupe que l'on veux éditer
      // if(this.group.id !== Number(id_group) && String(id_group) !== "New") {
      //   console.log("Le group que vous tentez d'etiter n'existe pas");
      //   this.router.navigate(['/GroupManagement']);
      // }

      // Modification du formulaire pour la création d'un nouveau groupe
      if(String(id_group) === "New") {
        // Si il s'agit de la création d'un groupe, on initialise le nom du groupe à NULL
        this.group.name = null;

        // On supprime également la possibilité de pouvoir supprimer le groupe
        this._currentUser.group.rightGroupPage.SelectedGroupManagement_DeleteGroup = false;
      }

      // Modification pour la modification du groupe par defaut
      if(Number(id_group) === 1) {
        this.SelectedGroupManagementForm.get('RightGroupPage').disable(); // Désactive la liste déroulante des groupes de droit de page
        this.canChangeName = false; // Désactive la croix dans le input pour empecher de vider le contenue du input

        // On supprime également la possibilité de pouvoir supprimer le groupe
        this._currentUser.group.rightGroupPage.SelectedGroupManagement_DeleteGroup = false;
      }

      // Modification pour la modification d'un groupe personel
      if(this.initial_group.name.split('_').length !== 1) {
        this.SelectedGroupManagementForm.get('RightGroupPage').disable(); // Désactive la liste déroulante des groupes de droit de page
        this.canChangeName = false; // Désactive la croix dans le input pour empecher de vider le contenue du input
      }

      // On met le focus sur le nom du groupe l'or de l'ouverture de la page
      if(!this.one) {
        this.name.nativeElement.focus();
        this.one = !(this.one);
      }

      // Modification du formulaire
      this.SelectedGroupManagementForm.get('EditBar_Access').disable();
      this.SelectedGroupManagementForm.get('Main_Access').disable();
      this.SelectedGroupManagementForm.get('SelectedPageManagement_Access').disable();

      // Initialisation des données à afficher dans le formulaire
      var statut: boolean = false;
      setInterval(() => {
        if(statut_Reponse_getRightGroupPageList && statut_Reponse_getGroupById_form) {
          if(!statut) {
            statut = true;
            this.initData();
            // this.app.endInit();
          }
        } 
      }, 50);
    })
  }

  // Permet de changer la valeur du groupe de droit de page du group par celui séléctionné (change l'object)
  private setRightEditSelected(value: any, post: any): void {
    // Récupération des données initial du groupe
    var group_id: number = this.initial_group.id;
    var rightGroupPage_id: number = this.initial_group.rightGroupPage.id;

    // Création d'un nouveau groupe avec les valeurs deja rentré
    this.group = new Group(post);
    // Si l'on click sur le groupe de base, il reprend ses valeur de base
    if(value.id !== this.initial_group.rightGroupPage.id) {
      this.group.rightGroupPage = new RightGroupPage(value);

      // Si l'on selectionne un template de group de droit et que l'on est pas dans la 
      // création d'un nouveau droit, on idique sur quelle template est basé le droit que l'on modifie
      if(this.route.snapshot.paramMap.get('id') !== "New")
        this.MsgTemplate = "(Sur exemple de " + value.name + ")";
    } else {
      this.group.rightGroupPage = this.initial_group.rightGroupPage;
      this.MsgTemplate = null;
    }

    // Ré-importation des données de base dans le nouveau groupe
    this.group.id = group_id;
    if(post.name === null)
      this.group.name = null;
    this.group.rightGroupPage.id = rightGroupPage_id;
    this.group.rightGroupPage.name = this.group.name;

    // Initialisation des données à afficher dans le formulaire
    this.initData();
  }

  // Traitement de gestion automatique des droits et de leur dependence
  public setRightSelected(value: any, element: any): void {
    // Récupération des données initial du groupe
    var group_id: number = this.initial_group.id;
    var rightGroupPage_id: number = this.initial_group.rightGroupPage.id;

    // Création d'un nouveau groupe avec les données présente de base dans le formulaire
    var group: Group = new Group(value);
    group.rightGroupPage = new RightGroupPage(value);

    // Appel de la methode qui gère automatiquement les droits et leur dépendence
    group.rightGroupPage = this.generic.setRightSelected(element, group.rightGroupPage);

    // Ré-importation des données de base dans le nouveau groupe
    this.group = group;
    this.group.id = group_id;
    if(value.name === null)
      this.group.name = null;
    this.group.rightGroupPage.id = rightGroupPage_id;
    this.group.rightGroupPage.name = this.group.name;

    // Initialisation des données à afficher dans le formulaire
    this.initData();
  }

  // Initialise / Met à jour les données dans le formulaire
  private initData(): void {
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
      'SelectedPageManagement_EditNeedLogIn' : this.group.rightGroupPage.SelectedPageManagement_EditNeedLogIn,
      'Settings_Access' : this.group.rightGroupPage.Settings_Access
    });

    // Definit quelle groupe de droit de page a selectionner par defaut dans la liste de groupe de droit de page
    this.SelectedGroupManagementForm.get('RightGroupPage').setValue(this.RightGroupPageList[this.RightGroupPageList.findIndex(d => d.id === this.group.rightGroupPage.id)]);

    // Désactive le input du nom pour les groupes personnel et le groupe par defaut
    if(Number(this.route.snapshot.paramMap.get('id')) === 1 || this.initial_group.name.split('_').length !== 1)
      this.SelectedGroupManagementForm.get('name').disable(); 
  }

  // Permet de modifier le nom du groupe de droit de page en meme temps que celui du groupe
  public NameChange(post: string): void {
    var initial_index: number = this.RightGroupPageList.findIndex(d => d.name === this.group.rightGroupPage.name)
    this.group.rightGroupPage.name = post;
    if(post === "")
      this.group.rightGroupPage.name = "default";
    this.RightGroupPageList[initial_index].name = this.group.rightGroupPage.name;
    this.group.name = post;

    // Initialisation des données à afficher dans le formulaire
    this.initData();
  }

  // Traitement et apel de service pour modifier le groupe
  public editGroup(post: any): void {
    // Vérification que l'utilisateur peut editer ou créer un groupe
    if(this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditGroup) {
      // On définit par defaut qu'il y a eu des modification d'apportées
      var same: boolean = false;

      // Création du groupe temporaire
      var group: Group = new Group(post);
      group.rightGroupPage = new RightGroupPage(post);

      // Vérification de modification sur le groupe ou non (pour tout sauf pour "New")
      if(this.route.snapshot.paramMap.get('id') !== "New") {
        // Si l'utilisateur n'as pas les droit de modification des droit, on remet le groupe de droit initial
        if(!this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditRightPage)
          this.group.rightGroupPage = this.initial_group.rightGroupPage;
        
        group.id = this.initial_group.id;
        group.rightGroupPage.id = this.initial_group.rightGroupPage.id;
        group.rightGroupPage.name = group.name;

        // Traitement pour les groupe personnel
        if(this.initial_group.name.split('_').length !== 1)
          group.name = this.initial_group.name;

        group.rightGroupPage.name = group.name;

        // Comparaison des hash MD5 entre les groupe avec les données du formualaire et le groupe de base
        if(this.generic.create_md5(JSON.stringify(group)) === this.generic.create_md5(JSON.stringify(this.initial_group))) {
          same = true;
          this.router.navigate(['/GroupManagement']);
        }
      }

      if(!same) {
        // Traitement de modification
        if(this.route.snapshot.paramMap.get('id') !== "New") {
          // Traitement pour l'edition du groupe par defaut
          if(Number(this.route.snapshot.paramMap.get('id')) === 1) {
            // Vérification que l'utilisateur peut editer le groupe par defaut
            if(this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditGroup) {
              group.id = 1;
              group.name = "default";
              group.rightGroupPage.id = group.id;
              group.rightGroupPage.name = group.name;
            } else {
              console.log("Vous n'avez pas la permission de modifier le groupe par defaut");
              this.router.navigate(['/GroupManagement']);
            }
          } 
          // Traitement pour la modification d'un groupe generic ou personnel
          else {
            // Traitement pour les groupe personnel
            if(this.initial_group.name.split('_').length !== 1) {
              group.name = this.initial_group.name;
              group.rightGroupPage.name = group.name;
            }
          }

          this.groupApi.putGroup(group.id, group).subscribe((data) => {
            if(data.ok) {
              this.router.navigate(['/GroupManagement']);
              if(group.id === this._currentUser.group.id)
                this.app.logOut();
            }
          });
        } else {
          // Vérification que l'utilisateur peut ajouter un groupe
          if(this._currentUser.group.rightGroupPage.GroupManagement_AddGroup) {
            group.id = 0;
            group.rightGroupPage.id = group.id;
          } else {
            console.log("Vous n'avez pas la permission de créer un groupe");
            this.router.navigate(['/GroupManagement']);
          }

          this.groupApi.postGroup(group).subscribe((data) => {
            if(data.ok)
              this.router.navigate(['/GroupManagement']);
          });
        }
      }
    } else {
      console.log("Vous n'avez pas la permission d'accedez à la page de Gestion de ce groupe");
      this.router.navigate(['/GroupManagement']); 
    }
  }

  // Traitement et apel de service pour supprimer le groupe
  private DeleteGroup(): void {
    if(this._currentUser.group.rightGroupPage.SelectedGroupManagement_EditGroup) {
      this.groupApi.deleteGroup(this.group.id).subscribe((data) => {
        if(data.ok) {
          this.router.navigate(['/GroupManagement']);
          if(this.group.id === this._currentUser.id)
            this.app.logOut();
        }
      });
    } else 
      console.log("Vous n'avez pas la permission de supprimer ce groupe");
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  template: `<h2 mat-dialog-title>Voulez vous vraiment supprimer ce groupe ?</h2>
  <mat-dialog-content class="mat-typography">
    <p>Confirmez-vous la suppression ?</p>
  </mat-dialog-content>
  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Supprimer</button>
  </mat-dialog-actions>`
})
export class DeleteGroupPopup { }