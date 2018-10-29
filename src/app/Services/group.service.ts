import { Injectable } from '@angular/core';

import { Group } from '../Class/Group';
import { Data } from '../Api/Api';

interface Api {
  api: boolean;
  auth: boolean;
  ErrorMsg: string;
  data: Group[];
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  constructor(private data: Data) { }

  public getGroupById(id: number): Group {
    console.log("GET / GROUP / getGroupById");
    var reponse: Group[] = this.InitReponse(JSON.parse(this.data.getGroupById(id)));
    if(reponse !== null && reponse !== undefined)
      return new Group(reponse[0]);
    else
      return new Group(null);
  }

  public getGroupList(): Group[] {
    console.log("GET / GROUP / getGroupList");
    var reponse: Group[] = this.InitReponse(JSON.parse(this.data.getGroup()));
    if(reponse !== null && reponse !== undefined)
      return reponse;
    else
      return [ null ];
  }

  public putGroup(id: number, group: Group): void {
    console.log("PUT / GROUP / putGroup");
    this.InitReponse(JSON.parse(this.data.putGroup(id, group)));
  }

  public postGroup(group: Group): void {
    console.log("POST / GROUP / postGroup");
    this.InitReponse(JSON.parse(this.data.postGroup(group)));
  }

  public deleteGroup(id: number): void {
    console.log("DELETE / GROUP / deleteGroup");
    this.InitReponse(JSON.parse(this.data.deleteGroup(id)));
  }

  private InitReponse(api: Api): Group[] {
    if(api !== null && api !== undefined && api.api) {
      if(api.auth) {
        if(api.ErrorMsg !== null && api.ErrorMsg !== undefined)
          console.log(api.ErrorMsg);
        if(api.data !== null && api.data !== undefined)
          return api.data;
        else
          return [ null ];
      } else
        console.log("Error: Authentification False");
    } else
      console.log("Error: Api false");
  }
}
