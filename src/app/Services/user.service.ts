import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  constructor(private data: Data, private http: HttpClient) { }

  public getUserById(id: number): User {
    console.log("GET / USER / getUserById");

    // LOCAL
    // var reponse: User[] = this.InitReponse(JSON.parse(this.data.getUserById(id)));

    // API
    this.http.get(this.Api + id).subscribe(data => {
      localStorage.setItem('reponseApi', JSON.stringify(data))
    });
    console.log(localStorage.getItem('reponseApi'));
    var reponse: User[] = this.InitReponse(JSON.parse(localStorage.getItem('reponseApi')));


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
    this.http.get(this.Api + "Auth/" + login + "/" + this.create_md5(password)).subscribe(data => localStorage.setItem('reponseApi', JSON.stringify(data)));
    var reponse: User[] = this.InitReponse(JSON.parse(localStorage.getItem('reponseApi')));
    
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
    this.http.get(this.Api).subscribe(data => localStorage.setItem('reponseApi', JSON.stringify(data)));
    var reponse: User[] = this.InitReponse(JSON.parse(localStorage.getItem('reponseApi')));
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
    this.http.put(this.Api + id, user).subscribe(data => localStorage.setItem('reponseApi', JSON.stringify(data)));
    this.InitReponse(JSON.parse(localStorage.getItem('reponseApi')));
  }

  public deleteUser(id: number): void {
    console.log("DELETE / USER / deleteUser");
    this.InitReponse(JSON.parse(this.data.deleteUser(id)));
  }

  public postUser(user: User): void {
    console.log("POST / USER / postUser");
    user.password = this.create_md5(user.password);
    this.InitReponse(JSON.parse(this.data.postUser(user)));
  }

  private InitReponse(api: Api): User[] {
    localStorage.setItem('reponseApi', "");
    if(api !== null && api !== undefined && api.api) {
      if(api.auth) {
        if(api.ErrorMsg !== null && api.ErrorMsg !== undefined)
          console.log(api.ErrorMsg);
        if(api.data !== null && api.data !== undefined)
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