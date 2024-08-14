import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientesComponent } from './clientes.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
    data: {
      title: $localize`CLIENTES`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class clientesRoutingModule {

}