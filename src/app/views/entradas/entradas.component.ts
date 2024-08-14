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
import 'DataTables.net'
import * as $ from "jquery";
@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent {
  @ViewChild('staticBackdropModal') staticBackdropModal!: ModalDirective;
  mostrarModal: boolean = false;
  //variables para formulario
  EntradaFormDinamic!: FormGroup;
  data_envio = {
    idcliente: '',
    idusuario: '',
    idbordado: '',
    prenda: '',
    numero: '',
    observacion: '',
    imagen: ''
  };
  mostrar = false;
  clienteA: Clientes[] = [];
  ClienteBordado: Bordados[] = [];
  prueba: any = []
  BordadoU: Bordados[] = [{
    portada: '',
    idbordado: ''

  }]
  lista_clientes: any;
  lista_clienteBordado: any = [];
  idfinal: any;
  portada: any;
  datos: any;
  bordado_detalle!: any;
  img_urlfront = img_url;
  cModalToggle: any;
  variable = false
  variable2 = false

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
    this.EntradaFormDinamic = new FormGroup({
      idcliente: new FormControl('0'),
      entradas: new FormArray([this.initEntradasFormGroup()]),
    });

  }



  //funciones dinamicas del formulario
  addEntrada() {
    this.variable3 = true
    this.entradaslista.push(this.initEntradasFormGroup());
  }

  remove(index: number) {
    this.variable3 = false
    this.entradaslista.removeAt(index);
    if (this.entradaslista.length == 1) {
      this.mostrar = false;
    }
  }

  initEntradasFormGroup() {
    return new FormGroup({
      idbordado: new FormControl('0'),
      idusuario: new FormControl('0'),
      prenda: new FormControl(''),
      numero: new FormControl(''),
      observacion: new FormControl(''),
      imagen: new FormControl(''),

    });
  }


  obtenerBordado(indice: number) {

    this.variable2 = true
    this.idfinal = this.EntradaFormDinamic.value.entradas[indice].idbordado

    this.serConexion.BordadoDetalle(this.idfinal).subscribe(
      success => {
        this.bordado_detalle = success.datos
        this.portada = img_url + this.bordado_detalle.portada
        this.EntradaFormDinamic.value.entradas[indice].imagen = this.portada;
        this.prueba[indice] = this.EntradaFormDinamic.value.entradas[indice].imagen

      })

  }
  get entradaslista() {
    return this.EntradaFormDinamic.get('entradas') as FormArray;

  }
  variable3 = false
  numerodinamic() {
    for (var index in this.EntradaFormDinamic.value.entradas) {
      if (this.EntradaFormDinamic.value.entradas[index].numero == '') {
        this.variable = true
        this.variable3 = true
      }
      if (this.EntradaFormDinamic.value.entradas[index].numero < 1) {
        this.variable = true
        this.variable3 = true
      }
      if (this.EntradaFormDinamic.value.entradas[index].numero > 1 && this.EntradaFormDinamic.value.entradas[index].idbordado > 0) {
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

  onSubmit() {
    for (var index in this.EntradaFormDinamic.value.entradas) {
      if (this.EntradaFormDinamic.value.entradas[index].numero == '') {
        this.variable = true
        this.variable3 = true
      }
      if (this.EntradaFormDinamic.value.entradas[index].numero < 1) {
        this.variable = true
        this.variable3 = true
      }
      else {
        this.variable = false
        this.variable3 = false
        var envio = {
          Entrada: [{
            idcliente: Number(this.EntradaFormDinamic.value.idcliente),
            idbordado: Number(this.EntradaFormDinamic.value.entradas[index].idbordado),
            idusuario: Number(localStorage.getItem('iduser')),
            prenda: this.EntradaFormDinamic.value.entradas[index].prenda,
            numero: this.EntradaFormDinamic.value.entradas[index].numero,
            observacion: this.EntradaFormDinamic.value.entradas[index].observacion
          }]
        }
        this.serConexion.EntradaRegistrar(envio).subscribe(
          success => {
            this.datos = success
            this.EntradaFormDinamic = new FormGroup({
              idcliente: new FormControl('0'),

              entradas: new FormArray([this.initEntradasFormGroup()]),
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

  //obtencion de datos de selects
  obtenerClientes() {
    this.EntradaFormDinamic = new FormGroup({
      idcliente: new FormControl('0'),
      entradas: new FormArray([this.initEntradasFormGroup()]),
    });
    if (localStorage.getItem('permiso') == 'recepción') {
      this.serConexion.ClienteListaR().subscribe(
        success => {
          this.lista_clientes = success.datos
          this.lista_clientes.sort()
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

        },
        error => {
          this.router.navigate(['/login'], { relativeTo: this.activeRoute });
          console.log(error);
        }

      );

    }
  }

  obtenerClienteBordados() {
    this.bordado_detalle = [];
    this.lista_clienteBordado = [];
    this.prueba = [];
    var id = this.EntradaFormDinamic.value.idcliente
    if (localStorage.getItem('permiso') == 'recepción') {
      this.lista_clienteBordado = []
      this.serConexion.BordadoCliente(id).subscribe(

        success => {
          for (var i = 0; i < success.datos.length; i++) {
            if (success.datos[i].tblBordado.activo == true) {
              this.lista_clienteBordado.push(success.datos[i])
            }
          }
        },
      );
    }
    if (localStorage.getItem('permiso') == 'encargado_producción') {
      this.lista_clienteBordado = []
      this.serConexion.BordadoCliente(id).subscribe(
        success => {
          for (var i = 0; i < success.datos.length; i++) {
            if (success.datos[i].tblBordado.activo == true) {
              this.lista_clienteBordado.push(success.datos[i])
            }
          }


        },
      );
    }
    if (localStorage.getItem('permiso') == 'administrador') {
      this.serConexion.BordadoCliente(id).subscribe(
        success => {
          this.lista_clienteBordado = success.datos
          for (var i = 0; i < this.bordado_detalle.length; i++) {
            this.ClienteBordado.push({
              idbordado: this.lista_clienteBordado.idbordado,
              nombre: this.lista_clienteBordado.nombre,
              portada: this.lista_clienteBordado.portada,
            })

          }
        },
      );
    }
  }
}