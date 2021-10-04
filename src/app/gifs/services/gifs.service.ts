import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[] = []
  private _apiKey: string = 'atEY4eFNmqc9v6pRcO4cIbDtuqHMxZyX'
  public resultados: Gif[] = []
  private _servicioUrl: string = 'https://api.giphy.com/v1/gifs'
  get historial(){
    
    return [...this._historial]
  }

  constructor(private http: HttpClient){
    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!)
    }
    if (localStorage.getItem('gifs')) {
      this.resultados = JSON.parse(localStorage.getItem('gifs')!)
    }
  }
  buscarGifs(query: string = ''){

    query = query.trim().toUpperCase();
    if (!this._historial.includes(query)){
      this._historial.unshift(query)
      this._historial = this._historial.splice(0,9)
      localStorage.setItem('historial', JSON.stringify(this._historial))
      
    }
    const params = new HttpParams()
    .set('api_key', this._apiKey)
    .set('q', query)
    .set('limit', '10')
    ;
    
    this.http.get<SearchGifsResponse>(`${this._servicioUrl}/search`, {params})
    .subscribe((res) => {
      console.log(res.data)
      this.resultados = res.data;
      localStorage.setItem('gifs', JSON.stringify(this.resultados))
    })
    
    console.log(this._historial)
  }
  
}
