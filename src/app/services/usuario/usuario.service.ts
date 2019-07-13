import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirImagenService } from '../subir-imagen/subir-imagen.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  params: HttpParams;

  constructor(private http: HttpClient, private router: Router, private subirImagenService: SubirImagenService) {
    this.usuario = sessionStorage.getItem('usuario') ? JSON.parse(sessionStorage.getItem('usuario')) : null;
    this.token = sessionStorage.getItem('token') || '';
    this.params = new HttpParams().set('token', this.token);
  }

  // ============================== REVISA SI EXISTE UN TOKEN EN EL SESSIONSTORAGE ==============================
  isLogged() {
    return sessionStorage.getItem('token') ? true : false;
  }

  // ===================================================================================================
  // REGISTRO -- CREA UN NUEVO USARIO DE LA PAGINA REGISTRO
  // ===================================================================================================
  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        Swal.fire({
          type: 'success',
          text: 'Usuario creado correctamente'
        });
        return resp.usuario;
      })
    );
  }

  // ===================================================================================================
  // UPDATE -- ACTUALIZA LOS DATOS DE UN USUARIO DE LA PAGINA PROFILE
  // ===================================================================================================
  actualizarUsuario(usuario: any) {
    const url = URL_SERVICIOS + `/usuario/${usuario._id}`;
    return this.http.put(url, usuario, { params: this.params }).pipe(
      map((resp: any) => {
        this.usuario = resp.usuario;
        sessionStorage.setItem('usuario', JSON.stringify(resp.usuario));
        Swal.fire({
          type: 'success',
          title: 'Usuario Actualizado',
          text: 'Campos actualizados correctamente'
        });
      })
    );
  }

  // ===================================================================================================
  // LOGIN -- AUTENTICA POR MEDIO DE GOOGLE
  // ===================================================================================================
  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token }).pipe(
      map(resp => {
        this.registrarUsuario(resp);
        return true;
      })
    );
  }

  // ===================================================================================================
  // LOGIN -- AUTENTICA POR MEDIO DE EMAIL
  // ===================================================================================================
  autenticarUsuario(email: string, password: string) {
    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, { email, password }).pipe(
      map(resp => {
        this.registrarUsuario(resp);

        return true;
      })
    );
  }

  // ===================================================================================================
  // LOGOUT -- Remueve informacion del sessionStorage
  // ===================================================================================================
  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('id');

    this.usuario = null;
    this.token = '';

    this.router.navigate(['/login']);
  }

  // ===================================================================================================
  // SESSIONSTORAGE -- GUARDA EN SESSIONSTORAGE
  // ===================================================================================================
  registrarUsuario(resp: any) {
    if (resp.id) {
      sessionStorage.setItem('id', resp.id);
    }
    if (resp.token) {
      sessionStorage.setItem('token', resp.token);
      this.token = resp.token;
    }
    if (resp.usuario) {
      sessionStorage.setItem('usuario', JSON.stringify(resp.usuario));
      this.usuario = resp.usuario;
    }
  }

  // ===================================================================================================
  // CARGAR FOTOGRAFIA -- POR VANILLA JS
  // ===================================================================================================
  // actualizarImagen(archivo: File) {
  //   this.subirImagenService
  //     .subirArchivo(archivo, 'usuario', this.usuario._id)
  //     .then((resp: any) => {
  //       this.usuario.img = resp.usuario.img;
  //       this.registrarUsuario(resp);
  //       Swal.fire({
  //         title: 'Imagen Actulizada',
  //         text: 'Su imagen se ha actualizado correctamente',
  //         type: 'success'
  //       });
  //     })
  //     .catch(resp => {
  //       console.log(resp);
  //     });
  // }

  // ===================================================================================================
  // CARGAR FOTOGRAFIA -- HTTPCLIENT APARTIR DE ANGULAR 6 O 7
  // ===================================================================================================
  actualizarImagen(archivo: File) {
    this.subirImagenService.fileUpload(archivo, 'usuario', this.usuario._id).subscribe((resp: any) => {
      this.usuario.img = resp.usuario.img;
      this.registrarUsuario(resp);
      Swal.fire({
        title: 'Imagen Actulizada',
        text: 'Su imagen se ha actualizado correctamente',
        type: 'success'
      });
    });
  }

  // ===================================================================================================
  // USUARIOS TODOS -- RECOLECTA LOS USUARIOS DE LA DB
  // ===================================================================================================
  getUsuarios(desde?: number) {
    let url = URL_SERVICIOS + '/usuario';
    if (desde) {
      url += `?desde=${desde}`;
    }
    return this.http.get(url);
  }

  // ===================================================================================================
  // USUARIOS BUSCAR -- Busca usuarios por colección y termino, en este caso la colección es 'usuario'
  // ===================================================================================================
  buscarUsuarios(termino: string, desde: number = 0) {
    const url = URL_SERVICIOS + `/busqueda/usuarios/${termino}?desde=${desde}`;
    return this.http.get(url);
  }

  borrarUsuario(id: string) {
    const url = URL_SERVICIOS + '/usuario/' + id;
    return this.http.delete(url, { params: this.params }).pipe(
      map(resp => {
        if (id === this.usuario._id) {
          Swal.fire('Accion no permitida', 'No puede borrarse a si mismo', 'error');
        } else {
          Swal.fire('Borrado', 'El usuario ha sido eliminado de la BD', 'success');
        }
      })
    );
  }
}
