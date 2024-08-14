import { Injectable } from '@angular/core';
import { CanActivateFn, CanActivate, } from '@angular/router';
import { AlmacenamientoService } from '../almacenamiento/almacenamiento.service';
export var img_url =  "https://guayakay-api-prod.basotecnologias.com/static/";
export var img_urllocal = 'http://192.168.1.72:3030/static/';
@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(
    public serAlmacen: AlmacenamientoService
  ) {}

  public canActivate(): boolean {
    // Aquí puedes colocar tu lógica personalizada
    // Por ejemplo, puedes verificar si el usuario tiene permisos suficientes para acceder a la ruta
    // Si la lógica es exitosa, retorna true para permitir el acceso, de lo contrario, redirige a otra página o retorna false

    //this.serAlmacen.LimpiaTodo();    
    let token = this.serAlmacen.obtenDatos( this.serAlmacen.cookies.seguridad ).token;
    let retorno:boolean;
    //console.log( token );

    if (token == "" || token == null) {
      //this.router.navigate(['']); // Redirige a otra ruta si la lógica se cumple
      retorno = false; // No permite el acceso a la ruta actual
    } else {
      retorno = true; // Permite el acceso a la ruta
    }

    return retorno;
  }
}
