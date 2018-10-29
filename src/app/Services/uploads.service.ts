import { Injectable } from '@angular/core';

import { Upload } from '../Class/Upload';
import { Data } from '../Api/Api';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FileSystemFileEntry } from '../../../node_modules/ngx-file-drop';

interface Api {
  api: boolean;
  auth: boolean;
  ErrorMsg: string;
  data: Upload[];
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
    private pathNewFile: string;

  constructor(private data: Data, private http: HttpClient) { 
      this.pathNewFile = "";
  }

  public getUploadById(id: number): Upload {
    console.log("GET / UPLOAD / getUploadById");
    var reponse: Upload[] = this.InitReponse(JSON.parse(this.data.getUploadById(id)));
    if(reponse !== null && reponse !== undefined)
      return new Upload(reponse[0]);
    else
      return new Upload(null);
  }

  public getUploadList(): Upload[] {
    console.log("GET / UPLOAD / getUploadList");
    var reponse: Upload[] = this.InitReponse(JSON.parse(this.data.getUpload()));
    if(reponse !== null && reponse !== undefined)
      return reponse;
    else
      return [ null ];
  }

  public putUpload(id: number, upload: Upload): void {
    console.log("PUT / UPLOAD / putUpload");
    this.InitReponse(JSON.parse(this.data.putUpload(id, upload)));
  }

  public deleteUpload(id: number): void {
    console.log("DELETE / UPLOAD / deleteUpload");
    this.InitReponse(JSON.parse(this.data.deleteUpload(id)));
  }

  public postUpload(upload: Upload): void {
    console.log("POST / UPLOAD / postUpload");
    this.InitReponse(JSON.parse(this.data.postUpload(upload)));
  }

  public UploadFile(file: File): string {
    var uploadData: FormData = new FormData();
    var name: string = "profile" + Math.random() * 1000 + ".jpg";
    uploadData.append('myFile', file, name);
    this.http.post('https://dev.kevin-c.fr/api/file.php', uploadData, { observe: 'events' })
    .subscribe(event => {
      if(event)
        this.newImage(event, name);
    });
    
    return this.pathNewFile;
  }

  private newImage(ok: any, name: string): void {
    if(ok.ok)
      this.pathNewFile = "https://dev.kevin-c.fr/api/uploads/" + name;
      console.log(this.pathNewFile);
  }

  private InitReponse(api: Api): Upload[] {
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
