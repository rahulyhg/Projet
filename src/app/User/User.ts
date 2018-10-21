import { Group } from '../Group/Group'; 

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

    this.id = value.id;
    if(value.id === null || value.id === undefined || value === "")
      this.id = 1;

    this.login = value.login;
    if(value.login === null || value.login === undefined || value === "")
      this.login = "default";

    this.password = value.password;
    if(value.password === null || value.password === undefined || value === "")
      this.password = "c21f969b5f03d33d43e04f8f136e7682";

    this.group = value.group;
    if(value.group === null || value.group === undefined || value === "")
      this.group = new Group(null);

    this.profile = value.profile;
    if(value.profile === null || value.profile === undefined || value === "")
      this.profile = "assets/uploads/images/default.jpg";

    if(value.statut || !value.statut) 
      this.statut = value.statut;
    if(value.statut === "0")
      this.statut = false;
    if(value.statut === "1")
      this.statut = true;
    if(value.statut === null || value.statut === undefined || value === "")
      this.statut = false;

    this.date_time_logIn = value.date_time_logIn;
    if(value.date_time_logIn === null || value.date_time_logIn === undefined || value === "")
      this.date_time_logIn = "2000-01-01 01:01:01";

    this.date_time_signIn = value.date_time_signIn;
    if(value.date_time_signIn === null || value.date_time_signIn === undefined || value === "")
      this.date_time_signIn = "2000-01-01 01:01:01";

    this.gameTag = value.gameTag;
    if(value.gameTag === null || value.gameTag === undefined || value === "")
      this.gameTag = "@default";

    this.name= value.name;
    if(value.name === null || value.name === undefined || value === "")
      this.name = "default";

    this.firstName = value.firstName;
    if(value.firstName === null || value.firstName === undefined || value === "")
      this.firstName = "default";

    this.birthDate = value.birthDate;
    if(value.birthDate === null || value.birthDate === undefined || value === "")
      this.birthDate = "2000-01-01";
  }
}