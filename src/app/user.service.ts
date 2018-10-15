import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient } from '@angular/common/http';
import { User } from './Class/User';

interface Data {
  data: Object;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }

  getUserById(id: number, login: string, password: string) {
    return this.http.get<Data>('https://dev.kevin-c.fr/api/User/getUserById/' + id + this.create_auth(login, password));
  }

  auth(login: string, password: string) {
    return this.http.get<Data>('https://dev.kevin-c.fr/api/User/Auth/' + login + "/" + this.create_md5(password));
  }

  logOut(id: number, login: string, password: string) {
    return this.http.get<Data>('https://dev.kevin-c.fr/api/User/logOut/' + id + this.create_auth(login, password));
  }

  create_auth(login: string, password: string) {
    return "&login=" + login + "&password=" + password;
  }

  create_md5(attrib: string) {
    const md5 = new Md5();
    return md5.appendStr(attrib).end();
  }
}
