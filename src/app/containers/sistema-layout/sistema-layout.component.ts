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
    console.log("prueba")
    console.log(localStorage.getItem('permiso'));

    if (localStorage.getItem('permiso') == 'administrador') {
      // console.log('true')
      this.ocultar = false;
      console.log(false)

      this.prueba = [
        {
          name: 'Producción',
          url: '/produccion',
          iconComponent: { name: 'cil-chart' }
          /*badge: {
            color: 'success',
            text: 'NEW'
          }*/
        },

        {
          name: 'Cobros',
          url: '/cobros',
          iconComponent: { name: 'cil-dollar' },

        },
        {
          name: 'Clientes',
          url: '/Clientes',
          iconComponent: { name: 'cil-user' }
        },
        {
          name: 'Maquinas',
          url: '/maquinas',
          iconComponent: { name: 'cil-calculator' }
        },

        {
          name: 'Entradas',
          url: '/entradas',
          iconComponent: { name: 'cil-diamond' }
        },
        {
          name: 'Bordados',
          url: '/bordados',
          iconComponent: { name: 'cil-star' }
        },
        {
          name: 'usuarios',
          url: '/usuarios',
          iconComponent: { name: 'cil-user' }
        },
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
    if (localStorage.getItem('permiso') == 'bordador') {
      this.prueba = [
        {
          name: 'Producción',
          url: '/produccionmaquina',
          iconComponent: { name: 'cil-chart' }
          /*badge: {
            color: 'success',
            text: 'NEW'
          }*/
        },
      ]
      for (var i = 0; i < this.prueba.length; i++) {

        this.navItems.push(this.prueba[i])

      }
    }
    if (localStorage.getItem('permiso') == 'recepción') {
      this.prueba = [
        // {
        //   name: 'Producción',
        //   url: '/produccion',
        //   iconComponent: { name: 'cil-chart' }
        //   /*badge: {
        //     color: 'success',
        //     text: 'NEW'
        //   }*/
        // },

        {
          name: 'Cobros',
          url: '/cobros',
          iconComponent: { name: 'cil-dollar' },

        },
        {
          name: 'Clientes',
          url: '/Clientes',
          iconComponent: { name: 'cil-user' }
        },
        {
          name: 'Entradas',
          url: '/entradas',
          iconComponent: { name: 'cil-diamond' }
        },
        {
          name: 'Bordados',
          url: '/bordados',
          iconComponent: { name: 'cil-star' }
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
