import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProduccionMaquinaComponent } from './produccion-maquina.component';

const routes: Routes = [
  {
    path: '',
    component: ProduccionMaquinaComponent,
    data: {
      title: $localize`Produccion Maquina`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  ProduccionMaquinaRoutingModule {

    
}