import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionService } from 'src/app/servicios/conexion/conexion.service';
import { img_url } from 'src/app/servicios/guard/guard.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { Bordados } from '../../interfaz/bordados';
import * as XLSX from 'xlsx';
import { Console } from 'console';
import { DatePipe } from '@angular/common';
interface hilos {
  orden: number;
  hilo: string;


}
@Component({
  selector: 'app-rentradas',
  templateUrl: './rentradas.component.html',
  styleUrls: ['./rentradas.component.scss']
})
export class REntradasComponent {
  @ViewChild('button_close_modal') closebutton: any;
  historialForm = this.fb.group({
    fechainicio: [''],
    fechafinal: [''],
    // password: ['', Validators.required],

  });
  fechaActual: any;
  historial_lista: any[] = [];
  tablaProduccion: any;
  bordado_detalle!: any;
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
  idcancelacion: any;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public serConexion: ConexionService,
    private datePipe: DatePipe,
    // private formBuilder: FormBuilder,
    // public serValidacion: ValidacionService,
    // public serAlmacen: AlmacenamientoService,
    private fb: FormBuilder
  ) { }
  myThumbnail: any;
  lista_clienteBordado: any = [];
  idfinal: any;
  realizadas: any;
  mensaje_error: any;
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
  nombreBordado: any;
  alto: any;
  ancho: any;
  observacionB: any;
  portada: any;
  orden: any;
  hilo: any;
  tecnica: any;
  idmaquina = new FormControl(0);
  lista_maquinas: any;
  idmachine: any;
  hilosA: hilos[] = []
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

  private cierraModal(): void {
    this.closebutton.nativeElement.click();
  }

  generarExcel() {
    // Obtén los datos de this.historial_lista
    const datos = this.historial_lista;

    // Crea una matriz para almacenar los datos
    const excelData = [];

    // Agrega un encabezado a la matriz
    excelData.push(['ENTRADA', 'REGISTRO', 'FINALIZO', 'ESTATUS', 'FECHA', 'CLIENTE', 'DISEÑO', 'N°PUNTADAS', 'CANTIDAD', 'PRECIO', 'NOTA', 'FECHA DE NOTA', 'FACTURA']);

    // Itera sobre los datos y agrega cada fila a la matriz
    datos.forEach(historial => {
      // Formatear la fecha en formato de fecha corta de Excel para 'FECHA'
      const fechaExcel = new Date(historial.createdAt);
      const fechaSerial = Math.floor((fechaExcel.getTime() - new Date(1899, 11, 30).getTime()) / 86400000) + 1;
      const fechaFormateada = this.datePipe.transform(fechaExcel, 'dd/MM/yyyy');

      // Formatear la fecha de la nota
      const fechaNotaExcel = historial.tblCobro_Entradas.length != 0 ? new Date(historial.tblCobro_Entradas[0].tblCobro.createdAt) : null;
      let fechaNotaSerial;
      if (fechaNotaExcel) {
        fechaNotaSerial = Math.floor((fechaNotaExcel.getTime() - new Date(1899, 11, 30).getTime()) / 86400000) + 1;
      }
      const fechaNotaFormateada = fechaNotaSerial ? this.datePipe.transform(fechaNotaExcel, 'dd/MM/yyyy') : 'sin asignar';

      // Determinar el tipo de datos para 'FECHA DE NOTA'
      const tipoFechaNota = fechaNotaSerial ? 'n' : 's'; // 'n' para número (fecha) y 's' para cadena (texto)

      const fila = [
        historial.identrada,
        historial.tblUsuario.nombre,
        historial.estado != 'Terminada' ? historial.tblUsuario.nombre : historial.tblTrabajos_Realizados[0].tblUsuario.nombre,
        historial.estado,
        { t: 'n', z: 'dd/mm/yyyy', v: fechaSerial }, // Especificar el formato de fecha para 'FECHA'
        historial.tblCliente.nombre,
        historial.tblBordado.nombre,
        historial.tblBordado.num_puntadas,
        historial.realizadas,
        historial.tblCobro_Entradas.length != 0 ? historial.tblCobro_Entradas[0].precio_unit : 0,
        historial.tblCobro_Entradas.length != 0 ? historial.tblCobro_Entradas[0].idcobro : 'sin asignar',
        { t: tipoFechaNota, z: 'dd/mm/yyyy', v: fechaNotaSerial }, // Especificar el formato de fecha para 'FECHA DE NOTA'
        historial.tblCobro_Entradas.length != 0 ? historial.tblCobro_Entradas[0].tblCobro.factura : 'sin asignar'
      ];
      excelData.push(fila);
    });

    // Crea un nuevo libro de Excel
    const workbook = XLSX.utils.book_new();
    // Convierte la matriz en una hoja de Excel
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    // Agrega la hoja al libro
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Historial');
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0'); // Obtener el día y rellenar con ceros si es necesario
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Obtener el mes (los meses en JavaScript van de 0 a 11)
    const anio = fecha.getFullYear();
    const fechaFormateada = `${dia}-${mes}-${anio}`;
    // Crea el archivo Excel
    XLSX.writeFile(workbook, 'REPORTE_ENTRADAS_' + fechaFormateada + '.xlsx');
  }
  // exportarExcel(): void {
  //   // Ocultar la columna que deseas omitir
  //   const columnasOcultas = document.querySelectorAll('td:nth-child(11)');
  //   columnasOcultas.forEach(columna => {

  //   });

  //   // Exportar la tabla a Excel
  //   const tabla = document.getElementById('datatable-produccion');
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tabla);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Historial');

  //   XLSX.writeFile(wb, 'historial.xlsx');

  //   // Mostrar la columna nuevamente
  //   columnasOcultas.forEach(columna => {

  //   });
  // }
  variable = false
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
    this.pintatabla()
    const fecha = new Date();
    this.fechaActual = fecha.toISOString().split('T')[0];
    // console.log(this.fechaActual)
    this.historialForm = this.fb.group({
      fechainicio: ['2024-01-01'],
      fechafinal: [this.fechaActual],
      // password: ['', Validators.required],

    });
    this.obtenerClientes();
  }
  pintatabla() {
    setTimeout(() => {
      this.tablaProduccion = $('#datatable-produccion').DataTable({
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        lengthMenu: [5, 10, 25, 50],
        order: [0, 'ASC'],
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
    }, 500);

  }


  variable4 = false
  obtenerClienteBordados(lugar: number) {
    this.advertencia = false
    this.minutos1 = 0
    this.minutos = 0
    this.resto = 0
    this.horas = 0
    this.idfinal = this.historial_lista[lugar].identrada
    // console.log(this.idfinal);

    this.serConexion.EntradaDetalle(this.idfinal).subscribe(
      success => {
        this.Entrada_detalles = success.datos
        this.variable4 = false
        // console.log(this.Entrada_detalles)




        // console.log(this.Entrada_detalles)
        this.tiempo = this.Entrada_detalles.tblBordado.tiempo
        this.minutos1 = Math.floor(this.tiempo / 60);

        this.identrada = this.Entrada_detalles.identrada
        this.idcliente = this.Entrada_detalles.idcliente
        // console.log(this.idcliente)
        this.serConexion.BordadoCliente(this.idcliente).subscribe(
          success => {
            this.lista_clienteBordado = success.datos
            // console.log(this.lista_clienteBordado[id]);
            for (var i = 0; i < this.bordado_detalle.length; i++) {
              this.ClienteBordado.push({
                idbordado: this.lista_clienteBordado.idbordado,
                nombre: this.lista_clienteBordado.nombre,
                portada: this.lista_clienteBordado.portada,
              })

            }
            // console.log(this.lista_clienteBordado)


          },
        );
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

        this.EntradaForm.controls['idcliente'].setValue(this.idcliente);
        this.EntradaForm.controls['idbordado'].setValue(this.Entrada_detalles.tblBordado.idbordado);
        this.EntradaForm.controls['prenda'].setValue(this.prenda);
        this.EntradaForm.controls['numero'].setValue(this.numero);
        this.EntradaForm.controls['observacion'].setValue(this.observacion);




        this.tecnica = this.Entrada_detalles.tblBordado.tblTecnica_Bordados[0].tblTecnica.nombre


        // console.log(this.cabezalesmaquina)
        this.tiempofin = ((this.faltantes / this.cabezalesmaquina) * (this.tiempo)).toFixed(2)
        this.minutos = Math.floor(this.tiempofin / 60);
        this.resto = this.tiempofin % 60;

        // console.log(this.minutos)
        // console.log(this.resto)

      },


    );
    this.lista_clienteBordado = [];
    // this.prueba = []
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
    if (localStorage.getItem('permiso') == 'encargado_producción') {
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


  }
  getArray(lugar: number) {
    this.hilosA = []
    this.idfinal = this.historial_lista[lugar].identrada

    this.serConexion.EntradaDetalle(this.idfinal).subscribe(
      success => {
        this.Entrada_detalles = success.datos

        // console.log(this.Entrada_detalles)
        for (var i = 0; i < this.Entrada_detalles.tblBordado.tblBordado_Patrons.length; i++) {

          this.orden = this.Entrada_detalles.tblBordado.tblBordado_Patrons[i].orden;
          this.hilo = this.Entrada_detalles.tblBordado.tblBordado_Patrons[i].hilo;
          this.hilosA.push({
            orden: this.orden,
            hilo: this.hilo,

          })

        }
        this.myThumbnail = 'https://guayakay-api-prod.basotecnologias.com/static/'
        this.imagen1 = 'https://guayakay-api-prod.basotecnologias.com/static/'
        this.imagen2 = 'https://guayakay-api-prod.basotecnologias.com/static/'
        this.imagen3 = 'https://guayakay-api-prod.basotecnologias.com/static/'
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

        this.nombre = this.Entrada_detalles.tblCliente.nombre
        this.nombreBordado = this.Entrada_detalles.tblBordado.nombre
        this.alto = this.Entrada_detalles.tblBordado.alto
        this.ancho = this.Entrada_detalles.tblBordado.ancho
        this.observacionB = this.Entrada_detalles.tblBordado.observacion
        this.puntadas = this.Entrada_detalles.tblBordado.num_puntadas
        this.faltantes = this.numero - this.realizadas
        // this.idmachine = this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina
        this.cabezal = this.Entrada_detalles.tblBordado.tblBordado_Cabezals[0].tblCabezale.nombre
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

        this.tecnica = this.Entrada_detalles.tblBordado.tblTecnica_Bordados[0].tblTecnica.nombre
        // this.idmaquina = new FormControl(this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina);
        // this.idmachine = this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina
        // this.cabezalesmaquina = this.Entrada_detalles.tblEntrada_Maquinas[0].tblMaquina.cabezales
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

  buscarHistorial() {

    this.historial_lista = [];
    this.tablaProduccion.destroy()
    var envio = {
      fecha_inicio: this.historialForm.value.fechainicio + ' 00:00:00',
      fecha_fin: this.historialForm.value.fechafinal + ' 23:59:59',

    }
    // console.log(envio)


    this.serConexion.EntradaHistorial(envio).subscribe(
      success => {



        // console.log(success)
        this.historial_lista = success.datos
        // console.log(this.historial_lista)
        this.pintatabla()

        this.variable = true

        // console.log(this.historial_lista) 
        // for (var i = 0; i < this.historial_lista.length; i++) {
        //   // console.log(this.historial_lista[i].tblTrabajos_Realizados[0].tblUsuario.nombre)
        //   for (var ii = 0; ii < this.historial_lista[i].tblTrabajos_Realizados.length; ii++) {
        //     // console.log(this.historial_lista[i].tblTrabajos_Realizados[0].tblUsuario.nombre)

        //     if (this.historial_lista[i].tblTrabajos_Realizados[ii].tblUsuario.nombre != undefined) {
        //       // console.log('si')
        //       this.  variable = false
        //     } else {

        //       // console.log('no')
        //       this.  variable = true
        //     }

        //     // console.log(this.historial_lista[i].tblTrabajos_Realizados)
        //   }
        //   // this.historial_lista.tblTrabajos_Realizados[0].tblUsuario.nombre

        // }

      })

  }
  submitted = false;
  advertencia = false;
  onSubmit() {
    this.submitted = true;
    this.advertencia = false
    if (this.EntradaForm.invalid) {
      return;
    }
    if (Number(this.EntradaForm.value.numero) < this.realizadas) {
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
          this.buscarHistorial()
          this.cierraModal()
        });
      }


    }
  }
  get f(): { [key: string]: AbstractControl } {
    return this.EntradaForm.controls;
  }
  variable3 = false

  obtenerClienteBordadosadd() {

    this.lista_clienteBordado = [];

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


  cancelar1(lugar: any) {

    this.idcancelacion = this.historial_lista[lugar].identrada

  }

  cancelar() {

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


        this.buscarHistorial()

        // this.cargarProduccion();
        // this.cargarProduccion();
      },
      // error => {
      //   this.router.navigate(['/login'], { relativeTo: this.activeRoute });
      //   console.log(error);
      // }
    );
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
  }
}



