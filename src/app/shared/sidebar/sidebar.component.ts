import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  menu: any;
  usuario: Usuario;
  constructor(public sidebar: SidebarService, private usuarioService: UsuarioService) {
    this.menu = this.sidebar.menu;
  }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

  logout() {
    this.usuarioService.logout();
  }
}
