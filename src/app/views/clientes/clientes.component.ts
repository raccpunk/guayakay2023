import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ConexionService } from '../../servicios/conexion/conexion.service';
import { ValidacionService } from '../../servicios/validaciones/validacion.service';
import { AlmacenamientoService } from '../../servicios/almacenamiento/almacenamiento.service';
import { Clientes } from '../../interfaz/cliente'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {
  //MODAL AGREGAR
  @ViewChild('button_close_detail') closebutton: any;
  @ViewChild('staticBackdropModal') modal: any;
   //MODAL DE ACTUALIZAR 
   @ViewChild('button_close_detail5') closebutton5: any;
   @ViewChild('staticBackdropModal5') modal5: any;
  // MODAL DE DESACTIVAR 
  @ViewChild('button_close_detail3') closebutton3: any;
  @ViewChild('staticBackdropModal3') modal3: any;
  // MODAL DE ACTIVAR 
  @ViewChild('button_close_detail4') closebutton4: any;
  @ViewChild('staticBackdropModal4') modal4: any;
  lista_clientes: any = [];
  datos: any;
  submitted = false;
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

  clientForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', Validators.required],
    estado: ['', Validators.required],
    telefono: ['', Validators.required],
    razon_social: [''],
    rfc: [''],
    direccion: [''],
    codigo_postal: [''],
    empresa: [''],
  });

  EditclientForm = this.fb.group({
    nombre: ['', Validators.required],
    email: ['', Validators.required],
    estado: ['', Validators.required],
    telefono: ['', Validators.required],
    razon_social: [''],
    rfc: [''],
    direccion: [''],
    codigo_postal: [''],
    empresa: [''],
  });
  idfinal: any;
  tablaclientes: any;
  mensaje_error: any;
  permiso: any;
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
    this.cargarClientes();

    if (localStorage.getItem('permiso') == 'administrador') {
      this.permiso = 'admin'
    }
    if (localStorage.getItem('permiso') == 'recepción') {
      this.permiso = 'recepcion'
    }

  }
  //MODAL DE AGREGAR 
  private cierraModal(): void {
    this.closebutton.nativeElement.click();
  }
  // MODAL DE DESACTIVAR 
  private cierraModal3(): void {
    this.closebutton3.nativeElement.click();
  }
  // MODAL DE ACTIVAR 
  private cierraModal4(): void {
    this.closebutton4.nativeElement.click();
  }
   // MODAL DE ACTUALIZAR 
   private cierraModal5(): void {
    this.closebutton5.nativeElement.click();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.clientForm.controls;
  }
  get f2(): { [key: string]: AbstractControl } {
    return this.EditclientForm.controls;
  }


  private cargarClientes(): void {
    if (localStorage.getItem('permiso') == 'administrador') {
      this.serConexion.ClienteLista().subscribe(
        success => {

          this.lista_clientes = success.datos
          // console.log(this.lista_clientes);
          this.pintatabla()
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
          this.pintatabla()



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
          this.pintatabla()



        },
        error => {
          this.router.navigate(['/login'], { relativeTo: this.activeRoute });
          console.log(error);
        }

      );
    }
    if (localStorage.getItem('permiso') == 'ventas') {
      this.serConexion.ClienteLista().subscribe(
        success => {

          this.lista_clientes = success.datos
          // console.log(this.lista_clientes);
          this.pintatabla()



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
          this.pintatabla()
        },
        error => {
          this.router.navigate(['/login'], { relativeTo: this.activeRoute });
          console.log(error);
        }
      );
    }
  }

  pintatabla() {
    setTimeout(() => {
      this.tablaclientes = $('#datatable-clientes').DataTable({
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,

        lengthMenu: [5, 10, 25],
        order: [4, 'DESC'],
        columnDefs: [{ "targets": 3 }],
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
        responsive: true,
      });
    }, 500);
  }

  variable = false
  onSubmit() {

    this.submitted = true;
    if (this.clientForm.invalid) {
      return;
    }
    var envio = {
      nombre: this.clientForm.value.nombre,
      email: this.clientForm.value.email,
      telefono: this.clientForm.value.telefono,
      estado: this.clientForm.value.estado,
      razon_social: this.clientForm.value.razon_social,
      rfc: this.clientForm.value.rfc,
      direccion: this.clientForm.value.direccion,
      codigo_postal: this.clientForm.value.codigo_postal,
      empresa: this.clientForm.value.empresa,

    }

    // console.log(envio)
    this.serConexion.ClienteRegistrar(envio).subscribe(
      success => {
        // console.log(success)
        this.datos = success

        switch (this.datos.message) {
          case 'ya registrado':
            this.mensaje_error = 'EL USUARIO YA EXISTE';
            if (this.mensaje_error == 'EL USUARIO YA EXISTE') {
              this.variable = true
            }

            break;
          // case 403:
          //   this.mensaje_error = 'CONTRASEÑA INCORRECTA';
          // break;
          default:
            this.serConexion.ClienteRegistrar(envio).subscribe(
              success => {
                // console.log(success)
                this.datos = success
             
                this.tablaclientes.clear().destroy();
                this.cargarClientes();
                this.cierraModal()

              },
              error => {
                this.router.navigate(['/login'], { relativeTo: this.activeRoute });
                console.log(error);
              }
            );
        }
      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        console.log(error);
      }
    );
  }

  onSubmit2() {
    var ids = this.idfinal
    this.submitted = true;
    if (this.EditclientForm.invalid) {
      return;
    }
    var envio = {
      nombre: this.EditclientForm.value.nombre,
      email: this.EditclientForm.value.email,
      telefono: this.EditclientForm.value.telefono,
      estado: this.EditclientForm.value.estado,
      razon_social: this.EditclientForm.value.razon_social,
      rfc: this.EditclientForm.value.rfc,
      direccion: this.EditclientForm.value.direccion,
      codigo_postal: this.EditclientForm.value.codigo_postal,
      empresa: this.EditclientForm.value.empresa,
    }
    // console.log(envio)
    this.serConexion.ClienteActualiza(ids, envio).subscribe(
      success => {
        // console.log(success)
        this.tablaclientes.clear().destroy();
        this.cargarClientes();
        this.cierraModal5()

      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        console.log(error);
      }
    );
  }
  getArray(lugar: number) {
    this.idfinal = this.lista_clientes[lugar].idcliente
    this.clienteAselect[0].idcliente = this.lista_clientes[lugar].idcliente;
    this.clienteAselect[0].nombre = this.lista_clientes[lugar].nombre;
    this.clienteAselect[0].email = this.lista_clientes[lugar].email;
    this.clienteAselect[0].razon_social = this.lista_clientes[lugar].razon_social;
    this.clienteAselect[0].rfc = this.lista_clientes[lugar].rfc;
    this.clienteAselect[0].direccion = this.lista_clientes[lugar].direccion;
    this.clienteAselect[0].codigo_postal = this.lista_clientes[lugar].codigo_postal;
    this.clienteAselect[0].telefono = this.lista_clientes[lugar].telefono;
    this.clienteAselect[0].empresa = this.lista_clientes[lugar].empresa;
    this.clienteAselect[0].estado = this.lista_clientes[lugar].estado;
    this.clienteAselect[0].activo = this.lista_clientes[lugar].activo;
    this.EditclientForm.controls['nombre'].setValue(this.lista_clientes[lugar].nombre);
    this.EditclientForm.controls['email'].setValue(this.lista_clientes[lugar].email);
    this.EditclientForm.controls['estado'].setValue(this.lista_clientes[lugar].estado);
    this.EditclientForm.controls['telefono'].setValue(this.lista_clientes[lugar].telefono);
    this.EditclientForm.controls['razon_social'].setValue(this.lista_clientes[lugar].razon_social);
    this.EditclientForm.controls['rfc'].setValue(this.lista_clientes[lugar].rfc);
    this.EditclientForm.controls['direccion'].setValue(this.lista_clientes[lugar].direccion);
    this.EditclientForm.controls['codigo_postal'].setValue(this.lista_clientes[lugar].codigo_postal);
    this.EditclientForm.controls['empresa'].setValue(this.lista_clientes[lugar].empresa);

  }

  Desactivar() {
    var envio = {
      "activo": false
    }
    var ids = this.idfinal
    // console.log(envio)
    this.serConexion.ClienteStatus(ids, envio).subscribe(data => {
      // console.log(data)
      this.datos = data
      this.tablaclientes.clear().destroy();
      this.cargarClientes();
      this.cierraModal3()

    });
  }

  Activar() {
    var envio = {
      "activo": true
    }
    var ids = this.idfinal
    // console.log(envio)
    this.serConexion.ClienteStatus(ids, envio).subscribe(data => {
      // console.log(data)
      this.datos = data
      this.tablaclientes.clear().destroy();
      this.cargarClientes();
      this.cierraModal4()
    });
  }

}
