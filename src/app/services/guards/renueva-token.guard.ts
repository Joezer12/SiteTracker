import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class RenuevaTokenGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService) {}

  canActivate(): Promise<boolean> | boolean {
    const token = this.usuarioService.token;

    const payload = JSON.parse(atob(token.split('.')[1]));

    const exp = this.expirado(payload.exp);
    if (exp) {
      this.usuarioService.logout();
      return false;
    }

    return this.renueva(payload.exp);
  }

  expirado(fechaExp: number) {
    const ahora = new Date().getTime() / 1000;
    if (ahora > fechaExp) {
      return true;
    }
    return false;
  }

  renueva(fechaExp: number): Promise<boolean> {
    return new Promise((res, rej) => {
      const tokenExp = new Date(fechaExp * 1000);
      const ahora = new Date();

      // Aquí se agrega un tiempo más para revisar si el token esta a punto de expirar
      // En este caso es 5 min, pero getTime() entrega milisegundos por lo que se multiplica por 1000
      ahora.setTime(ahora.getTime() + 5 * 60 * 1000);

      if (ahora.getTime() > tokenExp.getTime()) {
        res(true);
      }
      this.usuarioService.renuevaToken().subscribe(
        () => {
          res(true);
        },
        () => {
          this.usuarioService.logout();
          reject(false);
        }
      );
      res(true);
    });
  }
}
