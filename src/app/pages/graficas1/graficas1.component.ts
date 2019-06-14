import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {
  graficos = [
    {
      labels: ['Huaweii', 'Samsung', 'Apple'],
      data: [24, 30, 46],
      type: 'doughnut',
      leyenda: 'MARCAS MAS VENDIDAS'
    },
    {
      labels: ['Hombres', 'Mujeres'],
      data: [4500, 6000],
      type: 'doughnut',
      leyenda: 'Entrevistados'
    },
    {
      labels: ['Si', 'No'],
      data: [95, 5],
      type: 'doughnut',
      leyenda: '¿Has comprado alguna de estas marcas?'
    },
    {
      labels: ['No', 'Si'],
      data: [85, 15],
      type: 'doughnut',
      leyenda: '¿Comprarias un?'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
