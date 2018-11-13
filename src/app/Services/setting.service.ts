import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

import { Api } from '../Class/Api';
import { Setting } from '../Class/Setting';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private Api:string = environment.apiUrl + "Setting/";

  constructor(private http: HttpClient) { }

    // private Reponse_getSettingById: Observable<Api>;
    // private Reponse_getSettingList: Observable<Api>;

    // this.Reponse_getSettingById = null;
    // this.Reponse_getSettingList = null;

    // this.Reponse_getSettingById = this.settingApi.getSettingById(2);
    // this.Reponse_getSettingById.subscribe((data: Api) => {
    //   console.log(data)
    // });

    // this.Reponse_getSettingList = this.settingApi.getSettingList();
    // this.Reponse_getSettingList.subscribe((data: Api) => {
    //   console.log(data)
    // });

    // this.Reponse_getSettingById = this.settingApi.getSettingById(2);
    // this.Reponse_getSettingById.subscribe((data: Api) => {
    //   this.settingApi.putSetting(3, new Setting(data.data));
    // });

    //this.settingApi.deleteSetting(3);

    // this.Reponse_getSettingById = this.settingApi.getSettingById(2);
    // this.Reponse_getSettingById.subscribe((data: Api) => {
    //   this.settingApi.postSetting(new Setting(data.data));
    // });

  public getSettingById(id: number): Observable<Api> {
    console.log("GET / SETTING / getSettingById");

    var reponse: Observable<Api> = this.http.get<Api>(this.Api + id).pipe(map((data: Api) => {
      data.data = new Setting(data.data)
      return data
    }));

    this.InitReponse(reponse);
    return reponse;
  }

  public getSettingList(): Observable<Api> {
    console.log("GET / SETTING / getSettingList");

    var reponse: Observable<Api> = this.http.get<Api>(this.Api).pipe(map((data: Api) => {
      for(var i: number = 0; i < Number(data.data.length); i++) {
        data.data[i] = new Setting(data.data[i])
      }
      return data
    }));

    this.InitReponse(reponse);
    return reponse;
  }

  public putSetting(id: number, setting: Setting): void {
    console.log("PUT / SETTING / putSetting");

    var reponse: Observable<Api> = this.http.put<Api>(this.Api + id, setting);
    this.InitReponse(reponse);
  }

  public deleteSetting(id: number): void {
    console.log("DELETE / SETTING / deleteSetting");

    var reponse: Observable<Api> = this.http.delete<Api>(this.Api + id);
    this.InitReponse(reponse);
  }

  public postSetting(setting: Setting): void {
    console.log("POST / SETTING / postSetting");

    var reponse: Observable<Api> = this.http.post<Api>(this.Api, setting);
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