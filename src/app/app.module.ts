import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DatePipe} from '@angular/common';

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AppRoutingModule } from './routing/routing.module';
import { DraggableModule } from './draggable/draggable.module';
import { LoginComponent } from './login/login.component';
import { MonCompteComponent } from './mon-compte/mon-compte.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { SelectedUserManagementComponent } from './selected-user-management/selected-user-management.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    LoginComponent,
    MonCompteComponent,
    UserManagementComponent,
    SelectedUserManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DraggableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
