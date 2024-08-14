import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormArray, Validators, FormControl, AbstractControl, FormGroup } from '@angular/forms';
import { ConexionService } from '../../servicios/conexion/conexion.service';
import { ValidacionService } from '../../servicios/validaciones/validacion.service';
import { AlmacenamientoService } from '../../servicios/almacenamiento/almacenamiento.service';
import { user } from '../../interfaz/user'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  //MODAL DE ACTUALIZAR 
  @ViewChild('button_close_detail5') closebutton5: any;
  @ViewChild('staticBackdropModal5') modal5: any;
  // MODAL DE AGREGAR 
  @ViewChild('button_close_detail') closebutton: any;
  @ViewChild('staticBackdropModal') modal: any;
   // MODAL DE ACTIVAR 
  @ViewChild('button_close_detail4') closebutton4: any;
  @ViewChild('staticBackdropModal4') modal4: any;
 // MODAL DE DESACTIVAR 
  @ViewChild('button_close_detail3') closebutton3: any;
  @ViewChild('staticBackdropModal3') modal3: any;
  idmaquina = new FormControl(0);
  lista_usuarios: any = [];
  datos: any;
  submitted = false;
  usuarioUnico: user[] = [{
    idUsuario: 0,
    nombre: '',
    usuario: '',
    rol: '',

    activo: true,
  }]
  UserForm = this.fb.group({
    nombre: ['', Validators.required],
    usuario: ['', Validators.required],
    password: ['', Validators.required],
    rol: '0'
  });
  UserEditForm = this.fb.group({
    nombre: ['', Validators.required],
    usuario: ['', Validators.required],
    password: [''],
    rol: '0'

  });
  MaquinaFormDinamic!: FormGroup;
  data_envio = {
    idmaquina: '0',
  };

  idfinal: any;
  tablausuarios: any;
  lista_maquinas: any;
  mensaje_error: any;
  variable = false;
  variable2 = false;
  mostrar = false;
  rolalarm = false;
  asignarmaquina = false;

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
    this.cargarUsuarios();
    this.obtenerMaquinasActivas();
    if (localStorage.getItem('permiso') == 'administrador') {
      this.variable2 = false;
    }
    else{
      this.variable2 = true;
    }
    this.MaquinaFormDinamic = new FormGroup({
      maquinas: new FormArray([]),
    });
  }

  initMaquinaFormGroup(maquina: string) {
    return new FormGroup({
      idmaquina: new FormControl(maquina),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.UserForm.controls;
  }

  get f2(): { [key: string]: AbstractControl } {
    return this.UserEditForm.controls;
  }

  private cargarUsuarios(): void {
    this.serConexion.usuarioLista().subscribe(
      success => {
        this.lista_usuarios = success.datos
        this.pintatabla();
      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        console.log(error);
      }
    );
  }

  //MODAL DE AGREGAR 
  private cierraModal(): void {
    this.closebutton.nativeElement.click();
  }
   //MODAL DE ACTUALIZAR 
  private cierraModal5(): void {
    this.closebutton5.nativeElement.click();
  }
   // MODAL DE ACTIVAR 
   private cierraModal4(): void {
    this.closebutton4.nativeElement.click();
  }
   // MODAL DE DESACTIVAR 
  private cierraModal3(): void {
    this.closebutton3.nativeElement.click();
  }
  obtenerMaquinasActivas() {
    this.serConexion.maquinaLista().subscribe(
      success => {
        this.lista_maquinas = success.datos
      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        console.log(error);
      }
    );
  }

  get maquinalista() {
    return this.MaquinaFormDinamic.get('maquinas') as FormArray;
  }
  
  onSubmit() {
    this.submitted = true;
    if (this.UserForm.invalid) {
      return;
    }
    if (this.UserForm.value.rol == '0') {
      this.rolalarm = true
      return;
    }
    var envio = {
      nombre: this.UserForm.value.nombre,
      usuario: this.UserForm.value.usuario,
      password: this.UserForm.value.password,
      rol: this.UserForm.value.rol
    }
    // console.log(envio)
    this.serConexion.UsuarioRegistrar(envio).subscribe(
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
            this.serConexion.UsuarioRegistrar(envio).subscribe(
              success => {
                // console.log(success)
                this.datos = success
                this.tablausuarios.clear().destroy();
                this.cargarUsuarios();
                this.cierraModal()
                this.obtenerMaquinasActivas();

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

  addmaquina(maquina: string) {
    this.maquinalista.push(this.initMaquinaFormGroup(maquina));
  }

  getArray(lugar: number) {
    this.MaquinaFormDinamic = new FormGroup({
      maquinas: new FormArray([]),
    });
    this.usuarioUnico[0].idUsuario = this.lista_usuarios[lugar].idusuario;
    this.usuarioUnico[0].nombre = this.lista_usuarios[lugar].nombre;
    this.usuarioUnico[0].usuario = this.lista_usuarios[lugar].usuario;
    this.usuarioUnico[0].rol = this.lista_usuarios[lugar].rol;
    this.usuarioUnico[0].activo = this.lista_usuarios[lugar].activo;
 
    if (this.usuarioUnico[0].rol == 'bordador') {
      this.asignarmaquina = true
    }
    else {
      this.asignarmaquina = false
    }
    for (var i = 0; i < this.lista_usuarios[lugar].tblUsuario_Maquinas.length; i++) {
      this.addmaquina(this.lista_usuarios[lugar].tblUsuario_Maquinas[i].tblMaquina.idmaquina)
    };
    if (this.lista_usuarios[lugar].tblUsuario_Maquinas.length == 0) {
      this.addmaquina('0')
    }

    this.idfinal = this.lista_usuarios[lugar].idusuario
    this.UserEditForm.controls['nombre'].setValue(this.lista_usuarios[lugar].nombre);
    this.UserEditForm.controls['usuario'].setValue(this.lista_usuarios[lugar].usuario);
    this.UserEditForm.controls['rol'].setValue(this.lista_usuarios[lugar].rol);
    this.UserEditForm.controls['password'].setValue('');
  }

  Desactivar() {
    var envio = {
      "activo": false
    }
    var ids = this.idfinal
    this.serConexion.UsuarioStatus(ids, envio).subscribe(data => {
      this.datos = data
      this.tablausuarios.clear().destroy();
      this.cargarUsuarios();
      this.cierraModal3()
      this.obtenerMaquinasActivas();
      setTimeout(() => {
        alert('USUARIO DESACTIVADA CON ÉXITO');
      }, 100);
    });
  }

  Activar() {
    var envio = {
      "activo": true
    }
    var ids = this.idfinal
    this.serConexion.UsuarioStatus(ids, envio).subscribe(data => {
      this.datos = data
      this.tablausuarios.clear().destroy();
      this.cargarUsuarios();
      this.cierraModal4()
      this.obtenerMaquinasActivas();
      setTimeout(() => {
        alert('USUARIO ACTIVADO CON ÉXITO');
      }, 100);
    });
  }


  remove(index: number) {
    this.maquinalista.removeAt(index);
    if (this.maquinalista.length == 1) {
      this.mostrar = false;
    }
  }

  onSubmit2() {
    this.submitted = true;
    if (this.UserEditForm.invalid) {
      return;
    }

    if (this.UserEditForm.value.password == '') {
      var envio = {
        nombre: this.UserEditForm.value.nombre,
        usuario: this.UserEditForm.value.usuario,
        rol: this.UserEditForm.value.rol,
      }
       var ids = this.idfinal
    this.serConexion.UsuarioActualiza(ids, envio).subscribe(data => {
      this.datos = data
      if (this.MaquinaFormDinamic.value.maquinas[0].idmaquina == 0) {
        this.tablausuarios.clear().destroy();
        this.cargarUsuarios();
        this.cierraModal5()
        this.obtenerMaquinasActivas();
      }
      else {
        for (var index in this.MaquinaFormDinamic.value.maquinas) {
          var envio2 = {
            idusuario: this.idfinal,
            idmaquina: Number(this.MaquinaFormDinamic.value.maquinas[index].idmaquina),
          }
          // console.log(envio2)
          this.serConexion.UsuarioMaquina(envio2).subscribe(data => {
            console.log(data)
            this.datos = data
            window.location.reload()
          });
        }
      }
    }

    )
    }else{
      var envio2 = {
        nombre: this.UserEditForm.value.nombre,
        usuario: this.UserEditForm.value.usuario,
        rol: this.UserEditForm.value.rol,
        password: this.UserEditForm.value.password
      }
      // console.log(envio2)
       var ids = this.idfinal
    this.serConexion.UsuarioActualiza(ids, envio2).subscribe(data => {
      // console.log(data)
      this.datos = data
      // console.log(this.MaquinaFormDinamic.value.maquinas[0].idmaquina)
      if (this.MaquinaFormDinamic.value.maquinas[0].idmaquina == 0) {
        this.tablausuarios.clear().destroy();
        this.cargarUsuarios();
        this.cierraModal5()
        this.obtenerMaquinasActivas();
      }
      else {
        for (var index in this.MaquinaFormDinamic.value.maquinas) {
          var envio2 = {
            idusuario: this.idfinal,
            idmaquina: Number(this.MaquinaFormDinamic.value.maquinas[index].idmaquina),
          }
          // console.log(envio2)
          this.serConexion.UsuarioMaquina(envio2).subscribe(data => {
            // console.log(data)
            this.datos = data
            window.location.reload()
          });
        }
      }
    }
    )
    }
  }

  pintatabla() {
    setTimeout(() => {
      this.tablausuarios = $('#datatable-usuarios').DataTable({
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        lengthMenu: [5, 10, 25],
        order: [0, 'asc'],
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
      });
    }, 300);
  }
}
