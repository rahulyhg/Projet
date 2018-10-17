import { Group } from './Group'; 

export class User {
  id: number;
  login: string;
  password: string;
  group: Group;
  profile: string;
  statut: string;
  date_time_logIn: string;
  date_time_signIn: string;
  gameTag: string;
  name: string;
  firstName: string;
  birthDate: string;


  constructor() {
    this.id = 1,
    this.login = "default",
    this.password = "c21f969b5f03d33d43e04f8f136e7682",
    this.group = new Group(),
    this.profile = "default.jpg",
    this.statut = "0",
    this.date_time_logIn = "2000-01-01 01:01:01",
    this.date_time_signIn = "2000-01-01 01:01:01",
    this.gameTag = "@default",
    this.name = "default",
    this.firstName = "default",
    this.birthDate = "2000-01-01"
  }
}