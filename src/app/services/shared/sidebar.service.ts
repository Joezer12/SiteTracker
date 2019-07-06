import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-view-list',
      submenu: [
        { icono: 'mdi mdi-gauge', titulo: 'Dashboard', url: '/dashboard' },
        { icono: 'mdi mdi-chart-gantt', titulo: 'Progress Bar', url: '/progress' },
        { icono: 'mdi mdi-chart-pie', titulo: 'Graficas', url: '/graficas1' },
        { icono: 'mdi mdi-chart-bubble', titulo: 'Promesas', url: '/promesas' },
        { icono: 'mdi mdi-checkerboard', titulo: 'RXJS', url: '/rxjs' }
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { icono: 'mdi mdi-clipboard-account', titulo: 'Médicos', url: '/medicos' },
        { icono: 'mdi mdi-hospital-building', titulo: 'Hospitales', url: '/hospitales' },
        { icono: 'mdi mdi-account-box', titulo: 'Usuarios', url: '/usuarios' }
      ]
    }
  ];
  constructor() {}
}
