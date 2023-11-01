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
  @ViewChild('button_close_detail') closebutton: any;
  @ViewChild('staticBackdropModal') modal: any;
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
    idmaquina: [''],
  });
  MaquinaFormDinamic!: FormGroup;
  data_envio = {
    idmaquina: '',
  };



  idfinal: any;
  tablausuarios: any;
  lista_maquinas: any;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public serConexion: ConexionService,
    private formBuilder: FormBuilder,
    public serValidacion: ValidacionService,
    public serAlmacen: AlmacenamientoService,
    private fb: FormBuilder
  ) { }
  asignarmaquina = false
  private ngOnInit(): void {
    this.cargarUsuarios();
    this.obtenerMaquinasActivas();
    this.MaquinaFormDinamic = new FormGroup({
      maquinas: new FormArray([this.initMaquinaFormGroup()]),
    });
  }
  initMaquinaFormGroup() {
    return new FormGroup({
      idmaquina: new FormControl('0'),

    });
  }
  get maquinalista() {
    return this.MaquinaFormDinamic.get('maquinas') as FormArray;
  }
  addmaquina() {
    
    this.maquinalista.push(this.initMaquinaFormGroup());
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
        console.log(this.lista_usuarios);
        this.pintatabla();
      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        console.log(error);
      }
    );
  }


  obtenerMaquinasActivas() {

    this.serConexion.maquinaLista().subscribe(
      success => {

        this.lista_maquinas = success.datos
        console.log(this.lista_maquinas);

      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        console.log(error);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.UserForm.invalid) {
      return;
    }
    var envio = {
      nombre: this.UserForm.value.nombre,
      usuario: this.UserForm.value.usuario,
      password: this.UserForm.value.password,
      rol: this.UserForm.value.rol
    }
    console.log(envio)
    this.serConexion.UsuarioRegistrar(envio).subscribe(
      success => {
        console.log(success)
        this.datos = success
        window.location.reload();

      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        console.log(error);
      }
    );
  }
  getArray(lugar: number) {
    this.usuarioUnico[0].idUsuario = this.lista_usuarios[lugar].idusuario;
    this.usuarioUnico[0].nombre = this.lista_usuarios[lugar].nombre;
    this.usuarioUnico[0].usuario = this.lista_usuarios[lugar].usuario;
    this.usuarioUnico[0].rol = this.lista_usuarios[lugar].rol;
    this.usuarioUnico[0].activo = this.lista_usuarios[lugar].activo;
    console.log(this.usuarioUnico[0].rol)
    if (this.usuarioUnico[0].rol == 'bordador') {
      this.asignarmaquina = true
    }
    else {
      this.asignarmaquina = false
    }
    this.idfinal = this.lista_usuarios[lugar].idusuario

    this.UserEditForm.controls['nombre'].setValue(this.lista_usuarios[lugar].nombre);
    this.UserEditForm.controls['usuario'].setValue(this.lista_usuarios[lugar].usuario);
    this.UserEditForm.controls['password'].setValue(this.lista_usuarios[lugar].password);
    this.UserEditForm.controls['idmaquina'].setValue(this.lista_usuarios[lugar].tblUsuario_Maquina.idmaquina);

    console.log(this.lista_usuarios[lugar].tblUsuario_Maquina.idmaquina)

  }

  Desactivar() {
    var envio = {
      "activo": false
    }
    var ids = this.idfinal
    console.log(envio)
    this.serConexion.UsuarioStatus(ids, envio).subscribe(data => {
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
    this.serConexion.UsuarioStatus(ids, envio).subscribe(data => {
      console.log(data)
      this.datos = data
      window.location.reload();
    });
  }

  mostrar = false;
  addEntrada() {

    this.maquinalista.push(this.initMaquinaFormGroup());
    console.log(this.maquinalista)
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
    var envio = {
      nombre: this.UserEditForm.value.nombre,
      usuario: this.UserEditForm.value.usuario,
      // password: this.UserEditForm.value.password
    }
    var ids = this.idfinal
    console.log(envio)
    this.serConexion.UsuarioActualiza(ids, envio).subscribe(data => {
      console.log(data)
      this.datos = data
      for (var index in this.MaquinaFormDinamic.value.maquinas) {
        var envio2 = {
          idusuario: this.idfinal,
          idmaquina: Number(this.MaquinaFormDinamic.value.maquinas[index].idmaquina),


        }
        console.log(envio2)
        this.serConexion.UsuarioMaquina(envio2).subscribe(data => {
          console.log(data)
          this.datos = data
          window.location.reload()


        });

        
      }




    })

  }
  pintatabla() {
    setTimeout(() => {
      this.tablausuarios = $('#datatable-usuarios').DataTable({
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

      });
    }, 1200);
  }
}
