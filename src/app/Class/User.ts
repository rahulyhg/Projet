import { Group } from './Group'; 
import { DatePipe } from '@angular/common';

export class User {
  id: number;
  login: string;
  password: string;
  group: Group;
  picture: string;
  log: string;
  connection: string;
  inscription: string;

  constructor() {
    this.id = null,
    this.login = null,
    this.password = null,
    this.group = new Group(),
    this.picture = null,
    this.log = "0",
    this.connection = null,
    this.inscription = null
  }
}