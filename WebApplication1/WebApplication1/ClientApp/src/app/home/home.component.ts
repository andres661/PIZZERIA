import { Component ,Inject, Input} from '@angular/core';
import { pizza } from "../interface/pizza";
import { ServicioService } from "../services/servicio.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public pizza: pizza[];
  

  constructor(public servicio: ServicioService) {
    servicio.ObtenerPizzas().subscribe(result => {
      this.pizza = result;
    }, error => console.error(error))
  }

  onEdit(producto: pizza) {
    console.log(producto);
    this.servicio.seleccionarProducto = Object.assign({}, producto);
  }
 
}

