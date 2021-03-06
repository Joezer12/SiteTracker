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
  menus: any[] = [];
  usuario: Usuario;
  constructor(public sidebar: SidebarService, private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
    this.menus = this.sidebar.getMenu();
  }

  logout() {
    this.usuarioService.logout();
  }
}
