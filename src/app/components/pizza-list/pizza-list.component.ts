import { Component, OnInit } from '@angular/core';
import {PizzaService} from '../../service/pizza.service';
import {PizzaApi} from '../../models/Pizza';
import {ToastrService} from 'ngx-toastr';
import {LoggerService} from '../../service/logger.service';

@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html'
})
export class PizzaListComponent implements OnInit {
  private pizzas: PizzaApi[];
  public pizzasFiltered: PizzaApi[];
  public pizzaMaxPrice = 15;
  public loader: boolean;
  public btnsDisabled = false;

  constructor(private pizzaservice: PizzaService, private toastr: ToastrService, private logger: LoggerService) { }

  ngOnInit(): void {
    this.loader = true;
    this.pizzaservice.getPizzasApi().subscribe(success => {
      this.pizzas = success;
      this.filterPizzas();
      this.loader = false;
    }, error => {
      this.toastr.error(`Erreur lors du chargement des pizzas (${error.error.status})`);
      this.logger.error(`Erreur lors du chargement des pizzas (${error.error.status})`).subscribe();
      this.loader = false;
    });
  }

  orderStart(): void {
    this.btnsDisabled = true;
  }
  orderEnd(): void {
    this.btnsDisabled = false;
  }

  filterPizzas(): void{
    this.pizzasFiltered = this.pizzas.filter(x => x.prix < this.pizzaMaxPrice);
  }

  priceRangeChange(value: string): void {
    this.pizzaMaxPrice = parseInt(value, 10);
    this.filterPizzas();
  }
}
