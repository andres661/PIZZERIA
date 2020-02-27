import { Injectable } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { pizza } from "../interface/pizza";
import { response } from '../interface/response';
import { element } from 'protractor';


const httpOptions = {
  headers: new HttpHeaders({

    'Content-Type': 'application/json',
    'Authorization':'my-auth-token'
  })
}

@Injectable()
export class ServicioService {

  public seleccionarProducto: pizza = new pizza();

  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: String) { }

  ObtenerPizzas() {
    return this.http.get<pizza[]>(this.baseUrl + "api/Pizzeria/Index");
  }

  public Add(pizza: pizza) {

    this.http.post<response>(this.baseUrl + "api/Pizzeria/add", {
      'nombre': pizza.nombre, 'ingredientes': pizza.ingredientes,
      'precio': pizza.precio, 'foto': pizza.foto
    }, httpOptions).subscribe(result => {
      console.log(result);
    }, error => console.error(error))
  }

  public Update(pizza: pizza) {
    console.log(pizza);
    this.http.put<response>(this.baseUrl + "api/Pizzeria/Update", {
      'id': pizza.id, 'nombre': pizza.nombre, 'ingredientes': pizza.ingredientes,
      'precio': pizza.precio, 'foto': pizza.foto
    }, httpOptions).subscribe(result => {
      console.log(result);
    }, error => console.error(error))
  }
}
