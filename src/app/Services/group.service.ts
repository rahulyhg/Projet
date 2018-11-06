import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Api } from '../Class/Api';
import { Group } from '../Class/Group';
import { RightGroupPage } from '../Class/RightGroupPage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private Api:string = environment.apiUrl + "Group/";

  constructor(private http: HttpClient) { }

    // private Reponse_getGroupById: Observable<Api>;
    // private Reponse_getGroupList: Observable<Api>;

    // this.Reponse_getGroupById = null;
    // this.Reponse_getGroupList = null;

    // this.Reponse_getGroupById = this.groupApi.getGroupById(2);
    // this.Reponse_getGroupById.subscribe((data: Api) => {
    //   console.log(data)
    // });

    // this.Reponse_getGroupList = this.groupApi.getGroupList();
    // this.Reponse_getGroupList.subscribe((data: Api) => {
    //   console.log(data)
    // });

    //this.groupApi.putGroup(3, new Group(null));
    //this.groupApi.deleteGroup(3);
    //this.groupApi.postGroup(new Group(null));

  public getGroupById(id: number): Observable<Api> {
    console.log("GET / GROUP / getGroupById");

    var reponse: Observable<Api> = this.http.get<Api>(this.Api + id).pipe(map((data: Api) => {
      data.data = new Group(data.data)
      data.data.rightGroupPage = Object(new RightGroupPage(data.data.rightGroupPage))
      return data
    }));

    this.InitReponse(reponse);
    return reponse;
  }

  public getGroupList(): Observable<Api> {
    console.log("GET / GROUP / getGroupList");

    var reponse: Observable<Api> = this.http.get<Api>(this.Api).pipe(map((data: Api) => {
      for(var i: number = 0; i < Number(data.data.length); i++) {
        data.data[i] = new Group(data.data[i])
        data.data[i].rightGroupPage = Object(new RightGroupPage(data.data[i].rightGroupPage))
      }
      return data
    }));

    this.InitReponse(reponse);
    return reponse;
  }

  public putGroup(id: number, group: Group): Observable<HttpResponse<Object>> {
    console.log("PUT / GROUP / putGroup");

    return this.http.put(this.Api + id, group, { observe: 'response' });
  }

  public deleteGroup(id: number): void {
    console.log("DELETE / GROUP / deleteGroup");

    var reponse: Observable<Api> = this.http.delete<Api>(this.Api + id);
    this.InitReponse(reponse);
  }

  public postGroup(group: Group): void {
    console.log("POST / GROUP / postGroup");

    var reponse: Observable<Api> = this.http.post<Api>(this.Api, group);
    this.InitReponse(reponse);
  }

  private InitReponse(value: any): void {
    value.subscribe((data: Api) => {
      if(data !== null && data !== undefined && data.api) {
        if(data.auth) {
          if(data.ErrorMsg !== null && data.ErrorMsg !== undefined)
            console.log(data.ErrorMsg);
          if(data.data !== null && data.data !== undefined)
            return data.data;
          else
            return [ null ];
        } else
          console.log("Error: Authentification False");
      } else
        console.log("Error: Api false");
    })
  }

  private create_md5(attrib: string): any {
    const md5 = new Md5();
    return md5.appendStr(attrib).end();
  }
}