import { Injectable } from '@angular/core';

import { Group } from './Group';
import { Data } from '../Data';

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
    console.log("GET / GROUP / getGroupList");
    var reponse: Group[] = this.InitReponse(JSON.parse(this.data.getGroup()));
    if(reponse !== null && reponse !== undefined)
      return reponse;
    else
      return [ null ];
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
    } else
      console.log("Error: Api false");
  }
}
