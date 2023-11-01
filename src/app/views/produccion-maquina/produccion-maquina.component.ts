import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormArray, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ConexionService } from '../../servicios/conexion/conexion.service';
import { ValidacionService } from '../../servicios/validaciones/validacion.service';
import { AlmacenamientoService } from '../../servicios/almacenamiento/almacenamiento.service';
import { img_url } from 'src/app/servicios/guard/guard.service';

interface Produccion {
  folio: string;
  estado: string;
  fecha: string;
  cliente: string;
  imagen: string;
  bordado: string;
  num_puntadas: string;
  piezas_realizadas: string;
  observaciones: string;
  alto: string;
  ancho: string;
  precio: string;
  numero: string;
  fecha2: string;
  icon: String;
}

interface hilos {
  orden: number;
  hilo: string;

}

@Component({
  selector: 'app-produccion-maquina',
  templateUrl: './produccion-maquina.component.html',
  styleUrls: ['./produccion-maquina.component.scss']
})
export class ProduccionMaquinaComponent {
  idmaquinas = new FormControl(0);
  cantidad = new FormControl();
  produccionA: Produccion[] = []
  hilosA: hilos[] = []
  lista_entradas: any;
  EntradaU: Produccion[] = [{
    folio: '',
    estado: '',
    fecha: '',
    cliente: '',
    imagen: '',
    bordado: '',
    num_puntadas: '',
    piezas_realizadas: '',
    observaciones: '',
    alto: '',
    ancho: '',
    precio: '',
    numero: '',
    fecha2: '',
    icon: '',
  }]
  idfinal: any;
  datos: any;
  Entrada_detalles: any;
  identrada: any;
  idcliente: any;
  idbordado: any;
  prenda: any;
  numero: any;
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
  lista_maquinas: any =[];
  idmachine: any;
  realizadas: any;
  tablaProduccion: any;
  totale: any;
  idusuario = new FormControl(0);
  idmaquina: any;

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
    // this.cargarProduccion();
    this.obtenerMaquinaUsuario()
  }


  pintatabla() {
    setTimeout(() => {
      this.tablaProduccion = $('#datatable-produccion').DataTable({
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

  getArray(lugar: number) {
    this.variable2 = false
    this.hilosA = []
    this.EntradaU[0].folio = this.lista_entradas[lugar].identrada;
    this.EntradaU[0].estado = this.lista_entradas[lugar].tblEntrada.estado;
    // this.EntradaU[0].cliente = this.lista_entradas[lugar].tblCliente.nombre;
    this.EntradaU[0].imagen = this.lista_entradas[lugar].imagen;


    this.idfinal = this.lista_entradas[lugar].identrada
console.log(this.identrada)

    this.serConexion.EntradaDetalle(this.idfinal).subscribe(
      success => {
        this.Entrada_detalles = success.datos
        this.identrada = this.Entrada_detalles.identrada
        this.idcliente = this.Entrada_detalles.idcliente
        // this.idbordado =this.Entrada_detalles.idbordado
        this.prenda = this.Entrada_detalles.prenda
        this.numero = this.Entrada_detalles.numero
        this.realizadas = this.Entrada_detalles.realizadas
        this.observacion = this.Entrada_detalles.observacion
        this.precio = this.Entrada_detalles.precio
        this.estado = this.Entrada_detalles.estado
        this.tiempo = this.Entrada_detalles.tiempo
        this.nombre = this.Entrada_detalles.tblCliente.nombre
        this.nombreBordado = this.Entrada_detalles.tblBordado.nombre
        this.alto = this.Entrada_detalles.tblBordado.alto
        this.ancho = this.Entrada_detalles.tblBordado.ancho
        this.observacionB = this.Entrada_detalles.tblBordado.observacion
        this.portada = img_url + this.Entrada_detalles.tblBordado.portada
        this.tecnica = this.Entrada_detalles.tblBordado.tblTecnica_Bordados[0].tblTecnica.nombre
        this.idmaquina = new FormControl(this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina);
        this.idmachine = this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina
        console.log(this.Entrada_detalles.tblEntrada_Maquinas[0].idmaquina)
        for (var i = 0; i < this.Entrada_detalles.tblBordado.tblBordado_Patrons.length; i++) {

          this.orden = this.Entrada_detalles.tblBordado.tblBordado_Patrons[i].orden;
          this.hilo = this.Entrada_detalles.tblBordado.tblBordado_Patrons[i].hilo;
          this.hilosA.push({
            orden: this.orden,
            hilo: this.hilo,

          })

        }


      },


    );
  }



  // private cargarProduccion(): void {
   
  //   setInterval(() => {
       
  //   this.serConexion.EntradasLista().subscribe(
  //     success => {
     
  //       this.lista_entradas = success.datos
      
    
  //       this.tablaProduccion.destroy()
  //       this.pintatabla()
  //     },
  //     error => {
  //       this.router.navigate(['/login'], { relativeTo: this.activeRoute });
  //       console.log(error);
  //     }
  //   );
  // }, 1000);
  // }

  finalizar() {
    this.variable3 = false
      var cant = Number(this.cantidad.value)
      var id = Number(this.idmaquina.value);
      var envio = {
        identrada: this.identrada,
        idmaquina: id,
        idusuario: Number(localStorage.getItem('iduser')),
        estado: 'Terminada',
        piezas_realizadas: cant
      }
      console.log(envio)
      this.totale = this.numero - this.realizadas
      if (cant > this.totale) {
        this.variable = true
      }
  
      if (cant <= this.totale) {
        this.variable = false
        this.serConexion.EntradaEstados(envio).subscribe(
          success => {
            console.log(success)
            this.datos = success
            window.location.reload();
            // this.cargarProduccion();
          },
          // error => {
          //   this.router.navigate(['/login'], { relativeTo: this.activeRoute });
          //   console.log(error);
          // }
        );
      
    }
  
  }
  variable2 = false
  Produccion() {

    var cant = Number(this.cantidad.value)
    var id = Number(this.idmaquina.value);

    var envio = {
      identrada: this.identrada,
      idmaquina: id,
      idusuario: Number(localStorage.getItem('iduser')),
      estado: 'En Proceso',
      // piezas_realizada: cant
    }
    console.log(envio)
    this.serConexion.EntradaEstados(envio).subscribe(
      success => {
        console.log(success)
        this.datos = success
        window.location.reload();
        // this.cargarProduccion();
      },
      // error => {
      //   this.router.navigate(['/login'], { relativeTo: this.activeRoute });
      //   console.log(error);
      // }
    );



  }


  cancelar() {
    var cant = Number(this.cantidad.value)
    var id = Number(this.idmaquina.value);
    var envio = {
      identrada: this.identrada,
      idmaquina: id,
      idusuario: localStorage.getItem('iduser'),
      estado: 'Cancelada',
      // piezas_realizada: cant
    }
    console.log(envio)
    this.serConexion.EntradaEstados(envio).subscribe(
      success => {
        console.log(success)
        this.datos = success
        window.location.reload();
        // this.cargarProduccion();
      },
      // error => {
      //   this.router.navigate(['/login'], { relativeTo: this.activeRoute });
      //   console.log(error);
      // }
    );
  }
  variable3 = false
  desactivarpausa() {
    var cant = Number(this.cantidad.value)
    this.totale = this.numero - this.realizadas
    if (Number(this.cantidad.value) == this.totale) {
      this.variable = false
      this.variable3 = true
     }
     if (Number(this.cantidad.value) < this.totale) {
      this.variable = false
      this.variable3 = false
     }
  
  }
  variable = false
  pausa() {
    var cant = Number(this.cantidad.value)
    var id = Number(this.idmaquina.value);
    var envio = {
      identrada: this.identrada,
      idmaquina: id,
      idusuario: Number(localStorage.getItem('iduser')),
      estado: 'En Pausa',
      piezas_realizadas: cant
    }
    console.log(envio)
    this.totale = this.numero - this.realizadas
    if (cant > this.totale) {
      this.variable = true
    }

    if (cant <= this.totale) {
      this.variable = false
      this.serConexion.EntradaEstados(envio).subscribe(
        success => {
          console.log(success)
          this.datos = success
          // window.location.reload();
          // this.cargarProduccion();
        },
        // error => {
        //   this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        //   console.log(error);
        // }
      );
    }
  }
  obtenerMaquinaUsuario() {



    var id =  Number(localStorage.getItem('iduser'))

    this.serConexion.maquinaUsuario(id).subscribe(
      success => {
        // this.tablabordados.destroy();
        this.lista_maquinas = success.datos
        console.log(this.lista_maquinas);
      
      },
    );
  }
  obtenerMaquinaEntrada() {

   setInterval(() => {

     var id = this.idmaquinas.value;

    this.serConexion.EntradaMaquina(id).subscribe(
      success => {
        // this.tablabordados.destroy();
        this.lista_entradas = success.datos
        console.log(this.lista_entradas);
        // this.tablaProduccion.destroy()
        // this.pintatabla()
      },
    );
  }, 1000);
   }

}
