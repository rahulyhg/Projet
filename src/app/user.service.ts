import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from './Class/User';

interface Data {
  data: Object;
}

//GET => Prendre
//POST => Ajouter
//PUT => Modifier
//DELETE => Supprimer

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  getUserById(id: number, login: string, password: string) {
    console.log('/api/User/getUserById/' + id + this.create_auth(login, password));
    return this.http.get<Data>('/api/User/getUserById/' + id + this.create_auth(login, password));
  }

  auth(login: string, password: string) {
    console.log('/api/User/Auth/' + login + "/" + this.create_md5(password));
    return this.http.get<Data>('/api/User/Auth/' + login + "/" + this.create_md5(password));
  }

  logOut(id: number, login: string, password: string) {
    return this.http.put<Data>('/api/User/logOut/' + id + this.create_auth(login, password), this.httpOptions);
  }

  getUserList(login: string, password: string) {
    return this.http.get<Data>('/api/User/getUserList' + this.create_auth(login, password));
  }

  putUserById(user: User, login: string, password: string) {
    let body = JSON.stringify(user); 
    return this.http.put<Data>('/api/User/putUserById/' + user.id + this.create_auth(login, password), body, this.httpOptions);
  }

  create_auth(login: string, password: string) {
    return "&login=" + login + "&password=" + password;
  }

  create_md5(attrib: string) {
    const md5 = new Md5();
    return md5.appendStr(attrib).end();
  }
}
