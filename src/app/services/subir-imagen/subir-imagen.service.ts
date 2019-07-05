import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubirImagenService {
  constructor(private http: HttpClient) {}

  subirArchivo(fileItem: File, tipo: string, id: string) {
    return new Promise((resolve, rej) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append('imagen', fileItem, fileItem.name);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Imagen Cargada');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo carga de Imagen');
            rej(JSON.parse(xhr.response));
          }
        }
      };
      const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }

  fileUpload(fileItem: File, tipo: string, id: string) {
    const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
    const formData: FormData = new FormData();
    formData.append('imagen', fileItem, fileItem.name);
    return this.http.put(url, formData, { reportProgress: true });
  }
}
