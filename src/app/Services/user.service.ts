import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Api } from '../Class/Api';
import { User } from '../Class/User';
import { Group} from '../Class/Group';
import { RightGroupPage } from '../Class/RightGroupPage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private Api:string = environment.apiUrl + "User/";

  constructor(private http: HttpClient) { }

    // private Reponse_getUserById: Observable<Api>;
    // private Reponse_Aut: Observable<Api>;
    // private Reponse_getUserList: Observable<Api>;

    // this.Reponse_getUserById = null;
    // this.Reponse_Aut = null;
    // this.Reponse_getUserList = null;

    // this.Reponse_getUserById = this.userApi.getUserById(2);
    // this.Reponse_getUserById.subscribe((data: Api) => {
    //   this._currentUser = data.data
    //   console.log(data)
    // });

    // this.Reponse_Aut = this.userApi.Auth("dev", "SlmgrRearm_1689");
    // this.Reponse_Aut.subscribe((data: Api) => {
    //   console.log(data)
    // });

    // this.Reponse_getUserList = this.userApi.getUserList();
    // this.Reponse_getUserList.subscribe((data: Api) => {
    //   console.log(data)
    // });

    //this.userApi.putUser(3, new User(null), false);
    //this.userApi.deleteUser(11);
    //this.userApi.postUser(new User(null));

  public getUserById(id: number): Observable<Api> {
    console.log("GET / USER / getUserById");

    var reponse: Observable<Api> = this.http.get<Api>(this.Api + id).pipe(map((data: Api) => {
      data.data = new User(data.data)
      data.data.group = Object(new Group(data.data.group))
      data.data.group.rightGroupPage = Object(new RightGroupPage(data.data.group.rightGroupPage))
      return data
    }));

    this.InitReponse(reponse);
    return reponse;
  }

  public Auth(login: string, password: string): Observable<Api> {
    console.log("GET:AUTH / USER / AuthUser");
    
    var reponse: Observable<Api> = this.http.get<Api>(this.Api + "Auth/" + login + "/" + this.create_md5(password)).pipe(map((data: Api) => {
      data.data = new User(data.data)
      data.data.group = Object(new Group(data.data.group))
      data.data.group.rightGroupPage = Object(new RightGroupPage(data.data.group.rightGroupPage))
      return data
    }));

    this.InitReponse(reponse);
    return reponse;
  }

  public getUserList(): Observable<Api> {
    console.log("GET / USER / getUserList");

    var reponse: Observable<Api> = this.http.get<Api>(this.Api).pipe(map((data: Api) => {
      for(var i: number = 0; i < Number(data.data.length); i++) {
        data.data[i] = new User(data.data[i])
        data.data[i].group = Object(new Group(data.data[i].group))
        data.data[i].group.rightGroupPage = Object(new RightGroupPage(data.data[i].group.rightGroupPage))
      }
      return data
    }));

    this.InitReponse(reponse);
    return reponse;
  }

  public putUser(id: number, user: User, regenerate_password: boolean): void {
    console.log("PUT / USER / putUser");

    if(regenerate_password) { user.password = this.create_md5(user.password) }

    var reponse: Observable<Api> = this.http.put<Api>(this.Api + id, user).pipe(map((data: Api) => {
      console.log(data)
      return data
    }));
    this.InitReponse(reponse);
  }

  public deleteUser(id: number): void {
    console.log("DELETE / USER / deleteUser");

    var reponse: Observable<Api> = this.http.delete<Api>(this.Api + id);
    this.InitReponse(reponse);
  }

  public postUser(user: User): void {
    console.log("POST / USER / postUser");

    user.password = this.create_md5(user.password);

    var reponse: Observable<Api> = this.http.post<Api>(this.Api, user);
    this.InitReponse(reponse);
  }

  private InitReponse(value: Observable<Api>): void {
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