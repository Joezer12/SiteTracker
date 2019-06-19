import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {
  constructor() {
    this.contarHastaTres()
      .then(mensaje => console.log('Todo OK', mensaje))
      .catch(error => console.error('Error en la promesa', error));
    // En el parametro mensaje es lo que enviamos en el rosolve: 'Finalizando completamente'
    // En el error es lo que enviamos en el reject: 'Generando un error'
  }

  ngOnInit() {}

  contarHastaTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let counter = 0;
      const interval = setInterval(() => {
        counter++;
        console.log(counter);
        if (counter === 3) {
          // Se puede agregar un parametro que es lo que se enviara en la función, como ej.
          // resolve('Finalizando correctamente');
          // En caso de que haya un error se disparará el reject
          // reject('Generando un error');
          resolve(true);

          // Si no se limpia el intervalo, este seguirá llamandose eternamente...
          clearInterval(interval);
        }
      }, 1000);
    });
  }
}
