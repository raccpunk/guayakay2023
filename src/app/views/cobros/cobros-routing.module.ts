import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CobrosComponent } from './cobros.component';

const routes: Routes = [
  {
    path: '',
    component: CobrosComponent,
    data: {
      title: $localize`COBROS`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  cobroRoutingModule {

}