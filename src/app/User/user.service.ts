import { Injectable } from '@angular/core';

import { User } from './User';
import { Data } from '../Data';

interface Api {
  api: boolean;
  auth: boolean;
  ErrorMsg: string;
  data: User[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private data: Data) { }

  public getUserById(id: number): User {
    console.log("getUserById Resquest");
    var reponse: User[] = this.InitReponse(JSON.parse(this.data.getUserById(id)));
    if(reponse !== null && reponse !== undefined)
      return new User(reponse[0]);
    else
      return new User(null);
  }

  public Auth(login: string, password: string): User {
    console.log("AuthUser Resquest");
    var reponse: User[] = this.InitReponse(JSON.parse(this.data.AuthUser(login, password)));
    if(reponse !== null && reponse !== undefined)
      return new User(reponse);
    else
      return new User(null);
  }

  public getUserList(): User[] {
    console.log("getUserList Resquest");
    var reponse: User[] = this.InitReponse(JSON.parse(this.data.getUser()));
    if(reponse !== null && reponse !== undefined)
      return reponse;
    else
      return [ null ];
  }

  public putUser(id: number, user: User): void {
    console.log("putUser Resquest");
    this.InitReponse(JSON.parse(this.data.putUser(id, user)));
  }

  private InitReponse(api: Api): User[] {
    if(api !== null && api !== undefined && api.api) {
      if(api.auth) {
        if(api.ErrorMsg !== null && api.ErrorMsg !== undefined)
          console.log(api.ErrorMsg);
        if(api.data !== null && api.data !== undefined)
          return api.data;
        else
          return [ null ];
      } else
        console.log("Error: Authentification False");
    } else
      console.log("Error: Api false");
  }
}
