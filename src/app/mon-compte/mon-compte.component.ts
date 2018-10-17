import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { User } from '../Class/User';
import { Router } from "@angular/router";

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent implements OnInit {

  constructor(public app: AppComponent, private router: Router) { }

  public _currentUser: User;

  ngOnInit() {
    this.app.ngOnInit();
    this._currentUser = this.app._currentUser;
    if(this._currentUser.group.rightGroupPage.access_MonCompte !== "1") {
      this.router.navigate(['/Accueil']);
    }
  }
}