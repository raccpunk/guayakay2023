import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormArray, Validators, FormControl, AbstractControl, FormGroup } from '@angular/forms';
import { ConexionService } from '../../servicios/conexion/conexion.service';
import { ValidacionService } from '../../servicios/validaciones/validacion.service';
import { AlmacenamientoService } from '../../servicios/almacenamiento/almacenamiento.service';
import { Clientes } from '../../interfaz/cliente';
import { Bordados } from '../../interfaz/bordados';
import { img_url } from 'src/app/servicios/guard/guard.service';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent {

  //variables para formulario
  EntradaFormDinamic!: FormGroup;
  data_envio = {
    idcliente: '',
    idusuario: '',
    idbordado: '',
    prenda: '',
    numero: '',
    observacion: ''
  };
  mostrar = false;

  //variables para los selects y se debe agregar las imagenes
  clienteA: Clientes[] = [];
  ClienteBordado: Bordados[] = [];
  BordadoU: Bordados[] = [{
    portada: '',
    idbordado: ''

  }]
  lista_clientes: any;
  lista_clienteBordado: any = [];
  idfinal: any;
  portada: any;
  datos: any;
  bordado_detalle: any;
  img_urlfront = img_url;
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
    this.obtenerClientes();

    this.EntradaFormDinamic = new FormGroup({
      idcliente: new FormControl('0'),
  
      entradas: new FormArray([this.initEntradasFormGroup()]),
    });
  
  }

  obtenerBordado(indice: number) {

  
    this.idfinal = this.EntradaFormDinamic.value.entradas[indice].idbordado
// console.log( this.idfinal)
this.serConexion.BordadoDetalle(this.idfinal).subscribe(
  success => {
    this.bordado_detalle = success.datos
    // console.log(this.bordado_detalle);

    
    this.portada= img_url + this.bordado_detalle.portada
    console.log(this.portada)


  
})
}

  //funciones dinamicas del formulario
  addEntrada() {
    this.portada= ''
    this.entradaslista.push(this.initEntradasFormGroup());
  }

  remove(index: number) {
    this.entradaslista.removeAt(index);
    if (this.entradaslista.length == 1) {
      this.mostrar = false;
    }
  }

  initEntradasFormGroup() {
    return new FormGroup({

      idbordado: new FormControl('0'),
      idusuario: new FormControl(''),
      prenda: new FormControl(''),
      numero: new FormControl(''),
      observacion: new FormControl(''),
      // imagen: new FormControl(''),
  
    });
  }

  get entradaslista() {
    return this.EntradaFormDinamic.get('entradas') as FormArray;
  }

  onSubmit() {

for (var index in this.EntradaFormDinamic.value.entradas) {

    var envio = {
      Entrada: [ {
      idcliente: Number(this.EntradaFormDinamic.value.idcliente),
      idbordado:  Number(this.EntradaFormDinamic.value.entradas[index].idbordado) ,
      idusuario: Number(localStorage.getItem('iduser')),
      prenda: this.EntradaFormDinamic.value.entradas[index].prenda,
      numero: this.EntradaFormDinamic.value.entradas[index].numero,
      observacion: this.EntradaFormDinamic.value.entradas[index].observacion
      
    }]
    }

    console.log(envio)
    this.serConexion.EntradaRegistrar(envio).subscribe(
      success => {
        console.log(success)
        this.datos = success
        this.router.navigate(['/produccion'], { relativeTo: this.activeRoute });

      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        console.log(error);
      }
    );
   
    }
   
  }

  //obtencion de datos de selects
  obtenerClientes() {
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

  obtenerClienteBordados() {
    this.portada = '0'
    var id = this.EntradaFormDinamic.value.idcliente
    if (localStorage.getItem('permiso') == 'recepción') {
      this.lista_clienteBordado = []
    this.serConexion.BordadoCliente(id).subscribe(

      success => {
        console.log(success.datos)
         for (var i = 0; i <  success.datos.length; i++) {
          console.log(success.datos[i].tblBordado)
          if(success.datos[i].tblBordado.activo == true){
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
          console.log(this.lista_clienteBordado[id]);
  
        },
      );
      }
  
  }


}