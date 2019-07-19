import { Hospital } from './hospital.model';
import { Usuario } from './usuario.model';

export class Medico {
  constructor(
    public nombre: string,
    public img?: string,
    // tslint:disable-next-line: variable-name
    public _id?: string,
    public hospital?: any,
    public usuario?: string
  ) {}
}
