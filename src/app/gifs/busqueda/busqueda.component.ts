import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

    @ViewChild('txtbuscar') txtbuscar!:ElementRef<HTMLInputElement>;

    constructor(private gifsservice:GifsService){



    }

    buscar(){

   const valor= this.txtbuscar.nativeElement.value;

   if(valor.trim().length===0){
      return;
   }

      this.gifsservice.buscarGifs(valor);

   this.txtbuscar.nativeElement.value='';
  }

}
