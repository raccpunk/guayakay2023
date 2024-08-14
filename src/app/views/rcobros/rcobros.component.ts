import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ConexionService } from 'src/app/servicios/conexion/conexion.service';
import * as XLSX from 'xlsx';
const pdfMakeX = require('pdfmake/build/pdfmake.js');
const pdfFontsX = require('pdfmake-unicode/dist/pdfmake-unicode.js');
pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;
import * as pdfMake from 'pdfmake/build/pdfmake';
@Component({
  selector: 'app-rcobros',
  templateUrl: './rcobros.component.html',
  styleUrls: ['./rcobros.component.scss']
})
export class RCobrosComponent {

  historialForm = this.fb.group({
    fechainicio: [''],
    fechafinal: [''],
    // password: ['', Validators.required],

  });
  tablaCobros: any;
  historial_lista: any[] = [];
  fechaActual: any;
  cambio = 0;
  cobro_productos: any = [];
  idfinal: any;
  cobro_detalle: any;
  folio: any;
  fechas: any;
  namecliente: any;
  direccioncliente: any;
  tipo_cobros: any;
  ivanum: any;
  ivap: any;
  facturas: any;
  pagadon: any;
  totalcolumna: any;
  bordados: any;
  preciot: any;
  totalfinal: any;
  lista_pagos: any;
  saldof: any;
  saldop: any;
  listapagos: any;
  sumaf: any;
  totalfinalpd: any;
  cliente: any;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public serConexion: ConexionService,
    private datePipe: DatePipe,
    // private formBuilder: FormBuilder,
    // public serValidacion: ValidacionService,
    // public serAlmacen: AlmacenamientoService,
    private fb: FormBuilder
  ) { }
  variable = false
  private ngOnInit(): void {
    this.pintatabla() 
    const fecha = new Date();
    this.fechaActual = fecha.toISOString().split('T')[0];
    // console.log(this.fechaActual)
    this.historialForm = this.fb.group({
      fechainicio: ['2024-01-01'],
      fechafinal: [this.fechaActual],
      // password: ['', Validators.required],
  
    });
  }

  pintatabla() {
    setTimeout(() => {
      this.tablaCobros = $('#datatable-produccion').DataTable({
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        lengthMenu: [5, 10, 25, 50],
        order: [0, 'ASC'],
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
    }, 500);
  
  }


  buscarHistorial() {
  
    this.historial_lista = [];
    this.tablaCobros.destroy()
    var envio = {
      fecha_inicio: this.historialForm.value.fechainicio + ' 00:00:00',
      fecha_fin: this.historialForm.value.fechafinal + ' 23:59:59',

    }
    // console.log(envio)
     
  
    this.serConexion.CobrosHistorial(envio).subscribe(
      success => {
      
       
      
        // console.log(success)
        this.historial_lista = success.datos
      //  console.log(  this.historial_lista)
        this.pintatabla()
    
        this.variable = true
     
      
  
      })
    
  }


  vercobrosselect(id: number) {
    this.cambio = 0
    this.Listapagos(id)
    this.ListaProductos(id)
  
    //   document.addEventListener("keyup", function(event) {
    //     if (event.keyCode === 13) {
    //         alert('Enter is pressed!');


    //     }
    // });

  }

   generarExcel() {
    const excelData = [];
    excelData.push(['FECHA CREACION', 'FOLIO', 'USUARIO', 'CLIENTE', 'MÉTODO DE COBRO', 'FORMA DE PAGO', 'IVA %', '$ IVA', 'SUB TOTAL', 'TOTAL', 'PAGADO' , 'ESTATUS']);

    this.historial_lista.forEach((historial: { createdAt: any; idcobro: any; tblUsuario: { nombre: any; } | null; tblCliente: { nombre: any; }; tipo_cobro: any; tipo_pago: any; iva_porcentaje: any; iva_numero: any; monto_total: any; pagado: any; estatus: any; }) => {
      // Formatear la fecha en formato de fecha corta de Excel
      const fechaCortaExcel = new Date(historial.createdAt);
      const fechaSerial = Math.floor((fechaCortaExcel.getTime() - new Date(1899, 11, 30).getTime()) / 86400000) + 1;
  
      const fila = [
          { t: 'n', z: 'dd/mm/yyyy', v: fechaSerial }, // Especificar el formato de fecha
          historial.idcobro,
          historial.tblUsuario == null ? 'sin asignar' : historial.tblUsuario.nombre,
          historial.tblCliente.nombre,
          historial.tipo_cobro,
          historial.tipo_pago,
          `${historial.iva_porcentaje}%`,
          historial.iva_numero,
          historial.monto_total,
          (historial.monto_total + historial.iva_numero),
          historial.pagado,
          historial.estatus
      ];
      excelData.push(fila);
  });

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(excelData);
  
  // Especificar el formato de fecha para la columna de fecha
  worksheet['!cols'] = [{ wch: 12 }] // Ajustar el ancho de la columna según sea necesario
  
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Historial');
  
  

    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0'); // Obtener el día y rellenar con ceros si es necesario
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Obtener el mes (los meses en JavaScript van de 0 a 11)
    const anio = fecha.getFullYear();
    const fechaFormateada = `${dia}-${mes}-${anio}`;
    XLSX.writeFile(workbook, 'REPORTE_HISTORIAL_COBROS_'+ fechaFormateada +'.xlsx');
  }
  // generarExcel() {
  //   const excelData = [];
  //   excelData.push(['FECHA', 'FOLIO', 'USUARIO', 'CLIENTE', 'MÉTODO DE COBRO', 'FORMA DE PAGO', 'IVA %', '$ IVA', 'SUB TOTAL', 'TOTAL', 'PAGADO']);

  //   this.historial_lista.forEach((historial: { createdAt: any; idcobro: any; tblUsuario: { nombre: any; } | null; tblCliente: { nombre: any; }; tipo_cobro: any; tipo_pago: any; iva_porcentaje: any; iva_numero: any; monto_total: any; pagado: any; }) => {
  //     const fila = [
  //       this.datePipe.transform(historial.createdAt, 'dd/MM/y'),
  //       historial.idcobro,
  //       historial.tblUsuario == null ? 'sin asignar' : historial.tblUsuario.nombre,
  //       historial.tblCliente.nombre,
  //       historial.tipo_cobro,
  //       historial.tipo_pago,
  //       `${historial.iva_porcentaje}%`,
  //       historial.iva_numero ,
  //       historial.monto_total ,
  //       (historial.monto_total + historial.iva_numero) ,
  //       historial.pagado 
  //     ];
  //     excelData.push(fila);
  //   });

  //   const workbook = XLSX.utils.book_new();
  //   const worksheet = XLSX.utils.aoa_to_sheet(excelData);
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Historial');

  //   const fecha = new Date();
  //   const dia = String(fecha.getDate()).padStart(2, '0'); // Obtener el día y rellenar con ceros si es necesario
  //   const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Obtener el mes (los meses en JavaScript van de 0 a 11)
  //   const anio = fecha.getFullYear();
  //   const fechaFormateada = `${dia}-${mes}-${anio}`;
  //   XLSX.writeFile(workbook, 'REPORTE_HISTORIAL_COBROS_'+ fechaFormateada +'.xlsx');
  // }

  
  ListaProductos(id: number) {
    this.cobro_productos = []


    this.idfinal = this.historial_lista[id].idcobro
    this.serConexion.CobrosDetalle(this.idfinal).subscribe(
      success => {
        this.cobro_detalle = success.datos
        // console.log(this.cobro_detalle);
        this.folio = this.cobro_detalle[0].idcobro
        this.fechas = (this.cobro_detalle[0].createdAt)
        this.namecliente = this.cobro_detalle[0].tblCliente.nombre
        this.direccioncliente = this.cobro_detalle[0].tblCliente.direccion
        this.tipo_cobros = this.cobro_detalle[0].tipo_pago
        this.facturas = this.cobro_detalle[0].factura
        this.ivanum = this.cobro_detalle[0].iva_numero
        this.ivap = this.cobro_detalle[0].iva_porcentaje
        this.pagadon = this.cobro_detalle[0].pagado

        for (var i = 0; i < this.cobro_detalle.length; i++) {
          var identrada = this.cobro_detalle[i].tblCobro_Entrada
          var identradas = this.cobro_detalle[i].tblCobro_Entradas
          for (var index = 0; index < identradas.length; index++) {
            var identrada = identradas[index].identrada
            var bordado = identradas[index].tblEntrada.tblBordado.nombre
            var prenda = identradas[index].tblEntrada.prenda
            var nuprendas = identradas[index].tblEntrada.numero
            var preciou = identradas[index].precio_unit
            var factura = identradas[index].factura
            var tipo_pago = identradas[index].tipo_pago

            this.totalcolumna = (preciou * nuprendas);

            this.cobro_productos.push({
              identrada: identrada,
              bordado: bordado,
              prenda: prenda,
              nuprendas: nuprendas,
              preciou: preciou,
              factura: factura,
              tipo_pago: tipo_pago,
              preciotc: Number(this.totalcolumna).toFixed(2),



            })
            // console.log(this.cobro_productos[i].bordado)
            this.bordados = this.cobro_detalle[i].bordado
            this.preciot = 0
            this.cobro_productos.forEach((element: { preciotc: number; }) => {
              this.preciot = Number(this.preciot) + Number(element.preciotc),
                (this.preciot).toLocaleString('en')
              this.totalfinal = ((this.preciot + this.ivanum).toFixed(2))

              this.totalfinalpd = (this.preciot + this.ivanum).toLocaleString('en')

              if (this.lista_pagos.length == 0) {
                this.saldof = this.totalfinal

              }
              this.saldop = (this.totalfinal - this.saldof)
            });


          }

        };
        for (var i = 0; i < this.cobro_detalle.length; i++) {
          var idservicio = this.cobro_detalle[i].tblCobro_Servicios
          var idservicios = this.cobro_detalle[i].tblCobro_Servicios
          for (var index = 0; index < idservicio.length; index++) {
            var identrada = idservicios[index].idservicio
            var bordado = idservicios[index].tblServicio.concepto
            // var prenda = identradas[index].tblEntrada.prenda
            var nuprendas = idservicios[index].tblServicio.cantidad
            var preciou = idservicios[index].precio_unit
            // var factura = identradas[index].factura
            // var tipo_pago = identradas[index].tipo_pago

            this.totalcolumna = (preciou * nuprendas);

            this.cobro_productos.push({
              identrada: identrada,
              bordado: bordado,
              prenda: '',
              nuprendas: nuprendas,
              preciou: preciou,
              factura: factura,
              tipo_pago: tipo_pago,
              preciotc: Number(this.totalcolumna).toFixed(2),



            })
            // console.log(this.cobro_productos[i].bordado)
            this.bordados = this.cobro_detalle[i].bordado
            this.preciot = 0
            this.cobro_productos.forEach((element: { preciotc: number; }) => {
              this.preciot = Number(this.preciot) + Number(element.preciotc),
                (this.preciot).toLocaleString('en')
              this.totalfinal = ((this.preciot + this.ivanum).toFixed(2))

              this.totalfinalpd = (this.preciot + this.ivanum).toLocaleString('en')

              if (this.lista_pagos.length == 0) {
                this.saldof = this.totalfinal

              }
              this.saldop = (this.totalfinal - this.saldof)
            });


          }

        };

      });

  }

  Listapagos(id: number) {


    this.idfinal = this.historial_lista[id].idcobro

    this.lista_pagos = []
    this.serConexion.pagosLista(this.idfinal).subscribe(
      success => {

        this.listapagos = success.datos
        // console.log(this.listapagos)

        for (var i = 0; i < this.listapagos.length; i++) {
          var fecha = this.listapagos[i].createdAt
          var saldo = this.listapagos[i].saldo
          var factura = this.listapagos[i].factura
          var monto = this.listapagos[i].cantidad
          var metodo_pago = this.listapagos[i].metodo_pago

          this.lista_pagos.push({
            fecha: fecha,
            saldo: saldo,
            factura: factura,
            metodpago: metodo_pago,
            montopagado: ((this.totalfinal - saldo)),
            monto: monto
          })

          this.sumaf = 0;
          this.saldof = 0;
          this.listapagos.forEach((element: { monto: string; saldo: string; }) => {
            this.sumaf = this.sumaf + parseFloat(element.monto)

            this.saldof = parseFloat(element.saldo)

            // console.log(this.totalfinal + this.saldof)



          });

        }



      },
      error => {
        this.router.navigate(['/login'], { relativeTo: this.activeRoute });
        // console.log(error);
      }

    );



  }
  private getFechaHoy(): string {
    const d = new Date();

    let dia = this.formatoDecena(d.getDate());
    let mes = this.formatoDecena(d.getMonth() + 1);
    let anno = d.getFullYear();
    let fecha: string = dia + '-' + mes + '-' + anno;

    return fecha;
  }

  private formatoDecena(num: number): string {
    let decena: string;

    if (num < 10) {
      decena = '0' + num;
    } else {
      decena = num.toString();
    }

    return decena;
  }


  async viewPDF(id: any) {
    this.listapagos = []
    // console.log(id)
    // this.idfinal = this.historial_lista[id].idcobro
    var column: any = [];
    var prueba: any = []
    var column: any = [];
    var column2: any = [];
    var bordado1: any = [];
    var prenda1: any = [];
    var numero1: any = [];
    var precio1: any = [];
    var unitario1: any = []
    var fecha1: any = [];
    var monto1: any = [];
    var saldo1: any = [];
    var factura1: any = [];
    var metodo1: any = []

    this.serConexion.pagosLista(id).subscribe(
        success => {
       
            this.listapagos = success.datos;

            for (var i = 0; i < this.listapagos.length; i++) {
                var fecha = this.listapagos[i].createdAt;
                var saldo = this.listapagos[i].saldo;
                var factura = this.listapagos[i].factura;
                var monto = this.listapagos[i].cantidad;
                var metodo_pago = this.listapagos[i].metodo_pago;

                fecha1.push({ text: formatDate(this.listapagos[i].createdAt, 'dd/MM/yyyy', 'en-US'), style: 'text', fontSize: 9 });
                monto1.push({ text: '$' + (this.listapagos[i].cantidad).toLocaleString('en'), style: 'text,', fontSize: 9, bold: true, alignment: 'center' });
                saldo1.push({ text: '$' + (this.listapagos[i].saldo).toLocaleString('en'), style: 'text,', fontSize: 9, bold: true, alignment: 'center' });

                // this.lista_pagos.push({
                //     fecha: fecha,
                //     saldo: saldo,
                //     factura: factura,
                //     metodpago: metodo_pago,
                //     montopagado: ((this.totalfinal - saldo)),
                //     monto: monto
                // });
            }
        }
    );

    this.serConexion.CobrosDetalle(id).subscribe(
        async success => {
            this.cobro_detalle = success.datos;
            const body = [];

            for (var i = 0; i < this.cobro_detalle.length; i++) {
                var identradas = this.cobro_detalle[i].tblCobro_Entradas;
                var idservicio = this.cobro_detalle[i].tblCobro_Servicios;

                for (var index = 0; index < identradas.length; index++) {
                    const nuprendas = identradas[index].tblEntrada.numero;
                    const preciou = identradas[index].precio_unit;
                    const totalcolumna = preciou * nuprendas;

                    body.push([
                        { text: identradas[index].tblEntrada.tblBordado.nombre, style: 'text, bold', alignment: 'left' },
                        { text: identradas[index].tblEntrada.prenda, style: 'text' },
                        { text: nuprendas, style: 'text, bold', alignment: 'center' },
                        { text: '$' + preciou.toLocaleString('en'), style: 'text, bold', alignment: 'center' },
                        { text: '$' + totalcolumna.toLocaleString('en'), style: 'text, bold', alignment: 'center' }
                    ]);
                };

                for (var index = 0; index < idservicio.length; index++) {
                    var identrada = idservicio[index].idservicio;
                    var bordado = idservicio[index].tblServicio.concepto;
                    var nuprendas = idservicio[index].tblServicio.cantidad;
                    var preciou = idservicio[index].precio_unit;

                    const totalcolumna = preciou * nuprendas;

                    body.push([
                        { text: bordado, style: 'text, bold', alignment: 'left' },
                        { text: '', style: 'text' }, // No hay prenda en los servicios
                        { text: nuprendas, style: 'text, bold', alignment: 'center' },
                        { text: '$' + preciou.toLocaleString('en'), style: 'text, bold', alignment: 'center' },
                        { text: '$' + totalcolumna.toLocaleString('en'), style: 'text, bold', alignment: 'center' }
                    ]);
                };

                var date = formatDate(this.fechas, 'dd/MM/yyyy', 'en-US');

                column.push({ text: 'BORDADO', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true });
                column.push({ text: 'PRENDA', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true });
                column.push({ text: 'CANTIDAD', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true });
                column.push({ text: 'PRECIO UNITARIO', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true });
                column.push({ text: 'PRECIO TOTAL', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true });

                column2.push({ text: 'FECHA', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true });
                column2.push({ text: 'MONTO', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true });
                column2.push({ text: 'SALDO', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true });

                const headers = [
                    { text: 'BORDADO/SERVICIO', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true },
                    { text: 'PRENDA', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true },
                    { text: 'CANTIDAD', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true },
                    { text: 'PRECIO UNITARIO', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true },
                    { text: 'PRECIO TOTAL', fontSize: 10, fillColor: '#135560', color: '#cddbde', bold: true }
                ];
                const headers2 = [
                    { text: 'SUB TOTAL:', colSpan: 4, alignment: 'right' },
                    {},
                    {},
                    {},
                    { text: '$' + this.preciot.toLocaleString('en'), alignment: 'center' }
                ];
                const headers3 = [
                    { text: 'IVA ' + this.ivap + '%', colSpan: 4, alignment: 'right' },
                    {},
                    {},
                    {},
                    { text: '$' + this.ivanum.toLocaleString('en'), alignment: 'center' }
                ];
                const headers4 = [
                    { text: 'TOTAL', colSpan: 4, alignment: 'right' },
                    {},
                    {},
                    {},
                    { text: '$' + this.totalfinalpd, alignment: 'center' }
                ];

                const pdfDefinition: any = {
                    footer: {
                        columns: []
                    },
                    content: [
                        {
                            alignment: 'center',
                            image: await this.getBase64ImageFromURL("assets/lotto/pdflogo.png"),
                            width: 600,
                            height: 200,
                            margin: [0, -40]
                        },
                        {
                            alignment: 'right',
                            text: 'FOLIO: ' + this.folio,
                            style: 'header',
                            fontSize: 12,
                            margin: [100, 0],
                            color: '#135560'
                        },
                        {
                            alignment: 'right',
                            text: 'EMPRESA: ' + this.namecliente,
                            style: 'header',
                            fontSize: 12,
                            margin: [100, 0],
                            color: '#135560'
                        },
                        {
                            alignment: 'right',
                            text: 'FECHA: ' + date,
                            style: 'header',
                            fontSize: 12,
                            margin: [100, 0],
                            color: '#135560'
                        },
                        {
                            alignment: 'lefth',
                            image: await this.getBase64ImageFromURL("assets/lotto/lateralpdf.png"),
                            width: 60,
                            height: 130,
                            margin: [-55, 0]
                        },
                        {
                            alignment: 'lefth',
                            fontSize: 9,
                            margin: [10, -100],
                            fillColor: '#fee1c5',
                            widths: ['15%', '*', '35%'],
                            table: {
                                headerRows: 1,
                                fillColor: '#fee1c5',
                                widths: ['auto', 'auto', 'auto', 'auto', 'auto'],
                                body: [headers, ...body, headers2, headers3, headers4]
                            }
                        },
                        {
                            alignment: 'center',
                            margin: [10, 150],
                            fillColor: '#fee1c5',
                            table: {
                                body: [
                                    column2,
                                    [
                                        [fecha1],
                                        [monto1],
                                        [saldo1],
                                    ],
                                ]
                            }
                        },
                    ]
                };

                const pdf = pdfMake.createPdf(pdfDefinition);
                pdf.open()
            }
        }
    );

    var cantidad = [];
    var preciou = [];
    var preciotc: never[] = [];
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
