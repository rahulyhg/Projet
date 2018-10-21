import { Group } from './Group/Group'; 
import { User } from './User/User'; 
import { RightGroupPage } from './RightGroupPage/RightGroupPage'; 

import { USER } from './User/UserData';
import { GROUP } from './Group/GroupData';
import { RIGHTGROUPPAGE } from './RightGroupPage/RightGroupPageData';

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
    this.rightGroupPage = RIGHTGROUPPAGE;
    this.group = GROUP;
    this.user = USER;
  }

  // --------------------- USER ---------------------
  // ------- GET ---------

  public getUserById(id: number): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      var index: number = this.user.findIndex(d => d.id === id);
      var user_return: User = new User(null);

      if(index !== -1)
        user_return = this.user[index];
      else
        ErrorMsg = "Index non valide";
    } else
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: [ user_return ]
    }
    return JSON.stringify(api);
  }

  public getUser(): string {
    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: null,
      data: this.user
    }
    return JSON.stringify(api);
  }

  // ------- PUT ---------

  public putUser(id: number, user: User): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      if(user !== null && user !== undefined) {
        var index: number = this.user.findIndex(d => d.id === id);
        if(index !== -1) {
          this.user[index] = user;

          if(this.user[index] !== user)
            ErrorMsg = "Impossible de mettre à jour l'utilisateur";
        }
        else 
          ErrorMsg = "Index non valide";
      } else 
      ErrorMsg = "User non valide";
    } else 
      ErrorMsg = "Id non valide";
    


    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: [ null ]
    }
    return JSON.stringify(api);
  }

  // ------- POST ---------

  public postUser(user: User): string {
    var ErrorMsg: string = null;

    if(user !== null && user !== undefined) {
      var l: number = this.user.length;
      user.id = l + 1;
      this.user.push(user);
    }

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: null
    }
    return JSON.stringify(api);
  }

  // ------- DELETE ---------

  public deleteUser(id: number): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      var t: number = this.user.length;
      if(t !== null && t !== undefined && t !== 0) {
        var index: number = this.user.findIndex(d => d.id === id);

        if(index !== null && index !== undefined && index !== -1) {
          this.user.splice(index, 1);

          if(t === this.user.length)
            ErrorMsg = "Impossible de supprimer l'utilisateur";
        } else 
          ErrorMsg = "Index non valide";
      } else 
        ErrorMsg = "Index non valide";
    } else
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: null
    }
    return JSON.stringify(api);
  }

  // --------------------- GROUP ---------------------
  // ------- GET ---------

  public getGroupById(id: number): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      var index: number = this.group.findIndex(d => d.id === id);
      var group_return: Group = new Group(null);

      if(index !== -1)
        group_return = this.group[index];
      else
        ErrorMsg = "Index non valide";
    } else
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: [ group_return ]
    }
    return JSON.stringify(api);
  }

  public getGroup(): string {
    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: null,
      data: this.group
    }
    return JSON.stringify(api);
  }

  // ------- PUT ---------

  public putGroup(id: number, group: Group): string {
    var ErrorMsg: string = null;
    
    if(id !== null && id !== undefined && id !== 0) {
      if(group !== null && group !== undefined) {
        var index: number = this.group.findIndex(d => d.id === id);
        if(index !== -1) {
          this.group[index] = group;

          if(this.group[index] !== group)
            ErrorMsg = "Impossible de mettre à jour le groupe";
        }
        else 
          ErrorMsg = "Index non valide";
      } else 
      ErrorMsg = "Group non valide";
    } else 
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: [ null ]
    }
    return JSON.stringify(api);
  }

  // ------- POST ---------

  public postGroup(group: Group): string {
    var ErrorMsg: string = null;

    if(group !== null && group !== undefined) {
      var l: number = this.group.length;
      group.id = l + 1;
      this.group.push(group);

    }

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: null
    }
    return JSON.stringify(api);
  }

  // ------- DELETE ---------

  public deleteGroup(id: number): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      var t: number = this.group.length;
      if(t !== null && t !== undefined && t !== 0) {
        var index: number = this.group.findIndex(d => d.id === id);

        if(index !== null && index !== undefined && index !== -1) {
          this.group.splice(index, 1);

          if(t === this.group.length)
            ErrorMsg = "Impossible de supprimer le groupe";
        } else 
          ErrorMsg = "Index non valide";
      } else 
        ErrorMsg = "Index non valide";
    } else
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: null
    }
    return JSON.stringify(api);
  }

  // --------------------- RIGHTGROUPPAGE ---------------------
  // ------- GET ---------

  public getRightGroupPageById(id: number): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      var index: number = this.rightGroupPage.findIndex(d => d.id === id);
      var rightGroupPage_return: RightGroupPage = new RightGroupPage(null);

      if(index !== -1)
        rightGroupPage_return = this.rightGroupPage[index];
      else
        ErrorMsg = "Index non valide";
    } else
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: [ rightGroupPage_return ]
    }
    return JSON.stringify(api);
  }

  public getRightGroupPage(): string {
    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: null,
      data: this.rightGroupPage
    }
    return JSON.stringify(api);
  }

  // ------- PUT ---------

  public putRightGroupPage(id: number, rightGroupPage: RightGroupPage): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      if(rightGroupPage !== null && rightGroupPage !== undefined) {
        var index: number = this.group.findIndex(d => d.id === id);
        if(index !== -1) {
          this.rightGroupPage[index] = rightGroupPage;

          if(this.rightGroupPage[index] !== rightGroupPage)
            ErrorMsg = "Impossible de mettre à jour le rightGroupPage";
        }
        else 
          ErrorMsg = "Index non valide";
      } else 
      ErrorMsg = "RightGroupPage non valide";
    } else 
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: [ null ]
    }
    return JSON.stringify(api);
  }

  // ------- POST ---------

  public postRightGroupPage(rightGroupPage: RightGroupPage): string {
    var ErrorMsg: string = null;

    if(rightGroupPage !== null && rightGroupPage !== undefined) {
      var l: number = this.rightGroupPage.length;
      rightGroupPage.id = l + 1;
      this.rightGroupPage.push(rightGroupPage);

    }

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: null
    }
    return JSON.stringify(api);
  }

  // ------- DELETE ---------

  public deleteRightGroupPage(id: number): string {
    var ErrorMsg: string = null;

    if(id !== null && id !== undefined && id !== 0) {
      var t: number = this.rightGroupPage.length;
      if(t !== null && t !== undefined && t !== 0) {
        var index: number = this.rightGroupPage.findIndex(d => d.id === id);

        if(index !== null && index !== undefined && index !== -1) {
          this.rightGroupPage.splice(index, 1);

          if(t === this.rightGroupPage.length)
            ErrorMsg = "Impossible de supprimer le rightGroupPages";
        } else 
          ErrorMsg = "Index non valide";
      } else 
        ErrorMsg = "Index non valide";
    } else
      ErrorMsg = "Id non valide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: null
    }
    return JSON.stringify(api);
  }

  // ------ AUTRE ---------
  // ------ AUTH ---------

  public AuthUser(login: string, password: string): string {
    var ErrorMsg: string = null;
    var user_return: any = new User(null);

    if(login !== null && login !== undefined && login !== "") {
      if(password !== null && password !== undefined && password !== "") {
        var index: number = this.user.findIndex(d => d.login === login);

        if(index !== null && index !== undefined && index !== -1) {
          if(this.user[index].password === password) {
            this.user[index].statut = true;
            user_return = this.user[index];
          } else 
            ErrorMsg = "Le password ne correspond pas au password de ce login";
        } else 
          ErrorMsg = "Aucun utilisateur associé a ce login";
      } else  
        ErrorMsg = "Password invalide";
    } else 
      ErrorMsg = "Login Invalide";

    var api: Api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: user_return
    }
    return JSON.stringify(api);
  }
}