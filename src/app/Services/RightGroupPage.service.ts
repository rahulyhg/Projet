import { Injectable } from '@angular/core';

import { Data } from '../Api/Api';

import { RightGroupPage } from '../Class/RightGroupPage';

interface Api {
  api: boolean;
  auth: boolean;
  ErrorMsg: string;
  data: RightGroupPage[];
}

@Injectable({
  providedIn: 'root'
})
export class RightGroupPageService {
  constructor(private data: Data) { }

  public getRightGroupPageList(): RightGroupPage[] {
    console.log("GET / RIGHTGROUPPAGE / getRightGroupPageList");
    var reponse: RightGroupPage[] = this.InitReponse(JSON.parse(this.data.getRightGroupPage()));
    if(reponse !== null && reponse !== undefined)
      return reponse;
    else
      return [ null ];
  }

  public putRightGroupPage(id: number, rightGroupPage: RightGroupPage): void {
    console.log("PUT / RIGHTGROUPPAGE / putRightGroupPage");
    this.InitReponse(JSON.parse(this.data.putRightGroupPage(id, rightGroupPage)));
  }

  public postRightGroupPage(rightGroupPage: RightGroupPage): void {
    console.log("POST / RIGHTGROUPPAGE / postRightGroupPage");
    this.InitReponse(JSON.parse(this.data.postRightGroupPage(rightGroupPage)));
  }

  public deleteRightGroupPage(id: number): void {
    console.log("DELETE / RIGHTGROUPPAGE / deleteRightGroupPage");
    this.InitReponse(JSON.parse(this.data.deleteRightGroupPage(id)));
  }

  private InitReponse(api: Api): RightGroupPage[] {
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
