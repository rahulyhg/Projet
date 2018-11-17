import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Api } from '../Class/Api';
import { RightGroupPage } from '../Class/RightGroupPage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RightGroupPageService {
  private Api: string = environment.apiUrl + "RightGroupPage/";

  constructor(private http: HttpClient) { }

  public getRightGroupPageById(id: number): Observable<Api> {
    console.log("GET / RIGHTGROUPPAGE / getRightGroupPageById");

    var reponse: Observable<Api> = this.http.get<Api>(this.Api + id).pipe(map((data: Api) => {
      data.data = new RightGroupPage(data.data)
      return data
    }));

    this.InitReponse(reponse);
    return reponse;
  }

  public getRightGroupPageList(): Observable<HttpEvent<Object>> {
    console.log("GET / RIGHTGROUPPAGE / getRightGroupPageList");

    return this.http.get(this.Api, { observe: 'events' });
  }

  public putRightGroupPage(id: number, rightGroupPage: RightGroupPage): void {
    console.log("PUT / RIGHTGROUPPAGE / putRightGroupPage");

    var reponse: Observable<Api> = this.http.put<Api>(this.Api + id, rightGroupPage);
    this.InitReponse(reponse);
  }

  public deleteRightGroupPage(id: number): void {
    console.log("DELETE / RIGHTGROUPPAGE / deleteRightGroupPage");

    var reponse: Observable<Api> = this.http.delete<Api>(this.Api + id);
    this.InitReponse(reponse);
  }

  public postRightGroupPage(rightGroupPage: RightGroupPage): void {
    console.log("POST / RIGHTGROUPPAGE / postRightGroupPage");

    var reponse: Observable<Api> = this.http.post<Api>(this.Api, rightGroupPage);
    this.InitReponse(reponse);
  }

  private InitReponse(value: Observable<Api>): void {
    value.subscribe((data: Api) => {
      if(data !== null && data !== undefined && data.api) {
        if(data.auth) {
          if(data.ErrorMsg !== null && data.ErrorMsg !== undefined)
            console.log(data.ErrorMsg);
          if(data.data !== null && data.data !== undefined)
            return data.data;
          else
            return [ null ];
        } else
          console.log("Error: Authentification False");
      } else
        console.log("Error: Api false");
    })
  }
}