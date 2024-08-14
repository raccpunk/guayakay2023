import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormArray, Validators, FormControl, AbstractControl, FormGroup } from '@angular/forms';
import { ConexionService } from '../../servicios/conexion/conexion.service';
import { ValidacionService } from '../../servicios/validaciones/validacion.service';
import { AlmacenamientoService } from '../../servicios/almacenamiento/almacenamiento.service';
import { Clientes } from '../../interfaz/cliente'
import { Bordados } from 'src/app/interfaz/bordados';
import { Tecnicas } from 'src/app/interfaz/tecnicas';
import { aros } from 'src/app/interfaz/aros'
import { img_url } from 'src/app/servicios/guard/guard.service';
import { img_urllocal } from 'src/app/servicios/guard/guard.service';
import { isConstructorDeclaration, isThisTypeNode } from 'typescript/lib/tsserverlibrary';
import { saveAs } from 'file-saver';
import 'DataTables.net'
import * as $ from "jquery";
const pdfMakeX = require('pdfmake/build/pdfmake.js');
const pdfFontsX = require('pdfmake-unicode/dist/pdfmake-unicode.js');
pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;
import * as pdfMake from 'pdfmake/build/pdfmake';
import { formatDate } from '@angular/common';

interface nPendientes {
  idcobro: any;
  monto_total: any;
  iva_numero: any;
  pagado: any;
  saldo: string;
  ficha: string;
  idclientes: string;
  totalfinal: any;
  createdAt: any;
  tblCliente: {
    nombre: any
  }
}

interface ListaProductos {
  identrada: string,
  nombreBordado: string;
  prenda: string;
  numeroprenda: string;
  preciou: string;
  preciototales: any;
  preciotc: any;
}

interface saldo {
  saldo: any,
}

interface cPendientes {
  idcobro: any,
  identrada: string;

  createdAt: string;
  nombreBordado: string;
  tblBordado: {
    num_puntadas: string;
    nombre: any,
  }
  numerEnt: string;
  prenda: string;
  realizadas: string;
  unitario?: string;
  suma: string;

}

interface pagos {
  idcobro: string;
  fecha: string;
  monto: string;
  saldo: any;
  factura: string;
  metodpago: string;
}


@Component({
  selector: 'app-cobros',
  templateUrl: './cobros.component.html',
  styleUrls: ['./cobros.component.scss']
})
export class CobrosComponent {
  [x: string]: any;
  @ViewChild('button_close_detalles') closebutton: any;
  @ViewChild('staticBackdropModal2') modal: any;
  @ViewChild('enviardatos') cobro: any;
  @ViewChild('abonoInput', { static: false }) abonoInput: any;

  clicked = false;


  NotaForm = new FormGroup({
    facturas: new FormControl('0'),
    tipo_cobro: new FormControl('0'),
    tipo_pago: new FormControl('0'),
    iva_porcentaje: new FormControl(),
    monto_total: new FormControl(),
  });

  idcancelacion: any

  cobrarForm = new FormGroup({
    abono: new FormControl(),
  });

  fechaN = '';
  MontoN = '';
  ivaN = '';
  pagado = '';
  saldo = '';
  ficha = '';
  idcliente = '';
  idcobro = '0';
  nombreC = '';
  nombreCB = '';
  numpC = '';
  fechaC = '';
  nombreBC = '';
  numeroC = '';
  prenda = '';
  suma2: any;
  identrada = '';
  tablaCobros: any;
  tablaCobros2: any;
  tablaRealizados: any;
  tablaRealizados2: any;
  tablaRealizados3: any;
  tablaRealizados4: any;
  listapagos: any = []
  saldosf: saldo[] = []
  cobroP: cPendientes[] = []
  notacreada: any[] = []
  listap: ListaProductos[] = []
  pendientes: nPendientes[] = []
  pendientesidcobro: nPendientes[] = [{
    idcobro: '',
    createdAt: '',
    monto_total: '',
    iva_numero: '',
    pagado: '',
    saldo: '',
    ficha: '',
    idclientes: '',
    totalfinal: '',
    tblCliente: {
      nombre: ''
    }
  }]
  pendientesLista: nPendientes[] = []
  clienteA: Clientes[] = [];
  clienteAselect: Clientes[] = [{
    idcliente: '',
    nombre: '',
    razon_social: '',
    rfc: '',
    direccion: '',
    codigo_postal: '',
    telefono: '',
    email: '',
    empresa: '',
    estado: '',
    activo: true,
  }];

  cobroSelect: nPendientes[] = [{
    idcobro: '',
    createdAt: '',
    monto_total: '',
    iva_numero: '',
    pagado: '',
    saldo: '',
    ficha: '',
    idclientes: '',
    totalfinal: '',
    tblCliente: {
      nombre: ''
    }
  }];

  idcobros = '';
  idusuario_registra = '';
  idclientes = '';
  fecha_registro = '';
  factura = '';
  tipo_cobro = '';
  tipo_pago = '';
  iva_porcentaje = '';
  iva_numero = '';
  monto_total = '';


  preciototal: string | undefined;
  idpago: any;
  preciot: any;
  suma!: any;
  operacion!: number;
  totalcolumna!: number;
  idactual: any;
  fechaF: any;
  monto: any;
  saldos: any;
  metodopago: any;
  nombreBordado: any;
  numeroprenda: any;
  preciototales: any;
  totalfinal: any | undefined;

  sumaf = 0;
  saldof = 0;

  cambio = 0;
  saldosff: any | undefined;
  sacarsaldos: any;
  precioConiva: any;
  lista_clientes: any;
  lista_Terminada: any = [];
  lista_ServicioTerminada: any = [];
  idclienteselect = new FormControl(0);
  detalle: any = [];
  datos: any;
  idfinal: any;
  cobro_detalle: any;
  cobro_productos: any = [];
  folio: any;
  idcancelacionser: any
  // desactivador del boton siguiente
  isDisabled = true;
  isDisabled2 = false;
  ivaprecio = 0;
  ivanum: any;
  ivap: any;
  lista_pagos: any = [];
  saldop: any;
  montos: any;
  localStorage: any;
  permiso: any;
  tipo_cobros: any;
  facturas: any;
  fechas: any;
  bordados: any;
  namecliente: any;
  direccioncliente: any;
  totalfinalpd: any;
  pagadon: any;
  variabletabla1 = true;
  variabletabla2 = true;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public serConexion: ConexionService,
    private formBuilder: FormBuilder,
    public serValidacion: ValidacionService,
    public serAlmacen: AlmacenamientoService,
    private fb: FormBuilder

  ) { }










  ponleFocus() {
    if (this.abonoInput && this.abonoInput.nativeElement && typeof this.abonoInput.nativeElement.focus === 'function') {
      this.abonoInput.nativeElement.focus();
    } else {
      // console.error('El elemento abonoInput no está disponible o no es un objeto válido.');
    }
  }


  ngOnInit(): void {
  
    this.obtenerClientes();
    this.obtenerCobrosPendienteS();
    this.pintatabla2()
    this.obtenerBordadosTerminadas();
    this.pintatabla4();
    this.obtenerServiciosTerminadas() 
    this.pintatabla6()
  
    // console.log(this.idclienteselect.value)
    if (localStorage.getItem('permiso') == 'administrador') {
      this.permiso = 'administrador'
    }
    if (localStorage.getItem('permiso') == 'recepción') {
      this.permiso = 'recepcion'
    }
    if (localStorage.getItem('permiso') == 'finanzas') {
      this.permiso = 'finanzas'
    }

  }

  private cierraModal(): void {
    this.closebutton.nativeElement.click();
  }
  private enviarcobro(): void {
    this.cobro.nativeElement.click();
  }



  obtenerClientes() {

    if (localStorage.getItem('permiso') == 'administrador') {
      this.serConexion.ClienteLista().subscribe(
        success => {

          this.lista_clientes = success.datos
          // console.log(this.lista_clientes);

        },
        error => {
          this.router.navigate(['/login'], { relativeTo: this.activeRoute });
          // console.log(error);
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
    if (localStorage.getItem('permiso') == 'finanzas') {
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
    if (localStorage.getItem('permiso') == 'recepción') {
      this.serConexion.ClienteListaR().subscribe(
        success => {

          this.lista_clientes = success.datos
          // console.log(this.lista_clientes);

        },

        error => {
          this.router.navigate(['/login'], { relativeTo: this.activeRoute });
          // console.log(error);
        }
      );
    }
  }
  obtenerTrabajosRealizados() {
    // this.addnota();

    this.lista_Terminada = [];

    this.tablaCobros.clear().destroy();
    this.tablaCobros2.clear().destroy();
    this.tablaRealizados.clear().destroy();
    this.tablaRealizados2.clear().destroy();
    this.tablaRealizados3.clear().destroy();
    this.tablaRealizados4.clear().destroy();
    // this.lista_Terminada.suma = 0
    var id = this.idclienteselect.value;

    if (this.idclienteselect.value == -1) {
      this.variabletabla1 = true

      this.obtenerCobrosPendienteSchange();

      this.obtenerBordadosTerminadasChange();
      this.obtenerServiciosTerminadasChange();
    } else {
      this.variabletabla1 = false
      this.variabletabla2 = false

      this.obtenerClientenotas();
      this.EntradaTermina();
      this.ServicioTermina();


    }
  }
  EntradaTermina() {
    this.lista_Terminada = []
    var id = this.idclienteselect.value;
    this.serConexion.EntradaTerminada(id).subscribe(
      success => {


        this.lista_Terminada = success.datos
        for (var i = 0; i < this.lista_Terminada.length; i++) {
          this.lista_Terminada[i].suma = this.lista_Terminada[i].realizadas * this.lista_Terminada[i].precio[0].ultimo
          // console.log(this.lista_Terminada[i].precio[0].ultimo);
        }
        this.pintatabla4();
        // this.lista_Terminada[0].suma = 0
        // console.log(this.lista_Terminada);

      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        // console.log(error);
      }
    );
  }
  ServicioTermina() {
    this.lista_ServicioTerminada = []
    var id = this.idclienteselect.value;
    this.serConexion.ServiciosListaClientes(id).subscribe(
      success => {


        this.lista_ServicioTerminada = success.datos


        // this.lista_Terminada[0].suma = 0
        // console.log(this.lista_ServicioTerminada);
        this.pintatabla6();

      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        // console.log(error);
      }
    );
  }

obtenerCobrosPendienteS() {
    this.serConexion.CobrosListaPendiente().subscribe(
        success => {
            this.variabletabla1 = true;
            this.pendientes = success.datos;
            this.pintatabla(); // Llamada a pintatabla() después de que los datos se carguen
            console.log($.fn.DataTable)
        },
        error => {
            this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        }
    );
}

  obtenerCobrosPendienteSchange() {
    this.pendientes = [];
    this.serConexion.CobrosListaPendiente().subscribe(
      success => {

        this.variabletabla1 = true

        this.pendientes = success.datos

        // console.log(this.pendientes);

        this.pintatabla();

      },

      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        // console.log(error);
      }
    );
  }
  obtenerBordadosTerminadas() {
    this.serConexion.EntradaTerminadas().subscribe(
      success => {
        this.variabletabla1 = true
        this.variabletabla2 = true
        this.lista_Terminada = success.datos
        // console.log(this.lista_Terminada);
        this.pintatabla3();

      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        // console.log(error);
      }
    );
  }
  obtenerServiciosTerminadas() {
    this.serConexion.ServiciosTerminados().subscribe(
      success => {
        this.variabletabla1 = true
        this.variabletabla2 = true
        this.lista_ServicioTerminada = success.datos
        // console.log(this.lista_Terminada);
        this.pintatabla5();

      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        // console.log(error);
      }
    );
  }

  obtenerServiciosTerminadasChange() {
    this.lista_ServicioTerminada = [];
    this.serConexion.ServiciosTerminados().subscribe(
      success => {
        this.variabletabla1 = true
        this.variabletabla2 = true
        this.lista_ServicioTerminada = success.datos
        // console.log(this.lista_Terminada);
        this.pintatabla5();

      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        // console.log(error);
      }
    );
  }

  obtenerBordadosTerminadasChange() {
    this.lista_Terminada = [];
    this.serConexion.EntradaTerminadas().subscribe(
      success => {

        this.variabletabla1 = true
        this.variabletabla2 = true
        this.lista_Terminada = success.datos
        // console.log(this.lista_Terminada);
        this.pintatabla3();




      },

      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        // console.log(error);
      }
    );
  }
  obtenerClientenotas2() {
    this.detalle = []
    this.NotaForm = new FormGroup({
      facturas: new FormControl('0'),
      tipo_cobro: new FormControl('0'),
      tipo_pago: new FormControl('0'),
      iva_porcentaje: new FormControl(),
      monto_total: new FormControl(),
    });
    this.isDisabled = true;
    this.sumafinal = 0
    this.pendientes = [];
    this.notacreada = [];

    var id = this.idclienteselect.value;
    this.serConexion.CobrosListaClientes(id).subscribe(
      success => {

        this.tablaCobros2.destroy();
        this.variabletabla1 = false
        this.pendientes = success.datos

        // console.log(this.pendientes);

        this.pintatabla2()



      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        // console.log(error);
      }
    );

  }
  obtenerClientenotas() {
    this.detalle = []
    this.NotaForm = new FormGroup({
      facturas: new FormControl('0'),
      tipo_cobro: new FormControl('0'),
      tipo_pago: new FormControl('0'),
      iva_porcentaje: new FormControl(),
      monto_total: new FormControl(),
    });
    this.isDisabled = true;
    this.sumafinal = 0
    this.pendientes = [];
    this.notacreada = [];

    var id = this.idclienteselect.value;
    this.serConexion.CobrosListaClientes(id).subscribe(
      success => {


        this.variabletabla1 = false
        this.pendientes = success.datos

        // console.log(this.pendientes);

        this.pintatabla2()



      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        // console.log(error);
      }
    );

  }


  ListaProductos(id: number) {
    this.cobro_productos = []

    let totalPreciot = 0; // Variable local para acumular el valor de preciot

    this.idfinal = this.pendientes[id].idcobro
    this.serConexion.CobrosDetalle(this.idfinal).subscribe(
      success => {
        this.cobro_detalle = success.datos
        // console.log(this.cobro_detalle);
        this.folio = this.cobro_detalle[0].idcobro
        this.fechas = (this.cobro_detalle[0].createdAt)
        this.namecliente = this.cobro_detalle[0].tblCliente.nombre
        this.direccioncliente = this.cobro_detalle[0].tblCliente.direccion
        this.tipo_cobros = this.cobro_detalle[0].tipo_pago
        this.facturas = this.cobro_detalle[0].factura
        this.ivanum = this.cobro_detalle[0].iva_numero
        this.ivap = this.cobro_detalle[0].iva_porcentaje
        this.pagadon = this.cobro_detalle[0].pagado

        for (var i = 0; i < this.cobro_detalle.length; i++) {
          var identrada = this.cobro_detalle[i].tblCobro_Entrada
          var identradas = this.cobro_detalle[i].tblCobro_Entradas
          for (var index = 0; index < identradas.length; index++) {
            var identrada = identradas[index].identrada
            var bordado = identradas[index].tblEntrada.tblBordado.nombre
            var prenda = identradas[index].tblEntrada.prenda
            var nuprendas = identradas[index].tblEntrada.numero
            var preciou = identradas[index].precio_unit
            var factura = identradas[index].factura
            var tipo_pago = identradas[index].tipo_pago

            this.totalcolumna = (preciou * nuprendas);

            this.cobro_productos.push({
              identrada: identrada,
              bordado: bordado,
              prenda: prenda,
              nuprendas: nuprendas,
              preciou: preciou,
              factura: factura,
              tipo_pago: tipo_pago,
              preciotc: Number(this.totalcolumna).toFixed(2),



            })
            // console.log(this.cobro_productos[i].bordado)
            this.bordados = this.cobro_detalle[i].bordado
            // this.preciot = 0
            // this.cobro_productos.forEach((element: { preciotc: number; }) => {
            //   this.preciot = Number(this.preciot) + Number(element.preciotc),
            //     (this.preciot).toLocaleString('en')
            //   this.totalfinal = ((this.preciot + this.ivanum).toFixed(2))

            //   this.totalfinalpd = (this.preciot + this.ivanum).toLocaleString('en')

            //   if (this.lista_pagos.length == 0) {
            //     this.saldof = this.totalfinal

            //   }
            //   this.saldop = (this.totalfinal - this.saldof)
            // });


          }

        };
        for (var i = 0; i < this.cobro_detalle.length; i++) {
          var idservicio = this.cobro_detalle[i].tblCobro_Servicios
          var idservicios = this.cobro_detalle[i].tblCobro_Servicios
          for (var index = 0; index < idservicio.length; index++) {
            var identrada = idservicios[index].idservicio
            var bordado = idservicios[index].tblServicio.concepto
            // var prenda = identradas[index].tblEntrada.prenda
            var nuprendas = idservicios[index].tblServicio.cantidad
            var preciou = idservicios[index].precio_unit
            // var factura = identradas[index].factura
            // var tipo_pago = identradas[index].tipo_pago

            this.totalcolumna = (preciou * nuprendas);

            this.cobro_productos.push({
              identrada: identrada,
              bordado: bordado,
              prenda: '',
              nuprendas: nuprendas,
              preciou: preciou,
              factura: factura,
              tipo_pago: tipo_pago,
              preciotc: Number(this.totalcolumna).toFixed(2),



            })
            // console.log(this.cobro_productos[i].bordado)
            this.bordados = this.cobro_detalle[i].bordado
            this.preciot = 0
            // this.cobro_productos.forEach((element: { preciotc: number; }) => {
            //   this.preciot = Number(this.preciot) + Number(element.preciotc),
            //     (this.preciot).toLocaleString('en')
            //   this.totalfinal = ((this.preciot + this.ivanum).toFixed(2))

            //   this.totalfinalpd = (this.preciot + this.ivanum).toLocaleString('en')

            //   if (this.lista_pagos.length == 0) {
            //     this.saldof = this.totalfinal

            //   }
            //   this.saldop = (this.totalfinal - this.saldof)
            // });
           

          }

        };
        this.cobro_productos.forEach((element: { preciotc: number; }) => {
          totalPreciot += Number(element.preciotc); // Acumula el valor de preciotc
        });
        this.preciot = totalPreciot;
        this.totalfinal = ((this.preciot + this.ivanum).toFixed(2));
        this.totalfinalpd = this.totalfinal.toLocaleString('en');

        if (this.lista_pagos.length == 0) {
          this.saldof = this.totalfinal;
        }
        this.saldop = (this.totalfinal - this.saldof);

        // Ahora puedes usar this.preciot en cualquier lugar después de este punto
        console.log(this.preciot); // Imprimirá el valor actualizado de this.preciot
        localStorage.setItem("preciot", this.preciot);
        console.log(localStorage.getItem('preciot')); // Imprimirá el valor guardado en localStorage
  

      
      });
      console.log(localStorage.getItem('preciot')); 
  }
  vercobrosselect(id: number) {
    this.cambio = 0
    this.Listapagos(id)
    this.ListaProductos(id)
    this.cobrarForm = new FormGroup({
      abono: new FormControl(),
    });
    setTimeout(() => {
      this.ponleFocus()
    }, 500);
    //   document.addEventListener("keyup", function(event) {
    //     if (event.keyCode === 13) {
    //         alert('Enter is pressed!');


    //     }
    // });

  }

  variable = false
  registrarNota() {
    // console.log(this.idclienteselect.value)

    this.ivaprecio = (Number(this.NotaForm.value.iva_porcentaje) * this.sumafinal) / (100);
    this.precioConiva = (this.ivaprecio + this.sumafinal)
    let detalle: { entradas: { identrada: any; precio_unit: number; }[]; servicios: { idservicio: any; precio_unit: number; }[]; } = {
      entradas: [],
      servicios: []
    };
    let detailItem;
    for (var i = 0; i < this.notacreada.length; i++) {


      if (this.notacreada[i].prenda != '') {
        detailItem = {
          identrada: this.notacreada[i].identrada,
          precio_unit: Number(this.notacreada[i].unitario)
        };
        detalle.entradas.push(detailItem);
      } else {
        detailItem = {
          idservicio: this.notacreada[i].identrada,
          precio_unit: Number(this.notacreada[i].unitario)
        };
        detalle.servicios.push(detailItem);
      }


      // Push detalles to this.detalle outside the condition


      console.log(detalle);


      // console.log(this.detalle)
    }
    /*
    var precioiva = (this.sumafinal * Number(this.NotaForm.value.iva_porcentaje)) / 100
    // console.log(precioiva)
    var envio = {
      cobro: {
        idusuario: Number(localStorage.getItem('iduser')),
        idcliente: Number(this.idclienteselect.value),
        factura: this.NotaForm.value.facturas,
        tipo_cobro: this.NotaForm.value.tipo_cobro,
        tipo_pago: this.NotaForm.value.tipo_pago,
        iva_porcentaje: Number(this.NotaForm.value.iva_porcentaje),
        iva_numero: precioiva,
        monto_total: this.sumafinal,
      },
      detalle: detalle

    }
    // console.log(envio)
    if (Number(this.NotaForm.value.iva_porcentaje) < 99) {
      // this.lista_Terminada = []
      // this.obtenerTrabajosRealizados()
      this.variable = false
      // console.log(envio)
      // console.log('1')
      this.serConexion.CobrosRegistrar(envio).subscribe(
        success => {

          // console.log(success)
          this.datos = success
          // window.location.reload();

          this.detalle = []
          this.NotaForm = new FormGroup({
            facturas: new FormControl('0'),
            tipo_cobro: new FormControl('0'),
            tipo_pago: new FormControl('0'),
            iva_porcentaje: new FormControl(),
            monto_total: new FormControl(),
          });
          this.isDisabled = true;

          this.obtenerTrabajosRealizados()
          // console.log(this.lista_Terminada)


        },
        error => {
          this.router.navigate(['/login'], { relativeTo: this.activeRoute });
          // console.log(error);
        }
      );
    }
    // else if(this.NotaForm.value.iva_porcentaje < 1){
    //     this.variable = true
    //     console.log('2')
    //   }
    else {

      this.variable = true
      // console.log('3')
    }

    */
  }
  addnota(id: number, prueba: any) {
    for (var i = 0; i < id - (id - 1); i++) {
      this.lista_Terminada[id].unitario = prueba;
      this.suma = prueba * parseInt(this.lista_Terminada[id].realizadas)

      this.lista_Terminada[id].suma = this.suma.toFixed(2);
      this.notacreada.push(this.lista_Terminada[id]);
      this.lista_Terminada.splice(id, 1);
    }
    if (this.notacreada.length != 0 && this.NotaForm.value.facturas != '0' && this.NotaForm.value.tipo_pago != '0' && this.NotaForm.value.tipo_cobro != '0' && this.NotaForm.value.iva_porcentaje != -1) {
      this.isDisabled = false;
    }

    this.sumatotal();
  }


  addnota2(id: number, prueba: any) {
    for (var i = 0; i < id - (id - 1); i++) {
      this.lista_ServicioTerminada[id].unitario = prueba;
      this.suma2 = prueba * parseInt(this.lista_ServicioTerminada[id].cantidad)

      this.lista_ServicioTerminada[id].suma = this.suma2.toFixed(2);
      // this.notacreada.push(this.lista_ServicioTerminada[id]);
      this.lista_ServicioTerminada[id]
      // Pushing individual properties to notacreada array
      this.notacreada.push({
        tblBordado: {
          nombre: this.lista_ServicioTerminada[id].concepto,
          num_puntadas: '0'
        },
        prenda: '',
        realizadas: this.lista_ServicioTerminada[id].cantidad,
        unitario: this.lista_ServicioTerminada[id].unitario,
        suma: this.lista_ServicioTerminada[id].suma,
        idcobro: '',
        identrada: this.lista_ServicioTerminada[id].idservicio,
        createdAt: '',
        nombreBordado: '',
        numerEnt: '',
        observacion: this.lista_ServicioTerminada[id].observacion
      });
    }
    this.lista_ServicioTerminada.splice(id, 1);

    if (this.notacreada.length != 0 && this.NotaForm.value.facturas != '0' && this.NotaForm.value.tipo_pago != '0' && this.NotaForm.value.tipo_cobro != '0' && this.NotaForm.value.iva_porcentaje != -1) {
      this.isDisabled = false;
    }

    this.sumatotal();
  }
  sumafinal = 0;
  sumatotal() {
    this.sumafinal = 0;
    this.notacreada.forEach(element => {
      this.sumafinal = this.sumafinal + parseFloat(element.suma)

    });
    this.sumafinal
  }

  variablesuma = false
  addpreciodinamico(id: number, prueba: any) {


    // console.log(this.lista_Terminada.precio[0].ultimo)
    this.lista_Terminada[id].unitario = prueba;
    this.suma = prueba * parseInt(this.lista_Terminada[id].realizadas)
    this.lista_Terminada[id].suma = (this.suma).toFixed(2);



    const regexp = /^[+]?([0-9]*[.])?[0-9]+$/.test(prueba);

    // Obtenemos 'false' porque la variable 'string' no contiene números 
    // console.log(regexp);
    if (regexp == false) {
      this.variablesuma = true
    }
    else {
      this.variablesuma = false
    }
  }

  addpreciodinamico2(id: number, prueba: any) {


    // console.log(this.lista_Terminada.precio[0].ultimo)
    this.lista_ServicioTerminada[id].unitario = prueba;
    this.suma2 = prueba * parseInt(this.lista_ServicioTerminada[id].cantidad)
    this.lista_ServicioTerminada[id].suma2 = (this.suma2).toFixed(2);



    const regexp = /^[+]?([0-9]*[.])?[0-9]+$/.test(prueba);

    // Obtenemos 'false' porque la variable 'string' no contiene números 
    // console.log(regexp);
    // if (regexp == false) {
    //   this.variablesuma = true
    // }
    // else {
    //   this.variablesuma = false
    // }
  }
  vernotas(id: number, prueba: any) {

    this.cobroP[id].unitario = prueba;
    this.suma = prueba * parseInt(this.cobroP[id].numerEnt)
    this.cobroP[id].suma = this.suma;

    // console.log(this.suma)
  }
  remove(index: number) {
    this.notacreada[index].suma = '0'

    if (this.notacreada[index].prenda != '') {
      this.lista_Terminada.push(this.notacreada[index]);
    } else if (this.notacreada[index].prenda === '') {

      this.lista_ServicioTerminada.push({

        concepto: this.notacreada[index].tblBordado.nombre,
        cantidad: this.notacreada[index].realizadas,
        unitario: this.notacreada[index].unitario,
        suma: this.notacreada[index].suma,
        observacion: this.notacreada[index].observacion,
      });
      // this.lista_ServicioTerminada.push(this.notacreada[index]);
    }
    // this.lista_Terminada.push(this.notacreada[index]);
    this.notacreada.splice(index, 1);
    this.sumatotal();
    // console.log(this.notacreada)
    if (this.notacreada.length == 0 && this.NotaForm.value.facturas != '0' && this.NotaForm.value.tipo_pago != '0' && this.NotaForm.value.tipo_cobro != '0' && this.NotaForm.value.iva_porcentaje != -1) {
      this.isDisabled = true;

    }

  }
  variableiva = false
  activarbuttonnota() {

    if (this.NotaForm.value.tipo_cobro == 'nota') {
      this.variableiva = true
      // console.log('prueba')
      this.NotaForm = new FormGroup({
        facturas: new FormControl('no'),
        tipo_cobro: new FormControl('nota'),
        tipo_pago: new FormControl('efectivo'),
        iva_porcentaje: new FormControl('0'),
        monto_total: new FormControl(),
      });
      if (this.notacreada.length != 0 && this.NotaForm.value.facturas != '0' && this.NotaForm.value.tipo_pago != '0' && this.NotaForm.value.tipo_cobro != '0' && this.NotaForm.value.iva_porcentaje != -1) {
        this.isDisabled = false;

      }

    }
    if (this.NotaForm.value.tipo_cobro == 'credito') {
      this.NotaForm = new FormGroup({
        facturas: new FormControl('si'),
        tipo_cobro: new FormControl('credito'),
        tipo_pago: new FormControl('efectivo'),
        iva_porcentaje: new FormControl('16'),
        monto_total: new FormControl(),
      });
      if (this.notacreada.length != 0 && this.NotaForm.value.facturas != '0' && this.NotaForm.value.tipo_pago != '0' && this.NotaForm.value.tipo_cobro != '0' && this.NotaForm.value.iva_porcentaje != -1) {
        this.isDisabled = false;

      }
    }
  }
  activarbuttonfactura() {

    if (this.NotaForm.value.facturas == 'si') {
      this.variableiva = true
      // console.log('prueba')
      this.NotaForm = new FormGroup({
        facturas: new FormControl('si'),
        tipo_cobro: new FormControl('nota'),
        tipo_pago: new FormControl('efectivo'),
        iva_porcentaje: new FormControl('16'),
        monto_total: new FormControl(),
      });
      if (this.notacreada.length != 0 && this.NotaForm.value.facturas != '0' && this.NotaForm.value.tipo_pago != '0' && this.NotaForm.value.tipo_cobro != '0' && this.NotaForm.value.iva_porcentaje != -1) {
        this.isDisabled = false;

      }

    }
    if (this.NotaForm.value.facturas == 'no') {
      this.NotaForm = new FormGroup({
        facturas: new FormControl('no'),
        tipo_cobro: new FormControl('credito'),
        tipo_pago: new FormControl('efectivo'),
        iva_porcentaje: new FormControl('0'),
        monto_total: new FormControl(),
      });
      if (this.notacreada.length != 0 && this.NotaForm.value.facturas != '0' && this.NotaForm.value.tipo_pago != '0' && this.NotaForm.value.tipo_cobro != '0' && this.NotaForm.value.iva_porcentaje != -1) {
        this.isDisabled = false;

      }
    }
  }
  ativarbutton() {
    // console.log('this.detalle.length')
    // console.log(this.notacreada.length)
    //  
    if (this.notacreada.length != 0 && this.NotaForm.value.facturas != '0' && this.NotaForm.value.tipo_pago != '0' && this.NotaForm.value.tipo_cobro != '0' && this.NotaForm.value.iva_porcentaje != -1) {
      this.isDisabled = false;

    }


  }
  // Definir el arreglo para almacenar las columnas dinámicas
  columns: string[] = ['folio', 'cliente', 'Fecha', 'Monto', 'IVA', 'Monto total', 'pagado', 'saldo'];
  // Variable para controlar si se muestra la columna "PDF" según el permiso
  showPDFColumn: boolean = true;

  // Método para agregar una nueva columna a la tabla
  addColumn(columnName: string) {
    if (!this.columns.includes(columnName)) {
      this.columns.push(columnName);
    }
  }

  // Método para eliminar una columna de la tabla
  deleteColumn(columnName: string) {
    const index = this.columns.indexOf(columnName);
    if (index !== -1) {
      this.columns.splice(index, 1);
    }
  }

  pintatabla() {
    setTimeout(() => {
        this.tablaCobros = $('#datatable-notaspendientes').DataTable({
            paging: false, // Quitamos el paginado
        
            language: {
                "lengthMenu": "Mostrar _MENU_ resultados",
                "zeroRecords": "No se encontraron resultados",
                "info": "Mostrando resultados _START_-_END_ de  _TOTAL_",
                "infoEmpty": "Mostrando resultados del 0 al 0 de un total de 0 registros",
                "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                "search": "Buscar",
                "loadingRecords": "Cargando...",
                "paginate": {
                    "first": "Primero",
                    "last": "Último",
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
            },
            responsive: true,// Hacemos la tabla responsiva
        });
    }, 1000);
}

pintatabla2() {
    setTimeout(() => {
        this.tablaCobros2 = $('#datatable-notaspendientes2').DataTable({
          paging: false, // Quitamos el paginado
            language: {
                "lengthMenu": "Mostrar _MENU_ resultados",
                "zeroRecords": "No se encontraron resultados",
                "info": "Mostrando resultados _START_-_END_ de  _TOTAL_",
                "infoEmpty": "Mostrando resultados del 0 al 0 de un total de 0 registros",
                "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                "search": "Buscar",
                "loadingRecords": "Cargando...",
                "paginate": {
                    "first": "Primero",
                    "last": "Último",
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
            },
            responsive: true // Hacemos la tabla responsiva
        });
    }, 1000);
}

  pintatabla3() {
    setTimeout(() => {
      this.tablaRealizados = $('#datatable-trabajosrealizados').DataTable({
        paging: false, // Quitamos el paginado
    
        language: {
          "lengthMenu": "Mostrar _MENU_ resultados",
          "zeroRecords": "No se encontraron resultados",
          "info": "Mostrando resultados _START_-_END_ de  _TOTAL_",
          "infoEmpty": "Mostrando resultados del 0 al 0 de un total de 0 registros",
          "search": "Buscar",
          "infoFiltered": "(filtrado de un total de _MAX_ registros)",
          "loadingRecords": "Cargando...",
          "paginate": {
            "first": "Primero",
            "last": "Último",
            "next": "Siguiente",
            "previous": "Anterior"
          }
        },
        responsive: true,
      });
    }, 1000);
  }
  pintatabla4() {
    setTimeout(() => {
      this.tablaRealizados2 = $('#datatable-trabajosrealizados2').DataTable({
        paging: false, // Quitamos el paginado
      
        language: {
          "lengthMenu": "Mostrar _MENU_ resultados",
          "zeroRecords": "No se encontraron resultados",
          "info": "Mostrando resultados _START_-_END_ de  _TOTAL_",
          "infoEmpty": "Mostrando resultados del 0 al 0 de un total de 0 registros",
          "search": "Buscar",
          "infoFiltered": "(filtrado de un total de _MAX_ registros)",
          "loadingRecords": "Cargando...",
          "paginate": {
            "first": "Primero",
            "last": "Último",
            "next": "Siguiente",
            "previous": "Anterior"
          }
        },
        responsive: true,
      });
    }, 1000);
  }

  pintatabla5() {
    setTimeout(() => {
      this.tablaRealizados3 = $('#datatable-servicios').DataTable({
        paging: false, // Quitamos el paginado
      
        language: {
          "lengthMenu": "Mostrar _MENU_ resultados",
          "zeroRecords": "No se encontraron resultados",
          "info": "Mostrando resultados _START_-_END_ de  _TOTAL_",
          "infoEmpty": "Mostrando resultados del 0 al 0 de un total de 0 registros",
          "search": "Buscar",
          "infoFiltered": "(filtrado de un total de _MAX_ registros)",
          "loadingRecords": "Cargando...",
          "paginate": {
            "first": "Primero",
            "last": "Último",
            "next": "Siguiente",
            "previous": "Anterior"
          }
        },
        responsive: true,
      });
    }, 1000);
  }
  pintatabla6() {
    setTimeout(() => {
      this.tablaRealizados4 = $('#datatable-servicios2').DataTable({
        paging: false, // Quitamos el paginado
        // processing: true,
        // // responsive: true,
        // lengthMenu: [5, 10, 25],
        // order: [0, 'asc'],
        // columnDefs: [{ "targets": 1 }],
        language: {
          "lengthMenu": "Mostrar _MENU_ resultados",
          "zeroRecords": "No se encontraron resultados",
          "info": "Mostrando resultados _START_-_END_ de  _TOTAL_",
          "infoEmpty": "Mostrando resultados del 0 al 0 de un total de 0 registros",
          "search": "Buscar",
          "infoFiltered": "(filtrado de un total de _MAX_ registros)",
          "loadingRecords": "Cargando...",
          "paginate": {
            "first": "Primero",
            "last": "Último",
            "next": "Siguiente",
            "previous": "Anterior"
          }
        },
        responsive: true,
      });
    }, 1000);
  }

  Listapagos(id: number) {
    this.idfinal = this.pendientes[id].idcobro

    this.lista_pagos = []
    this.serConexion.pagosLista(this.idfinal).subscribe(
      success => {

        this.listapagos = success.datos
        // console.log(this.listapagos)

        for (var i = 0; i < this.listapagos.length; i++) {
          var fecha = this.listapagos[i].createdAt
          var saldo = this.listapagos[i].saldo
          var factura = this.listapagos[i].factura
          var monto = this.listapagos[i].cantidad
          var metodo_pago = this.listapagos[i].metodo_pago

          this.lista_pagos.push({
            fecha: fecha,
            saldo: saldo,
            factura: factura,
            metodpago: metodo_pago,
            montopagado: ((this.totalfinal - saldo)),
            monto: monto
          })

          this.sumaf = 0;
          this.saldof = 0;
          this.listapagos.forEach((element: { monto: string; saldo: string; }) => {
            this.sumaf = this.sumaf + parseFloat(element.monto)

            this.saldof = parseFloat(element.saldo)

            // console.log(this.totalfinal + this.saldof)



          });

        }



      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        // console.log(error);
      }

    );



  }
  varibletab = false
  variablecambio = false
  keyDownFunction2() {
    this.cambio = this.cobrarForm.value.abono - this.saldof
    // console.log(this.saldof )
    if (this.cobrarForm.value.abono <= this.saldof) {

      this.cambio = 0
    }
    if (this.cobrarForm.value.abono > this.saldof) {
      this.cambio
    }

    // console.log(this.cambio )

  }
  keyDownFunction(event: { keyCode: number; }) {
    this.cambio = this.cobrarForm.value.abono - this.saldof
    if (event.keyCode === 13) {
      this.varibletab = true
      this.registrarcobro(this.folio)
    }


  }
  variable2 = false
  registrarcobro(id: number) {
    var idc = this.idclienteselect.value;
    // console.log(idc)
    if (this.lista_pagos.length == 0) {
      this.sacarsaldos = (this.totalfinal - this.cobrarForm.value.abono)
    }
    else {
      this.sacarsaldos = (this.saldof - this.cobrarForm.value.abono)
      // console.log(this.sacarsaldos)
    }
    if (this.cobrarForm.value.abono > this.saldof) {
      var envio = {
        idcobro: Number(this.idfinal),
        idusuario: Number(localStorage.getItem('iduser')),
        factura: 'no',
        metodo_pago: "no registrado",
        cantidad: Number(this.saldof),
        saldo: Number(0),


      }
      // console.log(envio)

      this.serConexion.PagosRegistrar(envio).subscribe(
        success => {
          // console.log(this.idclienteselect.value)
          this.datos = success
          if (this.idclienteselect.value == 0) {
            this.variabletabla1 = true
            this.tablaCobros.destroy()
            this.tablaCobros2.destroy()
            this.obtenerCobrosPendienteS();
            this.tablaRealizados2.destroy()
            this.tablaRealizados.destroy()
            this.obtenerBordadosTerminadas();
            this.cierraModal()
          }
          else {
            // this.obtenerClientenotas()
            this.obtenerTrabajosRealizados()
            this.cierraModal()
          }



        },
        // error => {
        //   this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        //   console.log(error);
        // }
      );
    }
    else if (this.cobrarForm.value.abono < 0) {
      this.variable2 = true
    }
    if (this.cobrarForm.value.abono <= this.saldof) {
      this.variable2 = false
      var envio = {
        idcobro: Number(this.idfinal),
        idusuario: Number(localStorage.getItem('iduser')),
        factura: 'no',
        metodo_pago: "no registrado",
        cantidad: Number(this.cobrarForm.value.abono),
        saldo: Number(this.sacarsaldos),


      }
      // console.log(envio)

      this.serConexion.PagosRegistrar(envio).subscribe(
        success => {
          // console.log(success)
          this.datos = success
          if (this.idclienteselect.value == 0) {
            this.variabletabla1 = true
            this.tablaCobros.destroy()
            this.tablaCobros2.destroy()
            this.obtenerCobrosPendienteS();
            this.tablaRealizados2.destroy()
            this.tablaRealizados.destroy()
            this.obtenerBordadosTerminadas();
            this.cierraModal()
          }
          else {
            // this.obtenerClientenotas()
            this.obtenerTrabajosRealizados()
            this.cierraModal()
          }


        },
        // error => {
        //   this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        //   console.log(error);
        // }
      );
    }
  }

  Cancelar(id: number) {
    this.idfinal = this.pendientes[id].idcobro
    // console.log(this.idfinal)

    this.serConexion.CobrosDetalle(this.idfinal).subscribe(
      success => {
        this.cobro_detalle = success.datos
        // console.log(this.cobro_detalle);
        this.folio = this.cobro_detalle[0].idcobro
        this.tipo_cobros = this.cobro_detalle[0].tipo_pago
        this.ivanum = this.cobro_detalle[0].iva_numero
        this.ivap = this.cobro_detalle[0].iva_porcentaje


        for (var i = 0; i < this.cobro_detalle.length; i++) {
          var identrada = this.cobro_detalle[i].tblCobro_Entrada
          var identradas = this.cobro_detalle[i].tblCobro_Entradas
          for (var index = 0; index < identradas.length; index++) {
            var identrada = identradas[index].identrada
            var bordado = identradas[index].tblEntrada.tblBordado.nombre
            var prenda = identradas[index].tblEntrada.prenda
            var nuprendas = identradas[index].tblEntrada.numero
            var preciou = identradas[index].precio_unit
            this.totalcolumna = (preciou * nuprendas);
            var envio2 = {
              "estado": "Terminada"
            }
            // console.log(envio2)
            //ServicioActualiza
            // console.log(identrada)
            this.serConexion.EntradaActualiza(identrada, envio2).subscribe(data => {
              this.datos = data
            });




          }

        };
        for (var i = 0; i < this.cobro_detalle.length; i++) {
          var idservicio = this.cobro_detalle[i].tblCobro_Servicios
          var idservicios = this.cobro_detalle[i].tblCobro_Servicios
          for (var index = 0; index < idservicio.length; index++) {
            var identrada = idservicios[index].idservicio
            var bordado = idservicios[index].tblServicio.concepto
            // var prenda = identradas[index].tblEntrada.prenda
            var nuprendas = idservicios[index].tblServicio.cantidad
            var preciou = idservicios[index].precio_unit
            // var factura = identradas[index].factura
            // var tipo_pago = identradas[index].tipo_pago

            this.totalcolumna = (preciou * nuprendas);
            var envio2 = {
              "estado": "Espera"
            }
            // console.log(envio2)
            //ServicioActualiza
            // console.log(identrada)
            this.serConexion.ServicioActualiza(identrada, envio2).subscribe(data => {
              this.datos = data
            });




          }

        };
      });

    // console.log(data)

    var envio = {
      "estatus": 'cancelado'
    }
    var ids = this.idfinal
    // console.log(envio)
    this.serConexion.CobrosActualiza(ids, envio).subscribe(data => {
      // console.log(data)
      this.datos = data
      if (this.idclienteselect.value == 0) {
        this.variabletabla1 = true

        this.tablaCobros.destroy()
        this.tablaCobros2.destroy()
        this.obtenerCobrosPendienteS();
        this.tablaRealizados2.destroy()
        this.tablaRealizados.destroy()
        this.obtenerBordadosTerminadas();
      }
      else {
        // this.obtenerClientenotas()
        this.obtenerTrabajosRealizados()
      }

    });

  }


  private getFechaHoy(): string {
    const d = new Date();

    let dia = this.formatoDecena(d.getDate());
    let mes = this.formatoDecena(d.getMonth() + 1);
    let anno = d.getFullYear();
    let fecha: string = dia + '-' + mes + '-' + anno;

    return fecha;
  }

  private formatoDecena(num: number): string {
    let decena: string;

    if (num < 10) {
      decena = '0' + num;
    } else {
      decena = num.toString();
    }

    return decena;
  }


  async viewPDF() {
    const [pagosResponse, cobrosResponse] = await Promise.all([
      this.serConexion.pagosLista(this.idfinal).toPromise(),
      this.serConexion.CobrosDetalle(this.idfinal).toPromise()
  ]);

  this.listapagos = pagosResponse.datos;
  this.cobro_detalle = cobrosResponse.datos;
    var column: any = [];
    var column2: any = [];
    var bordado1: any = [];
    var prenda1: any = [];
    var numero1: any = [];
    var precio1: any = [];
    var unitario1: any = []
    var fecha1: any = [];
    var monto1: any = [];
    var saldo1: any = [];
    var factura1: any = []; 
    var metodo1: any = []
    // this.preciot = 0;
    this.serConexion.pagosLista(this.idfinal).subscribe(
        success => {
            this.listapagos = success.datos;

            for (var i = 0; i < this.listapagos.length; i++) {
                var fecha = this.listapagos[i].createdAt;
                var saldo = this.listapagos[i].saldo;
                var factura = this.listapagos[i].factura;
                var monto = this.listapagos[i].cantidad;
                var metodo_pago = this.listapagos[i].metodo_pago;

                fecha1.push({ text: formatDate(this.listapagos[i].createdAt, 'dd/MM/yyyy', 'en-US'), style: 'text', fontSize: 9 });
                monto1.push({ text: '$' + (this.listapagos[i].cantidad).toLocaleString('en'), style: 'text,', fontSize: 9, bold: true, alignment: 'center' });
                saldo1.push({ text: '$' + (this.listapagos[i].saldo).toLocaleString('en'), style: 'text,', fontSize: 9, bold: true, alignment: 'center' });

                this.lista_pagos.push({
                    fecha: fecha,
                    saldo: saldo,
                    factura: factura,
                    metodpago: metodo_pago,
                    montopagado: ((this.totalfinal - saldo)),
                    monto: monto
                });
            }
        }
    );

    this.serConexion.CobrosDetalle(this.idfinal).subscribe(
        async success => {
            this.cobro_detalle = success.datos;
            const body = [];

            for (var i = 0; i < this.cobro_detalle.length; i++) {
                var identradas = this.cobro_detalle[i].tblCobro_Entradas;
                var idservicio = this.cobro_detalle[i].tblCobro_Servicios;

                for (var index = 0; index < identradas.length; index++) {
                    const nuprendas = identradas[index].tblEntrada.numero;
                    const preciou = identradas[index].precio_unit;
                    const totalcolumna = preciou * nuprendas;

                    body.push([
                        { text: identradas[index].tblEntrada.tblBordado.nombre, style: 'text, bold', alignment: 'left' },
                        { text: identradas[index].tblEntrada.prenda, style: 'text' },
                        { text: nuprendas, style: 'text, bold', alignment: 'center' },
                        { text: '$' + preciou.toLocaleString('en'), style: 'text, bold', alignment: 'center' },
                        { text: '$' + totalcolumna.toLocaleString('en'), style: 'text, bold', alignment: 'center' }
                    ]);
                };

                for (var index = 0; index < idservicio.length; index++) {
                    var identrada = idservicio[index].idservicio;
                    var bordado = idservicio[index].tblServicio.concepto;
                    var nuprendas = idservicio[index].tblServicio.cantidad;
                    var preciou = idservicio[index].precio_unit;

                    const totalcolumna = preciou * nuprendas;
                    // let totalPreciot = 0;
                    // for (const detalle of this.cobro_detalle) {
                    //     for (const entrada of detalle.tblCobro_Entradas) {
                    //         const totalcolumna = entrada.precio_unit * entrada.tblEntrada.numero;
                    //         totalPreciot += totalcolumna;
                    //     }
                    //     for (const servicio of detalle.tblCobro_Servicios) {
                    //         const totalcolumna = servicio.precio_unit * servicio.tblServicio.cantidad;
                    //         totalPreciot += totalcolumna;
                    //     }
                    // }
                    // this.preciot = totalPreciot;
                
                    // this.totalfinal = ((this.preciot + this.ivanum).toFixed(2));
                    // this.totalfinalpd = this.totalfinal.toLocaleString('en');
                
                    body.push([
                        { text: bordado, style: 'text, bold', alignment: 'left' },
                        { text: '', style: 'text' }, // No hay prenda en los servicios
                        { text: nuprendas, style: 'text, bold', alignment: 'center' },
                        { text: '$' + preciou.toLocaleString('en'), style: 'text, bold', alignment: 'center' },
                        { text: '$' + totalcolumna.toLocaleString('en'), style: 'text, bold', alignment: 'center' }
                    ]);
                };

                var date = formatDate(this.fechas, 'dd/MM/yyyy', 'en-US');

                column.push({ text: 'BORDADO', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true });
                column.push({ text: 'PRENDA', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true });
                column.push({ text: 'CANTIDAD', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true });
                column.push({ text: 'PRECIO UNITARIO', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true });
                column.push({ text: 'PRECIO TOTAL', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true });

                column2.push({ text: 'FECHA', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true });
                column2.push({ text: 'MONTO', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true });
                column2.push({ text: 'SALDO', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true });

                const headers = [
                    { text: 'BORDADO/SERVICIO', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true },
                    { text: 'PRENDA', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true },
                    { text: 'CANTIDAD', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true },
                    { text: 'PRECIO UNITARIO', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true },
                    { text: 'PRECIO TOTAL', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true }
                ];
                const headers2 = [
                    { text: 'SUB TOTAL:', colSpan: 4, alignment: 'right' },
                    {},
                    {},
                    {},
                    { text: '$' + Number(localStorage.getItem('preciot')).toLocaleString('en'), alignment: 'center' }
                ];
                const headers3 = [
                    { text: 'IVA ' + this.ivap + '%', colSpan: 4, alignment: 'right' },
                    {},
                    {},
                    {},
                    { text: '$' + this.ivanum.toLocaleString('en'), alignment: 'center' }
                ];
                const headers4 = [
                    { text: 'TOTAL', colSpan: 4, alignment: 'right' },
                    {},
                    {},
                    {},
                    { text: '$' + this.totalfinalpd, alignment: 'center' }
                ];
             
            
          
                const pdfDefinition: any = {
                    footer: {
                        columns: []
                    },
                    content: [
                        {
                            alignment: 'center',
                            image: await this.getBase64ImageFromURL("assets/lotto/pdflogo.png"),
                            width: 600,
                            height: 200,
                            margin: [0, -40]
                        },
                        {
                            alignment: 'right',
                            text: 'FOLIO: ' + this.folio,
                            style: 'header',
                            fontSize: 12,
                            margin: [100, 0],
                            color: '#135560'
                        },
                        {
                            alignment: 'right',
                            text: 'EMPRESA: ' + this.namecliente,
                            style: 'header',
                            fontSize: 12,
                            margin: [100, 0],
                            color: '#135560'
                        },
                        {
                            alignment: 'right',
                            text: 'FECHA: ' + date,
                            style: 'header',
                            fontSize: 12,
                            margin: [100, 0],
                            color: '#135560'
                        },
                        {
                            alignment: 'lefth',
                            image: await this.getBase64ImageFromURL("assets/lotto/lateralpdf.png"),
                            width: 60,
                            height: 130,
                            margin: [-55, 0]
                        },
                        {
                            alignment: 'lefth',
                            fontSize: 9,
                            margin: [10, -100],
                            fillColor: '#fee1c5',
                            widths: ['15%', '*', '35%'],
                            table: {
                                headerRows: 1,
                                fillColor: '#fee1c5',
                                widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
                                body: [headers, ...body, headers2, headers3, headers4]
                            }
                        },
                        {
                            alignment: 'center',
                            margin: [10, 150],
                            fillColor: '#fee1c5',
                            table: {
                                body: [
                                    column2,
                                    [
                                        [fecha1],
                                        [monto1],
                                        [saldo1],
                                    ],
                                ]
                            }
                        },
                    ]
                };


                const pdf = pdfMake.createPdf(pdfDefinition);
    
    // Crear un blob a partir del PDF generado
    pdf.getBlob(async (blob: any) => {
        // Guardar el blob en un archivo
        saveAs(blob, 'nota' + this.folio + '.pdf');
    });
            }
        }
    );

    var cantidad = [];
    var preciou = [];
    var preciotc: never[] = [];
    console.log( Number(localStorage.getItem('preciot')).toLocaleString('en'))
}
  private getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx: any = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }





  cancelar1(lugar: any) {

    this.idcancelacion = this.lista_Terminada[lugar].identrada

  }

  cancelar2() {
    var id2 = this.idclienteselect.value;
    var envio = {
      // identrada: this.identrada,
      // idmaquina: id,
      // idusuario: Number(localStorage.getItem('iduser')),
      estado: 'Cancelada',
      // piezas_realizada: cant
    }
    // console.log(envio, this.idcancelacion)
    this.serConexion.EntradaEstadosCancelar(this.idcancelacion, envio).subscribe(


      success => {

        // console.log(success)
        this.datos = success



        this.serConexion.EntradaTerminada(id2).subscribe(
          success => {
            this.variabletabla1 = false
            this.variabletabla2 = false
            this.lista_Terminada = success.datos
            for (var i = 0; i < this.lista_Terminada.length; i++) {
              this.lista_Terminada[i].suma = this.lista_Terminada[i].realizadas * this.lista_Terminada[i].precio[0].ultimo
              // console.log(this.lista_Terminada[i].precio[0].ultimo);
            }

            // this.lista_Terminada[0].suma = 0
            // console.log(this.lista_Terminada);
            if (this.idclienteselect.value == 0) {
              this.variabletabla1 = true
              this.tablaCobros.destroy()
              this.tablaCobros2.destroy()
              this.obtenerCobrosPendienteS();
              this.tablaRealizados2.destroy()
              this.tablaRealizados.destroy()
              this.obtenerBordadosTerminadas();

            }
            else {
              // this.obtenerClientenotas()
              this.obtenerTrabajosRealizados()

            }

          },
          error => {
            this.router.navigate(['/login'], { relativeTo: this.activeRoute });
            // console.log(error);
          }
        );

        // this.cargarProduccion();
        // this.cargarProduccion();
      },
    );
  }


  cancelarservicio(lugar: any) {

    this.idcancelacionser = this.lista_ServicioTerminada[lugar].idservicio
    // console.log(this.lista_ServicioTerminada[lugar])
    // console.log(this.idcancelacionser)

  }

  cancelarservicio2() {
    var id2 = this.idclienteselect.value;
    var envio = {
      // identrada: this.identrada,
      // idmaquina: id,
      // idusuario: Number(localStorage.getItem('iduser')),
      estado: 'Cancelada',
      // piezas_realizada: cant
    }
    // console.log(envio, this.idcancelacionser)
    this.serConexion.ServicioActualiza(this.idcancelacionser, envio).subscribe(


      success => {

        // console.log(success)
        this.datos = success

        // this.lista_Terminada[0].suma = 0
        // console.log(this.lista_ServicioTerminada);
        if (this.idclienteselect.value == 0) {
          this.variabletabla1 = true
          this.tablaCobros.destroy()
          this.tablaCobros2.destroy()
          this.obtenerCobrosPendienteS();
          this.tablaRealizados2.destroy()
          this.tablaRealizados.destroy()
          this.obtenerBordadosTerminadas();

        }
        else {
          // this.obtenerClientenotas()
          this.tablaCobros.clear().destroy();
          this.tablaCobros2.clear().destroy();
          this.tablaRealizados.clear().destroy();
          this.tablaRealizados2.clear().destroy();
          this.tablaRealizados3.clear().destroy();
          this.tablaRealizados4.clear().destroy();
          this.variabletabla1 = false
          this.variabletabla2 = false
    
          this.obtenerClientenotas();
          this.EntradaTermina();
          this.ServicioTermina();
    console.log(this.notacreada)
          // this.obtenerTrabajosRealizados()

        }

      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        // console.log(error);
      }
    );

    // this.cargarProduccion();
    // this.cargarProduccion();


  }
}
