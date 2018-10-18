import { Injectable } from '@angular/core';
import { User } from './Class/User';
import { Data } from './Data';

interface Api {
  api: boolean;
  auth: boolean;
  ErrorMsg: string;
  data: Object[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private data: Data) { }

  public getUserById(id: number): User {
    var reponse = this.InitReponse(JSON.parse(this.data.getUserById(id)));
    console.log("getUserById Resquest");
    var user: User;
    if(reponse !== null && reponse !== undefined) {
      return user = new User(reponse[0]);
    } else {
      return user = new User(null);
    }
  }

  public Auth(login: string, password: string): User {
    var reponse = this.InitReponse(JSON.parse(this.data.AuthUser(login, password)));
    console.log("AuthUser Resquest");
    var user: User;
    if(reponse !== null && reponse !== undefined) {
      return user = new User(reponse);
    } else {
      return user = new User(null);
    }
  }

  private InitReponse(api: Api): any {
    if(api !== null && api !== undefined) {
      if(api.api) {
        if(api.auth) {
          if(api.ErrorMsg !== null && api.ErrorMsg !== undefined) {
            console.log(api.ErrorMsg);
          } 
          if(api.data !== null && api.data !== undefined) {
            return api.data;
          } else {
            return null;
          }
        } else {
          console.log("Error: Authentification False");
        }
      } else {
        console.log("Error: Api false");
      }
    } else {
      console.log("Error: Reponse Null");
    }
  }

}
