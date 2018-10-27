import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { UploadEvent, FileSystemFileEntry } from '../../../node_modules/ngx-file-drop';

import { AppComponent } from '../app.component';

import { User } from '../User/User';
import { Page } from '../Page/Page';

import { PageService } from '../Page/page.service';
import { from } from 'rxjs';

@Component({
  templateUrl: './selected-page-management.component.html',
})
export class SelectedPageManagementComponent implements OnInit {
  public _currentUser: User;
  public page: Page;
  private selectedFile: File;

  constructor(private app:AppComponent, private router: Router, private pageApi: PageService, private route: ActivatedRoute, private http: HttpClient) { 
    this._currentUser = new User(null);
    this.page = new Page(null);
  }

  ngOnInit(): void { 
    this.app.ngOnInit();
    this._currentUser = this.app._currentUser;
    
    this.getPageById();

    //#
    //if(!this._currentUser.group.rightGroupPage.MonCompte_Access) {
      // console.log("Vous n'avez pas la permission d'accedez à cette page");
      // this.router.navigate(['/Accueil']);
    //}
  }

  private getPageById(): void {
    this.page = this.pageApi.getPageById(Number(this.route.snapshot.paramMap.get('id')));
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

}
