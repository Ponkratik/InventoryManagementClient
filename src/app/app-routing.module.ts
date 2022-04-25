import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ItemAddComponent } from './components/item-add/item-add.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemUpdateComponent } from './components/item-update/item-update.component';
import { LoginComponent } from './components/login/login.component';
import { ResponsibleAddComponent } from './components/responsible-add/responsible-add.component';
import { ResponsibleListComponent } from './components/responsible-list/responsible-list.component';
import { ResponsibleUpdateComponent } from './components/responsible-update/responsible-update.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: LoginComponent },
  { path: 'responsiblemanagement', component: ResponsibleListComponent },
  { path: 'responsiblemanagement/add', component: ResponsibleAddComponent },
  { path: 'responsiblemanagement/update/:id', component: ResponsibleUpdateComponent},
  { path: 'itemmanagement', component: ItemListComponent },
  { path: 'itemmanagement/add', component: ItemAddComponent },
  { path: 'itemmanagement/update/:id', component: ItemUpdateComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
