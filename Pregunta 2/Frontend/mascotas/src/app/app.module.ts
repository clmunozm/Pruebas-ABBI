// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ListarMascotasComponent } from './mascotas/listar-mascotas/listar-mascotas.component';
import { AgregarMascotaComponent } from './mascotas/agregar-mascota/agregar-mascota.component';
import { EditarMascotaComponent } from './mascotas/editar-mascota/editar-mascota.component';

const routes: Routes = [
  { path: '', component: ListarMascotasComponent },
  { path: 'agregar', component: AgregarMascotaComponent },
  { path: 'editar/:id', component: EditarMascotaComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListarMascotasComponent,
    AgregarMascotaComponent,
    EditarMascotaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }