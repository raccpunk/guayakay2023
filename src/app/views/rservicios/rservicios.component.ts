import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionService } from 'src/app/servicios/conexion/conexion.service';
import { img_url } from 'src/app/servicios/guard/guard.service';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { Bordados } from '../../interfaz/bordados';
import * as XLSX from 'xlsx';
import { Console } from 'console';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-rservicios',
  templateUrl: './rservicios.component.html',
  styleUrls: ['./rservicios.component.scss']
})
export class RserviciosComponent {

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
  historialForm = this.fb.group({
    fechainicio: [''],
    fechafinal: [''],
    // password: ['', Validators.required],

  });
  fechaActual: any;
  historial_lista: any[] = [];
  tablaProduccion: any;
  bordado_detalle!: any;
  permiso: any;
  variable = false

  private ngOnInit(): void {

    this.permiso = localStorage.getItem('permiso')
    this.pintatabla()
    const fecha = new Date();
    this.fechaActual = fecha.toISOString().split('T')[0];
    // console.log(this.fechaActual)
    this.historialForm = this.fb.group({
      fechainicio: ['2024-01-01'],
      fechafinal: [this.fechaActual],
      // password: ['', Validators.required],

    });
    // this.obtenerClientes();
  }

  pintatabla() {
    setTimeout(() => {
      this.tablaProduccion = $('#datatable-servicios').DataTable({
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

        //   columnDefs: [
        //     // { responsivePriority: 1, targets: 0 },
        //     // { responsivePriority: 2, targets: -1 }
        // ]
      });
    }, 500);

  }

  buscarHistorial() {

    this.historial_lista = [];
    this.tablaProduccion.destroy()
    var envio = {
      fecha_inicio: this.historialForm.value.fechainicio + ' 00:00:00',
      fecha_fin: this.historialForm.value.fechafinal + ' 23:59:59',

    }
    // console.log(envio)


    this.serConexion.ServicioHistorial(envio).subscribe(
      success => {



        // console.log(success)
        this.historial_lista = success.datos
        console.log(this.historial_lista)
        this.pintatabla()

        this.variable = true

        // console.log(this.historial_lista) 
        // for (var i = 0; i < this.historial_lista.length; i++) {
        //   // console.log(this.historial_lista[i].tblTrabajos_Realizados[0].tblUsuario.nombre)
        //   for (var ii = 0; ii < this.historial_lista[i].tblTrabajos_Realizados.length; ii++) {
        //     // console.log(this.historial_lista[i].tblTrabajos_Realizados[0].tblUsuario.nombre)

        //     if (this.historial_lista[i].tblTrabajos_Realizados[ii].tblUsuario.nombre != undefined) {
        //       // console.log('si')
        //       this.  variable = false
        //     } else {

        //       // console.log('no')
        //       this.  variable = true
        //     }

        //     // console.log(this.historial_lista[i].tblTrabajos_Realizados)
        //   }
        //   // this.historial_lista.tblTrabajos_Realizados[0].tblUsuario.nombre

        // }

      })

  }

  
  generarExcel() {
    // Obtén los datos de this.historial_lista
    const datos = this.historial_lista;

       // Crea una matriz para almacenar los datos
       const excelData = [];

       // Agrega un encabezado a la matriz
       excelData.push(['SERVICIO', 'CONCEPTO', 'OBSERVACIÓN', 'CLIENTE', 'CANTIDAD', 'FECHA']);
   
       // Itera sobre los datos y agrega cada fila a la matriz
       datos.forEach((historial: { createdAt: string | number | Date; idservicio: any; concepto: any; observacion: any; tblCliente: { nombre: any; }; cantidad: any; }) => {
        const fechaExcel = new Date(historial.createdAt);
        const fechaSerial = Math.floor((fechaExcel.getTime() - new Date(1899, 11, 30).getTime()) / 86400000) + 1;
        const fechaFormateada = `${fechaExcel.getDate()}/${fechaExcel.getMonth() + 1}/${fechaExcel.getFullYear()}`;

           const fila = [
               historial.idservicio,
               historial.concepto,
               historial.observacion,
               historial.tblCliente.nombre,
               historial.cantidad,
               { t: 'n', z: 'dd/mm/yyyy', v: fechaSerial }, 
           ];
   
           excelData.push(fila);
       });
   
       // Crea un nuevo libro de Excel
       const workbook = XLSX.utils.book_new();
       
       // Convierte la matriz en una hoja de Excel
       const worksheet = XLSX.utils.aoa_to_sheet(excelData);
       
       // Agrega la hoja al libro
       XLSX.utils.book_append_sheet(workbook, worksheet, 'Historial');
       
       const fecha = new Date();
       const dia = String(fecha.getDate()).padStart(2, '0');
       const mes = String(fecha.getMonth() + 1).padStart(2, '0');
       const anio = fecha.getFullYear();
       const fechaFormateadaArchivo = `${dia}-${mes}-${anio}`;
       
       // Crea el archivo Excel
       XLSX.writeFile(workbook, `REPORTE_SERVICIOS_${fechaFormateadaArchivo}.xlsx`);

  }
}
