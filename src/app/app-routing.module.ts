import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { SistemaLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';

import { RegisterComponent } from './views/pages/register/register.component';


import { GuardService } from './servicios/guard/guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'theme',
        loadChildren: () =>
          import('./views/theme/theme.module').then((m) => m.ThemeModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '',
    component: SistemaLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'Clientes',
        canActivate: [GuardService],
        loadChildren: () =>
          import('./views/clientes/clientes.module').then((m) => m.ClienteModule)
      },
      {
        path: 'roles',
        canActivate: [GuardService],
        loadChildren: () =>
          import('./views/roles/roles.module').then((m) => m.RolesModule)
      },
      {
        path: 'produccionmaquina',
        canActivate: [GuardService],
        loadChildren: () =>
          import('./views/produccion-maquina/produccion-maquina.module').then((m) => m.ProduccionMaquinaModule)
      },
   
      {
        path: 'usuarios',
        canActivate: [GuardService],
        loadChildren: () =>
          import('./views/usuarios/usuarios.module').then((m) => m.UsuariosModule)
      },
      {
        path: 'produccion',
        canActivate: [GuardService],
        loadChildren: () =>
          import('./views/produccion/produccion.module').then((m) => m.ProduccionModule)
      },
      {
        path: 'cobros',
        canActivate: [GuardService],
        loadChildren: () =>
          import('./views/cobros/cobros.module').then((m) => m.CobrosModule)
      },
      {
        path: 'maquinas',
        canActivate: [GuardService],
        loadChildren: () =>
          import('./views/maquina/maquina.module').then((m) => m.MaquinaModule)
      },
      {
        path: 'entradas',
        canActivate: [GuardService],
        loadChildren: () =>
          import('./views/entradas/entradas.module').then((m) => m.EntradaModule)
      },
      {
        path: 'bordados',
        canActivate: [GuardService],
        loadChildren: () =>
          import('./views/bordados/bordados.module').then((m) => m.BordadosModule)
      },
      {
        path: 'base',
        loadChildren: () =>
          import('./views/base/base.module').then((m) => m.BaseModule)
      },
      {
        path: 'buttons',
        loadChildren: () =>
          import('./views/buttons/buttons.module').then((m) => m.ButtonsModule)
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'charts',
        loadChildren: () =>
          import('./views/charts/charts.module').then((m) => m.ChartsModule)
      },
      {
        path: 'icons',
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notifications/notifications.module').then((m) => m.NotificationsModule)
      },
      {
        path: 'widgets',
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  // {
  //   // path: 'verificaqr/:id',
  //   // component: QrdetailComponent,
  //   // data: {
  //   //   title: 'QR Page'
  //   // }
  // },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
