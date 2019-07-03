import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  menu: any;
  constructor(public sidebar: SidebarService, private usuarioService: UsuarioService) {
    this.menu = this.sidebar.menu;
  }

  ngOnInit() {}

  logout() {
    this.usuarioService.logout();
  }
}
