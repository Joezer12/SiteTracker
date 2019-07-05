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
    this.usuario = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario')) : null;
    this.token = localStorage.getItem('token') || '';
    this.params = new HttpParams().set('token', this.token);
  }

  isLogged() {
    return localStorage.getItem('token') ? true : false;
  }

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

  actualizarUsuario(usuario: any) {
    const url = URL_SERVICIOS + `/usuario/${usuario._id}`;
    return this.http.put(url, usuario, { params: this.params }).pipe(
      map((resp: any) => {
        this.usuario = resp.usuario;
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        Swal.fire({
          type: 'success',
          title: 'Usuario Actualizado',
          text: 'Campos actualizados correctamente'
        });
      })
    );
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token }).pipe(
      map(resp => {
        this.registrarUsuario(resp);
        return true;
      })
    );
  }

  autenticarUsuario(email: string, password: string) {
    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, { email, password }).pipe(
      map(resp => {
        this.registrarUsuario(resp);
        return true;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  registrarUsuario(resp: any) {
    if (resp.id) {
      console.log('Guardando id en localStorage');
      localStorage.setItem('id', resp.id);
    }
    if (resp.token) {
      console.log('Guardando token en localStorage');
      localStorage.setItem('token', resp.token);
      this.token = resp.token;
    }
    if (resp.usuario) {
      console.log('Guardando usuario en localStorage');
      localStorage.setItem('usuario', JSON.stringify(resp.usuario));
      this.usuario = resp.usuario;
    }
  }

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
}
