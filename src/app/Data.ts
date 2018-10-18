import { Group } from './Class/Group'; 
import { User } from './Class/User'; 
import { RightGroupPage } from './Class/RightGroupPage'; 

interface Api {
  api: boolean;
  auth: boolean;
  ErrorMsg: string;
  data: Object[];
}

export class Data {
  private user: User[];
  private group: Group[];
  private rightGroupPage: RightGroupPage[];

  constructor() {
    var rightGroupPage1: any;
    var rightGroupPage2: any;

    rightGroupPage1 = { id: null, access_Main: null, access_Accueil: null, access_Login: null, access_MonCompte: null, access_Main_EditBar: null, access_SelectedUserManagement: null, access_UserManagement: null, access_Main_EditBar_Dev: null, access_Main_EditBar_Edit: null};
    rightGroupPage2 = { id: 2, access_Main: true, access_Accueil: true, access_Login: true, access_MonCompte: true, access_Main_EditBar: true, access_SelectedUserManagement: true, access_UserManagement: true, access_Main_EditBar_Dev: true, access_Main_EditBar_Edit: true};

    var group1: any;
    var group2: any;
    group1 = { id: null, name: null, rightGroupPage: null};
    group2 = { id: 2, name: "Développement", rightGroupPage: new RightGroupPage(rightGroupPage2)};

    var user1: any;
    var user2: any;
    user1 = { id: null, login: null, password: null, group: null, profile: null, statut: null, date_time_logIn: null, date_time_signIn: null, gameTag: null, name: null, firstName: null, birthDate: null };
    user2 = { id: 4, login: "dev", password: "b22f2a7814d6e43374cea98ff1e824be", group: new Group(group2), profile: "dev.jpg", statut: true, date_time_logIn: "2018-10-18 11:49:48", date_time_signIn: "2018-10-15 18:38:01", gameTag: "@dov118", name: "Kévin", firstName: "Carlier", birthDate: "1997-11-17" };

    this.user = [
      new User(user1),
      new User(user2)
    ]

    this.group = [
      new Group(group1),
      new Group(group2)
    ]

    this.rightGroupPage = [
      new RightGroupPage(rightGroupPage1),
      new RightGroupPage(rightGroupPage2)
    ]
  }

  public getUserById(id: number): string {
    var user_return: User;
    for (var user of this.user) {
      if(user.id = id) 
        user_return = user;
    }
    var api: Api;
    api = {
      api: true,
      auth: true,
      ErrorMsg: null,
      data: [
        user_return
      ]
    }
    return JSON.stringify(api);
  }

  public getUser(): string {
    var api: Api;
    api = {
      api: true,
      auth: true,
      ErrorMsg: null,
      data: this.user
    }
    return JSON.stringify(api);
  }

  public getGroupByIndex(index: number): string {
    var api: Api;
    api = {
      api: true,
      auth: true,
      ErrorMsg: null,
      data: [
        this.group[index]
      ]
    }
    return JSON.stringify(api);
  }

  public getGroup(): string {
    var api: Api;
    api = {
      api: true,
      auth: true,
      ErrorMsg: null,
      data: this.group
    }
    return JSON.stringify(api);
  }

  public getRightGroupPageByIndex(index: number): string {
    var api: Api;
    api = {
      api: true,
      auth: true,
      ErrorMsg: null,
      data: [
        this.rightGroupPage[index]
      ]
    }
    return JSON.stringify(api);
  }

  public getRightGroupPage(): string {
    var api: Api;
    api = {
      api: true,
      auth: true,
      ErrorMsg: null,
      data: this.rightGroupPage
    }
    return JSON.stringify(api);
  }

  public AuthUser(login: string, password: string): string {
    var user_return: any;
    for (var user of this.user) {
      if(user.login = login) 
        if(user.password = password)
          user_return = user;
    }
    var api: Api;
    var error = null;
    if(user_return.login === undefined) {
      error = "Login Or Password Incorect";
    }
    api = {
      api: true,
      auth: true,
      ErrorMsg: error,
      data: user_return
    }
    return JSON.stringify(api);
  }
}