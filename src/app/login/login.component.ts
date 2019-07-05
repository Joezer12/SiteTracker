import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { element } from 'protractor';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  recordarme: boolean;
  auth2: any;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit() {
    init_plugins();
    this.googleInit();
    if (localStorage.getItem('email')) {
      this.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '421544502604-43tmachu847dbqtm2rm8tq20hv6njoua.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachedSignin(document.getElementById('btnGoogle'));
    });
  }

  attachedSignin(elemento: HTMLElement) {
    this.auth2.attachClickHandler(elemento, {}, googleUser => {
      // let profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      console.log(token);
      this.usuarioService.loginGoogle(token).subscribe(resp => (window.location.href = '#/dashboard'));
    });
  }

  ingresar(forma: NgForm) {
    this.usuarioService.autenticarUsuario(forma.value.email, forma.value.password).subscribe((resp: any) => {
      if (forma.value.recordarme) {
        localStorage.setItem('email', forma.value.email);
      } else {
        localStorage.removeItem('email');
      }
      this.router.navigate(['/dashboard']);
    });
  }
}
