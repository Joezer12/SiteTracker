import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}
  canActivate(): boolean {
    if (this.usuarioService.isLogged()) {
      console.log('Pasó el Guard');
      return true;
    } else {
      console.log('GTF out of here!!!! =P');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
