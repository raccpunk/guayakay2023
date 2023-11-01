
import { FormGroup } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
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
import { img_urllocal } from 'src/app/servicios/guard/guard.service';
import { isConstructorDeclaration } from 'typescript/lib/tsserverlibrary';
import 'DataTables.net'
import * as $ from "jquery";



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
  idcliente = new FormControl(0);
  clienteA: Clientes[] = [];
  tecnicaB: Tecnicas[] = []
  cabezal: aros[] = [];
  identrada: any;
  idcliente2: any;
  idbordado: any;


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
    disenio: '',
    puntadas: '',
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
  mostrar = false;
  lista_clientes: any = [];
  lista_clienteBordado: any = [];
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
  submitted = false;
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
  tablabordados: any;
  prueba: any = [];



  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public serConexion: ConexionService,
    private formBuilder: FormBuilder,
    public serValidacion: ValidacionService,
    public serAlmacen: AlmacenamientoService,
    private fb: FormBuilder
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.BordadoFormDinamic.controls;
  }
  get hilosLista() {
    return this.BordadoFormDinamic.get('patrones') as unknown as FormArray;
  }
  get hilosLista2() {
    return this.editBordadoFormDinamic.get('patrones') as unknown as FormArray;
  }

  pintatabla() {

    this.tablabordados = $('#datatable-bordados').DataTable({
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      // responsive: true,
      lengthMenu: [5, 10, 25],
      order: [1, 'asc'],
      columnDefs: [{ "targets": 0 }],
      language: {
        "lengthMenu": "Mostrar _MENU_ resultados",
        "zeroRecords": "No se encontraron resultados",
        "info": "Mostrando resultados _START_-_END_ de  _TOTAL_",
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


  }






  private cargarClientes() {
    if (localStorage.getItem('permiso') == 'recepción') {
      this.serConexion.ClienteListaR().subscribe(
        success => {

          this.lista_clientes = success.datos
          console.log(this.lista_clientes);




        },
        error => {
          this.router.navigate(['/login'], { relativeTo: this.activeRoute });
          console.log(error);
        }

      );
    }
    if (localStorage.getItem('permiso') == 'administrador') {
      this.serConexion.ClienteLista().subscribe(
        success => {

          this.lista_clientes = success.datos
          console.log(this.lista_clientes);




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
        console.log(this.lista_cabezales);

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
        console.log(this.lista_tecnicas);

      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        console.log(error);
      }
    );
  }

  ngOnInit(): void {

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
      patrones: new FormArray([this.initEntradasFormGroup2()]),
    });
    this.pintatabla();
  }
  numero = 1
  addhilos() {
    this.numero++;
    this.hilosLista.push(this.initEntradasFormGroup());


  }
  numero2 = 1
  addhilos2() {
    this.numero2++;
    this.hilosLista2.push(this.initEntradasFormGroup2());


  }
  initEntradasFormGroup() {
    return new FormGroup({
      orden: new FormControl(this.numero),
      hilo: new FormControl(''),
    });
  }

  initEntradasFormGroup2() {
    return new FormGroup({
      orden: new FormControl(this.numero2),
      hilo: new FormControl(''),
    });
  }

  onSubmit() {

    this.submitted = true;
    if (this.BordadoFormDinamic.invalid) {
      return;
    }

    var bordado = {
      nombre: this.BordadoFormDinamic.value.disenio,
      num_puntadas: Number(this.BordadoFormDinamic.value.puntadas),
      alto: Number(this.BordadoFormDinamic.value.alto),
      ancho: Number(this.BordadoFormDinamic.value.ancho),
      observacion: this.BordadoFormDinamic.value.observacion,
    }

    this.formData.append('idcliente', Number(this.BordadoFormDinamic.value.idcliente))
    this.formData.append('idtecnica', Number(this.BordadoFormDinamic.value.Tecnica))
    this.formData.append('idcabezal', Number(this.BordadoFormDinamic.value.aro))
    this.formData.append('bordado', JSON.stringify(bordado))
    this.formData.append('secuencia', JSON.stringify(this.hilosLista.value))
    // Display the key/value pairs
    for (const pair of this.formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    this.serConexion.BordadoRegistrar(this.formData).subscribe(
      success => {
        console.log(success)
        this.datos = success
        window.location.reload();

      },
      // error => {
      //   this.router.navigate(['/login'], { relativeTo: this.activeRoute });
      //   console.log(error);
      // }
    );
  }


  onSubmit2() {
    this.submitted = true;
    if (this.editBordadoFormDinamic.invalid) {
      return;
    }


    var bordado = {
      nombre: this.editBordadoFormDinamic.value.disenio,
      num_puntadas: Number(this.editBordadoFormDinamic.value.puntadas),
      alto: Number(this.editBordadoFormDinamic.value.alto),
      ancho: Number(this.editBordadoFormDinamic.value.ancho),
      observacion: this.editBordadoFormDinamic.value.observacion,
    }

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
    console.log(this.formData)
    this.serConexion.BordadoActualiza(ids, this.formData).subscribe(
      success => {
        console.log(success)
        this.datos = success
        // window.location.reload();

      },
      // error => {
      //   this.router.navigate(['/login'], { relativeTo: this.activeRoute });
      //   console.log(error);
      // }
    );
  }

  protected onFileSelect(event: any, img: string) {
    this.file = event.target.files[0];
    this.formData.append(img, this.file);

    console.log(this.file)

  }

  //remover clone
  remove(index: number) {
    this.hilosLista.removeAt(index);
    if (this.hilosLista.length == 1) {
      this.mostrar = false;
    }
  }

  remove2(index: number) {
    this.hilosLista2.removeAt(index);
    if (this.hilosLista2.length == 1) {
      this.mostrar = false;
    }
  }


  obtenerBordadosCliente() {



    var id = this.idcliente.value;

    this.serConexion.BordadoCliente(id).subscribe(
      success => {
        this.tablabordados.destroy();
        this.lista_clienteBordado = success.datos
        console.log(this.lista_clienteBordado);
        setTimeout(() => {
          this.pintatabla();
        }, 1500)
      },
    );
  }

  getArray(lugar: number) {


    this.hilosA = [];
    this.idfinal = this.lista_clienteBordado[lugar].idbordado

    this.serConexion.BordadoDetalle(this.idfinal).subscribe(
      success => {
        this.bordado_detalle = success.datos
        console.log(this.bordado_detalle);

        this.nombre = this.bordado_detalle.tblCliente_Bordados[0].tblCliente.nombre
        this.nombreid = this.bordado_detalle.tblCliente_Bordados[0].tblCliente.idcliente
        this.nombreBordado = this.bordado_detalle.nombre
        this.alto = this.bordado_detalle.alto
        this.ancho = this.bordado_detalle.ancho
        this.observacionB = this.bordado_detalle.observacion
        this.portada = img_url + this.bordado_detalle.portada
        console.log(this.portada)
        this.imagen1 = img_url + this.bordado_detalle.imagen1
        this.imagen2 = img_url + this.bordado_detalle.imagen2
        this.imagen3 = img_url + this.bordado_detalle.imagen3
        this.num_puntadas = this.bordado_detalle.num_puntadas
        this.tecnica = this.bordado_detalle.tblTecnica_Bordados[0].tblTecnica.nombre
        this.tecnicaid = this.bordado_detalle.tblTecnica_Bordados[0].idtecnica
        this.cabezal = this.bordado_detalle.tblBordado_Cabezals[0].tblCabezale.nombre
        this.cabezalid = this.bordado_detalle.tblBordado_Cabezals[0].idcabezal
        console.log(this.bordado_detalle.tblBordado_Patrons)

        for (var i = 0; i < this.bordado_detalle.tblBordado_Patrons.length; i++) {
        
          this.orden = this.bordado_detalle.tblBordado_Patrons[i].orden;
          this.hilo = this.bordado_detalle.tblBordado_Patrons[i].hilo;


          this.hilosA.push({
            orden: this.orden,
            hilo: this.hilo,

          })
          
          // let formArr = <FormArray>this.editBordadoFormDinamic.controls['patrones'];
          // formArr.controls[i].setValue({orden: this.orden,});
          // console.log(formArr.controls[i].setValue([this.hilosA[i]]))
           this.editBordadoFormDinamic.controls['patrones'].setValue([this.hilosA[i]])

        };

      

        this.editBordadoFormDinamic.controls['idcliente'].setValue(this.nombreid);
        this.editBordadoFormDinamic.controls['Tecnica'].setValue(this.tecnicaid);
        this.editBordadoFormDinamic.controls['aro'].setValue(this.cabezalid);
        this.editBordadoFormDinamic.controls['disenio'].setValue(this.nombreBordado);
        this.editBordadoFormDinamic.controls['puntadas'].setValue(this.num_puntadas);
        this.editBordadoFormDinamic.controls['alto'].setValue(this.alto);
        this.editBordadoFormDinamic.controls['ancho'].setValue(this.ancho);
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
    console.log(envio)
    this.serConexion.BordadoStatus(ids, envio).subscribe(data => {
      console.log(data)
      this.datos = data
      window.location.reload();
    });
  }

  Activar() {
    var envio = {
      "activo": true
    }
    var ids = this.idfinal
    console.log(envio)
    this.serConexion.BordadoStatus(ids, envio).subscribe(data => {
      console.log(data)
      this.datos = data
      window.location.reload();
    });
  }

}
