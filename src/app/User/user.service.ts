import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient } from '@angular/common/http';

import { User } from './User';
import { Data } from '../Data';

interface Api {
  api: boolean;
  auth: boolean;
  ErrorMsg: string;
  data: User[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private data: Data, private http:HttpClient) { }

  public getUserById(id: number): User {
    console.log("GET / USER / getUserById");
    var reponse: User[] = this.InitReponse(JSON.parse(this.data.getUserById(id)));
    if(reponse !== null && reponse !== undefined)
      return new User(reponse[0]);
    else
      return new User(null);
  }

  public Auth(login: string, password: string): User {
    console.log("GET:AUTH / USER / AuthUser");

    var reponse: User[] = this.InitReponse(JSON.parse(this.data.AuthUser(login, this.create_md5(password))));
    if(reponse !== null && reponse !== undefined)
      return new User(reponse);
    else
      return new User(null);
  }

  public getUserList(): User[] {
    console.log("GET / USER / getUserList");
    var reponse: User[] = this.InitReponse(JSON.parse(this.data.getUser()));
    if(reponse !== null && reponse !== undefined)
      return reponse;
    else
      return [ null ];
  }

  public putUser(id: number, user: User): void {
    console.log("PUT / USER / putUser");
    this.InitReponse(JSON.parse(this.data.putUser(id, user)));
  }

  public deleteUser(id: number): void {
    console.log("DELETE / USER / deleteUser");
    this.InitReponse(JSON.parse(this.data.deleteUser(id)));
  }

  public postUser(user: User): void {
    console.log("POST / USER / postUser");
    this.InitReponse(JSON.parse(this.data.postUser(user)));
  }

  public test(id: number): User {
    console.log("GET / USER / test");
    var user = new User(null);
    var d: any = { api: true, auth: true, ErrorMsg: "test", data: []  };
    this.http.get<Api>('https://dev.kevin-c.fr/api/User/getUserById/' + id).subscribe((data) => { d = data; console.log(data)});;
    console.log(d);
    return user;
  }

  private InitReponse(api: Api): User[] {
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
