import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MaquinaComponent } from './maquina.component';

const routes: Routes = [
  {
    path: '',
    component: MaquinaComponent,
    data: {
      title: $localize`Maquinas`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  MaquinaRoutingModule {

}