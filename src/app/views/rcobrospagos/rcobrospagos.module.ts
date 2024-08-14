import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { DatePipe } from '@angular/common';
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
import { RCobrospagosComponent } from './rcobrospagos.component';
import { RcobrospagosRoutingModule } from './rcobrospagos-routing.module';



@NgModule({
  imports: [

    NgxGalleryModule,
    RcobrospagosRoutingModule,
    NgxImageZoomModule,
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
  providers: [
    DatePipe, // Agrega DatePipe como proveedor
    // Otros proveedores si los hubiera
  ],
  declarations: [RCobrospagosComponent]
})
export class RcobrospagosModule {
}
