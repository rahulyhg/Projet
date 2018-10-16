import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { User } from '../Class/User';
import { AppComponent } from '../app.component';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'path';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-selected-user-management',
  templateUrl: './selected-user-management.component.html',
  styleUrls: ['./selected-user-management.component.css']
})
export class SelectedUserManagementComponent implements OnInit {

  _currentUser = new User();
  SelectedUserManagementForm:FormGroup;

  post:any;
  user= new User();

  constructor(private route: ActivatedRoute, public app: AppComponent, public userApi: UserService, private router: Router, private fb: FormBuilder, private datePipe: DatePipe) {
    this.initData();
  }

  ngOnInit() {
    this._currentUser = this.app._currentUser;

    if(this._currentUser.group.SelectedUserManagement !== "1") {
      this.router.navigate(['/Accueil']);
    }

    this.user.id = Number(this.route.snapshot.paramMap.get('id'));
    this.userApi.getUserById(this.user.id, this._currentUser.login, this._currentUser.password).subscribe((data) => {this.create(data)}); 

    
  }

  create(att) {
    if(att !== null) {
      if(att.api) {
        if(att.auth) {
          if(att.data[0] !== null) {
            this.user = att.data[0];
            this.initData();
          } else {
            console.log("Error : No Data");
          }
        } else {
          console.log("Error: You can not access the API if you are not authenticated! ");
        }
      } else {
        console.log("Error : Could not join API");
      }
    }
  }

  initData() {
    this.SelectedUserManagementForm = this.fb.group({
      'id': this.user.id,
      'log': this.user.log,
      'login' : this.user.login,
      'password' : this.user.password,
      'inscription' : this.ConvertDate(this.user.inscription),
      'connection' : this.ConvertDate(this.user.connection),
      'picture' : this.user.picture
    });
  }

  ConvertDate(date: string) {
    if(date !== null) {
      var date_t = (date.split(' ')[0]).split('-');
      var time_t = (date.split(' ')[1]).split(':');
      return date_t[0]+"-"+date_t[1]+"-"+date_t[2]+"T"+time_t[0]+":"+time_t[1]+":"+time_t[2];
    }
  }

  editUse(post) {
    console.log(this.user);
  }

}
