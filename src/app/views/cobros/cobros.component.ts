import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormArray, Validators, FormControl, AbstractControl, FormGroup } from '@angular/forms';
import { ConexionService } from '../../servicios/conexion/conexion.service';
import { ValidacionService } from '../../servicios/validaciones/validacion.service';
import { AlmacenamientoService } from '../../servicios/almacenamiento/almacenamiento.service';
import { Clientes } from '../../interfaz/cliente'
import { Bordados } from 'src/app/interfaz/bordados';
import { Tecnicas } from 'src/app/interfaz/tecnicas';
import { aros } from 'src/app/interfaz/aros'
import { img_url } from 'src/app/servicios/guard/guard.service';
import { img_urllocal } from 'src/app/servicios/guard/guard.service';
import { isConstructorDeclaration, isThisTypeNode } from 'typescript/lib/tsserverlibrary';

const pdfMakeX = require('pdfmake/build/pdfmake.js');
const pdfFontsX = require('pdfmake-unicode/dist/pdfmake-unicode.js');
pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;
import * as pdfMake from 'pdfmake/build/pdfmake';
interface nPendientes {
  idcobro: any;
  createdAt: string;
  monto_total: any;
  iva_numero: string;
  pagado: string;
  saldo: string;
  ficha: string;
  idclientes: string;
  totalfinal: any;
}

interface ListaProductos {


  identrada: string,
  nombreBordado: string;
  prenda: string;
  numeroprenda: string;
  preciou: string;
  preciototales: any;
  preciotc: any;

}

interface saldo {
  saldo: any,
}

interface cPendientes {
  idcobro: any,
  identrada: string;

  createdAt: string;
  nombreBordado: string;
  tblBordado: {
    num_puntadas: string;
    nombre: any,
  }
  numerEnt: string;
  prenda: string;
  realizadas: string;
  unitario?: string;
  suma: string;

}

interface pagos {
  idcobro: string;
  fecha: string;
  monto: string;
  saldo: any;
  factura: string;
  metodpago: string;
}
@Component({
  selector: 'app-cobros',
  templateUrl: './cobros.component.html',
  styleUrls: ['./cobros.component.scss']
})
export class CobrosComponent {

  clicked = false;


  NotaForm = new FormGroup({
    facturas: new FormControl('0'),
    tipo_cobro: new FormControl('0'),
    tipo_pago: new FormControl('0'),
    iva_porcentaje: new FormControl(),
    monto_total: new FormControl(),
  });



  cobrarForm = new FormGroup({
    abono: new FormControl(),
  });

  fechaN = '';
  MontoN = '';
  ivaN = '';
  pagado = '';
  saldo = '';
  ficha = '';
  idcliente = '';
  idcobro = '0';
  nombreC = '';
  nombreCB = '';
  numpC = '';
  fechaC = '';
  nombreBC = '';
  numeroC = '';
  prenda = '';
  identrada = '';

  listapagos: any = []
  saldosf: saldo[] = []
  cobroP: cPendientes[] = []
  notacreada: cPendientes[] = []
  listap: ListaProductos[] = []
  pendientes: nPendientes[] = []
  pendientesidcobro: nPendientes[] = [{
    idcobro: '',
    createdAt: '',
    monto_total: '',
    iva_numero: '',
    pagado: '',
    saldo: '',
    ficha: '',
    idclientes: '',
    totalfinal: ''
  }]
  pendientesLista: nPendientes[] = []
  clienteA: Clientes[] = [];
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

  cobroSelect: nPendientes[] = [{
    idcobro: '',
    createdAt: '',
    monto_total: '',
    iva_numero: '',
    pagado: '',
    saldo: '',
    ficha: '',
    idclientes: '',
    totalfinal: ''
  }];

  idcobros = '';
  idusuario_registra = '';
  idclientes = '';
  fecha_registro = '';
  factura = '';
  tipo_cobro = '';
  tipo_pago = '';
  iva_porcentaje = '';
  iva_numero = '';
  monto_total = '';


  preciototal: string | undefined;
  idpago: any;
  preciot: any;
  suma!: any;
  operacion!: number;
  totalcolumna!: number;
  idactual: any;
  fechaF: any;
  monto: any;
  saldos: any;
  metodopago: any;
  nombreBordado: any;
  numeroprenda: any;
  preciototales: any;
  totalfinal: any | undefined;

  sumaf = 0;
  saldof = 0;
  saldosff: any | undefined;
  sacarsaldos: any;
  precioConiva: any;
  lista_clientes: any;
  lista_Terminada: any = [];
  idclienteselect = new FormControl(0);
  detalle: any = [];
  datos: any;
  idfinal: any;
  cobro_detalle: any;
  cobro_productos: any = [];
  folio: any;
  // desactivador del boton siguiente
  isDisabled = true;
  isDisabled2 = false;
  ivaprecio = 0;
  ivanum: any;
  ivap: any;
  lista_pagos: any = [];
  saldop: any;
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
    // this.obtenerNoPendientes();
    this.obtenerClientes();

  }

  obtenerClientes() {
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
  }
  obtenerTrabajosRealizados() {
    this.lista_Terminada = [];
    var id = this.idclienteselect.value;
    this.serConexion.EntradaTerminada(id).subscribe(
      success => {

        this.lista_Terminada = success.datos
        console.log(this.lista_Terminada);
        this.obtenerClientenotas()
      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        console.log(error);
      }
    );
  }
  obtenerClientenotas() {

    this.pendientes = [];
    this.notacreada = [];
    this.suma = []
    var id = this.idclienteselect.value;
    this.serConexion.CobrosListaClientes(id).subscribe(
      success => {

        this.pendientes = success.datos
        console.log(this.pendientes);





      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        console.log(error);
      }
    );

  }
  ListaProductos(id: number) {
    this.cobro_productos = []
    this.idfinal = this.pendientes[id].idcobro
    this.serConexion.CobrosDetalle(this.idfinal).subscribe(
      success => {
        this.cobro_detalle = success.datos
        console.log(this.cobro_detalle);
        this.folio = this.cobro_detalle[0].idcobro

        this.ivanum = this.cobro_detalle[0].iva_numero
        this.ivap = this.cobro_detalle[0].iva_porcentaje


        for (var i = 0; i < this.cobro_detalle.length; i++) {
          var identrada = this.cobro_detalle[i].tblCobro_Entrada
          var identradas = this.cobro_detalle[i].tblCobro_Entradas
          for (var index = 0; index < identradas.length; index++) {
            var identrada = identradas[index].identrada
            var bordado = identradas[index].tblEntrada.tblBordado.nombre
            var prenda = identradas[index].tblEntrada.prenda
            var nuprendas = identradas[index].tblEntrada.numero
            var preciou = identradas[index].precio_unit
            this.totalcolumna = (preciou * nuprendas);

            this.cobro_productos.push({
              identrada: identrada,
              bordado: bordado,
              prenda: prenda,
              nuprendas: nuprendas,
              preciou: preciou,
              preciotc: Number(this.totalcolumna).toFixed(2),



            })
            this.preciot = 0
            this.cobro_productos.forEach((element: { preciotc: number; }) => {
              this.preciot = this.preciot + Number(element.preciotc)
              this.totalfinal = this.preciot + this.ivanum
            });

          }

        };
      });


  }
  vercobrosselect(id: number) {
    this.ListaProductos(id)
    this.Listapagos(id)

  }
  variable = false
  registrarNota() {

    this.ivaprecio = (Number(this.NotaForm.value.iva_porcentaje) * this.sumafinal) / (100);
    this.precioConiva = (this.ivaprecio + this.sumafinal)
    for (var i = 0; i < this.notacreada.length; i++) {
      // console.log(this.notacreada)
      var detalles = {
        identrada: this.notacreada[i].identrada,
        precio_unit: Number(this.notacreada[i].unitario)
      }
      this.detalle.push(detalles)
      console.log(this.detalle)
    }
    var precioiva = (this.sumafinal * Number(this.NotaForm.value.iva_porcentaje)) / 100
    console.log(precioiva)
    var envio = {
      cobro: {
        idusuario: Number(localStorage.getItem('iduser')),
        idcliente: Number(this.idclienteselect.value),
        factura: this.NotaForm.value.facturas,
        tipo_cobro: this.NotaForm.value.tipo_cobro,
        tipo_pago: this.NotaForm.value.tipo_pago,
        iva_porcentaje: Number(this.NotaForm.value.iva_porcentaje),
        iva_numero: precioiva,
        monto_total: this.sumafinal,
      },
      detalle: this.detalle

    }
  
   if(Number(this.NotaForm.value.iva_porcentaje)<99 ){
    this.variable=false
    console.log(envio)
    // this.serConexion.CobrosRegistrar(envio).subscribe(
    //   success => {
    //     console.log(success)
    //     this.datos = success
    //     // window.location.reload();
    //     this.obtenerClientenotas()
    //   },
    //   error => {
    //     this.router.navigate(['/login'], { relativeTo: this.activeRoute });
    //     console.log(error);
    //   }
    // );
  } 
  else{
  
    this.variable=true
  }
  }
  addnota(id: number, prueba: any) {
    for (var i = 0; i < id - (id - 1); i++) {
      this.lista_Terminada[id].unitario = prueba;
      this.suma = prueba * parseInt(this.lista_Terminada[id].realizadas)
      this.lista_Terminada[id].suma = this.suma;
      this.notacreada.push(this.lista_Terminada[id]);
      this.lista_Terminada.splice(id, 1); 
    }
    this.sumatotal();
  }
  sumafinal = 0;
  sumatotal() {
    this.sumafinal = 0;
    this.notacreada.forEach(element => {
      this.sumafinal = this.sumafinal + parseFloat(element.suma)
    });
  }
  addpreciodinamico(id: number, prueba: any) {

    this.lista_Terminada[id].unitario = prueba;
    this.suma = prueba * parseInt(this.lista_Terminada[id].realizadas)
    this.lista_Terminada[id].suma = this.suma;

    // console.log(this.suma)

  }
  vernotas(id: number, prueba: any) {

    this.cobroP[id].unitario = prueba;
    this.suma = prueba * parseInt(this.cobroP[id].numerEnt)
    this.cobroP[id].suma = this.suma;

    // console.log(this.suma)
  }
  remove(index: number) {
    this.notacreada[index].suma = '0'
    this.lista_Terminada.push(this.notacreada[index]);
    this.notacreada.splice(index, 1);
    this.sumatotal();
  }

  ativarbutton() {
    this.isDisabled = false;
  }

  registrarcobro(id: number) {

    this.sacarsaldos = (this.saldof - this.cobrarForm.value.abono).toFixed(2)
    console.log(this.sacarsaldos)

    var envio = {
      idcobro: Number(this.idfinal),
      idusuario: Number(localStorage.getItem('iduser')),
      factura: 'no',
      metodo_pago: "no registrado",
      cantidad: Number(this.cobrarForm.value.abono),
      saldo: Number(this.sacarsaldos),


    }
    console.log(envio)
 
    this.serConexion.PagosRegistrar(envio).subscribe(
      success => {
        console.log(success)
        this.datos = success
        this.obtenerClientenotas()
        // window.location.reload();

      },
      // error => {
      //   this.router.navigate(['/login'], { relativeTo: this.activeRoute });
      //   console.log(error);
      // }
    );
  }














  Listapagos(id: number) {
    this.lista_pagos = [];
          
    var idcobro = this.idfinal
    this.serConexion.pagosLista(idcobro).subscribe(
      success => {
    
        this.listapagos = success.datos
        for (var i = 0; i < this.listapagos.length; i++) {
          var fecha = this.listapagos[i].createdAt
          var saldo = this.listapagos[i].saldo
          var factura = this.listapagos[i].factura
          var metodo_pago = this.listapagos[i].metodo_pago
         this.saldop = this.listapagos[i].saldo
      
      
        
          this.lista_pagos.push({
            fecha: fecha,
            saldo: saldo,
            factura: factura,
            metodpago: metodo_pago,
            monto: (this.totalfinal - saldo)
          })

       console.log(this.lista_pagos)
      
          this.saldof = this.sumaf
          this.sumaf = 0;
          this.saldof = 0;
          this.lista_pagos.forEach((element: { monto: string; saldo: string; }) => {
            this.sumaf = this.sumaf + parseFloat(element.monto)

            this.saldof = parseFloat(element.saldo)
            // console.log(this.saldof)

          
          });

        }
      
        // else{
        //   this.saldof = 0;
        // this.lista_pagos.forEach((element: { monto: string; saldo: string; }) => {
        //   this.sumaf = this.sumaf + parseFloat(element.monto)

        //   this.saldof = parseFloat(element.saldo)
        //   // console.log(this.saldof)


        // });
        // }



      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        console.log(error);
      }
      
    );
   


  }


  private getFechaHoy():string {
    const d = new Date();

    let dia = this.formatoDecena( d.getDate() );
    let mes = this.formatoDecena( d.getMonth()+1 );
    let anno = d.getFullYear();
    let fecha:string = dia + '-' + mes + '-' + anno;

    return fecha;
  }

  private formatoDecena( num:number ):string {
    let decena:string;

    if(num < 10){
      decena = '0' + num;
    }else{
      decena = num.toString();
    }

    return decena;
  }


  async viewPDF() {

    // this.namestate = localStorage.getItem('nombrestate');
    // var horrario_concurso = [];
    // if (this.selector == 1) {
    //     horrario_concurso.push({ text: this.namestate + '-MID AM: ' + this.sumatotalfinal });
    // }
    // if (this.selector == 2) {
    //     horrario_concurso.push({ text: this.namestate + '-AFT PM: ' + this.sumatotalfinal });
    // }

    // //MORNING

    // var column = [];

    // var precioAs = [];
    // var numeroAs = [];

    // var numeroAd = [];
    // var precioAd = [];

    // var numeroAt = [];
    // var precioAt = [];

    // var numeroAc = [];
    // var precioAc = [];


    // //--------------------------
    // //AFTHER

    // var precioAAs = [];
    // var numeroAAs = [];

    // var numeroAAd = [];
    // var precioAAd = [];

    // var numeroAAt = [];
    // var precioAAt = [];

    // var numeroAAc = [];
    // var precioAAc = [];

    // var vendedor = [];

    // vendedor.push({ text: 'sold by ' + this.nombreU, fontSize: 10 });

    // column.push({ text: 'Jugada        ', fontSize: 10 });
    // column.push({ text: 'Monto', fontSize: 10 });

    // for (var i = 0; i < this.ticketcreadoMsimple.length; i++) {

    //     numeroAAs.push({ text: this.ticketcreadoMsimple[i].numero, style: 'text', fontSize: 7 });
    //     precioAAs.push({ text: "$" + this.ticketcreadoMsimple[i].apuesta, style: 'text', fontSize: 7, bold: true, alignment: 'center', });

    // }
    // for (var i = 0; i < this.ticketcreadoM.length; i++) {

    //     numeroAAd.push({ text: this.ticketcreadoM[i].numero + "-" + this.ticketcreadoM[i].numeroDoble, style: 'text', fontSize: 7 });
    //     precioAAd.push({ text: "$" + this.ticketcreadoM[i].apuesta, style: 'text,', fontSize: 7, bold: true, alignment: 'center', });

    // }
    // for (var i = 0; i < this.ticketcreadoMthree.length; i++) {

    //     numeroAAt.push({ text: this.ticketcreadoMthree[i].numero + this.ticketcreadoMthree[i].numeroDoble + this.ticketcreadoMthree[i].numeroTriple + this.ticketcreadoMthree[i].modo_sorteo, style: 'text', fontSize: 7 });
    //     precioAAt.push({ text: "$" + this.ticketcreadoMthree[i].apuesta, style: 'text,', fontSize: 7, bold: true, alignment: 'center', });

    // }
    // for (var i = 0; i < this.ticketcreadoMfour.length; i++) {

    //     numeroAAc.push({ text: this.ticketcreadoMfour[i].numero + this.ticketcreadoMfour[i].numeroDoble + this.ticketcreadoMfour[i].modo_sorteo, style: 'text', fontSize: 7 });
    //     precioAAc.push({ text: "$" + this.ticketcreadoMfour[i].apuesta, style: 'text,', fontSize: 7, bold: true, alignment: 'center', });
    // }

    // //------------------------------------------------


    // for (var i = 0; i < this.ticketcreadoAsimple.length; i++) {

    //     numeroAs.push({ text: this.ticketcreadoAsimple[i].numero, style: 'text', fontSize: 7 });
    //     precioAs.push({ text: "$" + this.ticketcreadoAsimple[i].apuesta, style: 'text', fontSize: 7, bold: true, alignment: 'center', });

    // }
    // for (var i = 0; i < this.ticketcreadoAdoble.length; i++) {

    //     numeroAd.push({ text: this.ticketcreadoAdoble[i].numero + "-" + this.ticketcreadoAdoble[i].numeroDoble, style: 'text', fontSize: 7 });
    //     precioAd.push({ text: "$" + this.ticketcreadoAdoble[i].apuesta, style: 'text,', fontSize: 7, bold: true, alignment: 'center', });

    // }
    // for (var i = 0; i < this.ticketcreadoAtriple.length; i++) {

    //     numeroAt.push({ text: this.ticketcreadoAtriple[i].numero + this.ticketcreadoAtriple[i].numeroDoble + this.ticketcreadoAtriple[i].numeroTriple + this.ticketcreadoAtriple[i].modo_sorteo, style: 'text', fontSize: 7 });
    //     precioAt.push({ text: "$" + this.ticketcreadoAtriple[i].apuesta, style: 'text,', fontSize: 7, bold: true, alignment: 'center', });

    // }
    // for (var i = 0; i < this.ticketcreadoAcuatruple.length; i++) {

    //     numeroAc.push({ text: this.ticketcreadoAcuatruple[i].numero + this.ticketcreadoAcuatruple[i].numeroDoble + this.ticketcreadoAcuatruple[i].modo_sorteo, style: 'text', fontSize: 7 });
    //     precioAc.push({ text: "$" + this.ticketcreadoAcuatruple[i].apuesta, style: 'text,', fontSize: 7, bold: true, alignment: 'center', });
    // }


    var prueba = "codigo Unico" + Math.random();
    const pdfDefinition: any = {

        pageSize: {
            width: 350,
            height: 'auto'
        },

        content: [

            // {
            //     alignment: 'center',
            //     image: await this.getBase64ImageFromURL("/assets/img/logo1.png"),
            //     width: 130,
            //     height: 50,

            // },

            {
                alignment: 'center',
                text: 'ticket details:',
                style: 'header',
                fontSize: 13,
                bold: true,
      

            },
            {

                alignment: 'center',
                text: 'this.fecha',

                style: 'header',
                fontSize: 9,
                bold: true,
                margin: [0, 0],

            },

            {


                alignment: 'center',
                text: '---------------------------------',
                style: 'header',
                fontSize: 12,
                bold: true,
                margin: [0, 0],

            },

            {

                alignment: 'center',
                text: 'horrario_concurso',
                style: 'header',
                fontSize: 8,
                margin: [0, 0],

            },
            {


                alignment: 'center',
                text: '---------------------------------',
                style: 'header',
                fontSize: 12,
                bold: true,
                margin: [0, 0],


            },




            // {
            //     layout: 'noBorders',

            //     margin: [0, 10],
            //     table: {


            //         headerRows: 1,
            //         body: [

            //             column,


            //             [

            //                 [numeroAd],

            //                 precioAd



            //             ],

            //             [

            //                 [numeroAs],

            //                 precioAs



            //             ],
            //             [

            //                 [numeroAt],

            //                 precioAt



            //             ],
            //             [

            //                 [numeroAc],

            //                 precioAc



            //             ],


            //             [

            //                 [numeroAAd],

            //                 precioAAd



            //             ],

            //             [

            //                 [numeroAAs],

            //                 precioAAs



            //             ],
            //             [

            //                 [numeroAAt],

            //                 precioAAt



            //             ],
            //             [

            //                 [numeroAAc],

            //                 precioAAc



            //             ],




            //         ],


            //     }


            // },




            {


                alignment: 'center',

                text: "---TOTAL: $" +  "---",
                style: 'header',
                fontSize: 11,
                bold: true,
                margin: [0, 0],

            },

            {

                alignment: 'center',
                text: 'Scan QR:',
                style: 'header',
                fontSize: 14,
                bold: true,
                margin: [0, 10],

            },
            {
                qr: prueba,
                fit: '118',

                alignment: 'center',

            },
            {

                alignment: 'center',
                text: '---------------------------------',
                style: 'header',
                fontSize: 12,
                bold: true,
                margin: [0, 0],


            },
            {

                alignment: 'justify',
                text: '1ST $65 (00-99: $60) 2ND $15 3RD: $10 FL PICK2: $75 PALE:800 CASH3: $700 (000-999): $500 PLAY4: $4,000SuperPale $2000 KOLE3: $10,000FL PICK5: $30,000 WE DON´T PAY DOUBLE PALE CHECK YOUR TICKET. NO TICKET NO PAY!!!',
                fontSize: 8,

                margin: [0, 0],

            },
            {
                alignment: 'center',
                text: 'vendedor',
                style: 'header',
                fontSize: 8,
                // bold: true,
                margin: [0, 20],

            },
            {

                alignment: 'center',
                text: '---------------------------------',
                style: 'header',
                fontSize: 12,
                bold: true,
                margin: [0, 0],


            },
            {

                alignment: 'center',
                text: '',
                style: 'header',
                fontSize: 12,
                bold: true,
                margin: [0, 60],


            },


        ]

    };

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.print();
    window.location.reload();
}

  private getBase64ImageFromURL(url: string) {
    return new Promise((resolve, reject) => {
        var img = new Image();
        img.setAttribute("crossOrigin", "anonymous");

        img.onload = () => {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            var ctx: any = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            var dataURL = canvas.toDataURL("image/png");

            resolve(dataURL);
        };

        img.onerror = error => {
            reject(error);
        };

        img.src = url;
    });
  }

}
