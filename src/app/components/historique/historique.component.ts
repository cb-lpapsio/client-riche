import { Component, OnInit } from '@angular/core';
import {PizzaService} from '../../service/pizza.service';
import {PizzaApi} from '../../models/Pizza';
import {LoggerService} from '../../service/logger.service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html'
})
export class HistoriqueComponent implements OnInit {

  constructor(public pizzaService: PizzaService, private logger: LoggerService, private toastr: ToastrService) { }
  public pizzaList: PizzaApi[];
  public loader: boolean;

  ngOnInit(): void {
    this.loader = true;
    this.pizzaService.getHistorique().subscribe(success => {
      // @ts-ignore
      this.pizzaList = success.sort( (a, b) =>  new Date(b.date) - new Date(a.date));
      this.loader = false;
    }, error => {
      this.loader = false;
      this.logger.error(`Erreur lors du chargement de l\'historique des pizzas (${error.error.status})`).subscribe();
      this.toastr.error(`Erreur lors du chargement de l\'historique des pizzas (${error.error.status})`);
    });
  }

}
