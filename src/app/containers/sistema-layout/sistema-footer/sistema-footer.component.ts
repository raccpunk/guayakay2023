import { Component } from '@angular/core';
import { FooterComponent } from '@coreui/angular';

@Component({
  selector: 'app-sistema-footer',
  templateUrl: './sistema-footer.component.html',
  styleUrls: ['./sistema-footer.component.scss']
})
export class SistemaFooterComponent extends FooterComponent {
  constructor() {
    super();
  }
}
