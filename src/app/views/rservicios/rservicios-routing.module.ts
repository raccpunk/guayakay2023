import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RserviciosComponent } from './rservicios.component';

const routes: Routes = [
  {
    path: '',
    component: RserviciosComponent,
    data: {
      title: $localize`REPORTE DE SERVICIOS`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  RserviciosRoutingModule {

    
}