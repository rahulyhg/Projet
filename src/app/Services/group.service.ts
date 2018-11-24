import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Api } from '../Class/Api';
import { Group } from '../Class/Group';
import { RightGroupPage } from '../Class/RightGroupPage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private Api: string = environment.apiUrl + "Group/";
  public token: string = null;

  constructor(private http: HttpClient) { }

  public getGroupById(id: number): Observable<HttpEvent<Object>> {
    console.log("GET / GROUP / getGroupById");

    return this.http.get(this.Api + id, { headers: new HttpHeaders().set('Authorization', this.token), observe: 'events' });
  }

  public getGroupList(): Observable<HttpEvent<Object>> {
    console.log("GET / GROUP / getGroupList");

    return this.http.get(this.Api, { headers: new HttpHeaders().set('Authorization', this.token), observe: 'events' });
  }

  public putGroup(id: number, group: Group): Observable<HttpResponse<Object>> {
    console.log("PUT / GROUP / putGroup");

    return this.http.put(this.Api + id, group, { headers: new HttpHeaders().set('Authorization', this.token), observe: 'response' });
  }

  public deleteGroup(id: number): Observable<HttpResponse<Object>> {
    console.log("DELETE / GROUP / deleteGroup");

    return this.http.delete(this.Api + id, { headers: new HttpHeaders().set('Authorization', this.token), observe: 'response' });
  }

  public postGroup(group: Group): Observable<HttpResponse<Object>> {
    console.log("POST / GROUP / postGroup");

    return this.http.post(this.Api, group, { headers: new HttpHeaders().set('Authorization', this.token), observe: 'response' });
  }
}