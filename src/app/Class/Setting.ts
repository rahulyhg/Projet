import { isString, isNumber, isBoolean, isObject } from 'util';
import { GenericModule } from '../generic/generic.modules';

export class Setting {
  private generic: GenericModule;

  public id: number;
  public version: string;

  public primary_background_color: string;
  public secondary_background_color: string;

  public primary_font_color: string;
  public secondary_font_color: string;

  public primary_menu_color: string;
  public secondary_menu_color: string;

  public primary_button_color: string;
  public secondary_button_color: string;

  public primary_border_color: string;
  public secondary_border_color: string;

  public primary_shadow_color: string;
  public secondary_shadow_color: string;

  public primary_action_color: string;
  public secondary_action_color: string;

  public primary_action_disabled_color: string;
  public secondary_action_disabled_color: string;

  constructor(value: any) {
    if(value === null) { value = "" }

    this.id = this.setFormatNumber(value.id, value, 1);
    this.version = this.setFormatString(value.version, value, " App Version Alpha Pré-production (0.0.14) ");
    this.primary_background_color = this.setFormatString(value.primary_background_color, value, "#FFF");
    this.secondary_background_color = this.setFormatString(value.secondary_background_color, value, "#f5f5f5");

    this.primary_font_color = this.setFormatString(value.primary_font_color, value, "#000");
    this.secondary_font_color = this.setFormatString(value.secondary_font_color, value, "#000");

    this.primary_border_color = this.setFormatString(value.primary_border_color, value, "#000");
    this.secondary_border_color = this.setFormatString(value.secondary_border_color, value, "#000");

    this.primary_shadow_color = this.setFormatString(value.primary_shadow_color, value, "#888888");
    this.secondary_shadow_color = this.setFormatString(value.secondary_shadow_color, value, "#888888");

    this.primary_action_color = this.setFormatString(value.primary_action_color, value, "#3b4fbc");
    this.secondary_action_color = this.setFormatString(value.secondary_action_color, value, "#3b4fbc");

    this.primary_action_disabled_color = this.setFormatString(value.primary_action_disabled_color, value, "#dcdcdc");
    this.secondary_action_disabled_color = this.setFormatString(value.secondary_action_disabled_color, value, "#dcdcdc");
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