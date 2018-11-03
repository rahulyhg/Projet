import { isString, isNumber, isBoolean, isObject } from 'util';

export class Page {
  public id: number;
  public title: string;
  public favicon: string;
  public refresh: number;
  public route: string;
  public needLogIn: boolean;

  constructor(value: any) {
    if(value === null) { value = "" }

    this.id = this.setFormatNumber(value.id, value, 1);
    this.title = this.setFormatString(value.title, value, "default");
    this.favicon = this.setFormatString(value.favicon, value, "assets/uploads/favicon/favicon.ico");
    this.refresh = this.setFormatNumber(value.refresh, value, 1);
    this.route = this.setFormatString(value.route, value, "default");
    this.needLogIn = this.setFormatBoolean(value.needLogIn, value, true);
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