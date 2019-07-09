import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { IncrementerComponent } from './incrementer/incrementer.component';
import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';
import { FormsModule } from '@angular/forms';
import { ModalUploadComponent } from './modal-upload/modal-upload.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    IncrementerComponent,
    GraficoDonaComponent,
    ModalUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    PipesModule
  ],
  exports: [
    IncrementerComponent,
    GraficoDonaComponent,
    ModalUploadComponent
  ]
})
export class ComponentsModule {}
