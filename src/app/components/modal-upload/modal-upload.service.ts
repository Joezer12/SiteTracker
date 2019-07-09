import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public tipo: string;
  public id: string;
  public oculto: boolean;

  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('Servicio ModalUpload');
    this.oculto = true;
  }

  ocultarModal() {
    this.oculto = true;
    this.tipo = null;
    this.id = null;
    return true;
  }

  mostarModal(tipo: string, id: string) {
    this.oculto = false;
    this.tipo = tipo;
    this.id = id;
    return false;
  }
}
