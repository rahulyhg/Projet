import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppComponent } from '../app.component';

import { User } from '../Class/User';
import { Group } from '../Class/Group';

import { UserService } from '../user.service';
import { GroupService } from '../group.service';



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

  _RightEdit = false;

  GroupList: Group[];

  constructor(private route: ActivatedRoute,
    public app: AppComponent,
    public userApi: UserService,
    private router: Router,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private groupApi: GroupService) {
    this.initData();
  }

  ngOnInit() {
    this._currentUser = this.app._currentUser;

    if(this._currentUser.group.SelectedUserManagement !== "1") {
      this.router.navigate(['/Accueil']);
    }

    this.user.id = Number(this.route.snapshot.paramMap.get('id'));
    this.userApi.getUserById(this.user.id, this._currentUser.login, this._currentUser.password).subscribe((data) => {this.createUser(data)}); 

    this.groupApi.getGroupList(this._currentUser.login, this._currentUser.password).subscribe((data) => {this.createGroup(data)}); 
  }

  createUser(att) {
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

  createGroup(att) {
    if(att !== null) {
      if(att.api) {
        if(att.auth) {
          if(att.data[0] !== null) {
            this.GroupList = att.data;
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
    this._RightEdit = false;
    this.SelectedUserManagementForm = this.fb.group({
      'id': this.user.id,
      'log': this.user.log,
      'login' : this.user.login,
      'password' : this.user.password,
      'inscription' : this.ConvertDate(this.user.inscription),
      'connection' : this.ConvertDate(this.user.connection),
      'group' : new FormControl(this.user.group),
      'picture' : this.user.picture,
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
    var user = new User();
    user = post;

    this.userApi.putUserById(user, this._currentUser.login, this._currentUser.password).subscribe((data) => {this.Rep(data)});
    
    if(user.id === this._currentUser.id) {
      this._currentUser = user;
      if(this._currentUser.group.SelectedUserManagement !== "1") {
        this.router.navigate(['/Accueil']);
      }
      this.app.ngOnInit();
    }
  }

  Rep(att: any) {
    if(att !== null) {
      if(att.api) {
        if(!att.auth) {
          console.log("Error: You can not access the API if you are not authenticated! ");
        }
      } else {
        console.log("Error : Could not join API");
      }
    }
  }

  ChangeRightEdit() {
    if(!this._RightEdit) {
      console.log("true");
      this._RightEdit = true;
    } else {
      console.log("false");
      this._RightEdit = false;
    }
  }
}
