
import { FormGroup } from '@angular/forms';
import { Component, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormArray, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ConexionService } from '../../servicios/conexion/conexion.service';
import { ValidacionService } from '../../servicios/validaciones/validacion.service';
import { AlmacenamientoService } from '../../servicios/almacenamiento/almacenamiento.service';
import { Bordados } from 'src/app/interfaz/bordados';
import { Clientes } from 'src/app/interfaz/cliente';
import { Tecnicas } from 'src/app/interfaz/tecnicas';
import { aros } from 'src/app/interfaz/aros'
import { img_url } from 'src/app/servicios/guard/guard.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';

interface hilos {
  orden: number;
  hilo: string;
}

@Component({
  selector: 'app-bordados',
  templateUrl: './bordados.component.html',
  styleUrls: ['./bordados.component.scss']
})

export class BordadosComponent {
  //MODAL EDITAR
  @ViewChild('button_close_detalles') closebutton: any;
  @ViewChild('staticBackdropModal5') modal: any;
  //MODAL AGREGAR
  @ViewChild('button_close_add') closebutton2: any;
  @ViewChild('staticBackdropModal') modal2: any;
  //MODAL DESACTIVAR
  @ViewChild('button_close_add3') closebutton3: any;
  @ViewChild('staticBackdropModal3') modal3: any;
  //MODAL ACTIVAR
  @ViewChild('button_close_add4') closebutton4: any;
  @ViewChild('staticBackdropModal4') modal4: any;
  idcliente: any = new FormControl(0);
  clienteA: Clientes[] = [];
  tecnicaB: Tecnicas[] = []
  cabezal: aros[] = [];
  identrada: any;
  idcliente2: any;
  idbordado: any;
  cadena: any
  submitted = false;
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
  clienteSeleccionado: Clientes[] = [];
  bordadosLista: Bordados[] = [];
  BordadoFormDinamic!: FormGroup;
  data_envio = {
    idbordado: '',
    idcliente: '',
    disenio: ['', Validators.required],
    puntadas: [''],
    Tecnica: '',
    aro: '',
    alto: '',
    ancho: '',
    activo: '',
    tiempot: '',
    observacion: '',
    portada: '',
    imagen1: '',
    imagen2: '',
    imagen3: '',
    puntero: '',
    //variable dinamica
    patrones: [
      {
        orden: '',
        hilo: ['', Validators.required],
      },
    ],
  };

  editBordadoFormDinamic!: FormGroup;
  data_envio2 = {
    idbordado: '',
    idcliente: '',
    disenio: '',
    puntadas: '',
    Tecnica: '',
    aro: '',
    alto: [''],
    ancho: [''],
    activo: '',
    tiempot: '',
    observacion: '',
    portada: '',
    imagen1: '',
    imagen2: '',
    imagen3: '',
    puntero: '',
    //variable dinamica
    patrones: [
      {
        orden: '',
        hilo: ['', Validators.required],


      },

    ],
  };
  mostrar = false;
  lista_clientes: any = [];
  lista_clienteBordado: any = [];
  lista_clienteBordados: any = [];
  idfinal: any;
  datos: any;
  lista_cabezales: any;
  lista_tecnicas: any;
  BordadosU: Bordados[] = [{
    idbordado: '0',
    nombre: '',
    portada: '',

  }]
  hilosA: hilos[] = []
  file: any;
  formData: any = new FormData();
  bordado_detalle: any = [];
  num_puntadas: any;
  tecnicaid: any;
  cabezalid: any;
  nombreid: any;
  img_urlfront = img_url;
  imagen1: any;
  imagen2: any;
  imagen3: any;
  prueba: any = [];
  tablabordado: any;
  mensaje_error: any;
  myFullresImage: any;
  zoomService: any;
  myThumbnail: any;
  activos_lista: any = [];
  permiso: any;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  variable = false;
  variable2 = false;
  variable3 = false;
  variable4 = false;
  variable5 = false;
  advertencia = false;
  galeriaAbierta: boolean = true;
  Evariable = false;
  Evariable2 = false;

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

    if (localStorage.getItem('permiso') == 'administrador') {
      this.permiso = 'admin'
    }
    if (localStorage.getItem('permiso') == 'finanzas') {
      this.permiso = 'false'
    }
    if (localStorage.getItem('permiso') == 'ventas') {
      this.permiso = 'false'
    }
    if (localStorage.getItem('permiso') == 'bordador') {
      this.permiso = 'false'
    }
    this.myThumbnail = ''
    this.cargarClientes(),
      this.cargarCabezales(),
      this.cargarTecnicas(),
      this.BordadoFormDinamic = new FormGroup({
        idcliente: new FormControl('0'),
        Tecnica: new FormControl('0'),
        aro: new FormControl('0'),
        disenio: new FormControl(''),
        puntadas: new FormControl(''),
        alto: new FormControl(''),
        ancho: new FormControl(''),
        activo: new FormControl(''),
        tiempot: new FormControl(''),
        observacion: new FormControl(''),
        portada: new FormControl(''),
        imagen1: new FormControl(''),
        imagen2: new FormControl(''),
        imagen3: new FormControl(''),
        patrones: new FormArray([this.initEntradasFormGroup()]),
      });

    this.editBordadoFormDinamic = new FormGroup({
      idcliente: new FormControl('0'),
      Tecnica: new FormControl('0'),
      aro: new FormControl('0'),
      disenio: new FormControl(''),
      puntadas: new FormControl(''),
      alto: new FormControl(''),
      ancho: new FormControl(''),
      activo: new FormControl(''),
      tiempot: new FormControl(''),
      observacion: new FormControl(''),
      portada: new FormControl(''),
      imagen1: new FormControl(''),
      imagen2: new FormControl(''),
      imagen3: new FormControl(''),
      patrones: new FormArray([]),
    });
    this.pintatabla();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.BordadoFormDinamic.controls;
  }
  get hilosLista() {
    return this.BordadoFormDinamic.get('patrones') as unknown as FormArray;
  }
  get hilosLista2() {
    return this.editBordadoFormDinamic.get('patrones') as unknown as FormArray;
  }
  //MODAL EDITAR
  private cierraModal(): void {
    this.closebutton.nativeElement.click();
  }
  //MODAL AGREGAR
  private cierraModal2(): void {
    this.closebutton2.nativeElement.click();
  }
  //MODAL DESACTIVAR
  private cierraModal3(): void {
    this.closebutton3.nativeElement.click();
  }
  //MODAL ACTIVAR
  private cierraModal4(): void {
    this.closebutton4.nativeElement.click();
  }
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
      this.tablabordado = $('#datatable-bordados').DataTable({
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        lengthMenu: [5, 10, 25],
        order: [1, 'asc'],
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
        responsive: true
      });
    }, 1000);
  }

  private cargarClientes() {
    if (localStorage.getItem('permiso') == 'recepción') {
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
    if (localStorage.getItem('permiso') == 'ventas') {
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
    if (localStorage.getItem('permiso') == 'bordador') {
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
  }

  private cargarCabezales(): void {
    this.serConexion.CabezalLista().subscribe(
      success => {
        this.lista_cabezales = success.datos
        // console.log(this.lista_cabezales);
      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        console.log(error);
      }
    );
  }

  private cargarTecnicas(): void {
    this.serConexion.TecnicaLista().subscribe(
      success => {
        this.lista_tecnicas = success.datos
        // console.log(this.lista_tecnicas);
      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        console.log(error);
      }
    );
  }

  numero = 1
  addhilos() {
    this.hilosLista.push(this.initEntradasFormGroup());
    this.actualizarOrden();
  }

  numero2 = 0
  addhilos2(color: string) {
    this.hilosLista2.push(this.initEntradasFormGroup2(color));
    this.actualizarOrden2()
  }

  initEntradasFormGroup() {
    return new FormGroup({
      orden: new FormControl(this.numero),
      hilo: new FormControl(''),
    });
  }

  initEntradasFormGroup2(color: string) {
    return new FormGroup({
      orden: new FormControl(this.numero2 - 1),
      hilo: new FormControl(color),
    });
  }

  onSubmit() {
    this.galeriaAbierta = true;
    // console.log(this.hilosLista.value[0].hilo)
    if (this.BordadoFormDinamic.value.disenio == '') {
      this.variable = true
    }
    else {
      this.variable = false
    }
    if (this.BordadoFormDinamic.value.idcliente < 1) {
      this.variable2 = true
    }
    else {
      this.variable2 = false
    }
    if (this.BordadoFormDinamic.value.Tecnica < 1) {
      this.variable3 = true
    }
    else {
      this.variable3 = false
    }
    if (this.BordadoFormDinamic.value.aro < 1) {
      this.variable4 = true
    }
    else {
      this.variable4 = false
    }
    for (var i = 0; i < this.hilosLista.value.length; i++) {
      if (this.hilosLista.value[i].hilo == '') {
        this.variable5 = true
      }
      else {
        this.variable5 = false
      }
    }
    console.log(this.hilosLista.value)
    if (this.BordadoFormDinamic.value.idcliente != 0 && this.BordadoFormDinamic.value.disenio != '' && this.BordadoFormDinamic.value.Tecnica != '0' && this.BordadoFormDinamic.value.aro != '0' && this.variable5 == false) {

      this.variable = false
      this.variable2 = false
      var bordado = {
        nombre: this.BordadoFormDinamic.value.disenio,
        num_puntadas: Number(this.BordadoFormDinamic.value.puntadas),
        alto: Number(this.BordadoFormDinamic.value.alto),
        ancho: Number(this.BordadoFormDinamic.value.ancho),
        observacion: this.BordadoFormDinamic.value.observacion,
        tiempo: (this.BordadoFormDinamic.value.tiempot) * 60,
      }
      console.log(bordado)
      this.formData.append('idcliente', Number(this.BordadoFormDinamic.value.idcliente))
      this.formData.append('idtecnica', Number(this.BordadoFormDinamic.value.Tecnica))
      this.formData.append('idcabezal', Number(this.BordadoFormDinamic.value.aro))
      this.formData.append('bordado', JSON.stringify(bordado))
      this.formData.append('secuencia', JSON.stringify(this.hilosLista.value))
      console.log(this.hilosLista.value)
      // Display the key/value pairs
      for (const pair of this.formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
      }
      console.log(this.formData.entries())
      this.serConexion.BordadoRegistrar(this.formData).subscribe(
        success => {

          this.datos = success
          this.formData = new FormData()
          console.log(this.formData)
          switch (this.datos.message) {
            case 'ya registrado':
              this.mensaje_error = 'EL BORDADO YA EXISTE';
              if (this.mensaje_error == 'EL BORDADO YA EXISTE') {
                this.advertencia = true
                this.selectedFiles = {};
                $("#fileControl").val('');
                $("#fileControl1").val('');
                $("#fileControl2").val('');
                $("#fileControl3").val('');
              }
              break;
            default:
              this.variable = false
              this.variable2 = false
              var bordado = {
                nombre: this.BordadoFormDinamic.value.disenio,
                num_puntadas: Number(this.BordadoFormDinamic.value.puntadas),
                alto: Number(this.BordadoFormDinamic.value.alto),
                ancho: Number(this.BordadoFormDinamic.value.ancho),
                observacion: this.BordadoFormDinamic.value.observacion,
                tiempot: (this.BordadoFormDinamic.value.tiempot) * 60,
              }
              this.formData.append('idcliente', Number(this.BordadoFormDinamic.value.idcliente))
              this.formData.append('idtecnica', Number(this.BordadoFormDinamic.value.Tecnica))
              this.formData.append('idcabezal', Number(this.BordadoFormDinamic.value.aro))
              this.formData.append('bordado', JSON.stringify(bordado))
              this.formData.append('secuencia', JSON.stringify(this.hilosLista.value))
              for (const pair of this.formData.entries()) {
                console.log(`${pair[0]}, ${pair[1]}`);
              }
              this.serConexion.BordadoRegistrar(this.formData).subscribe(
                success => {
                  this.datos = success
                  this.cierraModal2()
                  this.obtenerBordadosCliente()
                  this.formData = new FormData();

                },
                error => {
                  this.router.navigate(['/login'], { relativeTo: this.activeRoute });
                  console.log(error);
                  console.log('1')
                }
              );
          }
        },
        error => {
          this.router.navigate(['/login'], { relativeTo: this.activeRoute });
          console.log(error);
          console.log('2')
        }
      );
    }
  }



  limpiarformulario() {
    this.BordadoFormDinamic = new FormGroup({
      idcliente: new FormControl('0'),
      Tecnica: new FormControl('0'),
      aro: new FormControl('0'),
      disenio: new FormControl(''),
      puntadas: new FormControl(''),
      alto: new FormControl(''),
      ancho: new FormControl(''),
      activo: new FormControl(''),
      tiempot: new FormControl(''),
      observacion: new FormControl(''),
      portada: new FormControl(''),
      imagen1: new FormControl(''),
      imagen2: new FormControl(''),
      imagen3: new FormControl(''),
      patrones: new FormArray([this.initEntradasFormGroup()]),
    });
    this.selectedFiles = {};
  }

  onSubmit2() {
    this.galeriaAbierta = true;
    if (this.editBordadoFormDinamic.value.disenio == '') {
      this.Evariable = true
    }
    else {
      this.Evariable = false
    }
    for (var i = 0; i < this.hilosLista2.value.length; i++) {
      if (this.hilosLista2.value[i].hilo == '') {
        this.Evariable2 = true

      }
      else {
        this.Evariable2 = false
      }
    }
    // console.log(this.Evariable2)
    if (this.editBordadoFormDinamic.value.disenio != '' && this.Evariable2 == false) {

      var bordado = {
        nombre: this.editBordadoFormDinamic.value.disenio,
        num_puntadas: Number(this.editBordadoFormDinamic.value.puntadas),
        alto: Number(this.editBordadoFormDinamic.value.alto),
        ancho: Number(this.editBordadoFormDinamic.value.ancho),
        observacion: this.editBordadoFormDinamic.value.observacion,
        tiempo: (this.editBordadoFormDinamic.value.tiempot) * 60
      }
      // console.log(bordado)
      this.formData.append('idcliente', Number(this.editBordadoFormDinamic.value.idcliente))
      this.formData.append('idtecnica', Number(this.editBordadoFormDinamic.value.Tecnica))
      this.formData.append('idcabezal', Number(this.editBordadoFormDinamic.value.aro))
      this.formData.append('bordado', JSON.stringify(bordado))
      this.formData.append('secuencia', JSON.stringify(this.hilosLista2.value))
      // Display the key/value pairs

      for (const pair of this.formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
      }

      var ids = this.idfinal
      console.log(ids)
      console.log(this.formData)
      this.serConexion.BordadoActualiza(ids, this.formData).subscribe(
        success => {
          // console.log(success)
          this.datos = success
          this.cierraModal()
          this.obtenerBordadosCliente()
          this.formData = new FormData();
          // window.location.reload();

        },
        // error => {
        //   this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        //   console.log(error);
        // }
      );
    }
  }

  selectedFiles: { [key: string]: File } = {};

  protected onFileSelect(event: any, img: string) {
    const file = event.target.files[0];
    if (file) {
      // Verifica si ya existe un archivo para la clave img y lo elimina si es necesario
      if (this.selectedFiles.hasOwnProperty(img)) {
        delete this.selectedFiles[img];
      }
      // Almacena el nuevo archivo seleccionado en el objeto de seguimiento
      this.selectedFiles[img] = file;
      // Actualiza el formData principal con el nuevo archivo seleccionado
      this.updateFormData();
    }
  }
  private updateFormData() {
    // Crea un nuevo formData
    const formData = new FormData();
    // Agrega todas las imágenes seleccionadas al formData
    for (const key in this.selectedFiles) {
      if (this.selectedFiles.hasOwnProperty(key)) {
        formData.append(key, this.selectedFiles[key]);
      }
    }
    // Actualiza el formData principal con el nuevo formData creado
    this.formData = formData;
    // También puedes imprimir el formData para verificar
    console.log(this.formData);
  }
  //remover clone
  remove(index: number) {
    this.hilosLista.removeAt(index);
    this.actualizarOrden();
    if (this.hilosLista.length == 1) {
      this.mostrar = false;
    }
  }
  actualizarOrden() {
    this.hilosLista?.controls.forEach((control, index) => {
      control.get('orden')?.setValue(index + 1);
    });
  }
  actualizarOrden2() {
    this.hilosLista2?.controls.forEach((control, index) => {
      control.get('orden')?.setValue(index + 1);
    });
  }
  remove2(index: number) {
    this.hilosLista2.removeAt(index);
    this.actualizarOrden2()
    if (this.hilosLista2.length == 1) {
      this.mostrar = false;
    }
  }

  private cleanEditBordado(): void {
    while (this.hilosLista2.length !== 0) {
      this.hilosLista2.removeAt(0)
    }
  }

  disablededit = true
  obtenerBordadosCliente() {

    this.galeriaAbierta = true;
    if (this.idcliente.value == -2) {
      this.disablededit = true
      this.tablabordado.clear().destroy();;
      this.lista_clienteBordado = []
      // console.log('true-2')
      this.serConexion.BordadoListaD().subscribe(
        success => {

          this.activos_lista = success.datos
          for (var i = 0; i < this.activos_lista.length; i++) {
            var idbord = this.activos_lista[i].idbordado;
            // console.log(this.activos_lista[i].nombre);
            // console.log(this.activos_lista[i].nombre);
            var idbor = this.activos_lista[i].idbordado
            var tblBordado = {
              nombre: this.activos_lista[i].nombre,
              alto: this.activos_lista[i].alto,
              ancho: this.activos_lista[i].ancho,
              observacion: this.activos_lista[i].observacion,
              portada: this.activos_lista[i].portada,
              activo: this.activos_lista[i].activo,

            }
            var precio = [{
              max: this.activos_lista[i].precio[0].max,
              min: this.activos_lista[i].precio[0].min,
              sugerido: this.activos_lista[i].precio[0].sugerido


            }]

            // var alto = this.activos_lista[i].alto
            // var ancho = this.activos_lista[i].ancho
            // var observacion = this.activos_lista[i].observacion
            // var portada = this.activos_lista[i].portada
            // var activo = this.activos_lista[i].activo
            this.lista_clienteBordado.push({
              idbordado: idbor,
              tblBordado: tblBordado,
              precio: precio
              // alto: tblBordado,
              // ancho: tblBordado,
              // observacion: tblBordado,
              // portada: tblBordado,
              // activo: tblBordado



            })

          }

          // console.log(this.lista_clienteBordado)
          this.pintatabla();
          setTimeout(() => {
            this.disablededit = false
          }, 1200);
        },
      );
    }

    else if (this.idcliente.value == -1) {
      this.disablededit = true
      // console.log('true-1')
      this.lista_clienteBordado = []
      this.tablabordado.clear().destroy();
      this.serConexion.BordadoListap().subscribe(
        success => {

          this.activos_lista = success.datos
          for (var i = 0; i < this.activos_lista.length; i++) {
            var idbord = this.activos_lista[i].idbordado;
            // console.log(this.activos_lista[i].nombre);
            // console.log(this.activos_lista[i].nombre);
            var idbor = this.activos_lista[i].idbordado
            var tblBordado = {
              nombre: this.activos_lista[i].nombre,
              alto: this.activos_lista[i].alto,
              ancho: this.activos_lista[i].ancho,
              observacion: this.activos_lista[i].observacion,
              portada: this.activos_lista[i].portada,
              activo: this.activos_lista[i].activo,
            }
            var precio = [{
              max: this.activos_lista[i].precio[0].max,
              min: this.activos_lista[i].precio[0].min,
              sugerido: this.activos_lista[i].precio[0].sugerido
            }]

            // var alto = this.activos_lista[i].alto
            // var ancho = this.activos_lista[i].ancho
            // var observacion = this.activos_lista[i].observacion
            // var portada = this.activos_lista[i].portada
            // var activo = this.activos_lista[i].activo
            this.lista_clienteBordado.push({
              idbordado: idbor,
              tblBordado: tblBordado,
              precio: precio
              // alto: tblBordado,
              // ancho: tblBordado,
              // observacion: tblBordado,
              // portada: tblBordado,
              // activo: tblBordado
            })

          }

          // console.log(this.lista_clienteBordado)
          this.pintatabla();
          setTimeout(() => {
            this.disablededit = false
          }, 1200);

        },
      );
    }
    else if (this.idcliente.value > 0) {
      this.disablededit = true
      var id = this.idcliente.value;
      this.tablabordado.clear().destroy();
      this.serConexion.BordadoCliente(id).subscribe(
        success => {
          this.lista_clienteBordado = success.datos
          this.pintatabla();
          setTimeout(() => {
            this.disablededit = false
          }, 1200);
        },
      );
    }
  }
  sinportada = false
  sinportada1 = false
  sinportada2 = false
  sinportada3 = false
  pruebas = false
  minutos = 0
  resto = 0

  getArray(lugar: number) {
    this.idfinal = ''
    this.minutos = 0
    this.resto = 0
    this.galeriaAbierta = true;
    this.myThumbnail = 'https://guayakay-api-prod.basotecnologias.com/static/'
    this.hilosA = [];
    this.idfinal = this.lista_clienteBordado[lugar].idbordado
    this.editBordadoFormDinamic.controls['portada'].setValue(null);
    this.editBordadoFormDinamic.controls['imagen1'].setValue(null);
    this.editBordadoFormDinamic.controls['imagen2'].setValue(null);
    this.editBordadoFormDinamic.controls['imagen3'].setValue(null);

    this.serConexion.BordadoDetalle(this.idfinal).subscribe(
      success => {

        this.bordado_detalle = success.datos;
        // console.log(this.bordado_detalle);
        this.portada = img_url + this.bordado_detalle.portada;
        this.nombre = this.bordado_detalle.tblCliente_Bordados[0].tblCliente.nombre;
        this.nombreid = this.bordado_detalle.tblCliente_Bordados[0].tblCliente.idcliente;
        this.nombreBordado = this.bordado_detalle.nombre;
        this.alto = this.bordado_detalle.alto;
        this.ancho = this.bordado_detalle.ancho;
        this.observacionB = this.bordado_detalle.observacion;
        this.portada = img_url + this.bordado_detalle.portada;
        this.imagen1 = img_url + this.bordado_detalle.imagen1;
        this.imagen2 = img_url + this.bordado_detalle.imagen2;
        this.imagen3 = img_url + this.bordado_detalle.imagen3;
        if (this.portada == 'https://guayakay-api-prod.basotecnologias.com/static/') {
          this.portada = 'assets/lotto/sinfondo.png'
        }
        else {
          this.portada = img_url + this.bordado_detalle.portada
        }
        if (this.imagen1 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
          this.imagen1 = 'assets/lotto/sinfondo.png'
        }
        else {
          this.imagen1 = img_url + this.bordado_detalle.imagen1
        }
        if (this.imagen2 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
          this.imagen2 = 'assets/lotto/sinfondo.png'
        }
        else {
          this.imagen2 = img_url + this.bordado_detalle.imagen2
        }

        if (this.imagen3 == 'https://guayakay-api-prod.basotecnologias.com/static/') {
          this.imagen3 = 'assets/lotto/sinfondo.png'
        }
        else {
          this.imagen3 = img_url + this.bordado_detalle.imagen3
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

        this.num_puntadas = this.bordado_detalle.num_puntadas
        this.tecnica = this.bordado_detalle.tblTecnica_Bordados[0].tblTecnica.nombre
        this.tecnicaid = this.bordado_detalle.tblTecnica_Bordados[0].idtecnica
        this.cabezal = this.bordado_detalle.tblBordado_Cabezals[0].tblCabezale.nombre
        this.cabezalid = this.bordado_detalle.tblBordado_Cabezals[0].idcabezal
        this.tiempo = this.bordado_detalle.tiempo
        this.minutos = Math.floor(this.tiempo / 60);
        this.resto = this.tiempo % 60;
        console.log(this.bordado_detalle)
        this.numero2 = 1
        this.cleanEditBordado()
        for (var i = 0; i < this.bordado_detalle.tblBordado_Patrons.length; i++) {
          this.addhilos2(this.bordado_detalle.tblBordado_Patrons[i].hilo)
          this.orden = this.bordado_detalle.tblBordado_Patrons[i].orden;
          this.hilo = this.bordado_detalle.tblBordado_Patrons[i].hilo;
          this.hilosA.push({
            orden: this.orden,
            hilo: this.hilo,
          })
        };

        if (this.bordado_detalle.tblBordado_Patrons.length == 0) {
          this.addhilos2('')
        }
        this.editBordadoFormDinamic.controls['patrones'].value
        this.editBordadoFormDinamic.controls['idcliente'].setValue(this.nombreid);
        this.editBordadoFormDinamic.controls['Tecnica'].setValue(this.tecnicaid);
        this.editBordadoFormDinamic.controls['aro'].setValue(this.cabezalid);
        this.editBordadoFormDinamic.controls['disenio'].setValue(this.nombreBordado);
        this.editBordadoFormDinamic.controls['puntadas'].setValue(this.num_puntadas);
        this.editBordadoFormDinamic.controls['alto'].setValue(this.alto);
        this.editBordadoFormDinamic.controls['ancho'].setValue(this.ancho);
        this.editBordadoFormDinamic.controls['tiempot'].setValue(this.minutos);
        this.editBordadoFormDinamic.controls['observacion'].setValue(this.observacionB);
        this.editBordadoFormDinamic.controls['portada'].setValue(this.portada);
        this.editBordadoFormDinamic.controls['imagen1'].setValue(this.lista_clienteBordado[lugar].tblBordado.imagen1);
        this.editBordadoFormDinamic.controls['imagen2'].setValue(this.lista_clienteBordado[lugar].tblBordado.imagen2);
        this.editBordadoFormDinamic.controls['imagen3'].setValue(this.lista_clienteBordado[lugar].tblBordado.imagen3);
      })
  }


  Desactivar() {
    var envio = {
      "activo": false
    }
    var ids = this.idfinal
    // console.log(envio)
    this.serConexion.BordadoStatus(ids, envio).subscribe(data => {
      // console.log(data)
      this.datos = data
      this.cierraModal3()
      this.obtenerBordadosCliente()
    });
  }

  Activar() {
    var envio = {
      "activo": true
    }
    var ids = this.idfinal
    // console.log(envio)
    this.serConexion.BordadoStatus(ids, envio).subscribe(data => {
      // console.log(data)
      this.datos = data
      this.cierraModal4()
      this.obtenerBordadosCliente()
    });
  }

}
