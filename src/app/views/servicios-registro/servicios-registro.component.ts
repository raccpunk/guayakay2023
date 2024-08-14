import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormArray, Validators, FormControl, AbstractControl, FormGroup } from '@angular/forms';
import { ConexionService } from '../../servicios/conexion/conexion.service';
import { ValidacionService } from '../../servicios/validaciones/validacion.service';
import { AlmacenamientoService } from '../../servicios/almacenamiento/almacenamiento.service';
import { Clientes } from '../../interfaz/cliente';
import { Bordados } from '../../interfaz/bordados';
import { img_url } from 'src/app/servicios/guard/guard.service';
import { Console } from 'console';
import { ModalDirective } from 'ngx-bootstrap/modal/modal.directive';

@Component({
  selector: 'app-servicios-registro',
  templateUrl: './servicios-registro.component.html',
  styleUrls: ['./servicios-registro.component.scss']
})
export class ServiciosRegistroComponent {

  @ViewChild('staticBackdropModal') staticBackdropModal!: ModalDirective;
  mostrarModal: boolean = false;
  //variables para formulario
  ServicioFormDinamic!: FormGroup;
  data_envio = {
    idcliente: '',
    idusuario: '',
    concepto: '',
    cantidad: '',
    observacion: '',

  };

  mostrar = false;
  clienteA: Clientes[] = [];
  ClienteBordado: Bordados[] = [];
  prueba: any = []
  lista_clientes: any;
  lista_clienteBordado: any = [];
  datos: any;
  bordado_detalle: any;
  cModalToggle: any;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public serConexion: ConexionService,
    private formBuilder: FormBuilder,
    public serValidacion: ValidacionService,
    public serAlmacen: AlmacenamientoService,
    private fb: FormBuilder

  ) { }

  ngOnInit(): void {
    this.obtenerClientes();
    this.ServicioFormDinamic = new FormGroup({
      idcliente: new FormControl('0'),
      entradas: new FormArray([this.initServicioFormGroup()]),
    });
  }

  //obtencion de datos de selects
  obtenerClientes() {
    this.ServicioFormDinamic = new FormGroup({
      idcliente: new FormControl('0'),
      entradas: new FormArray([this.initServicioFormGroup()]),
    });
    if (localStorage.getItem('permiso') == 'recepción') {
      this.serConexion.ClienteListaR().subscribe(
        success => {
          this.lista_clientes = success.datos
          this.lista_clientes.sort()
          // console.log(this.lista_clientes.sort())
          // console.log(this.lista_clientes);

        },
        error => {
          this.router.navigate(['/login'], { relativeTo: this.activeRoute });
          console.log(error);
        }
      );
    }
    if (localStorage.getItem('permiso') == 'ventas') {
      this.serConexion.ClienteListaR().subscribe(
        success => {
          this.lista_clientes = success.datos
          this.lista_clientes.sort()
          // console.log(this.lista_clientes.sort())
          // console.log(this.lista_clientes);

        },
        error => {
          this.router.navigate(['/login'], { relativeTo: this.activeRoute });
          console.log(error);
        }
      );
    }
    if (localStorage.getItem('permiso') == 'administrador') {
      this.serConexion.ClienteListaR().subscribe(
        success => {
          this.lista_clientes = success.datos
          // console.log(this.lista_clientes);
        },
        error => {
          this.router.navigate(['/login'], { relativeTo: this.activeRoute });
          console.log(error);
        }
      );

    }
    if (localStorage.getItem('permiso') == 'encargado_producción') {
      this.serConexion.ClienteListaR().subscribe(
        success => {
          this.lista_clientes = success.datos
          // console.log(this.lista_clientes);
        },
        error => {
          this.router.navigate(['/login'], { relativeTo: this.activeRoute });
          console.log(error);
        }
      );
    }
  }


  //funciones dinamicas del formulario
  //iniciar de nuevo el form
  initServicioFormGroup() {
    return new FormGroup({
      concepto: new FormControl(''),
      idusuario: new FormControl('0'),
      cantidad: new FormControl(''),
      observacion: new FormControl(''),
    });
  }

  get servicioslista() {
    return this.ServicioFormDinamic.get('entradas') as FormArray;

  }
  //agregar servicio
  addServicio() {
    this.variable3 = true
    this.servicioslista.push(this.initServicioFormGroup());
  }
  //Remiver servicio
  remove(index: number) {
    this.variable3 = false
    this.servicioslista.removeAt(index);
    if (this.servicioslista.length == 1) {
      this.mostrar = false;
    }
  }

 //variables para advertencias 
  variable = false
  variable2 = false
  variable3 = false

 
 
  numerodinamic() {
    for (var index in this.ServicioFormDinamic.value.entradas) {
      if (this.ServicioFormDinamic.value.entradas[index].cantidad == '') {
        this.variable = true
        this.variable3 = true
      }
      if (this.ServicioFormDinamic.value.entradas[index].cantidad < 1) {
        this.variable = true
        this.variable3 = true
      }
      if (this.ServicioFormDinamic.value.entradas[index].cantidad > 1) {
        this.variable = false
        this.variable3 = false
      }
    }

  }
//eventos del modal de que se ha registrado con exito
  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  //envio del form a la api para realizar el registro
  onSubmit() {
    for (var index in this.ServicioFormDinamic.value.entradas) {
      if (this.ServicioFormDinamic.value.entradas[index].cantidad == '') {
        this.variable = true
        this.variable3 = true
      }

      if (this.ServicioFormDinamic.value.entradas[index].cantidad < 1) {
        this.variable = true
        this.variable3 = true
      }
      if (this.ServicioFormDinamic.value.entradas[index].cantidad > 0 && this.ServicioFormDinamic.value.entradas[index].concepto != '' && Number(this.ServicioFormDinamic.value.idcliente)>0 ) {
        this.variable = false
        this.variable3 = false
        var envio = {
          // Entrada: [{
            idcliente: Number(this.ServicioFormDinamic.value.idcliente),
            concepto: this.ServicioFormDinamic.value.entradas[index].concepto,
            // idusuario: Number(localStorage.getItem('iduser')),

            cantidad: this.ServicioFormDinamic.value.entradas[index].cantidad,
            observacion: this.ServicioFormDinamic.value.entradas[index].observacion

          // }]
        }

        // console.log(envio)
        this.serConexion.ServicioRegistrar(envio).subscribe(
          success => {
            // console.log(success)
            this.datos = success
            this.ServicioFormDinamic = new FormGroup({
              idcliente: new FormControl('0'),

              entradas: new FormArray([this.initServicioFormGroup()]),
            });
            this.variable2 = false
            this.toggleLiveDemo()
            this.visible = true;

          },
          error => {
            this.router.navigate(['/login'], { relativeTo: this.activeRoute });
            console.log(error);
          }
        );

      }
    }
  }


}
