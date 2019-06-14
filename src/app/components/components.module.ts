import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { IncrementerComponent } from './incrementer/incrementer.component';
import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IncrementerComponent,
    GraficoDonaComponent
  ],
  imports: [CommonModule, FormsModule, ChartsModule],
  exports: [
    IncrementerComponent,
    GraficoDonaComponent
  ]
})
export class ComponentsModule {}
