import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Componentes fijos
import { SharedModule } from '../shared/shared.module';

// Modulos
import { PagesRoutingModule } from './pages.routes';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';

// Pagina Principal
import { PagesComponent } from './pages.component';

// Paginas
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MedicosComponent } from './medicos/medicos.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    Graficas1Component,
    ProgressComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    MedicosComponent,
    HospitalesComponent,
    MedicoComponent,
    BusquedaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PagesRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    Graficas1Component,
    ProgressComponent
  ]
})
export class PagesModule {}
