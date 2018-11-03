import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Api } from '../Class/Api';
import { Page } from '../Class/Page';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private Api:string = environment.apiUrl + "Page/";

  constructor(private http: HttpClient) { }

    // private Reponse_getPageById: Observable<Api>;
    // private Reponse_getPageByRoute:Observable<Api>;
    // private Reponse_getPageList:Observable<Api>;

    // this.Reponse_getPageById = null;
    // this.Reponse_getPageByRoute = null;
    // this.Reponse_getPageList = null;

    // this.Reponse_getPageById = this.pageApi.getPageById(2);
    // this.Reponse_getPageById.subscribe((data: Api) => {
    //   console.log(data)
    // });

    // this.Reponse_getPageByRoute = this.pageApi.getPageByRoute("");
    // this.Reponse_getPageByRoute.subscribe((data: Api) => {
    //   console.log(data)
    // });

    // this.Reponse_getPageList = this.pageApi.getPageList();
    // this.Reponse_getPageList.subscribe((data: Api) => {
    //   console.log(data)
    // });

    //this.pageApi.putPage(3, new Page(null));

    //this.pageApi.deletePage(3);

    //this.pageApi.postPage(new Page(null));

  public getPageById(id: number): Observable<Api> {
    console.log("GET / PAGE / getPageById");

    var reponse: Observable<Api> = this.http.get<Api>(this.Api + id).pipe(map((data: Api) => {
      data.data = new Page(data.data)
      return data
    }));

    this.InitReponse(reponse);
    return reponse;
  }

  public getPageByRoute(route: string): Observable<Api> {
    console.log("GET / PAGE / getPageByRoute");

    if(route === "") { route = "*" }

    var reponse: Observable<Api> = this.http.get<Api>(this.Api + "Route/" + route).pipe(map((data: Api) => {
      data.data = new Page(data.data)
      return data
    }));

    this.InitReponse(reponse);
    return reponse;
  }

  

  public getPageList(): Observable<Api> {
    console.log("GET / PAGE / getPageList");

    var reponse: Observable<Api> = this.http.get<Api>(this.Api).pipe(map((data: Api) => {
      for(var i: number = 0; i < Number(data.data.length); i++) {
        data.data[i] = new Page(data.data[i])
      }
      return data
    }));

    this.InitReponse(reponse);
    return reponse;
  }

  public putPage(id: number, page: Page): void {
    console.log("PUT / PAGE / putPage");

    var reponse: Observable<Api> = this.http.put<Api>(this.Api + id, page);
    this.InitReponse(reponse);
  }

  public deletePage(id: number): void {
    console.log("DELETE / PAGE / deletePage");

    var reponse: Observable<Api> = this.http.delete<Api>(this.Api + id);
    this.InitReponse(reponse);
  }

  public postPage(page: Page): void {
    console.log("POST / PAGE / postPage");

    var reponse: Observable<Api> = this.http.post<Api>(this.Api, page);
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