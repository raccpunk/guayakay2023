import { Component, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormArray, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ConexionService } from '../../servicios/conexion/conexion.service';
import { ValidacionService } from '../../servicios/validaciones/validacion.service';
import { AlmacenamientoService } from '../../servicios/almacenamiento/almacenamiento.service';
import { img_url } from 'src/app/servicios/guard/guard.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { Console } from 'console';

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
  selector: 'app-produccion-maquina',
  templateUrl: './produccion-maquina.component.html',
  styleUrls: ['./produccion-maquina.component.scss']
})
export class ProduccionMaquinaComponent {
  @ViewChild('button_close_detalles') closebutton: any;
  @ViewChild('staticBackdropModal') modal: any;
  idmaquinas = new FormControl(0);
  cantidad = new FormControl();
  produccionA: Produccion[] = []
  hilosA: hilos[] = []
  lista_entradas: any;
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
  idfinal: any;
  datos: any;
  Entrada_detalles: any;
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
  horas: any;
  nombreBordado: any;
  alto: any;
  ancho: any;
  observacionB: any;
  portada: any;
  orden: any;
  hilo: any;
  tecnica: any;
  lista_maquinas: any = [];
  idmachine: any;
  realizadas: any;
  tablaProduccion: any;
  totale: any;
  idusuario = new FormControl(0);
  idmaquina: any;
  imagen1: any;
  imagen2: any;
  imagen3: any;
  faltantes: any;
  cabezal: any;
  puntadas: any;
  proceso: any;
  mensaje_error: any;
  cabezalesmaquina: any;
  tiempofin: any;
  permiso: any;
  minutos: any;
  minutos1: any;
  resto: any;
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



  private ngOnInit(): void {
    this.galleryOptions = [
      {
        thumbnails: true, // Habilitar las miniaturas
        image: true, // Habilitar la imagen principal
        // breakpoint: 400,
        // imageInfinityMove: false,

        // imageBullets: true,
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



      // [
      //   { "previewZoom": true, "previewRotate": true }
      //   { "breakpoint": 500, "width": "300px", "height": "300px", "thumbnailsColumns": 3 }
      //   { "breakpoint": 300, "width": "100%", "height": "200px", "thumbnailsColumns": 2 }
      // ] 
    ];

    this.obtenerMaquinaUsuario()

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

  pintatabla() {
    setTimeout(() => {
      this.tablaProduccion = $('#datatable-produccion').DataTable({
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,

        lengthMenu: [5, 10, 25, 50],
        order: [4, 'DESC'],
        columnDefs: [{ "targets": 0 }],
        language: {
          "lengthMenu": "Mostrar _MENU_ resultados",
          "zeroRecords": "No se encontraron resultados",
          "info": "Mostrando resultados _START_-_END_ de  _TOTAL_",
          "infoFiltered": "(filtrado de un total de _MAX_ registros)",
          "infoEmpty": "Mostrando resultados del 0 al 0 de un total de 0 registros",
          "search": "Buscar",
          "loadingRecords": "Cargando...",
          "paginate": {
            "first": "Primero",
            "last": "Último",
            "next": "Siguiente",
            "previous": "Anterior"
          }
        },

      });
    }, 1200);
  }
  sinportada = false
  sinportada1 = false
  sinportada2 = false
  sinportada3 = false
  getArray(lugar: number) {
    this.galeriaAbierta = true;
    this.errormensaje = false
    this.variable5 = false
    this.variable4 = false
    this.cantidad = new FormControl();
    this.idmaquina = new FormControl(0);
    this.variable2 = false
    this.hilosA = []
    this.EntradaU[0].folio = this.lista_entradas[lugar].identrada;
    this.EntradaU[0].estado = this.lista_entradas[lugar].tblEntrada.estado;
    // this.EntradaU[0].cliente = this.lista_entradas[lugar].tblCliente.nombre;
    this.EntradaU[0].imagen = this.lista_entradas[lugar].imagen;


    this.idfinal = this.lista_entradas[lugar].identrada
    console.log(this.identrada)

    this.serConexion.EntradaDetalle(this.idfinal).subscribe(
      success => {
        this.Entrada_detalles = success.datos
        console.log(this.Entrada_detalles)
        this.identrada = this.Entrada_detalles.identrada
        this.idcliente = this.Entrada_detalles.idcliente
        // this.idbordado =this.Entrada_detalles.idbordado
        this.prenda = this.Entrada_detalles.prenda
        this.numero = this.Entrada_detalles.numero
        this.realizadas = this.Entrada_detalles.realizadas
        this.observacion = this.Entrada_detalles.observacion
        this.precio = this.Entrada_detalles.precio
        this.estado = this.Entrada_detalles.estado
        this.tiempo = this.Entrada_detalles.tiempo
        this.nombre = this.Entrada_detalles.tblCliente.nombre
        this.nombreBordado = this.Entrada_detalles.tblBordado.nombre
        this.alto = this.Entrada_detalles.tblBordado.alto
        this.ancho = this.Entrada_detalles.tblBordado.ancho
        this.puntadas = this.Entrada_detalles.tblBordado.num_puntadas
        this.faltantes = this.numero - this.realizadas
        this.observacionB = this.Entrada_detalles.tblBordado.observacion
        this.cabezal = this.Entrada_detalles.tblBordado.tblBordado_Cabezals[0].idcabezal
        this.tiempo = this.Entrada_detalles.tblBordado.tiempo
        this.minutos1 = Math.floor(this.tiempo / 60);
        this.portada = img_url + this.Entrada_detalles.tblBordado.portada
        this.imagen1 = img_url + this.Entrada_detalles.tblBordado.imagen1
        this.imagen2 = img_url + this.Entrada_detalles.tblBordado.imagen2
        this.imagen3 = img_url + this.Entrada_detalles.tblBordado.imagen3
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
        this.tecnica = this.Entrada_detalles.tblBordado.tblTecnica_Bordados[0].tblTecnica.nombre
        this.idmaquina = new FormControl(this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina);
        this.idmachine = this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina
        this.tecnica = this.Entrada_detalles.tblBordado.tblTecnica_Bordados[0].tblTecnica.nombre
        this.idmaquina = new FormControl(this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina);
        this.idmachine = this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina
        this.cabezalesmaquina = this.Entrada_detalles.tblEntrada_Maquinas[0].tblMaquina.cabezales
        console.log(this.cabezalesmaquina)
        this.tiempofin = ((this.faltantes / this.cabezalesmaquina) * (this.tiempo)).toFixed(2)
        this.minutos = Math.floor((this.tiempofin % 3600) / 60);
        this.resto = this.tiempofin % 60;
        this.horas = Math.floor(this.tiempofin / 3600);
        for (var i = 0; i < this.Entrada_detalles.tblBordado.tblBordado_Patrons.length; i++) {

          this.orden = this.Entrada_detalles.tblBordado.tblBordado_Patrons[i].orden;
          this.hilo = this.Entrada_detalles.tblBordado.tblBordado_Patrons[i].hilo;
          this.hilosA.push({
            orden: this.orden,
            hilo: this.hilo,

          })

        }


      },


    );
  }


  private cierraModal(): void {
    this.closebutton.nativeElement.click();
  }


  finalizar() {
    this.galeriaAbierta = true;
    console.log(this.realizadas)

    this.variable3 = false
    
    if (this.realizadas = 0) {
      var cant = Number(this.cantidad.value)
      var id = Number(this.idmaquina.value);
      var envio = {
        identrada: this.identrada,
        idmaquina: id,
        idusuario: Number(localStorage.getItem('iduser')),
        estado: 'Terminada',
        piezas_realizadas: this.numero
      }
      this.variable = false
      this.serConexion.EntradaEstados(envio).subscribe(
        success => {
          console.log(success)
          this.datos = success
          // this.obtenerMaquinaEntrada()
          this.cierraModal()
          this.variable5 = false
          this.obtenerMaquinaEntrada()
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
      console.log(envio)
      this.variable = false
      this.serConexion.EntradaEstados(envio).subscribe(
        success => {
          console.log(success)
          this.datos = success
          // this.obtenerMaquinaEntrada()
          this.cierraModal()
          this.variable5 = false
          this.obtenerMaquinaEntrada()
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
  variable2 = false
  Produccion() {
    this.galeriaAbierta = true;
    var cant = Number(this.cantidad.value)
    var id = Number(this.idmaquina.value);

    var envio = {
      identrada: this.identrada,
      idmaquina: id,
      idusuario: Number(localStorage.getItem('iduser')),
      estado: 'En Proceso',
      // piezas_realizada: cant
    }
    console.log('es el envio:' + envio)
    this.serConexion.EntradaEstados(envio).subscribe(
      success => {
        console.log(success)
        this.datos = success
        this.hilosA = []
        this.obtenerMaquinaEntrada()
        this.serConexion.EntradaDetalle(this.idfinal).subscribe(
          success => {
            this.Entrada_detalles = success.datos
            console.log(this.Entrada_detalles)
            this.identrada = this.Entrada_detalles.identrada
            this.idcliente = this.Entrada_detalles.idcliente
            // this.idbordado =this.Entrada_detalles.idbordado
            this.prenda = this.Entrada_detalles.prenda
            this.numero = this.Entrada_detalles.numero
            this.realizadas = this.Entrada_detalles.realizadas
            this.observacion = this.Entrada_detalles.observacion
            this.precio = this.Entrada_detalles.precio
            this.estado = this.Entrada_detalles.estado
            this.tiempo = this.Entrada_detalles.tiempo
            this.nombre = this.Entrada_detalles.tblCliente.nombre
            this.nombreBordado = this.Entrada_detalles.tblBordado.nombre
            this.alto = this.Entrada_detalles.tblBordado.alto
            this.ancho = this.Entrada_detalles.tblBordado.ancho
            this.puntadas = this.Entrada_detalles.tblBordado.num_puntadas
            this.faltantes = this.numero - this.realizadas
            this.observacionB = this.Entrada_detalles.tblBordado.observacion
            this.cabezal = this.Entrada_detalles.tblBordado.tblBordado_Cabezals[0].idcabezal
            this.tiempo = this.Entrada_detalles.tblBordado.tiempo

            this.portada = img_url + this.Entrada_detalles.tblBordado.portada
            console.log('portada' + this.portada)
            if (this.portada == 'https://guayakay-api-prod.basotecnologias.com/static/') {
              this.sinportada = true
              console.log(true)
            }
            else {
              this.sinportada = false
              console.log(false)

            }
            this.imagen1 = img_url + this.Entrada_detalles.tblBordado.imagen1
            if (this.imagen1 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
              this.sinportada1 = true
              console.log(true)
            }
            else {
              this.sinportada1 = false
              console.log(false)

            }
            this.imagen2 = img_url + this.Entrada_detalles.tblBordado.imagen2
            if (this.imagen2 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
              this.sinportada2 = true
              console.log(true)
            }
            else {
              this.sinportada2 = false
              console.log(false)

            }
            this.imagen3 = img_url + this.Entrada_detalles.tblBordado.imagen3
            if (this.imagen3 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
              this.sinportada3 = true
              console.log(true)
            }
            else {
              this.sinportada3 = false
              console.log(false)

            }
            this.tecnica = this.Entrada_detalles.tblBordado.tblTecnica_Bordados[0].tblTecnica.nombre
            this.idmaquina = new FormControl(this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina);
            this.idmachine = this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina
            this.tecnica = this.Entrada_detalles.tblBordado.tblTecnica_Bordados[0].tblTecnica.nombre
            this.idmaquina = new FormControl(this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina);
            this.idmachine = this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina
            this.cabezalesmaquina = this.Entrada_detalles.tblEntrada_Maquinas[0].tblMaquina.cabezales
            console.log(this.cabezalesmaquina)
            this.tiempofin = ((this.faltantes / this.cabezalesmaquina) * (this.tiempo)).toFixed(2)
            this.minutos = Math.floor((this.tiempofin % 3600) / 60);
            this.resto = this.tiempofin % 60;
            this.horas = Math.floor(this.tiempofin / 3600);
            console.log(this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina)
            for (var i = 0; i < this.Entrada_detalles.tblBordado.tblBordado_Patrons.length; i++) {

              this.orden = this.Entrada_detalles.tblBordado.tblBordado_Patrons[i].orden;
              this.hilo = this.Entrada_detalles.tblBordado.tblBordado_Patrons[i].hilo;
              this.hilosA.push({
                orden: this.orden,
                hilo: this.hilo,

              })

            }


          },


        );
        // this.cierraModal()
        // this.cargarProduccion();
      },
      // error => {
      //   this.router.navigate(['/login'], { relativeTo: this.activeRoute });
      //   console.log(error);
      // }
    );



  }


  variable3 = false
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
  variable = false
  errormensaje = false

  pausa() {
    this.galeriaAbierta = true;
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
    console.log(envio)


    if (cant <= this.numero) {
      this.variable = false
      this.serConexion.EntradaEstados(envio).subscribe(
        success => {

          // console.log(success)
          this.datos = success


          // this.cierraModal()


          this.serConexion.EntradaDetalle(this.idfinal).subscribe(
            success => {
              this.Entrada_detalles = success.datos
              this.variable4 = false
              // console.log(this.Entrada_detalles)
              for (var i = 0; i < this.Entrada_detalles.tblBordado.tblBordado_Patrons.length; i++) {

                this.orden = this.Entrada_detalles.tblBordado.tblBordado_Patrons[i].orden;
                this.hilo = this.Entrada_detalles.tblBordado.tblBordado_Patrons[i].hilo;


              }
              console.log(this.Entrada_detalles)
              this.tiempo = this.Entrada_detalles.tblBordado.tiempo
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
              console.log(this.cabezalesmaquina)
              this.tiempofin = ((this.faltantes / this.cabezalesmaquina) * (this.tiempo)).toFixed(2)
              this.minutos = Math.floor((this.tiempofin % 3600) / 60);
              this.resto = this.tiempofin % 60;
              this.horas = Math.floor(this.tiempofin / 3600);
              console.log(this.minutos)
              console.log(this.resto)

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
  }

  obtenerMaquinaUsuario() {



    var id = Number(localStorage.getItem('iduser'))

    this.serConexion.maquinaUsuario(id).subscribe(
      success => {
        // this.tablabordados.destroy();
        this.lista_maquinas = success.datos
        console.log(this.lista_maquinas);

      },
    );
  }

  variable5 = false
  obtenerMaquinaEntrada() {
    var id = this.idmaquinas.value;

    this.serConexion.EntradaMaquina(id).subscribe(
      success => {
        // this.tablabordados.destroy();
        this.lista_entradas = success.datos
        console.log(this.lista_entradas);
        // this.tablaProduccion.destroy()
        for (var i = 0; i < this.lista_entradas.length; i++) {
          // console.log(this.lista_entradas[i].tblEntrada.estado)
          this.proceso = this.lista_entradas[i].tblEntrada.estado
          // if( this.lista_entradas[i].tblEntrada.estado == 'En Proceso'){
          //   // console.log('es verdad')
          //   this.variable5 = true
          // }

        }
        // Expected output: ReferenceError: nonExistentFunction is not defined


        // this.pintatabla()
      },
    );
    setInterval(() => {

      var id = this.idmaquinas.value;

      this.serConexion.EntradaMaquina(id).subscribe(
        success => {
          // this.tablabordados.destroy();
          this.lista_entradas = success.datos
          console.log(this.lista_entradas);
          // this.tablaProduccion.destroy()
          for (var i = 0; i < this.lista_entradas.length; i++) {
            // console.log(this.lista_entradas[i].tblEntrada.estado)
            this.proceso = this.lista_entradas[i].tblEntrada.estado
            // if( this.lista_entradas[i].tblEntrada.estado == 'En Proceso'){
            //   // console.log('es verdad')
            //   this.variable5 = true
            // }

          }
          // Expected output: ReferenceError: nonExistentFunction is not defined


          // this.pintatabla()
        },
      );
    }, 15000);
  }

}
