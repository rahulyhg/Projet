import { isString, isNumber, isBoolean, isObject } from 'util';

import { Group } from './Group'; 

export class User {
  public id: number;
  public login: string;
  public password: string;
  public group: Group;
  public profile: string;
  public statut: boolean;
  public date_time_logIn: string;
  public date_time_signIn: string;
  public gameTag: string;
  public name: string;
  public firstName: string;
  public birthDate: string;
  public token: string;

  constructor(value: any) {
    if(value === null) { value = "" }

    this.id = this.setFormatNumber(value.id, value, 1);
    this.login = this.setFormatString(value.login, value, "default");
    this.password = this.setFormatString(value.password, value, "c21f969b5f03d33d43e04f8f136e7682");
    this.group = this.setFormat(value.group, value, new Group(null));
    this.profile = this.setFormatString(value.profile, value, "assets/uploads/images/default.jpg");
    this.statut = this.setFormatBoolean(value.statut, value, false);
    this.date_time_logIn = this.setFormatString(value.date_time_logIn, value, "2000-01-01 01:01:01");
    this.date_time_signIn = this.setFormatString(value.date_time_signIn, value, "2000-01-01 01:01:01");
    this.gameTag = this.setFormatString(value.gameTag, value, "@default");
    this.name = this.setFormatString(value.name, value, "default");
    this.firstName = this.setFormatString(value.firstName, value, "default");
    this.birthDate = this.setFormatString(value.birthDate, value, "2000-01-01");
    this.token = this.setFormatString(value.token, value, "5de1c06ba3d0cd4147fa48140dc06a113f803b9a5c3d701fefd917daa9a27d01ea8b9665104d078ad961a36e51833b60632061642eafbfbf23edead43ae2c778afc611cb065d4973b076662477eabfd993847725d21e9cb42ed6ca8be5d37fe76ee32c1a");
  }

  private setFormatNumber(attirb: any, value: any, defaut: any): number {
    var ret: number;
    if(isNumber(attirb))
      ret = attirb;
    else
      ret = Number(attirb);
    if(attirb === null || attirb === undefined || attirb === "" || attirb === " " || attirb < 0 || value === "") {
      if(isNumber(defaut))
        ret = defaut;
      else 
        ret = 1;
    }
    return ret;
  }

  private setFormatString(attirb: any, value: any, defaut: any): string {
    var ret: string;
    if(isString(attirb))
      ret = attirb;
    else
      ret = String(attirb);
    if(attirb === null || attirb === undefined || attirb === "" || attirb === " " || value === "") {
      if(isString(defaut))
        ret = defaut;
      else 
        ret = "default";
    }
    return ret;
  }

  private setFormatBoolean(attirb: any, value: any, defaut: any): boolean {
    var ret: boolean;
    if((attirb || !attirb) && isBoolean(attirb))  
      ret = attirb;
    else
      ret = Boolean(attirb);
    if(attirb === "0" || attirb === 0)
      ret = false;
    if(attirb === "1" || attirb === 1)
      ret = true;
    if(attirb === null || attirb === undefined || attirb === "" || attirb === " "  || value === "") {
      if(isBoolean(defaut))
        ret = defaut;
      else 
        ret = false;
    }
    return ret;
  }

  private setFormat(attirb: any, value: any, defaut: any): any {
    var ret: any = attirb;
    if(attirb === null || attirb === undefined || value === "" || !isObject(attirb))
      ret = defaut;
    return ret;
  }
}