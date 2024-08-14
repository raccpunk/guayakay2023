import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RCobrospagosComponent } from './rcobrospagos.component';

const routes: Routes = [
  {
    path: '',
    component: RCobrospagosComponent,
    data: {
      title: $localize`REPORTE DE NOTAS (Pagos)`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  RcobrospagosRoutingModule {

    
}