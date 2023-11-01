import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidacionService } from '../../../servicios/validaciones/validacion.service';
import { ConexionService } from '../../../servicios/conexion/conexion.service';
import { AlmacenamientoService } from '../../../servicios/almacenamiento/almacenamiento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  error_login:boolean = false;
  mensaje_error:string = '';
  revision:boolean = false;
  formErrors: any;
  rol: any;
  iduser: any
  
  loginForm = this.formBuilder.group(
    {
      usuario: [ ''],
      password: [ '' ]
    }
  );

  constructor(
    private formBuilder: FormBuilder,
    public serValidacion: ValidacionService,
    public serConexion: ConexionService,
    public serAlmacen: AlmacenamientoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formErrors = this.serValidacion.errorMessages;
  }

  protected Login():void {
    this.revision = true;
    this.error_login = false;

    if( this.serValidacion.validaEstatus(this.loginForm.status) ){

      this.serConexion.login(this.loginForm.value).subscribe(
        success => {
          //this.serAlmacen.LimpiaTodo();
          this.serAlmacen.guardaDatos(this.serAlmacen.cookies.usuario, success.data.usuario);
          this.rol = success.data.usuario.rol
          this.iduser = success.data.usuario.idusuario
          localStorage.setItem("permiso", this.rol);
          this.rol = (localStorage.getItem('permiso') || '{0}');
          console.log(localStorage.getItem('permiso') )
    
          localStorage.setItem("iduser", this.iduser);
          this.iduser = (localStorage.getItem('iduser') || '{0}');
          console.log(localStorage.getItem('iduser') )
          let seguridad: any = {
            token: success.data.token
          };
          this.serAlmacen.guardaDatos(this.serAlmacen.cookies.seguridad, seguridad);

   
          //const keys = Object.keys( qr_param );
          if( localStorage.getItem('permiso') == 'bordador' ){ //keys.length == 0
            this.router.navigate( ['/produccionmaquina'], { relativeTo: this.route } );
            // console.log( )
          }
          if( localStorage.getItem('permiso') == 'administrador' ){ //keys.length == 0
            this.router.navigate( ['/produccion'], { relativeTo: this.route } );
          }
          if( localStorage.getItem('permiso') == 'recepción' ){ //keys.length == 0
            this.router.navigate( ['/produccionmaquina'], { relativeTo: this.route } );
          }
        }, 
        error => {
          this.error_login = true;
          console.log(error);
          switch (error.status){
            case 400:
              this.mensaje_error = 'error en Email';
              break;
            case 403:
              this.mensaje_error = 'error en password';
              break;
            default:
              this.mensaje_error = 'error en servidor intente mas tarde';
          }
        }
      );
    }
  }


}
