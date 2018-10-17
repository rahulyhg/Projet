import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient } from '@angular/common/http';
import { User } from './Class/User';
import { Group } from './Class/Group';

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
export class GroupService {

  constructor(public http:HttpClient) { }

  getGroupList(login: string, password: string) {
    return this.http.get<Data>('https://dev.kevin-c.fr/api/Group/getGroupList' + this.create_auth(login, password));
  }

  create_auth(login: string, password: string) {
    return "&login=" + login + "&password=" + password;
  }

  create_md5(attrib: string) {
    const md5 = new Md5();
    return md5.appendStr(attrib).end();
  }
}
