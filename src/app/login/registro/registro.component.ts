import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  forma: FormGroup;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  confirmarCampo(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      const var1 = group.controls[campo1].value;
      const var2 = group.controls[campo2].value;

      if (var1 === var2) {
        return null;
      }
      console.log(group);

      return {
        confirmarCampo: true
      };
    };
  }

  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        correo: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false)
      },
      { validators: this.confirmarCampo('password', 'password2') }
    );

    this.forma.setValue({
      nombre: 'Test 1',
      correo: 'test1@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  registrar() {
    console.log(this.forma.valid);
    if (this.forma.invalid) {
      return;
    }
    if (!this.forma.value.condiciones) {
      Swal.fire({
        title: 'Importante',
        text: 'Debes de aceptar las Términos y Condiciones',
        type: 'warning'
      });
      return;
    }
    const usuario = new Usuario(this.forma.value.nombre, this.forma.value.correo, this.forma.value.password);
    this.usuarioService.crearUsuario(usuario).subscribe(resp => this.router.navigate(['/login']));
  }
}
