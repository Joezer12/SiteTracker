import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription; // esto es para guardar una referencia de mi observable con la finalidad de
  // poder unsubscribe en OnDestroy

  constructor() {
    this.subscription = this.contador()
      .pipe(
        retry(2) // El parametro dentro retry es el número de intentos que se hará después de llamarse el observador
      )
      .subscribe(
        numero => console.log('Subs', numero), // Si todo sale bien llama este callback
        error => console.error('Fallo subs', error), // Si ocurre un error, llama este callback
        () => console.log('Observador termino') // Cuando se hace un complete, se llama este otro callback
        // Esto es parecido a bloque try - catch - finally solo que la primera parte del bloque
        // Se estará ejecutando indefinidamente mientras no se de un complete o haya un error
      );
  }

  ngOnInit() {}
  ngOnDestroy() {
    console.log('La página se cerro');
    this.subscription.unsubscribe();
  }

  contador(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let counter = 0;
      const intervalo = setInterval(() => {
        counter++;
        // observer.next(counter); // Este es el dato que se envía, aquí se puede establecer que sea un número

        // Si por alguna razón cambiara el typo del valor por un objeto, podemos usar el operador map()
        const salida = {
          valor: counter
        };
        observer.next(salida);

        // if (counter === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if (counter === 2) {
        //   // clearInterval(intervalo);
        //   observer.error('Counter llego a 2');
        // }
      }, 1000);
    }).pipe(
      map(salida => salida.valor),
      filter((valor, index) => {
        if (valor % 2 === 1) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
