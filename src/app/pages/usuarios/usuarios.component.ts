import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarioSession: Usuario;
  usuarios: Usuario[];
  total: number;
  desde = 0;
  page: string;
  private busqueda: string;
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.getUsuarios();
    this.usuarioSession = this.usuarioService.usuario;
    this.busqueda = '';
  }

  // ===================================================================================================
  // OBTENER USUARIOS -- Método para obtener TODOS los usuarios de la DB, con paginación.
  // ===================================================================================================
  getUsuarios() {
    this.usuarioService.getUsuarios(this.desde).subscribe((resp: any) => {
      this.total = resp.total;
      this.usuarios = resp.usuarios;
      this.page = resp.page;
    });
  }

  // ===================================================================================================
  // BUSCAR USUARIOS -- Método que regresa los usuarios que cumplan el termino buscado.
  // ===================================================================================================
  buscarUsuarios(termino: string) {
    if (!this.busqueda) {
      this.desde = 0;
    }

    if (termino) {
      this.busqueda = termino;
      this.usuarioService.buscarUsuarios(termino, this.desde).subscribe((resp: any) => {
        this.total = resp.total;
        this.usuarios = resp.usuarios;
        this.page = resp.page;
      });
    } else {
      this.busqueda = '';
      this.getUsuarios();
    }
  }

  // ===================================================================================================
  // PAGINACION -- Método para navegar entre los usuarios usando la variable 'desde' para el primer
  // elemento a mostrar
  // ===================================================================================================
  actualizarTabla(de: number) {
    if (this.desde + de < 0) {
      this.desde = 0;
    } else if (this.desde + de < this.total) {
      this.desde += de;
    } else {
      return;
    }
    if (!this.busqueda) {
      this.getUsuarios();
    } else {
      this.buscarUsuarios(this.busqueda);
    }
  }

  // ===================================================================================================
  // BORRAR USUARIO -- Método para borrar un usuario desde el botón BORRAR de la tabla.
  // ===================================================================================================
  borrarUsuario(usuario: Usuario) {
    this.usuarioService.borrarUsuario(usuario._id).subscribe(resp => {
      Swal.fire({
        type: 'success',
        title: 'Usuario eliminado',
        text: 'Se ha eliminado el usuario correctamente'
      });
    });
  }
}
