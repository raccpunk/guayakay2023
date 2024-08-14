import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormArray, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ConexionService } from '../../servicios/conexion/conexion.service';
import { ValidacionService } from '../../servicios/validaciones/validacion.service';
import { AlmacenamientoService } from '../../servicios/almacenamiento/almacenamiento.service';
import { img_url } from 'src/app/servicios/guard/guard.service';
import { Console } from 'console';
import { Bordados } from '../../interfaz/bordados';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';

import { BsModalRef } from 'ngx-bootstrap/modal';
interface Produccion {
  folio: string;
  estado: string;
  fecha: string;
  cliente: string;
  imagen: string;
  bordado: string;
  num_puntadas: string;
  piezas_realizadas: string;
  observaciones: string;
  alto: string;
  ancho: string;
  precio: string;
  numero: string;
  fecha2: string;
  icon: String;

}

interface hilos {
  orden: number;
  hilo: string;


}

@Component({

  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styleUrls: ['./produccion.component.scss'],

})
export class ProduccionComponent {

  // portada: string | undefined;
  // sinportada: boolean |undefined;
  // sinportada1: boolean | undefined;
  // sinportada2: boolean |undefined;
  // sinportada3: boolean |undefined;
  // myThumbnail: string |undefined;
  // imagen1: string |undefined;
  // imagen2: string |undefined;
  // imagen3: string |undefined;

  @ViewChild('button_close_detalles') closebutton: any;
  @ViewChild('button_close_detalles2') closebutton2: any;
  @ViewChild('staticBackdropModal2') modal2: any;
  @ViewChild('staticBackdropModal') modal: any;
  @ViewChild('button_abrir_detalles') abrirmodal: any;
  @ViewChild('pausainput', { static: false }) pausaInput: any;
  idmaquina = new FormControl(0);
  cantidad = new FormControl();
  produccionA: Produccion[] = []
  lista_clienteBordado: any = [];
  prueba: any = []
  hilosA: hilos[] = []
  lista_entradas: any;
  EntradaForm = this.fb.group({
    idcliente: '',
    idusuario: '',
    idbordado: '0',
    prenda: ['', Validators.required],
    numero: ['', Validators.required],
    observacion: '',

  });
  ClienteBordado: Bordados[] = [];
  bordado_detalle: any;
  EntradaU: Produccion[] = [{
    folio: '',
    estado: '',
    fecha: '',
    cliente: '',
    imagen: '',
    bordado: '',
    num_puntadas: '',
    piezas_realizadas: '',
    observaciones: '',
    alto: '',
    ancho: '',
    precio: '',
    numero: '',
    fecha2: '',
    icon: '',
  }]
  myThumbnail: any;
  idfinal: any;
  mensaje_error: any;
  datos: any;

  identrada: any;
  idcliente: any;
  idbordado: any;
  prenda: any;
  numero: any;
  observacion: any;
  precio: any;
  estado: any;
  tiempo: any;
  nombre: any;
  nombreBordado: any;
  alto: any;
  ancho: any;
  observacionB: any;
  portada: any;
  orden: any;
  hilo: any;
  tecnica: any;
  lista_maquinas: any;
  idmachine: any;
  realizadas: any;
  tablaProduccion: any;
  totale: any;
  imagen1: any;
  imagen2: any;
  imagen3: any;
  faltantes: any;
  cabezal: any;
  puntadas: any;
  cabezalesmaquina: any;

  tiempofin: any;
  minutos: any;
  resto: any;
  permiso: any;
  minutos1: any;
  resto1: any;
  horas: any;
  lista_clientes: any;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  constructor(
    
    private router: Router,
    private activeRoute: ActivatedRoute,
    public serConexion: ConexionService,
    private formBuilder: FormBuilder,
    public serValidacion: ValidacionService,
    public serAlmacen: AlmacenamientoService,
    private fb: FormBuilder
  ) { }
  @ViewChild('staticBackdropModal') modal1!: ElementRef;
  @ViewChild('staticBackdropModal2') staticBackdropModal2!: ElementRef;
  Entrada_detalles!: any;
  openModal1() {
    this.modal1.nativeElement.show();
  }
  ponleFocus() {
    setTimeout(() => {
      if (this.pausaInput && this.pausaInput.nativeElement && typeof this.pausaInput.nativeElement.focus === 'function') {
        this.pausaInput.nativeElement.focus();
      } else {
        // console.error('El elemento pausaInput no está disponible o no es un objeto válido.');
      }
    }, 500);
  }

  openModal2() {
    this.staticBackdropModal2.nativeElement.show();
  }
  bsModalRef2!: BsModalRef;
  bsModalRef!: BsModalRef;
  private ngOnInit(): void {
    this.galleryOptions = [
      {
        thumbnails: true, // Habilitar las miniaturas
        image: true, // Habilitar la imagen principal
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        previewFullscreen: true,
      },


      {


        preview: true, // Habilitar la vista previa de la imagen en grande

        previewFullscreen: true, // Habilitar la vista previa en pantalla completa
        previewCloseOnClick: true, // Cerrar la vista previa al hacer clic fuera de ella
        previewZoom: true,
        previewRotate: true
      },
      {
        breakpoint: 500,
        width: '300px',
        height: '300px',
        thumbnailsColumns: 3
      },

    ];


    this.permiso = localStorage.getItem('permiso')
    this.obtenerClientes();
    this.cargarProduccion();
    this.obtenerMaquinasActivas();
    if (localStorage.getItem('permiso') == 'recepción') {
      this.permiso = 'recepcion'
    }
    if (localStorage.getItem('permiso') == 'eencargado_producción') {
      this.permiso = 'encargado_producción'
    }
    this.myThumbnail = ''
  }

  private cierraModal(): void {
    this.closebutton.nativeElement.click();
  }
  private cierraModal2(): void {
    this.closebutton2.nativeElement.click();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.EntradaForm.controls;
  }

  galeriaAbierta: boolean = true;
  // private abrirModal(id:number): void {
  //   this.abrirmodal.nativeElement.click(id);
  // }


  // Método para cerrar la galería
  cerrarGaleria() {
    this.galeriaAbierta = false;

  }

  // Manejar el evento keydown para cerrar la galería con la tecla "ESC"
  @HostListener('document:keydown.escape', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Verificar si la galería está abierta y si se presionó la tecla "ESC"
    if (this.galeriaAbierta && event.key === 'Escape') {
      setTimeout(() => {
        this.cerrarGaleria();
      }, 100);
    }
  }

  keyDownFunctionPausa(event: { keyCode: number; }) {

    if (event.keyCode === 13) {


    }


  }
  keyDownFunctionFinalizar(event: { keyCode: number; }) {

    if (event.keyCode === 13) {
      this.finalizar()

    }


  }
  submitted = false;
  advertencia = false;
  onSubmit() {
    this.submitted = true;
    this.advertencia = false;
    if (this.EntradaForm.invalid) {
      return;
    }
    if (Number(this.EntradaForm.value.numero) <= this.realizadas) {
      this.advertencia = true
      return;
    }

    else {
      var envio = {
        idcliente: Number(this.EntradaForm.value.idcliente),
        idbordado: Number(this.EntradaForm.value.idbordado),
        idusuario: Number(localStorage.getItem('iduser')),
        prenda: this.EntradaForm.value.prenda,
        numero: this.EntradaForm.value.numero,
        observacion: this.EntradaForm.value.observacion


      }
      var ids = this.idfinal
      // console.log(envio)
      if (this.EntradaForm.value.idbordado == '0') {

      }
      else {
        this.serConexion.EntradaActualiza(ids, envio).subscribe(data => {
          // console.log(data)
          this.datos = data
          this.cierraModal2()
          this.tablaProduccion.destroy()
          this.cargarProduccion()
        });
      }


    }
  }




  obtenerClientes() {


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
    if (localStorage.getItem('permiso') == 'administrador') {
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
    if (localStorage.getItem('permiso') == 'encargado_producción') {
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

  obtenerClienteBordadosadd() {

    this.lista_clienteBordado = [];
    this.prueba = []

    // console.log(this.EntradaForm.value.idbordado)
    var id = this.EntradaForm.value.idcliente



    if (localStorage.getItem('permiso') == 'recepción') {
      this.lista_clienteBordado = []
      this.serConexion.BordadoCliente(id).subscribe(

        success => {
          // console.log(success.datos)
          for (var i = 0; i < success.datos.length; i++) {
            // console.log(success.datos[i].tblBordado)
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


          this.lista_clienteBordado = success.datos
          var id2 = this.lista_clienteBordado[0].idcliente
          // console.log(this.lista_clienteBordado[0].idcliente)

          this.EntradaForm.controls['idcliente'].setValue(id2);
          this.EntradaForm.controls['idbordado'].setValue('');
          this.EntradaForm.controls['prenda'].setValue(this.prenda);
          this.EntradaForm.controls['numero'].setValue(this.numero);
          this.EntradaForm.controls['observacion'].setValue(this.observacion);
          this.EntradaForm = this.fb.group({
            idcliente: [id2],
            idusuario: '',
            idbordado: '0',
            prenda: [this.prenda, Validators.required],
            numero: [this.numero, Validators.required],
            observacion: [this.observacion],

          });

          // console.log(this.lista_clienteBordado[id]);
          // for (var i = 0; i < this.bordado_detalle.length; i++) {
          //   this.ClienteBordado.push({
          //     idbordado: this.lista_clienteBordado.idbordado,
          //     nombre: this.lista_clienteBordado.nombre,
          //     portada: this.lista_clienteBordado.portada,
          //   })

          // }


        },
      );
    }
    if (localStorage.getItem('permiso') == 'administrador') {
      this.serConexion.BordadoCliente(id).subscribe(
        success => {


          this.lista_clienteBordado = success.datos
          var id2 = this.lista_clienteBordado[0].idcliente
          // console.log(this.lista_clienteBordado[0].idcliente)

          this.EntradaForm.controls['idcliente'].setValue(id2);
          this.EntradaForm.controls['idbordado'].setValue('');
          this.EntradaForm.controls['prenda'].setValue(this.prenda);
          this.EntradaForm.controls['numero'].setValue(this.numero);
          this.EntradaForm.controls['observacion'].setValue(this.observacion);
          this.EntradaForm = this.fb.group({
            idcliente: [id2],
            idusuario: '',
            idbordado: '0',
            prenda: [this.prenda, Validators.required],
            numero: [this.numero, Validators.required],
            observacion: [this.observacion],

          });

          // console.log(this.lista_clienteBordado[id]);
          // for (var i = 0; i < this.bordado_detalle.length; i++) {
          //   this.ClienteBordado.push({
          //     idbordado: this.lista_clienteBordado.idbordado,
          //     nombre: this.lista_clienteBordado.nombre,
          //     portada: this.lista_clienteBordado.portada,
          //   })

          // }


        },
      );
    }

  }

  obtenerClienteBordados(lugar: number) {
    this.advertencia = false
    this.minutos1 = 0
    this.minutos = 0
    this.resto = 0
    this.horas = 0
    this.idfinal = this.lista_entradas[lugar].identrada
    this.serConexion.EntradaDetalle(this.idfinal).subscribe(
      success => {
        this.Entrada_detalles = success.datos
        this.variable4 = false
        // console.log(this.Entrada_detalles)

        this.EntradaForm.controls['idbordado'].setValue(this.Entrada_detalles.tblBordado.idbordado);


        // console.log(this.Entrada_detalles)
        this.tiempo = this.Entrada_detalles.tblBordado.tiempo
        this.minutos1 = Math.floor(this.tiempo / 60);

        this.identrada = this.Entrada_detalles.identrada
        this.idcliente = this.Entrada_detalles.idcliente

        // this.idbordado =this.Entrada_detalles.idbordado
        this.prenda = this.Entrada_detalles.prenda
        this.numero = this.Entrada_detalles.numero
        this.realizadas = this.Entrada_detalles.realizadas
        this.observacion = this.Entrada_detalles.observacion
        this.precio = this.Entrada_detalles.precio
        this.estado = this.Entrada_detalles.estado

        this.nombre = this.Entrada_detalles.tblCliente.nombre
        this.nombreBordado = this.Entrada_detalles.tblBordado.nombre
        this.alto = this.Entrada_detalles.tblBordado.alto
        this.ancho = this.Entrada_detalles.tblBordado.ancho
        this.observacionB = this.Entrada_detalles.tblBordado.observacion
        this.puntadas = this.Entrada_detalles.tblBordado.num_puntadas
        this.faltantes = this.numero - this.realizadas
        this.portada = img_url + this.Entrada_detalles.tblBordado.portada
        this.cabezal = this.Entrada_detalles.tblBordado.tblBordado_Cabezals[0].tblCabezale.nombre




        this.idbordado = this.Entrada_detalles.tblBordado.idbordado
        // console.log( this.EntradaForm.controls)
       
        this.tecnica = this.Entrada_detalles.tblBordado.tblTecnica_Bordados[0].tblTecnica.nombre
        // this.idmaquina = new FormControl(this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina);
        // this.idmachine = this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina
        // this.cabezalesmaquina = this.Entrada_detalles.tblEntrada_Maquinas[0].tblMaquina.cabezales
        // console.log(this.cabezalesmaquina)
        this.tiempofin = ((this.faltantes / this.cabezalesmaquina) * (this.tiempo)).toFixed(2)
        this.minutos = Math.floor(this.tiempofin / 60);
        this.resto = this.tiempofin % 60;


        // console.log(this.minutos)
        // console.log(this.resto)
        this.EntradaForm.controls['idcliente'].setValue(this.idcliente);
   
        this.EntradaForm.controls['prenda'].setValue(this.prenda);
        this.EntradaForm.controls['numero'].setValue(this.numero);
        this.EntradaForm.controls['observacion'].setValue(this.observacion);

        this.serConexion.BordadoCliente(this.idcliente).subscribe(
          success => {
            this.lista_clienteBordado = success.datos
            // console.log(this.lista_clienteBordado[id]);
            // for (var i = 0; i < this.bordado_detalle.length; i++) {
            //   this.ClienteBordado.push({
            //     idbordado: this.lista_clienteBordado.idbordado,
            //     nombre: this.lista_clienteBordado.nombre,
            //     portada: this.lista_clienteBordado.portada,
            //   })

            // }
            // console.log(this.lista_clienteBordado)


          },
        );

      },


    );
    this.lista_clienteBordado = [];
    this.prueba = []
    // console.log(this.idcliente)
    var id = this.EntradaForm.value.idcliente
    if (localStorage.getItem('permiso') == 'recepción') {
      this.lista_clienteBordado = []
      this.serConexion.BordadoCliente(this.idcliente).subscribe(

        success => {
          // console.log(success.datos)
          for (var i = 0; i < success.datos.length; i++) {
            // console.log(success.datos[i].tblBordado)
            if (success.datos[i].tblBordado.activo == true) {
              this.lista_clienteBordado.push(success.datos[i])
            }
          }


        },
      );
    }
    // if (localStorage.getItem('permiso') == 'encargado_producción') {
    //   this.lista_clienteBordado = []
    //   this.serConexion.BordadoCliente(this.idcliente).subscribe(

    //     success => {
    //       // console.log(success.datos)
    //       for (var i = 0; i < success.datos.length; i++) {
    //         // console.log(success.datos[i].tblBordado)
    //         if (success.datos[i].tblBordado.activo == true) {
    //           this.lista_clienteBordado.push(success.datos[i])
    //         }
    //       }


    //     },
    //   );
    // }


  }


  pintatabla() {
    setTimeout(() => {
      this.tablaProduccion = $('#datatable-produccion').DataTable({
        paging: false, // Quitamos el paginado
        processing: true,

        lengthMenu: [5, 10, 25, 50],
        order: [0, 'DESC'],
        columnDefs: [{ "targets": 1 }],
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

        //   columnDefs: [
        //     // { responsivePriority: 1, targets: 0 },
        //     // { responsivePriority: 2, targets: -1 }
        // ]
      });
    }, 100);
  }
  sinportada = false
  sinportada1 = false
  sinportada2 = false
  sinportada3 = false


  variablenueva = false

  getArray(lugar: number) {
    // this.galleryImages = [
    //   {
    //     small: '',
    //     medium: '',
    //     big: ''
    //   },
    //   {
    //     small: this.imagen1,
    //     medium: this.imagen1,
    //     big: this.imagen1
    //   },
    //   {
    //     small: this.imagen2,
    //     medium: this.imagen2,
    //     big: this.imagen2
    //   },
    //   {
    //     small: this.imagen3,
    //     medium: this.imagen3,
    //     big: this.imagen3
    //   },
    //   // Agregar más imágenes según sea necesario
    // ];
    this.tiempofin = 0
    this.minutos1 = 0
    this.minutos = 0
    this.resto = 0
    this.horas = 0
    this.variable5 = false
    this.cantidad = new FormControl();
    this.idmaquina = new FormControl(0);
    this.alerta = false
    this.variable2 = false
    this.hilosA = []
    this.EntradaU[0].folio = this.lista_entradas[lugar].identrada;
    this.EntradaU[0].estado = this.lista_entradas[lugar].estado;
    this.EntradaU[0].cliente = this.lista_entradas[lugar].tblCliente.nombre;
    this.EntradaU[0].imagen = this.lista_entradas[lugar].imagen;

    this.mensaje_error = ''
    this.idfinal = this.lista_entradas[lugar].identrada


    this.serConexion.EntradaDetalle(this.idfinal).subscribe(
      success => {
        this.Entrada_detalles = success.datos
        this.variable4 = false
        this.galeriaAbierta = true;
        // console.log(this.Entrada_detalles)
        for (var i = 0; i < this.Entrada_detalles.tblBordado.tblBordado_Patrons.length; i++) {

          this.orden = this.Entrada_detalles.tblBordado.tblBordado_Patrons[i].orden;
          this.hilo = this.Entrada_detalles.tblBordado.tblBordado_Patrons[i].hilo;
          this.hilosA.push({
            orden: this.orden,
            hilo: this.hilo,

          })

        }
        // this.myThumbnail = 'https://guayakay-api-prod.basotecnologias.com/static/'
        // this.imagen1 = 'https://guayakay-api-prod.basotecnologias.com/static/'
        // this.imagen2 = 'https://guayakay-api-prod.basotecnologias.com/static/'
        // this.imagen3 = 'https://guayakay-api-prod.basotecnologias.com/static/'
        // console.log(this.Entrada_detalles)
        this.tiempo = this.Entrada_detalles.tblBordado.tiempo
        this.minutos1 = Math.floor(this.tiempo / 60);
        this.resto1 = this.tiempo % 60;
        this.identrada = this.Entrada_detalles.identrada
        this.idcliente = this.Entrada_detalles.idcliente
        // console.log(this.idcliente)
        // this.idbordado =this.Entrada_detalles.idbordado
        this.prenda = this.Entrada_detalles.prenda
        this.numero = this.Entrada_detalles.numero
        this.realizadas = this.Entrada_detalles.realizadas
        this.observacion = this.Entrada_detalles.observacion
        this.precio = this.Entrada_detalles.precio
        this.estado = this.Entrada_detalles.estado
        this.cabezal = this.Entrada_detalles.tblBordado.tblBordado_Cabezals[0].tblCabezale.nombre
        this.tecnica = this.Entrada_detalles.tblBordado.tblTecnica_Bordados[0].tblTecnica.nombre
       
      
        this.nombre = this.Entrada_detalles.tblCliente.nombre
        this.nombreBordado = this.Entrada_detalles.tblBordado.nombre
        this.alto = this.Entrada_detalles.tblBordado.alto
        this.ancho = this.Entrada_detalles.tblBordado.ancho
        this.observacionB = this.Entrada_detalles.tblBordado.observacion
        this.puntadas = this.Entrada_detalles.tblBordado.num_puntadas
        this.faltantes = this.numero - this.realizadas
        if (this.Entrada_detalles.tblEntrada_Maquinas.length == 0) {

          this.variablenueva = true
          // console.log(this.variablenueva)
        }
        else {
          this.variablenueva = false
        }
       
        this.portada = img_url + this.Entrada_detalles.tblBordado.portada
        this.imagen1 = img_url + this.Entrada_detalles.tblBordado.imagen1
        this.imagen2 = img_url + this.Entrada_detalles.tblBordado.imagen2
        this.imagen3 = img_url + this.Entrada_detalles.tblBordado.imagen3
        // console.log(this.portada)
        // console.log(this.imagen1)
        // console.log(this.imagen3)
        // console.log(this.imagen3)
        // console.log('portada' + this.portada)
        if (this.portada == 'https://guayakay-api-prod.basotecnologias.com/static/') {
          this.portada = 'assets/lotto/sinfondo.png'
          // console.log(true)
        }
        else {

          this.portada = img_url + this.Entrada_detalles.tblBordado.portada


        }

        if (this.imagen1 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
          this.imagen1 = 'assets/lotto/sinfondo.png'
          // console.log(true)
        }
        else {
          this.imagen1 = img_url + this.Entrada_detalles.tblBordado.imagen1

          // console.log(false)

        }

        if (this.imagen2 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
          this.imagen2 = 'assets/lotto/sinfondo.png'
          // console.log(true)
        }
        else {
          this.imagen2 = img_url + this.Entrada_detalles.tblBordado.imagen2
          // console.log(false)

        }

        if (this.imagen3 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
          this.imagen3 = 'assets/lotto/sinfondo.png'
          // console.log(true)
        }
        else {
          this.imagen3 = img_url + this.Entrada_detalles.tblBordado.imagen3
        }
        this.galleryImages = [
          {
            small: this.portada,
            medium: this.portada,
            big: this.portada
          },
          {
            small: this.imagen1,
            medium: this.imagen1,
            big: this.imagen1
          },
          {
            small: this.imagen2,
            medium: this.imagen2,
            big: this.imagen2
          },
          {
            small: this.imagen3,
            medium: this.imagen3,
            big: this.imagen3
          },
          // Agregar más imágenes según sea necesario
        ];
        if (this.Entrada_detalles && this.Entrada_detalles.tblEntrada_Maquinas && this.Entrada_detalles.tblEntrada_Maquinas.length > 0) {
          // Si tiene la estructura esperada, acceder a la propiedad idmaquina del primer elemento del array
          this.idmaquina = new FormControl(this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina);
          this.idmachine = this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina
          this.cabezalesmaquina = this.Entrada_detalles.tblEntrada_Maquinas[0].tblMaquina.cabezales
        } else {

          // Si no tiene la estructura esperada, manejar el caso de error aquí
          // console.error('this.Entrada_detalles no tiene la estructura esperada');
          // Puedes realizar alguna acción adicional, como asignar un valor predeterminado a this.idmaquina o manejar el error de otra manera
        }
    
        // console.log(this.cabezalesmaquina)
        this.tiempofin = ((this.faltantes / this.cabezalesmaquina) * (this.tiempo)).toFixed(2)
        this.minutos = Math.floor((this.tiempofin % 3600) / 60);
        this.resto = this.tiempofin % 60;
        this.horas = Math.floor(this.tiempofin / 3600);
        // console.log(this.minutos1)
        // console.log(this.resto1)
        // console.log(this.idmachine)







      },


    );

  }


  obtenerMaquinasActivas() {

    this.serConexion.maquinaLista().subscribe(
      success => {

        this.lista_maquinas = success.datos
        // console.log(this.lista_maquinas);
       
        if (this.Entrada_detalles && this.Entrada_detalles.tblEntrada_Maquinas && this.Entrada_detalles.tblEntrada_Maquinas.length > 0) {
          // Si tiene la estructura esperada, acceder a la propiedad idmaquina del primer elemento del array
          this.idmaquina = new FormControl(this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina);
        } else {
          // Si no tiene la estructura esperada, manejar el caso de error aquí
          // console.error('this.Entrada_detalles no tiene la estructura esperada');
          // Puedes realizar alguna acción adicional, como asignar un valor predeterminado a this.idmaquina o manejar el error de otra manera
        }
      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        console.log(error);
      }
    );
  }

  AsignarMaquina() {
    this.galeriaAbierta = true;
    this.alerta = false
    if (this.estado == 'En Proceso') {
      this.variable2 = true
      this.idmaquina = new FormControl(this.idmachine);
    }
    if (this.estado == 'En Pausa') {
      this.tiempofin = 0
      this.minutos1 = 0
      this.minutos = 0
      this.resto = 0
      this.horas = 0
      this.variable2 = false

      var id = Number(this.idmaquina.value);
      var envio = {
        identrada: this.identrada,
        idmaquina: id,
        idusuario: Number(localStorage.getItem('iduser'))

      }
      // console.log(envio)
      this.serConexion.Entradaasigna_maquina(envio).subscribe(
        success => {
          // console.log(success)
          this.datos = success
          this.mensaje_error = 'SE HA ACTUALIZADO A LA MAQUINA SELECCIONADA';
          this.tablaProduccion.destroy()
          this.cargarProduccion()
          // console.log(this.datos)

          // this.getArray(this.identrada)
          // console.log(this.cabezalesmaquina)
          // console.log(this.lista_maquinas[this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina].cabezales)
          this.serConexion.EntradaDetalle(this.idfinal).subscribe(
            success => {

              this.Entrada_detalles = success.datos
              this.variable4 = false
              // console.log(this.Entrada_detalles)
              for (var i = 0; i < this.Entrada_detalles.tblBordado.tblBordado_Patrons.length; i++) {

                this.orden = this.Entrada_detalles.tblBordado.tblBordado_Patrons[i].orden;
                this.hilo = this.Entrada_detalles.tblBordado.tblBordado_Patrons[i].hilo;


              }
              // console.log(this.Entrada_detalles)
              this.tiempo = this.Entrada_detalles.tblBordado.tiempo
              this.minutos1 = Math.floor(this.tiempo / 60);
              this.identrada = this.Entrada_detalles.identrada
              this.idcliente = this.Entrada_detalles.idcliente
              // this.idbordado =this.Entrada_detalles.idbordado
              this.prenda = this.Entrada_detalles.prenda
              this.numero = this.Entrada_detalles.numero
              this.realizadas = this.Entrada_detalles.realizadas
              this.observacion = this.Entrada_detalles.observacion
              this.precio = this.Entrada_detalles.precio
              this.estado = this.Entrada_detalles.estado
              if (this.Entrada_detalles.tblEntrada_Maquinas.length == 0) {

                this.variablenueva = true
                // console.log(this.variablenueva)
              }
              else {
                this.variablenueva = false
              }
              this.nombre = this.Entrada_detalles.tblCliente.nombre
              this.nombreBordado = this.Entrada_detalles.tblBordado.nombre
              this.alto = this.Entrada_detalles.tblBordado.alto
              this.ancho = this.Entrada_detalles.tblBordado.ancho
              this.observacionB = this.Entrada_detalles.tblBordado.observacion
              this.puntadas = this.Entrada_detalles.tblBordado.num_puntadas
              this.faltantes = this.numero - this.realizadas
              this.portada = img_url + this.Entrada_detalles.tblBordado.portada
              this.cabezal = this.Entrada_detalles.tblBordado.tblBordado_Cabezals[0].idcabezal

              // console.log(this.idmachine)

              // console.log('portada' + this.portada)
              if (this.portada == 'https://guayakay-api-prod.basotecnologias.com/static/') {
                this.sinportada = true
                // console.log(true)
              }
              else {
                this.sinportada = false
                // console.log(false)

              }
              this.imagen1 = img_url + this.Entrada_detalles.tblBordado.imagen1
              if (this.imagen1 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
                this.sinportada1 = true
                // console.log(true)
              }
              else {
                this.sinportada1 = false
                // console.log(false)

              }
              this.imagen2 = img_url + this.Entrada_detalles.tblBordado.imagen2
              if (this.imagen2 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
                this.sinportada2 = true
                // console.log(true)
              }
              else {
                this.sinportada2 = false
                // console.log(false)

              }
              this.imagen3 = img_url + this.Entrada_detalles.tblBordado.imagen3
              if (this.imagen3 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
                this.sinportada3 = true
                // console.log(true)
              }
              else {
                this.sinportada3 = false
                // console.log(false)

              }




              this.tecnica = this.Entrada_detalles.tblBordado.tblTecnica_Bordados[0].tblTecnica.nombre
              this.idmaquina = new FormControl(this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina);
              this.idmachine = this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina
              this.cabezalesmaquina = this.Entrada_detalles.tblEntrada_Maquinas[0].tblMaquina.cabezales
              // console.log(this.cabezalesmaquina)
              this.tiempofin = ((this.faltantes / this.cabezalesmaquina) * (this.tiempo)).toFixed(2)
              this.minutos = Math.floor((this.tiempofin % 3600) / 60);
              this.resto = this.tiempofin % 60;
              this.horas = Math.floor(this.tiempofin / 3600);


            },


          );

          // console.log(this.faltantes)
          // console.log(this.cabezalesmaquina)
          // console.log(this.tiempo)
          // console.log( this.tiempofin)
          // console.log(this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina)
          // console.log(this.lista_maquinas[1].cabezales)
          // console.log(this.datos.message)
          switch (this.datos.message) {
            case 'registro completado':
              this.mensaje_error = 'SE HA ASIGNADO A LA MAQUINA SELECCIONADA';
              this.mensaje_error = this.datos.message
              // this.tiempofin = ((this.faltantes/this.cabezalesmaquina) * (this.tiempo/60)).toFixed(2)
              // this.tablaProduccion.destroy()
              // this.cargarProduccion()
              // this.pintatabla()
              //   this.variable = true
              // }

              break;
            // case 403:
            //   this.mensaje_error = 'CONTRASEÑA INCORRECTA';
            // break;
            default:
            //  this.mensaje_error = 'CONTRASEÑA INCORRECTA';
            // this.lista_maquinas.push(success.datos)
            // this.MaquinasForm = this.fb.group({
            //   id: [''],
            //   descripcion: ['', Validators.required],
            //   nombre: ['', Validators.required],
            //   Cabezales: ['', Validators.required],
            // });
            // this.submitted = false;
            // this.cierraModal()
            // window.location.reload();

          }
          // }
          // error => {
          //   this.router.navigate(['/login'], { relativeTo: this.activeRoute });
          //   console.log(error);
        }
      );
    }
    if (this.estado == 'Espera') {
      this.tiempofin = 0
      this.minutos1 = 0
      this.minutos = 0
      this.resto = 0
      this.horas = 0
      this.variable2 = false
      var id = Number(this.idmaquina.value);
      var envio = {
        identrada: this.identrada,
        idmaquina: id,
        idusuario: Number(localStorage.getItem('iduser'))

      }
      // console.log(envio)
      this.serConexion.Entradaasigna_maquina(envio).subscribe(
        success => {
          // console.log(success)
          this.datos = success
          this.mensaje_error = 'SE HA ACTUALIZADO A LA MAQUINA SELECCIONADA';
          this.tablaProduccion.destroy()
          this.cargarProduccion()
          // console.log(this.datos)

          // this.getArray(this.identrada)
          // console.log(this.cabezalesmaquina)
          // console.log(this.lista_maquinas[this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina].cabezales)
          this.serConexion.EntradaDetalle(this.idfinal).subscribe(
            success => {
              this.Entrada_detalles = success.datos
              this.variable4 = false
              // console.log(this.Entrada_detalles)
              for (var i = 0; i < this.Entrada_detalles.tblBordado.tblBordado_Patrons.length; i++) {

                this.orden = this.Entrada_detalles.tblBordado.tblBordado_Patrons[i].orden;
                this.hilo = this.Entrada_detalles.tblBordado.tblBordado_Patrons[i].hilo;


              }
              // console.log(this.Entrada_detalles)
              this.tiempo = this.Entrada_detalles.tblBordado.tiempo
              this.minutos1 = Math.floor(this.tiempo / 60);
              this.identrada = this.Entrada_detalles.identrada
              this.idcliente = this.Entrada_detalles.idcliente
              // this.idbordado =this.Entrada_detalles.idbordado
              this.prenda = this.Entrada_detalles.prenda
              this.numero = this.Entrada_detalles.numero
              this.realizadas = this.Entrada_detalles.realizadas
              this.observacion = this.Entrada_detalles.observacion
              this.precio = this.Entrada_detalles.precio
              this.estado = this.Entrada_detalles.estado

              this.nombre = this.Entrada_detalles.tblCliente.nombre
              this.nombreBordado = this.Entrada_detalles.tblBordado.nombre
              this.alto = this.Entrada_detalles.tblBordado.alto
              this.ancho = this.Entrada_detalles.tblBordado.ancho
              this.observacionB = this.Entrada_detalles.tblBordado.observacion
              this.puntadas = this.Entrada_detalles.tblBordado.num_puntadas
              this.faltantes = this.numero - this.realizadas
              this.portada = img_url + this.Entrada_detalles.tblBordado.portada
              this.cabezal = this.Entrada_detalles.tblBordado.tblBordado_Cabezals[0].idcabezal



              // console.log('portada' + this.portada)
              if (this.portada == 'https://guayakay-api-prod.basotecnologias.com/static/') {
                this.sinportada = true
                // console.log(true)
              }
              else {
                this.sinportada = false
                // console.log(false)

              }
              this.imagen1 = img_url + this.Entrada_detalles.tblBordado.imagen1
              if (this.imagen1 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
                this.sinportada1 = true
                // console.log(true)
              }
              else {
                this.sinportada1 = false
                // console.log(false)

              }
              this.imagen2 = img_url + this.Entrada_detalles.tblBordado.imagen2
              if (this.imagen2 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
                this.sinportada2 = true
                // console.log(true)
              }
              else {
                this.sinportada2 = false
                // console.log(false)

              }
              this.imagen3 = img_url + this.Entrada_detalles.tblBordado.imagen3
              if (this.imagen3 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
                this.sinportada3 = true
                // console.log(true)
              }
              else {
                this.sinportada3 = false
                // console.log(false)

              }




              this.tecnica = this.Entrada_detalles.tblBordado.tblTecnica_Bordados[0].tblTecnica.nombre
              this.idmaquina = new FormControl(this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina);

              this.idmachine = this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina
              this.cabezalesmaquina = this.Entrada_detalles.tblEntrada_Maquinas[0].tblMaquina.cabezales
              this.tiempofin = ((this.faltantes / this.cabezalesmaquina) * (this.tiempo)).toFixed(2)
              this.minutos = Math.floor((this.tiempofin % 3600) / 60);
              this.resto = this.tiempofin % 60;
              this.horas = Math.floor(this.tiempofin / 3600);

            },


          );

          // console.log(this.faltantes)
          // console.log(this.cabezalesmaquina)
          // console.log(this.tiempo)
          // console.log( this.tiempofin)
          // console.log(this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina)
          // console.log(this.lista_maquinas[1].cabezales)
          // console.log(this.datos.message)
          switch (this.datos.message) {
            case 'registro completado':
              this.mensaje_error = 'SE HA ASIGNADO A LA MAQUINA SELECCIONADA';
              this.mensaje_error = this.datos.message
              // this.tiempofin = ((this.faltantes/this.cabezalesmaquina) * (this.tiempo/60)).toFixed(2)
              // this.tablaProduccion.destroy()
              // this.cargarProduccion()
              // this.pintatabla()
              //   this.variable = true
              // }

              break;
            // case 403:
            //   this.mensaje_error = 'CONTRASEÑA INCORRECTA';
            // break;
            default:
            //  this.mensaje_error = 'CONTRASEÑA INCORRECTA';
            // this.lista_maquinas.push(success.datos)
            // this.MaquinasForm = this.fb.group({
            //   id: [''],
            //   descripcion: ['', Validators.required],
            //   nombre: ['', Validators.required],
            //   Cabezales: ['', Validators.required],
            // });
            // this.submitted = false;
            // this.cierraModal()
            // window.location.reload();

          }
          // }
          // error => {
          //   this.router.navigate(['/login'], { relativeTo: this.activeRoute });
          //   console.log(error);
        }
      );
    }
  }
  private cargarProduccion(): void {
    
    this.serConexion.EntradasLista().subscribe(
      success => {

        this.lista_entradas = success.datos
        // console.log(this.lista_entradas);
        if (this.lista_entradas.length > 1) {
          this.pintatabla()
        }

      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        // console.log(error);
      }
    );
  }

  variable5 = false
  variable3 = false
  errormensaje = false

  finalizar() {
    this.galeriaAbierta = true;
    this.minutos1 = 0
    this.minutos = 0
    this.resto = 0
    this.horas = 0

    if (this.realizadas == 0) {
      var cant = Number(this.cantidad.value)
      var id = Number(this.idmaquina.value);
      var envio = {
        identrada: this.identrada,
        idmaquina: id,
        idusuario: Number(localStorage.getItem('iduser')),
        estado: 'Terminada',
        piezas_realizadas: this.numero
      }
      console.log(envio)


      this.serConexion.EntradaEstados(envio).subscribe(
        success => {
          this.tablaProduccion.destroy();
          console.log(success)
          this.datos = success


          this.cierraModal()
          this.variable5 = false
          this.cargarProduccion();


          // this.cargarProduccion();
        },
        error => {

          switch (error.status) {
            case 500:
              this.mensaje_error = 'EL PROCESO FUE INICIADO POR OTRO USUARIO POR LO TANTO NO PODRA REALIZAR ACCIONES HASTA QUE ESTE FINALICE/PAUSE';
              this.errormensaje = true
              break;
            // case 403:
            //   this.mensaje_error = 'CONTRASEÑA INCORRECTA';
            //   break;
            default:
              this.mensaje_error = 'USUARIO Y/O CONTRASEÑA INCORRECTOS';

          }
        }
      );

    }
    else {

      var cant = Number(this.cantidad.value)
      var id = Number(this.idmaquina.value);
      var envio = {
        identrada: this.identrada,
        idmaquina: id,
        idusuario: Number(localStorage.getItem('iduser')),
        estado: 'Terminada',
        piezas_realizadas: this.faltantes
      }
      // console.log(envio)


      this.serConexion.EntradaEstados(envio).subscribe(
        success => {
          this.tablaProduccion.destroy();
          // console.log(success)
          this.datos = success


          this.cierraModal()
          this.variable5 = false
          this.cargarProduccion();


          // this.cargarProduccion();
        },
        error => {

          switch (error.status) {
            case 500:
              this.mensaje_error = 'EL PROCESO FUE INICIADO POR OTRO USUARIO POR LO TANTO NO PODRA REALIZAR ACCIONES HASTA QUE ESTE FINALICE/PAUSE';
              this.errormensaje = true
              break;
            // case 403:
            //   this.mensaje_error = 'CONTRASEÑA INCORRECTA';
            //   break;
            default:
              this.mensaje_error = 'USUARIO Y/O CONTRASEÑA INCORRECTOS';

          }
        }
      );

    }

  }




  variable4 = false
  desactivarpausa() {

    var cant = Number(this.cantidad.value)
    this.totale = this.numero - this.realizadas
    if (Number(this.cantidad.value) == this.totale) {
      this.variable = false
      this.variable3 = true
      this.variable4 = true

    }
    if (Number(this.cantidad.value) < this.totale) {
      this.variable = false
      this.variable3 = false
      this.variable4 = false
    }
    if (Number(this.cantidad.value) < 0) {
      this.variable = false
      this.variable3 = true
      this.variable4 = false
    }
    if (cant > this.faltantes) {
      // console.log(true)
      this.variable = true
      this.variable3 = true
      this.variable4 = false

    }

  }
  variable2 = false
  alerta = false
  Produccion() {
    this.galeriaAbierta = true;
    this.minutos1 = 0
    this.minutos = 0
    this.resto = 0
    this.horas = 0
    // console.log(this.idmaquina.value)
    if (this.idmaquina.value == 0) {
      this.alerta = true
    }
    else {

      var cant = Number(this.cantidad.value)
      var id = Number(this.idmaquina.value);

      var envio = {
        identrada: this.identrada,
        idmaquina: id,
        idusuario: Number(localStorage.getItem('iduser')),
        estado: 'En Proceso',
        // piezas_realizada: cant
      }
      // console.log(envio)
      this.serConexion.EntradaEstados(envio).subscribe(
        success => {
          this.tablaProduccion.destroy();
          // console.log(success)
          this.datos = success


          // this.cierraModal()
          this.cargarProduccion();
          this.serConexion.EntradaDetalle(this.idfinal).subscribe(
            success => {
              this.Entrada_detalles = success.datos
              this.variable4 = false
              // console.log(this.Entrada_detalles)
              for (var i = 0; i < this.Entrada_detalles.tblBordado.tblBordado_Patrons.length; i++) {

                this.orden = this.Entrada_detalles.tblBordado.tblBordado_Patrons[i].orden;
                this.hilo = this.Entrada_detalles.tblBordado.tblBordado_Patrons[i].hilo;


              }
              // console.log(this.Entrada_detalles)
              this.tiempo = this.Entrada_detalles.tblBordado.tiempo
              this.minutos1 = Math.floor(this.tiempo / 60);
              this.identrada = this.Entrada_detalles.identrada
              this.idcliente = this.Entrada_detalles.idcliente
              // this.idbordado =this.Entrada_detalles.idbordado
              this.prenda = this.Entrada_detalles.prenda
              this.numero = this.Entrada_detalles.numero
              this.realizadas = this.Entrada_detalles.realizadas
              this.observacion = this.Entrada_detalles.observacion
              this.precio = this.Entrada_detalles.precio
              this.estado = this.Entrada_detalles.estado
              if (this.Entrada_detalles.tblEntrada_Maquinas.length == 0) {

                this.variablenueva = true
                // console.log(this.variablenueva)
              }
              else {
                this.variablenueva = false
              }
              this.nombre = this.Entrada_detalles.tblCliente.nombre
              this.nombreBordado = this.Entrada_detalles.tblBordado.nombre
              this.alto = this.Entrada_detalles.tblBordado.alto
              this.ancho = this.Entrada_detalles.tblBordado.ancho
              this.observacionB = this.Entrada_detalles.tblBordado.observacion
              this.puntadas = this.Entrada_detalles.tblBordado.num_puntadas
              this.faltantes = this.numero - this.realizadas
              this.portada = img_url + this.Entrada_detalles.tblBordado.portada
              this.cabezal = this.Entrada_detalles.tblBordado.tblBordado_Cabezals[0].idcabezal

              // console.log(this.idmachine)

              // console.log('portada' + this.portada)
              if (this.portada == 'https://guayakay-api-prod.basotecnologias.com/static/') {
                this.sinportada = true
                // console.log(true)
              }
              else {
                this.sinportada = false
                // console.log(false)

              }
              this.imagen1 = img_url + this.Entrada_detalles.tblBordado.imagen1
              if (this.imagen1 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
                this.sinportada1 = true
                // console.log(true)
              }
              else {
                this.sinportada1 = false
                // console.log(false)

              }
              this.imagen2 = img_url + this.Entrada_detalles.tblBordado.imagen2
              if (this.imagen2 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
                this.sinportada2 = true
                // console.log(true)
              }
              else {
                this.sinportada2 = false
                // console.log(false)

              }
              this.imagen3 = img_url + this.Entrada_detalles.tblBordado.imagen3
              if (this.imagen3 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
                this.sinportada3 = true
                // console.log(true)
              }
              else {
                this.sinportada3 = false
                // console.log(false)

              }




              this.tecnica = this.Entrada_detalles.tblBordado.tblTecnica_Bordados[0].tblTecnica.nombre
              this.idmaquina = new FormControl(this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina);
              this.idmachine = this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina
              this.cabezalesmaquina = this.Entrada_detalles.tblEntrada_Maquinas[0].tblMaquina.cabezales
              // console.log(this.cabezalesmaquina)
              this.tiempofin = ((this.faltantes / this.cabezalesmaquina) * (this.tiempo)).toFixed(2)
              this.minutos = Math.floor((this.tiempofin % 3600) / 60);
              this.resto = this.tiempofin % 60;
              this.horas = Math.floor(this.tiempofin / 3600);

            },


          );

          // this.cargarProduccion();
        },
        // error => {
        //   this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        //   console.log(error);
        // }
      );
    }




  }


  cancelar() {
    this.galeriaAbierta = true;
    this.minutos1 = 0
    this.minutos = 0
    this.resto = 0
    this.horas = 0
    var cant = Number(this.cantidad.value)
    var id = Number(this.idmaquina.value);
    if(id != 0){
      var envio = {
        identrada: this.identrada,
        idmaquina: id,
        idusuario: localStorage.getItem('iduser'),
        estado: 'Cancelada',
        // piezas_realizada: cant
      }
      // console.log(envio)
      this.serConexion.EntradaEstados(envio).subscribe(
        success => {
          this.tablaProduccion.destroy();
          console.log(success)
          this.datos = success
  
  
          this.cierraModal()
          this.cargarProduccion();
          // this.cargarProduccion();
        },
        // error => {
        //   this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        //   console.log(error);
        // }
      );
    }
    else{
      var envio2 = {
        identrada: this.identrada,
    
        // idusuario: localStorage.getItem('iduser'),
        estado: 'Cancelada',
        // piezas_realizada: cant
      }
      // console.log(envio)
      this.serConexion.EntradaEstados(envio2).subscribe(
        success => {
          this.tablaProduccion.destroy();
          // console.log(success)
          this.datos = success
  
  
          this.cierraModal()
          this.cargarProduccion();
          // this.cargarProduccion();
        },
        // error => {
        //   this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        //   console.log(error);
        // }
      );
    }
   
  }
  variable = false
  pausa() {
    this.galeriaAbierta = true;
    this.minutos1 = 0
    this.minutos = 0
    this.resto = 0
    this.horas = 0
    // var dato_a_comprobar = "1234";
    // var valoresAceptados = /^[0-9]+$/;
    // var dato = this.cantidad.value 
    //     if (dato.match(valoresAceptados)){
    //        alert ("Es numérico");
    //     } else {
    //       alert ("No es numérico");
    //    }
    var cant = Number(this.cantidad.value)
    var id = Number(this.idmaquina.value);
    var envio = {
      identrada: this.identrada,
      idmaquina: id,
      idusuario: Number(localStorage.getItem('iduser')),
      estado: 'En Pausa',
      piezas_realizadas: cant
    }
    // console.log(envio)


    if (cant <= this.numero) {
      this.variable = false
      this.serConexion.EntradaEstados(envio).subscribe(
        success => {
          this.tablaProduccion.destroy();
          // console.log(success)
          this.datos = success


          // this.cierraModal()

          this.cargarProduccion();
          this.serConexion.EntradaDetalle(this.idfinal).subscribe(
            success => {
              this.Entrada_detalles = success.datos
              this.variable4 = false
              // console.log(this.Entrada_detalles)
              for (var i = 0; i < this.Entrada_detalles.tblBordado.tblBordado_Patrons.length; i++) {

                this.orden = this.Entrada_detalles.tblBordado.tblBordado_Patrons[i].orden;
                this.hilo = this.Entrada_detalles.tblBordado.tblBordado_Patrons[i].hilo;


              }
              // console.log(this.Entrada_detalles)
              this.tiempo = this.Entrada_detalles.tblBordado.tiempo
              this.minutos1 = Math.floor(this.tiempo / 60);
              this.identrada = this.Entrada_detalles.identrada
              this.idcliente = this.Entrada_detalles.idcliente
              // this.idbordado =this.Entrada_detalles.idbordado
              this.prenda = this.Entrada_detalles.prenda
              this.numero = this.Entrada_detalles.numero
              this.realizadas = this.Entrada_detalles.realizadas
              this.observacion = this.Entrada_detalles.observacion
              this.precio = this.Entrada_detalles.precio
              this.estado = this.Entrada_detalles.estado

              this.nombre = this.Entrada_detalles.tblCliente.nombre
              this.nombreBordado = this.Entrada_detalles.tblBordado.nombre
              this.alto = this.Entrada_detalles.tblBordado.alto
              this.ancho = this.Entrada_detalles.tblBordado.ancho
              this.observacionB = this.Entrada_detalles.tblBordado.observacion
              this.puntadas = this.Entrada_detalles.tblBordado.num_puntadas
              this.faltantes = this.numero - this.realizadas
              this.portada = img_url + this.Entrada_detalles.tblBordado.portada
              this.cabezal = this.Entrada_detalles.tblBordado.tblBordado_Cabezals[0].idcabezal

              // console.log(this.idmachine)

              // console.log('portada' + this.portada)
              if (this.portada == 'https://guayakay-api-prod.basotecnologias.com/static/') {
                this.sinportada = true
                // console.log(true)
              }
              else {
                this.sinportada = false
                // console.log(false)

              }
              this.imagen1 = img_url + this.Entrada_detalles.tblBordado.imagen1
              if (this.imagen1 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
                this.sinportada1 = true
                // console.log(true)
              }
              else {
                this.sinportada1 = false
                // console.log(false)

              }
              this.imagen2 = img_url + this.Entrada_detalles.tblBordado.imagen2
              if (this.imagen2 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
                this.sinportada2 = true
                // console.log(true)
              }
              else {
                this.sinportada2 = false
                // console.log(false)

              }
              this.imagen3 = img_url + this.Entrada_detalles.tblBordado.imagen3
              if (this.imagen3 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
                this.sinportada3 = true
                // console.log(true)
              }
              else {
                this.sinportada3 = false
                // console.log(false)

              }




              this.tecnica = this.Entrada_detalles.tblBordado.tblTecnica_Bordados[0].tblTecnica.nombre
              this.idmaquina = new FormControl(this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina);
              this.idmachine = this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina
              this.cabezalesmaquina = this.Entrada_detalles.tblEntrada_Maquinas[0].tblMaquina.cabezales
              // console.log(this.cabezalesmaquina)
              this.tiempofin = ((this.faltantes / this.cabezalesmaquina) * (this.tiempo)).toFixed(2)
              this.minutos = Math.floor((this.tiempofin % 3600) / 60);
              this.resto = this.tiempofin % 60;
              this.horas = Math.floor(this.tiempofin / 3600);

            },


          );

          // this.abrirModal(this.identrada)
          // this.cargarProduccion();
        },
        error => {

          switch (error.status) {
            case 500:
              this.mensaje_error = 'EL PROCESO FUE INICIADO POR OTRO USUARIO POR LO TANTO NO PODRA REALIZAR ACCIONES HASTA QUE ESTE FINALICE POR EL USUARIO INICIADO';
              this.errormensaje = true
              break;
            // case 403:
            //   this.mensaje_error = 'CONTRASEÑA INCORRECTA';
            //   break;
            default:
              this.mensaje_error = 'USUARIO Y/O CONTRASEÑA INCORRECTOS';

          }
        }
      );
    }
    if (cant == this.faltantes) {
      this.variable = false
      this.serConexion.EntradaEstados(envio).subscribe(
        success => {
          this.tablaProduccion.destroy();
          // console.log(success)
          this.datos = success


          this.cierraModal()
          this.variable5 = false
          this.cargarProduccion();


          // this.cargarProduccion();
        },
        error => {

          switch (error.status) {
            case 500:
              this.mensaje_error = 'EL PROCESO FUE INICIADO POR OTRO USUARIO POR LO TANTO NO PODRA REALIZAR ACCIONES HASTA QUE ESTE FINALICE/PAUSE';
              this.errormensaje = true
              break;
            // case 403:
            //   this.mensaje_error = 'CONTRASEÑA INCORRECTA';
            //   break;
            default:
              this.mensaje_error = 'USUARIO Y/O CONTRASEÑA INCORRECTOS';

          }
        }
      );


    }
  }
}


