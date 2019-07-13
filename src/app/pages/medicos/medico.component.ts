import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  medico = new Medico('', '', '', '');
  hospitales: Hospital[];
  imagenHospitalTemp: string;
  imagenMedicoTemp: string;
  id: string;
  imagenMedico: File;
  imagenHospital: File;

  constructor(
    private medicoService: MedicoService,
    private hospitalService: HospitalService,
    private activatedRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params.id !== 'nuevo') {
        this.medicoService.getMedico(params.id).subscribe((medico: any) => {
          this.medico = medico;
        });
      }
    });
  }

  ngOnInit() {
    this.hospitalService.getHospitales().subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
    });
  }

  actualizarImagen() {}

  imagenMedicoSeleccionada(archivo: File) {
    if (!archivo) {
      console.log('No se cargo');
      this.imagenMedico = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      this.imagenMedico = null;
      Swal.fire({
        type: 'error',
        title: 'Archivo no valido',
        text: 'Favor de utilizar solo imagenes'
      });
      return;
    }
    this.imagenMedico = archivo;
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      this.imagenMedicoTemp = String(reader.result);
    };
  }

  imagenHospitalSeleccionada(archivo: File) {
    if (!archivo) {
      console.log('No se cargo');
      this.imagenHospital = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      this.imagenHospital = null;
      Swal.fire({
        type: 'error',
        title: 'Archivo no valido',
        text: 'Favor de utilizar solo imagenes'
      });
      return;
    }
    this.imagenHospital = archivo;
    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      this.imagenHospitalTemp = String(reader.result);
    };
  }

  actualizar(form: NgForm) {
    if (form.valid) {
      this.medicoService.agregarMedico(this.medico).subscribe((resp: any) => (this.medico = resp.medico));
    }
  }

  cambioHospital(event) {
    console.log(event);
  }
}
