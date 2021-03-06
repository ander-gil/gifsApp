import { Component} from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',

})
export class SidebarComponent {

  constructor(private gifservicios:GifsService){}

    get historiales(){
      return this.gifservicios.historial;
    }

    buscar(seleccionado:string){
      this.gifservicios.buscarGifs(seleccionado);
    }
}
