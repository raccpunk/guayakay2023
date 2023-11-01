import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntradasComponent } from './entradas.component';

const routes: Routes = [
  {
    path: '',
    component: EntradasComponent,
    data: {
      title: $localize`Entradas`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  EntradaRoutingModule {

}