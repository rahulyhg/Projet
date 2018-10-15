import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccueilComponent } from '../accueil/accueil.component';
import { LoginComponent } from '../login/login.component';
import { MonCompteComponent } from '../mon-compte/mon-compte.component';

const routes: Routes = [
  { path: '', redirectTo: '/Accueil', pathMatch: 'full' },
  { path: 'Accueil', component: AccueilComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'MonCompte', component: MonCompteComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}