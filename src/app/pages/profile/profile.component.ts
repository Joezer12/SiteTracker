import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { SubirImagenService } from '../../services/subir-imagen/subir-imagen.service';
import { LoginComponent } from '../../login/login.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenUpload: File;
  imagenTemp: string;
  constructor(private usuarioService: UsuarioService, private imagenService: SubirImagenService) {}

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

  actualizar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this.usuarioService.actualizarUsuario(this.usuario).subscribe();
  }

  imagenSeleccionada(archivo: File) {
    if (!archivo) {
      console.log('No se cargo');
      this.imagenUpload = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      this.imagenUpload = null;
      Swal.fire({
        type: 'error',
        title: 'Archivo no valido',
        text: 'Favor de utilizar solo imagenes'
      });
      return;
    }
    this.imagenUpload = archivo;
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      this.imagenTemp = String(reader.result);
      console.log(this.imagenTemp);
    };
  }

  actualizarImagen() {
    this.usuarioService.actualizarImagen(this.imagenUpload);
    // this.imagenService.fileUpload(this.imagenUpload, 'usuario', this.usuarioService.usuario._id).subscribe();
  }
}
