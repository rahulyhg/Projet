import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { User } from '../Class/User';
import { Data } from '../Api/Api';

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
  private Api:string = environment.apiUrl + "test/";

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Credentials' : 'true',
      'Access-Control-Allow-Origin' : '*',
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS'
    })
  };

  constructor(private data: Data, private http: HttpClient) { 
    document.cookie = '{"api":true,"auth":true,"ErrorMsg":null,"data":{"id":"2","login":"dev","password":"b22f2a7814d6e43374cea98ff1e824be","group":"1","profile":"dev.jpg","statut":"1","date_time_logIn":"2018-10-19 11:59:02","date_time_signIn":"2018-10-15 18:38:01","gameTag":"@default","name":"default","firstName":"default","birthDate":"0000-00-00"}}';
  }

  public getUserById(id: number): User {
    console.log("GET / USER / getUserById");

    // LOCAL
    // var reponse: User[] = this.InitReponse(JSON.parse(this.data.getUserById(id)));

    // API
    this.http.get(this.Api + id, {observe: 'response'}).subscribe(reponse => {
      if(reponse.ok) {
        document.cookie = JSON.stringify(reponse.body)
      }
    });
    var reponse: User[] = this.InitReponse(JSON.parse(document.cookie));

    if(reponse !== null && reponse !== undefined)
      return new User(reponse);
    else
      return new User(null);
  }

  public Auth(login: string, password: string): User {
    console.log("GET:AUTH / USER / AuthUser");

    // LOCAL
    // var reponse: User[] = this.InitReponse(JSON.parse(this.data.AuthUser(login, this.create_md5(password))));

    // API
    this.http.get(this.Api + "Auth/" + login + "/" + this.create_md5(password), {observe: 'response'}).subscribe(reponse => {
      if(reponse.ok) {
        document.cookie = JSON.stringify(reponse.body)
      }
    });
    var reponse: User[] = this.InitReponse(JSON.parse(document.cookie));

    if(reponse !== null && reponse !== undefined)
      return new User(reponse);
    else
      return new User(null);
  }

  public getUserList(): User[] {
    console.log("GET / USER / getUserList");

    // LOCAL
    // var reponse: User[] = this.InitReponse(JSON.parse(this.data.getUser()));

    // API 
    this.http.get(this.Api, {observe: 'response'}).subscribe(reponse => {
      if(reponse.ok) {
        document.cookie = JSON.stringify(reponse.body)
      }
    });
    var reponse: User[] = this.InitReponse(JSON.parse(document.cookie));

    for(var i: number = 0; i < reponse.length; i++) {
      reponse[i] = new User(reponse[i]);
    }

    if(reponse !== null && reponse !== undefined)
      return reponse;
    else
      return [ null ];
  }

  public putUser(id: number, user: User, regenerate_password: boolean): void {
    console.log("PUT / USER / putUser");

    if(regenerate_password) { user.password = this.create_md5(user.password) }

    // LOCAL
    // this.InitReponse(JSON.parse(this.data.putUser(id, user)));

    // API
    this.http.put(this.Api + id, user, {observe: 'response'}).subscribe(reponse => {
      if(reponse.ok) {
        document.cookie = JSON.stringify(reponse.body)
      }
    });
    this.InitReponse(JSON.parse(document.cookie));
  }

  public deleteUser(id: number): void {
    console.log("DELETE / USER / deleteUser");

    // LOCAL
    // this.InitReponse(JSON.parse(this.data.deleteUser(id)));

    // API
    this.http.delete(this.Api + id, {observe: 'response'}).subscribe(reponse => {
      if(reponse.ok) {
        document.cookie = JSON.stringify(reponse.body)
      }
    });
    this.InitReponse(JSON.parse(document.cookie));
  }

  public postUser(user: User): void {
    console.log("POST / USER / postUser");
    user.password = this.create_md5(user.password);

    // LOCAL
    // this.InitReponse(JSON.parse(this.data.postUser(user)));

    // API
    this.http.post(this.Api, user, {observe: 'response'}).subscribe(reponse => {
      if(reponse.ok) {
        document.cookie = JSON.stringify(reponse.body)
      }
    });
    this.InitReponse(JSON.parse(document.cookie));
  }

  private InitReponse(api: Api): User[] {
    document.cookie = '{"api":true,"auth":true,"ErrorMsg":null,"data":{"id":"2","login":"dev","password":"b22f2a7814d6e43374cea98ff1e824be","group":"1","profile":"dev.jpg","statut":"1","date_time_logIn":"2018-10-19 11:59:02","date_time_signIn":"2018-10-15 18:38:01","gameTag":"@default","name":"default","firstName":"default","birthDate":"0000-00-00"}}';
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
