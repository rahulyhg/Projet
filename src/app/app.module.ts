import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AppRoutingModule } from './routing/routing.module';
import { DraggableModule } from './draggable/draggable.module';
import { LoginComponent } from './login/login.component';
import { MonCompteComponent } from './mon-compte/mon-compte.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    LoginComponent,
    MonCompteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DraggableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
