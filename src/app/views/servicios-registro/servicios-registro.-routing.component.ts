import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServiciosRegistroComponent } from './servicios-registro.component';

const routes: Routes = [
  {
    path: '',
    component: ServiciosRegistroComponent,
    data: {
      title: $localize`SERVICIOS`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  ServiciosRoutingModule {

    
}