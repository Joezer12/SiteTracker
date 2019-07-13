import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Medico } from '../../models/medico.model';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  paramsToken: HttpParams;
  constructor(private http: HttpClient, private usuarioService: UsuarioService) {
    this.paramsToken = new HttpParams().set('token', this.usuarioService.token);
  }

  getMedicos(desde: number = 0) {
    const paramsDesde = this.paramsToken.set('desde', String(desde));

    const url = URL_SERVICIOS + '/medico';
    return this.http.get(url, { params: paramsDesde });
  }

  getMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url, { params: this.paramsToken }).pipe(map((resp: any) => resp.medico));
  }

  buscarMedico(termino: string, desde: number) {
    const paramsDesde = new HttpParams().set('desde', String(desde));
    const url = URL_SERVICIOS + '/busqueda/medicos/' + termino;
    return this.http.get(url, { params: paramsDesde });
  }

  agregarMedico(medico: Medico) {
    console.log(medico);

    const url = URL_SERVICIOS + '/medico';
    return this.http.post(url, medico, { params: this.paramsToken }).pipe(
      map(resp => {
        Swal.fire('Médico agregado', 'Se agregó exitosamente a ' + medico.nombre, 'success');
        return resp;
      })
    );
  }

  actualizarMedico(medico: Medico) {
    const url = URL_SERVICIOS + '/medico/' + medico._id;
    return this.http.put(url, { medico }, { params: this.paramsToken }).pipe(
      map(resp => {
        Swal.fire('Medico actualizado', 'Se ha acutalizado correcteamente', 'success');
        return true;
      })
    );
  }

  borrarMedico(medico: Medico) {
    const url = URL_SERVICIOS + '/medico/' + medico._id;
    return this.http.delete(url, { params: this.paramsToken }).pipe(
      map(resp => {
        Swal.fire('Medico eliminado', 'Se ha eliminado de la BD el médico ' + medico.nombre, 'success');
        return true;
      })
    );
  }
}
