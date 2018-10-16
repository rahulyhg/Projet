import { Group } from './Group'; 

export class User {
  id: number;
  login: string;
  password: string;
  group: Group;
  picture: string;
  log: string;
  connection: Date;
  inscription: Date;

  constructor() {
    this.id = 0,
    this.login = null,
    this.password = null,
    this.group = new Group(),
    this.picture = null,
    this.log = "0",
    this.connection = null,
    this.inscription = null
  }
}