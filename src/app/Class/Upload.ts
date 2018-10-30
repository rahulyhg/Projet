import { isString, isNumber, isBoolean } from 'util';

import { User } from './User';
 
export class Upload {
  public id: number;
  public name: string;
  public path: string;
  public uploadDate: string;
  public fileOwner: User;
  public size: number;
  public extention: string;

  constructor(value: any) {
    if(value === null) { value = "" }

    this.id = this.setFormatNumber(value.id, value, 1);
    this.name = this.setFormatString(value.name, value, "default.default");
    this.path = this.setFormatString(value.path, value, "default/defaultdefault.default");
    this.uploadDate = this.setFormatString(value.uploadDate, value, "2000-01-01");
    this.fileOwner = this.setFormat(value.fileOwner, value, new User(null));
    this.size = this.setFormatNumber(value.size, value, 0);
    this.extention = this.setFormatString(value.extention, value, ".default");
  }

  private setFormatNumber(attirb: any, value: any, defaut: any): number {
    var ret: number;
    if(isNumber(attirb))
      ret = attirb;
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
    if(attirb === null || attirb === undefined || value === "")
      ret = defaut;
    return ret;
  }
}