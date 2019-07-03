import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { titulo: 'Dashboard', path: ['Principal', 'Dashboard'] }
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { titulo: 'Progress Bar', path: ['Principal', 'Progress'] }
      },
      {
        path: 'graficas1',
        component: Graficas1Component,
        data: { titulo: 'Graficas', path: ['Principal', 'Graficas'] }
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { titulo: 'Promesas', path: ['Principal', 'Promesas'] }
      },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Observables', path: ['Principal', 'RxJs'] } },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { titulo: 'Theme Settings', path: ['Principal', 'Dashboard'] }
      },
      { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
