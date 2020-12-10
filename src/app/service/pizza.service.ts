import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {convertPizzaForApi, Pizza, PizzaApi} from '../models/Pizza';
import {LoggerService} from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  private url = 'http://localhost:8000';
  constructor(private http: HttpClient) { }

  testApi(): Observable<any> {
    return this.http.get(this.url + '/test');
  }

  commanderPizzaApi(pizzaApi: PizzaApi): Observable<any> {
    window.localStorage.setItem('lastpizza', JSON.stringify(pizzaApi));
    return this.http.post(this.url + `/commanderPizza?base=${pizzaApi.base}&pate=${pizzaApi.pate}&anchois=${pizzaApi.anchois}&jambon=${pizzaApi.jambon}&miel=${pizzaApi.miel}&magret=${pizzaApi.magret}`
      , '');
  }
  commanderPizza(pizza: Pizza): Observable<any> {
    const pizzaApi = convertPizzaForApi(pizza);
    window.localStorage.setItem('lastpizza', JSON.stringify(pizzaApi));
    return this.http.post(this.url + `/commanderPizza?base=${pizzaApi.base}&pate=${pizzaApi.pate}&anchois=${pizzaApi.anchois}&jambon=${pizzaApi.jambon}&miel=${pizzaApi.miel}&magret=${pizzaApi.magret}`
      , '');
  }
  getLastPizza(): PizzaApi {
    return JSON.parse(window.localStorage.getItem('lastpizza'));
  }
  getPizzasApi(): Observable<PizzaApi[]> {
    return  this.http.get<PizzaApi[]>(this.url + '/pizzas');
  }

  getHistorique(): Observable<PizzaApi[]> {
    return  this.http.get<PizzaApi[]>(this.url + '/historique');
  }

  getPizzaDescription(pizza: PizzaApi): string {
    let description = `Pâte ${pizza.pate}, Base ${pizza.base}`;
    if (pizza.magret){
      description += ', magret';
    }
    if (pizza.anchois){
      description += ', anchois';
    }
    if (pizza.jambon){
      description += ', jambon';
    }
    if (pizza.miel){
      description += ', miel';
    }
    return description;
  }
}
