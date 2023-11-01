import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProduccionComponent } from './produccion.component';

const routes: Routes = [
  {
    path: '',
    component: ProduccionComponent,
    data: {
      title: $localize`Produccion`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  ProduccionRoutingModule {

    
}