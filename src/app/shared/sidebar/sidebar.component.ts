import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  menu: any;
  constructor(public sidebar: SidebarService) {
    this.menu = this.sidebar.menu;
  }

  ngOnInit() {}
}
