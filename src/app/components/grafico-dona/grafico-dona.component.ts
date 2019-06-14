import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {
  @Input('labels')
  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data')
  public doughnutChartData: number[] = [350, 450, 100];
  @Input('chartType')
  public doughnutChartType: ChartType = 'doughnut';
  @Input()
  public leyenda: string = '';

  constructor() {}

  ngOnInit() {}
}
