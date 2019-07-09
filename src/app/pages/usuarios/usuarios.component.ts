import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

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

  constructor(private usuarioService: UsuarioService, private modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.getUsuarios();
    this.usuarioSession = this.usuarioService.usuario;
    this.busqueda = '';
    this.modalUploadService.notificacion.subscribe(resp => this.actualizarTabla(0));
  }

  // ===================================================================================================
  // MODAL -- Método para mostar un modal que contenga parametros
  // ===================================================================================================
  mostrarModal(id: string) {
    this.modalUploadService.mostarModal('usuario', id);
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
  // ACTUALIZAR USUARIO -- Para modificar el ROLE de un usario
  // ===================================================================================================
  guardar(usuario: Usuario) {
    if (usuario._id === this.usuarioSession._id) {
      Swal.fire({
        title: 'Acción no reversible',
        text: 'Seguro que desea cambiar su role, una vez realizada esta acción no podrá modificarla',
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#ef5350'
      }).then(aceptar => {
        if (aceptar.value) {
          this.usuarioService.actualizarUsuario(usuario).subscribe();
        }
      });
    } else {
      this.usuarioService.actualizarUsuario(usuario).subscribe();
    }
  }
  // ===================================================================================================
  // BORRAR USUARIO -- Método para borrar un usuario desde el botón BORRAR de la tabla.
  // ===================================================================================================
  borrarUsuario(usuario: Usuario) {
    Swal.fire({
      type: 'warning',
      title: 'Desea borrar a ' + usuario.nombre + '?',
      text: 'No se podrá revertir la acción una vez eliminado el usuario',
      showCancelButton: true,
      confirmButtonText: 'Borrar usuario',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#ef5350'
    }).then(borrar => {
      if (borrar.value) {
        this.usuarioService.borrarUsuario(usuario._id).subscribe(resp => {
          if (this.total <= this.desde + 1) {
            this.desde -= 5;
          }
          if (!this.busqueda) {
            this.getUsuarios();
          } else {
            this.buscarUsuarios(this.busqueda);
          }
        });
      }
    });
  }
}
