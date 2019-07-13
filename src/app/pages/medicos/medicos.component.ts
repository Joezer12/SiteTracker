import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { Medico } from '../../models/medico.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  busqueda: string;
  desde: number;
  page: string;
  total: number;
  medico: Medico;
  medicos: Medico[];
  constructor(private medicoService: MedicoService, private modalUploadService: ModalUploadService) {
    this.desde = 0;
    this.busqueda = '';
  }

  ngOnInit() {
    this.getMedicos();
    this.modalUploadService.notificacion.subscribe(() => this.actualizarTabla(0));
  }

  getMedicos() {
    this.medicoService.getMedicos(this.desde).subscribe((resp: any) => {
      this.medicos = resp.medicos;
      this.total = resp.total;
      this.page = resp.page;
    });
  }

  buscarMedico(termino: string) {
    if (!this.busqueda) {
      this.desde = 0;
    }

    if (termino) {
      this.busqueda = termino;
      this.medicoService.buscarMedico(termino, this.desde).subscribe((resp: any) => {
        this.total = resp.total;
        this.medicos = resp.medicos;
        this.page = resp.page;
      });
    } else {
      this.busqueda = '';
      this.getMedicos();
    }
  }

  actualizarTabla(de: number) {
    if (this.desde + de < 0) {
      this.desde = 0;
    } else if (this.desde + de < this.total) {
      this.desde += de;
    } else {
      return;
    }
    if (!this.busqueda) {
      this.getMedicos();
    } else {
      this.buscarMedico(this.busqueda);
    }
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostarModal('medico', id);
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      type: 'warning',
      title: 'Seguro de eliminar',
      text: 'Una vez eliminado ' + medico.nombre + ' no se podra recuperar su información',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#ef5350',
      confirmButtonText: 'Eliminar'
    }).then(borrar => {
      if (borrar.value) {
        this.medicoService.borrarMedico(medico).subscribe(resp => {
          if (resp) {
            this.actualizarTabla(0);
          }
        });
      }
    });
  }
}
