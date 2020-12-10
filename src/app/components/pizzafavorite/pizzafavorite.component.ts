import { Component, OnInit } from '@angular/core';
import {PizzaApi} from '../../models/Pizza';
import {PizzaService} from '../../service/pizza.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LoggerService} from '../../service/logger.service';

@Component({
  selector: 'app-pizzafavorite',
  templateUrl: './pizzafavorite.component.html'
})
export class PizzafavoriteComponent implements OnInit {
  public lastPizza: PizzaApi;
  public loader: boolean;
  public show: boolean;

  constructor(public pizzaservice: PizzaService, private router: Router, private toastr: ToastrService, private logger: LoggerService) {
    this.show = false;
  }

  ngOnInit(): void {
    this.lastPizza = this.pizzaservice.getLastPizza();
    if (this.lastPizza != null){
      this.show = true;
    }
  }

  commanderLastPizza(): void {
    this.loader = true;
    this.pizzaservice.commanderPizzaApi(this.lastPizza).subscribe(success => {
      this.loader = false;
      this.toastr.success(`Votre commande porte l'identifiant ${success.id}`, 'Commande');
      this.router.navigate(['/historique']);
    }, error => {
      this.loader = false;
      this.toastr.error(`Erreur lors de la commande (${error.error.status})`);
      this.logger.error(`Erreur lors de la commande (${error.error.status})`).subscribe();
    });
  }
}
