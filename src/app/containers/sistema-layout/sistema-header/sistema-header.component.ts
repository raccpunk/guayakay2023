import { Component, Input } from '@angular/core';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AlmacenamientoService } from '../../../servicios/almacenamiento/almacenamiento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sistema-header',
  templateUrl: './sistema-header.component.html',
  styleUrls: ['./sistema-header.component.scss']
})
export class SistemaHeaderComponent extends HeaderComponent {
  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(
    private classToggler: ClassToggleService,
    public serAlmacen: AlmacenamientoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  protected logout():void {
    this.serAlmacen.LimpiaTodo();
    this.router.navigate(['/login'], { relativeTo: this.route });
  }
}
