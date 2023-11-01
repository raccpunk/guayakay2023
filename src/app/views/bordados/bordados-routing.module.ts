import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BordadosComponent } from './bordados.component';

const routes: Routes = [
  {
    path: '',
    component: BordadosComponent,
    data: {
      title: $localize`bordados`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  bordadosRoutingModule {

}