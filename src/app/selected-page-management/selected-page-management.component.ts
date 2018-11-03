import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { UploadEvent, FileSystemFileEntry } from '../../../node_modules/ngx-file-drop';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { AppComponent } from '../app.component';

import { User } from '../Class/User';
import { Page } from '../Class/Page';

import { PageService } from '../Services/page.service';
import { from } from 'rxjs';

@Component({
  templateUrl: './selected-page-management.component.html',
})
export class SelectedPageManagementComponent implements OnInit {
  public _currentUser: User;
  public page: Page;
  private selectedFile: File;
  public new_title: string;
  private post: any;
  private SelectedPageManagementForm: FormGroup;

  constructor(private app:AppComponent, private router: Router, private pageApi: PageService, private route: ActivatedRoute,
    private http: HttpClient, private fb: FormBuilder) { 
    this._currentUser = new User(null);
    this.page = new Page(null);
    this.new_title = this.page.title;
    this.post = null;
    this.SelectedPageManagementForm = null;
  }

  ngOnInit(): void { 
    this.app.ngOnInit();
    this._currentUser = this.app._currentUser;
    
    this.getPageById();

    this.new_title = this.page.title;

    //#
    //if(!this._currentUser.group.rightGroupPage.MonCompte_Access) {
      // console.log("Vous n'avez pas la permission d'accedez à cette page");
      // this.router.navigate(['/Accueil']);
    //}

    this.initData();
  }

  private initData(): void {
    this.SelectedPageManagementForm = this.fb.group({
      'title': this.page.title
    });
  }

  private getPageById(): void {
    //this.page = this.pageApi.getPageById(Number(this.route.snapshot.paramMap.get('id')));
  }

  private imageChangeClick(event): void {
    this.selectedFile = event.target.files[0];
    this.onUpload();
  }

  private onUpload(): void {
    var uploadData: FormData = new FormData();
    var name: string = "page" + Math.random() * 1000 + ".jpg";
    uploadData.append('myFile', this.selectedFile, name);
    this.http.post('https://dev.kevin-c.fr/api/file.php', uploadData, { observe: 'events' })
    .subscribe(event => {
      if(event)
        this.newImage(event, name);
    });
  }

  private newImage(ok: any, name: string): void {
    if(ok.ok)
      this.page.favicon = "https://dev.kevin-c.fr/api/uploads/" + name;
  }

  public imageChangeDrag(event: UploadEvent): void {
    (event.files[0].fileEntry as FileSystemFileEntry).file((file: File) => { this.selectedFile = file; this.onUpload(); });
  }

  private TitleChange(value: any): void {
    this.page.title = value;
    if(value.length > 24) {
      this.new_title = value.substring(0,21) + " ...";
    } else {
      this.new_title = value;
    }
  }

  private editPage(value: any): void {
    console.log("Edition");
  }

  private DeletePage(): void {
    //#
    // if(this._currentUser.group.rightGroupPage.SelectedUserManagement_DeleteUser) {
      this.pageApi.deletePage(this.page.id);

      this.router.navigate(['/PageManagement']);
    // } else 
    //   console.log("Vous n'avez pas la permission pour effectuer cette action");
  }

}
