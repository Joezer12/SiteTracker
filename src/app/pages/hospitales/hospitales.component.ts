import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { type } from 'os';
import { Title } from '@angular/platform-browser';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  desde: number;
  busqueda: string;
  hospitales: Hospital[];
  total: number;
  page: string;
  constructor(private hospitalService: HospitalService, public modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.desde = 0;
    this.busqueda = '';
    this.getHospitales();
    this.modalUploadService.notificacion.subscribe(resp => this.actualizarTabla(0));
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostarModal('hospital', id);
  }

  getHospitales() {
    this.hospitalService.getHospitales(this.desde).subscribe((resp: any) => {
      this.total = resp.total;
      this.hospitales = resp.hospitales;
      this.page = resp.page;
    });
  }

  buscarHospital(termino: string) {
    if (!this.busqueda) {
      this.desde = 0;
    }

    if (termino) {
      this.busqueda = termino;
      this.hospitalService.buscarHospital(termino, this.desde).subscribe((resp: any) => {
        this.total = resp.total;
        this.hospitales = resp.hospitales;
        this.page = resp.page;
      });
    } else {
      this.busqueda = '';
      this.getHospitales();
    }
  }

  // ===================================================================================================
  // PAGINACION -- Método para navegar entre los hospitales usando la variable 'desde' para el primer
  // elemento a mostrar
  // ===================================================================================================
  actualizarTabla(de: number) {
    if (this.desde + de < 0) {
      this.desde = 0;
    } else if (this.desde + de < this.total) {
      this.desde += de;
    } else {
      return;
    }
    if (!this.busqueda) {
      this.getHospitales();
    } else {
      this.buscarHospital(this.busqueda);
    }
  }

  // ===================================================================================================
  // ACTUALIZAR HOSPITAL -- Para modificar el NOMBRE de un hospital
  // ===================================================================================================
  guardar(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital).subscribe();
  }
  // ===================================================================================================
  // BORRAR HOSPITAL -- Método para borrar un hospital desde el botón BORRAR de la tabla.
  // ===================================================================================================
  borrarHospital(hospital: Hospital) {
    Swal.fire({
      type: 'warning',
      title: 'Desea eliminar: ' + hospital.nombre + '?',
      text: 'No se podrá revertir la acción una vez eliminado el hospital',
      showCancelButton: true,
      confirmButtonText: 'Borrar hospital',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#ef5350'
    }).then(borrar => {
      if (borrar.value) {
        this.hospitalService.deleteHospital(hospital).subscribe(resp => {
          if (this.total <= this.desde + 1) {
            this.desde -= 5;
          }
          if (!this.busqueda) {
            this.getHospitales();
          } else {
            this.buscarHospital(this.busqueda);
          }
        });
      }
    });
  }

  async agregarHospital() {
    const { value: nombre } = await Swal.fire({
      title: 'Nombre del Hospital:',
      input: 'text',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#ef5350',
      confirmButtonText: 'Agregar',
      showLoaderOnConfirm: true,
      inputValidator: value => {
        if (!value) {
          return 'Es necesario escribir un nombre';
        }
        if (value.length < 3) {
          return 'El nombre debe tener al menos 3 caracteres';
        }
      }
    });
    if (nombre) {
      const ok = this.hospitalService.crearHospital(nombre).subscribe();
      if (ok) {
        this.actualizarTabla(0);
      }
    }
  }
}
