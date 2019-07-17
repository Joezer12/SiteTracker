import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  usuarioSession: Usuario;
  private paramsToken: HttpParams;

  constructor(
    private usuarioService: UsuarioService,
    private http: HttpClient,
    public modalUploadService: ModalUploadService
  ) {
    this.usuarioSession = this.usuarioService.usuario;
    this.paramsToken = new HttpParams().set('token', this.usuarioService.token);
  }

  getHospitales(desde?: number) {
    const url = URL_SERVICIOS + '/hospital';
    if (desde) {
      const paramDesde = new HttpParams().set('desde', String(desde));
      return this.http.get(url, { params: paramDesde });
    }
    return this.http.get(url);
  }

  getHospital(id: string) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url, { params: this.paramsToken }).pipe(map((resp: any) => resp.hospital));
  }

  crearHospital(nombre: string) {
    const url = URL_SERVICIOS + '/hospital/';
    return this.http.post(url, { nombre }, { params: this.paramsToken }).pipe(
      map(resp => {
        Swal.fire('Hospital Agregado', 'Se ha agregado exitosamente ' + nombre, 'success');
        return true;
      })
    );
  }

  deleteHospital(hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital/' + hospital._id;
    return this.http.delete(url, { params: this.paramsToken }).pipe(
      map(resp => {
        Swal.fire('Hospital Eliminado', 'Se ha eliminado exitosamente ' + hospital.nombre, 'success');
        return true;
      })
    );
  }

  actualizarHospital(hospital: Hospital) {
    const url = URL_SERVICIOS + '/hospital/' + hospital._id;
    return this.http.put(url, hospital, { params: this.paramsToken }).pipe(
      map(resp => {
        Swal.fire('Nombre Actualizado', 'El nombre del hospital ha sido actualizado con exito', 'success');
        return true;
      })
    );
  }

  buscarHospital(termino: string, desde: number) {
    const paramsDesde = new HttpParams().set('desde', String(desde));
    const url = URL_SERVICIOS + '/busqueda/hospitales/' + termino;
    return this.http.get(url, { params: paramsDesde });
  }
}
