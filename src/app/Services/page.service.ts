import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

import { Page } from '../Class/Page';
import { Data } from '../Api/Api';

interface Api {
  api: boolean;
  auth: boolean;
  ErrorMsg: string;
  data: Page[];
}

@Injectable({
  providedIn: 'root'
})
export class PageService {
  constructor(private data: Data) { }

  public getPageById(id: number): Page {
    console.log("GET / PAGE / getPageById");
    var reponse: Page[] = this.InitReponse(JSON.parse(this.data.getPageById(id)));
    if(reponse !== null && reponse !== undefined)
      return new Page(reponse[0]);
    else
      return new Page(null);
  }

  public getPageByRoute(route: string): Page {
    console.log("GET / PAGE / getPageByRoute");
    var reponse: Page[] = this.InitReponse(JSON.parse(this.data.getPageByRoute(route)));
    if(reponse !== null && reponse !== undefined)
      return new Page(reponse[0]);
    else
      return new Page(null);
  }

  public getPageList(): Page[] {
    console.log("GET / PAGE / getPageList");
    var reponse: Page[] = this.InitReponse(JSON.parse(this.data.getPage()));
    if(reponse !== null && reponse !== undefined)
      return reponse;
    else
      return [ null ];
  }

  public putPage(id: number, user: Page): void {
    console.log("PUT / PAGE / putPage");
    this.InitReponse(JSON.parse(this.data.putPage(id, user)));
  }

  public deletePage(id: number): void {
    console.log("DELETE / PAGE / deletePage");
    this.InitReponse(JSON.parse(this.data.deletePage(id)));
  }

  public postPage(user: Page): void {
    console.log("POST / PAGE / postPage");
    this.InitReponse(JSON.parse(this.data.postPage(user)));
  }

  private InitReponse(api: Api): Page[] {
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

  private create_md5(attrib: string): any {
    const md5 = new Md5();
    return md5.appendStr(attrib).end();
  }
}
