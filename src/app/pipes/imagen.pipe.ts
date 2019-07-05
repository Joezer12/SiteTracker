import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/img';

    if (!img) {
      return url + '/usuario/no-image';
    }

    if (img.indexOf('http') >= 0) {
      return img;
    }

    switch (tipo) {
      case 'usuario':
        url += '/usuario/' + img;
        break;
      case 'medico':
        url += '/medico/' + img;
        break;
      case 'hospital':
        url += '/hospital/' + img;
        break;
      default:
        console.log('Tipo de imagen de una colección incorrecta, validos: usuario, medico y hospital');
        url += '/usuario/no-image';
    }

    return url;
  }
}
