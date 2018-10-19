import { Group } from './Class/Group'; 
import { User } from './Class/User'; 
import { RightGroupPage } from './Class/RightGroupPage'; 

import { USER } from './UserData';
import { GROUP } from './GroupData';
import { RIGHTGROUPPAGE } from './RightGroupPageData';

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