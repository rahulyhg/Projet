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
  private _currentUser: User;

  constructor(private app:AppComponent, private router: Router) { }

  ngOnInit() { 
    this.app.ngOnInit();
    this._currentUser = this.app._currentUser;

    if(!this._currentUser.group.rightGroupPage.access_MonCompte) {
      console.log("Vous n'avez pas la permission d'accedez à cette page");
      this.router.navigate(['/Accueil']);
      this.ngOnInit();
    }
  }
}