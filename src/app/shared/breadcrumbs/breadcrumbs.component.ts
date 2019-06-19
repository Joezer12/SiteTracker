import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  data: any = {};
  constructor(private router: Router, private title: Title, private meta: Meta) {
    this.getRouteData().subscribe(datos => {
      this.data = datos.data;
      this.title.setTitle(datos.data.titulo); // Para cambiar el titulo de la pestaña del browser
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.data.titulo
      };

      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit() {}

  getRouteData() {
    return this.router.events.pipe(
      filter(evento => {
        if (evento instanceof ActivationEnd) {
          if (evento.snapshot.data.titulo) {
            return true;
          }
        }
      }),
      map((evento: ActivationEnd) => evento.snapshot)
    );
  }
}
