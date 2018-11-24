import { Injectable } from '@angular/core';

import { Upload } from '../Class/Upload';
// import { Data } from '../Api/Api';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  constructor(private http: HttpClient) { }

  public token: string = null;

  public UploadFile(file: File, name: string) {
    var uploadData: FormData = new FormData();
    uploadData.append('myFile', file, name);
    return this.http.post('https://dev.kevin-c.fr/api/file.php', uploadData, { headers: new HttpHeaders().set('Authorization', this.token), reportProgress: true, observe: 'events' })
  }
}
