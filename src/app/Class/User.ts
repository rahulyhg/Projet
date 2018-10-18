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

  constructor(value: any) {
    if(value === null) { value = "" }

    this.id = this.IsEmpty(value.id, 1),
    this.login = this.IsEmpty(value.login, "default"),
    this.password = this.IsEmpty(value.password, "c21f969b5f03d33d43e04f8f136e7682"),
    this.group = this.IsEmpty(value.group, new Group(null)),
    this.profile = this.IsEmpty(value.profile, "default.jpg"),
    this.statut = this.IsEmptyBoolean(value.statut),
    this.date_time_logIn = this.IsEmpty(value.date_time_logIn, "2000-01-01 01:01:01"),
    this.date_time_signIn = this.IsEmpty(value.date_time_signIn, "2000-01-01 01:01:01"),
    this.gameTag = this.IsEmpty(value.gameTag, "@default"), 
    this.name = this.IsEmpty(value.name, "default"),
    this.firstName = this.IsEmpty(value.firstName, "default"),
    this.birthDate = this.IsEmpty(value.birthDate, "2000-01-01")
  }

  private IsEmpty(value: any, default_value: any): any {
    if(value !== null && value !== undefined)
      return value;
    else
      return default_value;
  }

  private IsEmptyBoolean(value: any): boolean {
    if(value !== null && value !== undefined) {
      if(value || !value) 
        return value;
      if(value === "0")
        return false;
      if(value === "1")
        return true;
    } else
      return false;
  }
}