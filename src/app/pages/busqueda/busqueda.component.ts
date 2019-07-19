import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Hospital } from '../../models/hospital.model';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  loading: boolean;
  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      const termino = params.termino;
      this.buscar(termino);
      this.loading = false;
    });
  }

  ngOnInit() {}

  buscar(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url).subscribe((resp: any) => {
      console.log(resp);

      this.medicos = resp.medicos.medicos;
      this.hospitales = resp.hospitales.hospitales;
      this.usuarios = resp.usuarios.usuarios;
    });
  }
}
