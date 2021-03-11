import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styles: [
  ]
})
export class ResultadosComponent {

  get resultados() {
    return this.gifsService.resultados;
  }

  get loading() {
    return this.gifsService.loading;
  }

  constructor(private gifsService: GifsService) { }



}
