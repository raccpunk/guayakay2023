import { Component } from '@angular/core';

@Component({
  selector: 'app-sistema-layout',
  templateUrl: './sistema-layout.component.html',
  styleUrls: ['./sistema-layout.component.scss']
})
export class SistemaLayoutComponent {
  nombreU: any;
  ocultar: boolean | undefined;
  prueba: any = [];


  ngOnInit() {
    this.nombreU = (localStorage.getItem('permiso') || '{0}');
    // console.log("prueba")
    // console.log(localStorage.getItem('permiso'));

    if (localStorage.getItem('permiso') == 'administrador') {
      this.ocultar = false;
      
      this.prueba = [
        {
          name: 'Producción',
          url: '/produccion',
          iconComponent: { name: 'cil-speedometer' },
      
        },
        {
          name: 'Entradas',
          url: '/entradas',
          iconComponent: { name: 'cil-clipboard' }
        },
        {
          name: 'Servicios',
          url: '/Servicios',
          iconComponent: { name: 'cil-tags' }
        },
        {
          name: 'Clientes',
          url: '/Clientes',
          iconComponent: { name: 'cil-people' }
        },
        {
          name: 'Bordados',
          url: '/bordados',
          iconComponent: { name: 'cil-color-border' }
        },
        {
          name: 'Cobros',
          url: '/cobros',
          iconComponent: { name: 'cil-dollar' }
        },
        {
          name: 'reportes', // Nombre del menú desplegable
          iconComponent: { name: 'cil-folder-open' },
          children: [ // Elementos hijos del menú desplegable
            {
              name: 'Entradas',
              url: '/Rentradas',
              iconComponent: { name: 'cil-chart' }
            },
            {
              name: 'Servicios',
              url: '/Rservicios',
              iconComponent: { name: 'cil-chart' }
            },
            {
              name: 'notas',
              url: '/Rcobros',
              iconComponent: { name: 'cil-chart' }
            },
            {
              name: 'notas pagos',
              url: '/Rcobrospagos',
              iconComponent: { name: 'cil-chart' }
            },
          ]
        },
        {
          name: 'Maquinas',
          url: '/maquinas',
          iconComponent: { name: 'cil-Braille' }
        },
        {
          name: 'usuarios',
          url: '/usuarios',
          iconComponent: { name: 'cil-user' }
        },
       
      ];
    
      for (var i = 0; i < this.prueba.length; i++) {
        this.navItems.push(this.prueba[i]);
      }
    }
    if (localStorage.getItem('permiso') == 'bordador') {
      this.prueba = [
        {
          name: 'Producción',
          url: '/produccionmaquina',
          iconComponent: { name: 'cil-speedometer'  }
          /*badge: {
            color: 'success',
            text: 'NEW'
          }*/
        },
        {
          name: 'Bordados',
          url: '/bordados',
          iconComponent: { name: 'cil-color-border'}
        },
      ]
      for (var i = 0; i < this.prueba.length; i++) {

        this.navItems.push(this.prueba[i])

      }
    }
    if (localStorage.getItem('permiso') == 'encargado_producción') {
      // console.log('true')
      this.ocultar = false;
      // console.log(false)

      this.prueba = [
        {
          name: 'Producción',
          url: '/produccion',
          iconComponent: { name: 'cil-speedometer' },
          color: 'blue'
        },
        {
          name: 'Entradas',
          url: '/entradas',
          iconComponent: { name: 'cil-clipboard' }
        },
       
        {
          name: 'Clientes',
          url: '/Clientes',
          iconComponent: { name: 'cil-people' }
        },
        {
          name: 'Bordados',
          url: '/bordados',
          iconComponent: { name: 'cil-color-border' }
        },
        {
          name: 'Cobros',
          url: '/cobros',
          iconComponent: { name: 'cil-dollar' }
        },
        
        // {
        //   name: 'Maquinas',
        //   url: '/maquinas',
        //   iconComponent: { name: 'cil-calculator' }
        // },


        // {
        //   name: 'usuarios',
        //   url: '/usuarios',
        //   iconComponent: { name: 'cil-user' }
        // },
        // {
        //   name: 'Roles',
        //   url: '/roles',
        //   iconComponent: { name: 'cil-user' }
        //   /*badge: {
        //     color: 'success',
        //     text: 'NEW'
        //   }*/
        // },
      ]

      for (var i = 0; i < this.prueba.length; i++) {

        this.navItems.push(this.prueba[i])

      }



    }
    if (localStorage.getItem('permiso') == 'finanzas') {
      // console.log('true')
      this.ocultar = false;
      // console.log(false)

      this.prueba = [
        {
          name: 'Producción',
          url: '/produccion',
          iconComponent: { name: 'cil-speedometer' },
          color: 'blue'
        },
        // {
        //   name: 'Entradas',
        //   url: '/entradas',
        //   iconComponent: { name: 'cil-clipboard' }
        // },
        {
          name: 'Clientes',
          url: '/Clientes',
          iconComponent: { name: 'cil-people' }
        },
        {
          name: 'Bordados',
          url: '/bordados',
          iconComponent: { name: 'cil-color-border' }
        },
        {
          name: 'Cobros',
          url: '/cobros',
          iconComponent: { name: 'cil-dollar' }
        },
        {
          name: 'reportes', // Nombre del menú desplegable
          iconComponent: { name: 'cil-folder-open' },
          children: [ // Elementos hijos del menú desplegable
            {
              name: 'Historial Entradas',
              url: '/Rentradas',
              iconComponent: { name: 'cil-bar-chart' }
            },
            {
              name: 'Historial cobros',
              url: '/Rcobros',
              iconComponent: { name: 'cil-bar-chart' }
            }
          ]
        },
        // {
        //   name: 'Maquinas',
        //   url: '/maquinas',
        //   iconComponent: { name: 'cil-calculator' }
        // },


        // {
        //   name: 'usuarios',
        //   url: '/usuarios',
        //   iconComponent: { name: 'cil-user' }
        // },
        // {
        //   name: 'Roles',
        //   url: '/roles',
        //   iconComponent: { name: 'cil-user' }
        //   /*badge: {
        //     color: 'success',
        //     text: 'NEW'
        //   }*/
        // },
      ]

      for (var i = 0; i < this.prueba.length; i++) {

        this.navItems.push(this.prueba[i])

      }



    }
    if (localStorage.getItem('permiso') == 'ventas') {
      // console.log('true')
      this.ocultar = false;
      // console.log(false)

      this.prueba = [
        {
          name: 'Servicios',
          url: '/Servicios',
          iconComponent: { name: 'cil-tags' }
        },
        {
          name: 'Clientes',
          url: '/Clientes',
          iconComponent: { name: 'cil-people' }
        },
        {
          name: 'Bordados',
          url: '/bordados',
          iconComponent: { name: 'cil-color-border' }
        },

   
        {
          name: 'reportes', // Nombre del menú desplegable
          iconComponent: { name: 'cil-folder-open' },
          children: [ // Elementos hijos del menú desplegable
          {
            name: 'Servicios',
            url: '/Rservicios',
            iconComponent: { name: 'cil-chart' }
          },
         
          ]
        },
        
      ]

      for (var i = 0; i < this.prueba.length; i++) {

        this.navItems.push(this.prueba[i])

      }



    }
    if (localStorage.getItem('permiso') == 'recepción') {
      this.prueba = [
        {
          name: 'Producción',
          url: '/produccion',
          iconComponent: { name: 'cil-speedometer' },
          color: 'blue'
        },
        // {
        //   name: 'Entradas',
        //   url: '/entradas',
        //   iconComponent: { name: 'cil-clipboard' }
        // },
        {
          name: 'Clientes',
          url: '/Clientes',
          iconComponent: { name: 'cil-people' }
        },
        {
          name: 'Bordados',
          url: '/bordados',
          iconComponent: { name: 'cil-color-border' }
        },
        {
          name: 'Cobros',
          url: '/cobros',
          iconComponent: { name: 'cil-dollar' }
        },
       

      ]
      for (var i = 0; i < this.prueba.length; i++) {

        this.navItems.push(this.prueba[i])

      }
    }

  }

  public navItems = [
    {
      // name: 'Producción',
      // url: '/produccion',
      // iconComponent: { name: 'cil-chart' }
      // /*badge: {
      //   color: 'success',
      //   text: 'NEW'
      // }*/
    },

  ];

}
