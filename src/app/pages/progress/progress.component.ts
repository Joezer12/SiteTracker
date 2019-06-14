import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  progressBarValue1: number;
  progressBarValue2: number;
  constructor() {
    this.progressBarValue1 = 20;
    this.progressBarValue2 = 45;
  }

  ngOnInit() {}

  actualizarValor(event: number) {
    console.log(event);
  }
}
