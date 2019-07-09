import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { SubirImagenService } from '../../services/subir-imagen/subir-imagen.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  modalDisplay: boolean;
  imagenUpload: File;
  imagenTemp: string;
  constructor(private subirImagenService: SubirImagenService, public modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.modalDisplay = this.modalUploadService.oculto;
  }

  ocultarModal() {
    this.imagenUpload = null;
    this.imagenTemp = null;
    this.modalDisplay = this.modalUploadService.ocultarModal();
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
    };
  }

  actualizarImagen() {
    this.subirImagenService
      .fileUpload(this.imagenUpload, this.modalUploadService.tipo, this.modalUploadService.id)
      .subscribe(
        resp => {
          console.log(resp);
          this.modalUploadService.notificacion.emit(resp);
          this.ocultarModal();
        },
        error => {
          console.log('error');
        }
      );

    // this.imagenService.fileUpload(this.imagenUpload, 'usuario', this.usuarioService.usuario._id).subscribe();
  }
}
