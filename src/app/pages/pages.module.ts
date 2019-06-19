import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Componentes fijos
import { SharedModule } from '../shared/shared.module';

// Pagina Principal
import { PagesComponent } from './pages.component';

// Paginas
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesRoutingModule } from './pages.routes';
import { ComponentsModule } from '../components/components.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    Graficas1Component,
    ProgressComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PagesRoutingModule,
    ComponentsModule
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    Graficas1Component,
    ProgressComponent
  ]
})
export class PagesModule {}
