import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchGifsResponse, Gifs } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'micYC9GQ37Pv48AEkVqdyWPXOkG5jAAC';
  private API_URL: string = 'http://api.giphy.com/v1/gifs/';
  private _historial: string[] = [];
  public resultados: Gifs[] = [];
  public _loading: boolean = false;

  get historial() {
    return [...this._historial];
  }

  get loading() {
    return this._loading
  }

  constructor(private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  buscarGifs(query: string) {

    query = query.trim().toLowerCase();
    this._loading = true;

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 9);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.API_URL}search`, { params })
      .subscribe((response) => {
        this.resultados = response.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
        this._loading = false;
      });
  }
}
