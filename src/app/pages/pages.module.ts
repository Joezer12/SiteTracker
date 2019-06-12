import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesRoutingModule } from './pages.routes';

@NgModule({
  declarations: [PagesComponent, DashboardComponent, Graficas1Component, ProgressComponent],
  imports: [CommonModule, SharedModule, PagesRoutingModule],
  exports: [PagesComponent, DashboardComponent, Graficas1Component, ProgressComponent]
})
export class PagesModule {}
