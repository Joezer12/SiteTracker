import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: []
})
export class IncrementerComponent implements OnInit {
  @ViewChild('txtProgress', { static: false }) txtProgress: ElementRef;
  @Input()
  progress: number;
  @Input()
  leyenda: string;
  @Output()
  valorChangeEvent: EventEmitter<number> = new EventEmitter();

  constructor(private renderer: Renderer2) {
    this.progress = 0;
    this.leyenda = 'Leyenda';
  }

  ngOnInit() {}

  onChange(newValue: number) {
    // let elemHTML = document.getElementsByName('progress')[0];

    if (newValue > 100) {
      newValue = 100;
    } else if (newValue < 0) {
      newValue = 0;
    }
    this.renderer.setAttribute(this.txtProgress.nativeElement, 'value', newValue.toString());
    // this.txtProgress.nativeElement.value = newValue;
    // elemHTML.value = newValue;
    this.txtProgress.nativeElement.focus();
    this.valorChangeEvent.emit(newValue);
  }

  valorChange(value: number) {
    if (this.progress + value <= 100 || this.progress + value >= 0) {
      this.progress += value;
      this.valorChangeEvent.emit(this.progress);
    }
    this.txtProgress.nativeElement.focus();
  }
}
