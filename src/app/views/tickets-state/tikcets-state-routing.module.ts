import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsStateComponent } from './tickets-state.component';

const routes: Routes = [
  {
    path: '',
    component: TicketsStateComponent,
    data: {
      title: $localize`ticket state`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsStateRoutingModule {
}
