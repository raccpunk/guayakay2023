import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import {
  AvatarModule,
 
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ModalModule,
  ProgressModule,
  TableModule,
  TabsModule,
  BadgeModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { bordadosRoutingModule } from './bordados-routing.module';
import { BordadosComponent } from './bordados.component';
import { AlertComponent } from '@coreui/angular';

@NgModule({
  imports: [
    NgxGalleryModule,
    NgxImageZoomModule,
    bordadosRoutingModule,
    AlertComponent,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    ModalModule,
    BadgeModule
  ],
  declarations: [BordadosComponent]
})
export class BordadosModule {
}
