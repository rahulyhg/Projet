import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { GenericModule } from '../generic/generic.modules';

import { Api } from '../Class/Api';
import { User } from '../Class/User';
import { Group} from '../Class/Group';
import { RightGroupPage } from '../Class/RightGroupPage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private Api: string = environment.apiUrl + "User/";
  public token: string = null;

  constructor(private http: HttpClient, private generic: GenericModule) { }

  public getUserById(id: number): Observable<HttpEvent<Object>> {
    console.log("GET / USER / getUserById");

    return this.http.get(this.Api + id, { headers: new HttpHeaders().set('Authorization', this.token), observe: 'events' });
  }

  public Auth(login: string, password: string): Observable<HttpEvent<Object>> {
    console.log("GET:AUTH / USER / AuthUser");

    return this.http.get(this.Api + "Auth/" + login + "/" + this.generic.create_md5(password), { headers: new HttpHeaders().set('Authorization', this.token), observe: 'events' });
  }

  public getUserList(): Observable<HttpEvent<Object>> {
    console.log("GET / USER / getUserList");

    return this.http.get(this.Api, { headers: new HttpHeaders().set('Authorization', this.token), observe: 'events' });
  }

  public putUser(id: number, user: User, regenerate_password: boolean): Observable<HttpResponse<Object>> {
    console.log("PUT / USER / putUser");

    if(regenerate_password) { user.password = String(this.generic.create_md5(user.password)) }

    return this.http.put(this.Api + id, user, { headers: new HttpHeaders().set('Authorization', this.token), observe: 'response' });
  }

  public deleteUser(id: number): Observable<HttpResponse<Object>> {
    console.log("DELETE / USER / deleteUser");

    return this.http.delete(this.Api + id, { headers: new HttpHeaders().set('Authorization', this.token), observe: 'response' });
  }

  public postUser(user: User): Observable<HttpResponse<Object>> {
    console.log("POST / USER / postUser");

    user.password = String(this.generic.create_md5(user.password));

    return this.http.post(this.Api, user, { headers: new HttpHeaders().set('Authorization', this.token), observe: 'response' });
  }
}