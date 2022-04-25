import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ResponsibleAddComponent } from './components/responsible-add/responsible-add.component';
import { ResponsibleListComponent } from './components/responsible-list/responsible-list.component';
import { ResponsibleUpdateComponent } from './components/responsible-update/responsible-update.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { HomeComponent } from './components/home/home.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemAddComponent } from './components/item-add/item-add.component';
import { ItemUpdateComponent } from './components/item-update/item-update.component';
import { AttachmentsComponent } from './components/attachments/attachments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResponsibleAddComponent,
    ResponsibleListComponent,
    ResponsibleUpdateComponent,
    HomeComponent,
    ItemListComponent,
    ItemAddComponent,
    ItemUpdateComponent,
    AttachmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
