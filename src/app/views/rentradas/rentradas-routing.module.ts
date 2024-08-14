import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { REntradasComponent } from './rentradas.component';

const routes: Routes = [
  {
    path: '',
    component: REntradasComponent,
    data: {
      title: $localize`REPORTE DE ENTRADAS`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  RentradasRoutingModule {

    
}