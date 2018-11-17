import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEvent } from '@angular/common/http';
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
  private Api: string = environment.apiUrl + "Group/";

  constructor(private http: HttpClient) { }

  public getGroupById(id: number): Observable<HttpEvent<Object>> {
    console.log("GET / GROUP / getGroupById");

    return this.http.get(this.Api + id, { observe: 'events' });
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

  public deleteGroup(id: number): Observable<HttpResponse<Object>> {
    console.log("DELETE / GROUP / deleteGroup");

    return this.http.delete(this.Api + id, { observe: 'response' });
  }

  public postGroup(group: Group): Observable<HttpResponse<Object>> {
    console.log("POST / GROUP / postGroup");

    return this.http.post(this.Api, group, { observe: 'response' });
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
}