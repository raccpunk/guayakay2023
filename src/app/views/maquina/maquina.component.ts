import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormArray, Validators, FormControl, AbstractControl, FormGroup } from '@angular/forms';
import { ConexionService } from '../../servicios/conexion/conexion.service';
import { ValidacionService } from '../../servicios/validaciones/validacion.service';
import { AlmacenamientoService } from '../../servicios/almacenamiento/almacenamiento.service';
import { Maquinas } from '../../interfaz/maquinas'

@Component({
  selector: 'app-maquina',
  templateUrl: './maquina.component.html',
  styleUrls: ['./maquina.component.scss']
})
export class MaquinaComponent {
  @ViewChild('button_close_registerM') closebutton: any;
  @ViewChild('staticBackdropModal') modal: any;
  @ViewChild('button_close_modal3') closebutton3: any;
  @ViewChild('staticBackdropModal3') modal3: any;
  @ViewChild('button_close_modal4') closebutton4: any;
  @ViewChild('staticBackdropModal4') modal4: any;

  submitted = false;
  maquina: Maquinas[] = [];
  alta = true;
  idfinal: any;
  datos: any;

  MaquinaU: Maquinas[] = [{
    idmaquina: 0,
    nombre: '',
    descripcion: '',
    cabezal: '',
    activo: true,
  }]
  MaquinasForm = this.fb.group({
    id: [''],
    descripcion: ['', Validators.required],
    nombre: ['', Validators.required],
  });
  editMaquinaForm = this.fb.group({
    descripcion: ['', Validators.required],
    nombre: ['', Validators.required],
  });

  lista_maquinas: any;
  tablamaquina: any;

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
    return this.MaquinasForm.controls;
  }
  get f2(): { [key: string]: AbstractControl } {
    return this.editMaquinaForm.controls;
  }
  ngOnInit(): void {
    this.obtenerMaquinas();

  }

  pintatabla(){
    setTimeout(()=>{     
      this.tablamaquina = $('#datatable-maquinas').DataTable( {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,

        lengthMenu: [5, 10, 25],
        order: [4, 'DESC'],
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
        // responsive: true,
      });
    }, 1200);
  }
  private cierraModal(): void {
    this.closebutton.nativeElement.click();
  }
  private cierraModal3(): void {
    this.closebutton3.nativeElement.click();
  }

  private cierraModal4(): void {
    this.closebutton4.nativeElement.click();
  }


  onSubmit() {
    this.submitted = true;
    if (this.MaquinasForm.invalid) {
      return;
    }
    var envio = {
      nombre: this.MaquinasForm.value.nombre,
      descripcion: this.MaquinasForm.value.descripcion,

    }
    console.log(envio)
    this.serConexion.maquinaRegistrar(envio).subscribe(
      success => {
        console.log(success)
        this.datos = success
        this.lista_maquinas.push(success.datos)
        this.MaquinasForm = this.fb.group({
          id: [''],
          descripcion: ['', Validators.required],
          nombre: ['', Validators.required],
        });
        this.submitted = false;
        this.cierraModal()
      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        console.log(error);
      }
    );
  }
  //carga del catalogo de maquinas
  obtenerMaquinas() {
    this.serConexion.maquinaListaAll().subscribe(
      success => {

        this.lista_maquinas = success.datos
        console.log(this.lista_maquinas);
        this.pintatabla();
      },
      // error => {
      //   this.router.navigate(['/login'], { relativeTo: this.activeRoute });
      //   console.log(error);
      // }
    );
  }


  Desactivar() {
    var envio = {
      "activo": false
    }
    var ids = this.idfinal
    console.log(envio)
    this.serConexion.maquinaStatus(ids, envio).subscribe(data => {
      console.log(data)
      this.datos = data
      this.obtenerMaquinas()
      this.cierraModal3()
      setTimeout(() => {
      alert('maquina desactivada con exito');
    }, 100);
    });
  }

  Activar() {
    var envio = {
      "activo": true
    }
    var ids = this.idfinal
    console.log(envio)
    this.serConexion.maquinaStatus(ids, envio).subscribe(data => {
      console.log(data)
      this.datos = data
      this.obtenerMaquinas()
      this.cierraModal4()
      setTimeout(() => {
      alert('maquina activada con exito');
    }, 100);
    });
  }


  getArray(lugar: number) {
    this.MaquinaU[0].idmaquina = this.lista_maquinas[lugar].idmaquina;
    this.MaquinaU[0].nombre = this.lista_maquinas[lugar].nombre;
    this.MaquinaU[0].descripcion = this.lista_maquinas[lugar].descripcion;

    this.MaquinaU[0].activo = this.lista_maquinas[lugar].activo;


    this.idfinal = this.lista_maquinas[lugar].idmaquina
    this.editMaquinaForm.controls['nombre'].setValue(this.lista_maquinas[lugar].nombre);
    this.editMaquinaForm.controls['descripcion'].setValue(this.lista_maquinas[lugar].descripcion);



  }

 

  onSubmit2() {
    this.submitted = true;
    if (this.editMaquinaForm.invalid) {
      return;
    }
    var envio = {
      nombre: this.editMaquinaForm.value.nombre,
      descripcion: this.editMaquinaForm.value.descripcion
    }
    var ids = this.idfinal
    console.log(envio)
    this.serConexion.maquinaActualiza(ids, envio).subscribe(data => {
      console.log(data)
      this.datos = data
      window.location.reload();

    });

  }
}
