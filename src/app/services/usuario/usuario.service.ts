import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = URL_SERVICIOS;

  constructor(private http: HttpClient, private router: Router) {
    console.log('Servicio Usuario listo', this.url);
  }

  isLogged() {
    return localStorage.getItem('token') ? true : false;
  }

  crearUsuario(usuario: Usuario) {
    this.url += '/usuario';
    return this.http.post(this.url, usuario).pipe(
      map((resp: any) => {
        Swal.fire({
          type: 'success',
          text: 'Usuario creado correctamente'
        });
        return resp.usuario;
      })
    );
  }

  loginGoogle(token: string) {
    this.url += '/login/google';
    return this.http.post(this.url, { token });
  }

  autenticarUsuario(email: string, password: string) {
    this.url += '/login';
    return this.http.post(this.url, { email, password });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
