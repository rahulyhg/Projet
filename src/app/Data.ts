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

  // ------ USER ---------
  // ------- GET ---------

  public getUserById(id: number): string {
    var user_return: User;
    for (var user of this.user) {
      if(user.id === id) 
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

  // ------- PUT ---------

  public putUser(id: number, user: User): string {
    var index: number = 0;
    var user_index: number = 0;
    for (var user_t of this.user) {
      if(user_t.id === id) 
        user_index = index;
      index++;
    }

    this.user[user_index] = user;

    var ErrorMsg: string = null;
    if(this.user[id] !== user) { ErrorMsg = "Impossible de mettre à jour l'utilisateur" }
    var api: Api;
    api = {
      api: true,
      auth: true,
      ErrorMsg: null,
      data: [
        null
      ]
    }
    return JSON.stringify(api);
  }

  // ------ GROUP ---------
  // ------- GET ---------

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

  public postGroup(group: Group): string {
    var l: number = this.group.length;
    var ErrorMsg: string = null;
    this.group.push(group);
    if(this.group[l + 1] === group) {
      ErrorMsg = "Impossible de créer le Group de droit de page";
    }
    var api: Api;
    api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: null
    }
    return JSON.stringify(api);
  }

  public deleteGroup(id: number): string {
    var api: Api;
    var ErrorMsg: string = null;

    var t: number = this.group.length;
    var index = this.group.findIndex(d => d.id === id);
    this.group.splice(index, 1);

    if(t === this.group.length) {
      ErrorMsg = "Impossible de supprimer de group";
    }
    api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: null
    }
    return JSON.stringify(api);
  }

  // ------ RIGHTGROUP PAGE ---------
  // ------- GET ---------

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

  public postRightGroupPage(rightGroupPage: RightGroupPage): string {
    var l: number = this.rightGroupPage.length;
    var ErrorMsg: string = null;
    this.rightGroupPage.push(rightGroupPage);
    if(this.rightGroupPage[l + 1] === rightGroupPage) {
      ErrorMsg = "Impossible de créer le Group de droit de page";
    }
    var api: Api;
    api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: null
    }
    return JSON.stringify(api);
  }

  public putRightGroupPage(id: number, rightGroupPage: RightGroupPage): string {
    var index: number = 0;
    var rightGroupPage_index: number = 0;
    for (var rightGroupPage_t of this.rightGroupPage) {
      if(rightGroupPage_t.id === id) 
      rightGroupPage_index = index;
      index++;
    }

    this.rightGroupPage[rightGroupPage_index] = rightGroupPage;

    var ErrorMsg: string = null;
    if(this.rightGroupPage[id] !== rightGroupPage) { ErrorMsg = "Impossible de mettre à jour le groupe de droit de page" }
    var api: Api;
    api = {
      api: true,
      auth: true,
      ErrorMsg: null,
      data: [
        null
      ]
    }
    return JSON.stringify(api);
  }

  public deleteRightGroupPage(id: number): string {
    var api: Api;
    var ErrorMsg: string = null;

    var t: number = this.rightGroupPage.length;
    var index = this.rightGroupPage.findIndex(d => d.id === id);
    this.rightGroupPage.splice(index, 1);

    if(t === this.rightGroupPage.length) {
      ErrorMsg = "Impossible de supprimer de rightGroupPage";
    }
    api = {
      api: true,
      auth: true,
      ErrorMsg: ErrorMsg,
      data: null
    }
    return JSON.stringify(api);
  }

  // ------ AUTH ---------

  public AuthUser(login: string, password: string): string {
    var user_return: any;
    var index: number = 0;
    var i: number = 0;
    for (var user of this.user) {
      if(user.login === login) 
        if(user.password === password)
          user.statut = true;
          index = i;
          user_return = user;
      i++;
    }

    this.user[index].statut = true;
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