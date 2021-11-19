import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearshGifsResponse } from 'src/app/interfaces/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey='r0ChM8q0lbYqJNgYmma9bg0fBf4vSHNj';
  private servicioUrl="https://api.giphy.com/v1/gifs"
  private _historial:string[]=[];

  public resultados:Gif[] = [];

    get historial(){
      return [...this._historial];
    }

    constructor(private http:HttpClient){
     this._historial= JSON.parse(localStorage.getItem('historial')!) || [];
     this.resultados= JSON.parse(localStorage.getItem('resultado')!) || [];
    }

    buscarGifs(sql:string){

       sql = sql.trim().toLowerCase();
      if(!this._historial.includes(sql)){
        this._historial.unshift(sql);
        this._historial=this._historial.splice(0, 10);

          localStorage.setItem('historial', JSON.stringify(this._historial));
      }

      // con esete paramas logro guaradar todos los valores de la url donde voy a consumir el api para que quede mas organizado y no
      // quede de esta manera: (`/search?api_key=r0ChM8q0lbYqJNgYmma9bg0fBf4vSHNj&q=${sql}&limit=10`)
      const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', sql)

      console.log(this._historial);
      this.http.get<SearshGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe((resp)=>{
        console.log(resp.data);
        this.resultados=resp.data;
        localStorage.setItem('resultado', JSON.stringify(this.resultados));
      })
    }
}
