import { Injectable } from '@angular/core';
import { User } from './Class/User';
import { Group } from './Class/Group';
import { Data } from './Data';

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

  public getGroupList(): Group[] {
    var reponse = this.InitReponse(JSON.parse(this.data.getGroup()));
    console.log("getGroupList Resquest");
    var group: Group[];
    if(reponse !== null && reponse !== undefined) {
      return group = reponse;
    } else {
      return group = [
        null
      ]
    }
  }

  private InitReponse(api: Api): any {
    if(api !== null && api !== undefined) {
      if(api.api) {
        if(api.auth) {
          if(api.ErrorMsg !== null && api.ErrorMsg !== undefined) {
            console.log(api.ErrorMsg);
          } 
          if(api.data !== null && api.data !== undefined) {
            return api.data;
          } else {
            return null;
          }
        } else {
          console.log("Error: Authentification False");
        }
      } else {
        console.log("Error: Api false");
      }
    } else {
      console.log("Error: Reponse Null");
    }
  }
}
