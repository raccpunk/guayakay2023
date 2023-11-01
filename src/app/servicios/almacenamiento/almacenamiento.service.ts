import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AlmacenamientoService {
  // public urlQr:string = environment.urlValidacion;
  private key:string = 'loTt0keyencrypt!!@2023';

  public cookies: any = {
    usuario: 'usuario',
    seguridad: 'seguridad',
    qr_validacion: 'qr_validacion'
  };
  
  constructor() { }

  public guardaDatos( identificador:string, json:object ):void{
    localStorage.setItem( identificador, this.encrypt( JSON.stringify(json) ) );
  }

  public obtenDatos( identificador:string ):any{
    let data:string = localStorage.getItem(identificador)|| "{}";
    let json:object = {};

    if(data != "{}"){
      json = JSON.parse( this.decrypt(data) );
    }

    return json;
  }

  public eliminarDatos( identificador:string ):void{
    localStorage.removeItem( identificador );
  }

  public LimpiaTodo():void{
    localStorage.clear();
  }

  private encrypt( txt: string ):string {
    return CryptoJS.AES.encrypt( txt, this.key ).toString();
  }

  private decrypt( txtToDecrypt: string ):string {
    return CryptoJS.AES.decrypt( txtToDecrypt, this.key ).toString( CryptoJS.enc.Utf8 );
  }
}
