import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RCobrosComponent } from './rcobros.component';

const routes: Routes = [
  {
    path: '',
    component: RCobrosComponent,
    data: {
      title: $localize`REPORTE DE NOTAS (Fecha Creacion)`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  RcobrosRoutingModule {

    
}