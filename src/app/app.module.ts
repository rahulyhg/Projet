import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FileDropModule } from 'ngx-file-drop';

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { DraggableModule } from './draggable/draggable.module';
import { LoginComponent } from './login/login.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { SelectedUserManagementComponent } from './selected-user-management/selected-user-management.component';
import { GroupManagementComponent } from './group-management/group-management.component';
import { SelectedGroupManagementComponent } from './selected-group-management/selected-group-management.component';
import { HighlightDirective } from './Services/highlight.directive';
import { PageManagementComponent } from './page-management/page-management.component';
import { SelectedPageManagementComponent } from './selected-page-management/selected-page-management.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: '/Accueil', pathMatch: 'full' },
  { path: 'Accueil', component: AccueilComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'User/:id', component: UserComponent },
  { path: 'UserManagement', component: UserManagementComponent},
  { path: 'UserManagement/:id', component: SelectedUserManagementComponent },
  { path: 'GroupManagement', component: GroupManagementComponent },
  { path: 'GroupManagement/:id', component: SelectedGroupManagementComponent },
  { path: 'PageManagement', component: PageManagementComponent },
  { path: 'PageManagement/:id', component: SelectedPageManagementComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    LoginComponent,
    UserManagementComponent,
    SelectedUserManagementComponent,
    GroupManagementComponent,
    SelectedGroupManagementComponent,
    HighlightDirective,
    PageManagementComponent,
    SelectedPageManagementComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    DraggableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    FileDropModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  exports: [ RouterModule ]
})
export class AppModule { }
