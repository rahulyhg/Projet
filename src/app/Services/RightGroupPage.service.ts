import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Api } from '../Class/Api';
import { RightGroupPage } from '../Class/RightGroupPage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RightGroupPageService {
  private Api:string = environment.apiUrl + "RightGroupPage/";

  constructor(private http: HttpClient) { }

    // private Reponse_getRightGroupPageById: Observable<Api>;
    // private Reponse_getRightGroupPageList: Observable<Api>;

    // this.Reponse_getRightGroupPageById = null;
    // this.Reponse_getRightGroupPageList = null;

    // this.Reponse_getRightGroupPageById = this.rightGroupPageApi.getRightGroupPageById(2);
    // this.Reponse_getRightGroupPageById.subscribe((data: Api) => {
    //   console.log(data)
    // });

    // this.Reponse_getRightGroupPageList = this.rightGroupPageApi.getRightGroupPageList();
    // this.Reponse_getRightGroupPageList.subscribe((data: Api) => {
    //   console.log(data)
    // });

    // this.Reponse_getRightGroupPageById = this.rightGroupPageApi.getRightGroupPageById(2);
    // this.Reponse_getRightGroupPageById.subscribe((data: Api) => {
    //   this.rightGroupPageApi.putRightGroupPage(3, new RightGroupPage(data.data));
    // });

    //this.rightGroupPageApi.deleteRightGroupPage(3);

    // this.Reponse_getRightGroupPageById = this.rightGroupPageApi.getRightGroupPageById(2);
    // this.Reponse_getRightGroupPageById.subscribe((data: Api) => {
    //   this.rightGroupPageApi.postRightGroupPage(new RightGroupPage(data.data));
    // });

  public getRightGroupPageById(id: number): Observable<Api> {
    console.log("GET / RIGHTGROUPPAGE / getRightGroupPageById");

    var reponse: Observable<Api> = this.http.get<Api>(this.Api + id).pipe(map((data: Api) => {
      data.data = new RightGroupPage(data.data)
      return data
    }));

    this.InitReponse(reponse);
    return reponse;
  }

  public getRightGroupPageList(): Observable<Api> {
    console.log("GET / RIGHTGROUPPAGE / getRightGroupPageList");

    var reponse: Observable<Api> = this.http.get<Api>(this.Api).pipe(map((data: Api) => {
      for(var i: number = 0; i < Number(data.data.length); i++) {
        data.data[i] = new RightGroupPage(data.data[i])
      }
      return data
    }));

    this.InitReponse(reponse);
    return reponse;
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

  private create_md5(attrib: string): any {
    const md5 = new Md5();
    return md5.appendStr(attrib).end();
  }
}