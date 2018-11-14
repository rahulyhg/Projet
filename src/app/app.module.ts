import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { FileDropModule } from 'ngx-file-drop';
import { AmazingTimePickerModule } from 'amazing-time-picker/amazing-time-picker';

import { 
  MatButtonModule, MatNativeDateModule, MatTableModule, MatExpansionModule, MatChipsModule, 
  MatSelectModule, MatSlideToggleModule, MatDatepickerModule, MatInputModule, MatIconModule, 
  MatDividerModule, MatListModule, MatSidenavModule, MatToolbarModule, MatDialogModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { DraggableModule } from './draggable/draggable.module';
import { LoginComponent } from './login/login.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { SelectedUserManagementComponent, DeleteUserPopup } from './selected-user-management/selected-user-management.component';
import { GroupManagementComponent } from './group-management/group-management.component';
import { SelectedGroupManagementComponent, DeleteGroupPopup } from './selected-group-management/selected-group-management.component';
import { HighlightDirective } from './Services/highlight.directive';
import { PageManagementComponent } from './page-management/page-management.component';
import { SelectedPageManagementComponent } from './selected-page-management/selected-page-management.component';
import { UserComponent } from './user/user.component';
import { SettingsComponent } from './settings/settings.component';
import { GenericModule } from './generic/generic.modules';

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
  { path: 'Settings', component: SettingsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    LoginComponent,
    UserManagementComponent,
    SelectedUserManagementComponent,
    DeleteUserPopup,
    GroupManagementComponent,
    SelectedGroupManagementComponent,
    DeleteGroupPopup,
    HighlightDirective,
    PageManagementComponent,
    SelectedPageManagementComponent,
    UserComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    DraggableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    FileDropModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AmazingTimePickerModule,
    MatTableModule,
    MatExpansionModule,
    GenericModule,
    MatDividerModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule
  ],
  providers: [ DatePipe ],
  bootstrap: [ AppComponent ],
  exports: [ RouterModule ],
  entryComponents: [DeleteUserPopup, DeleteGroupPopup]
})
export class AppModule { }
