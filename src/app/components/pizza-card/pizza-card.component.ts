import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PizzaApi} from '../../models/Pizza';
import {PizzaService} from '../../service/pizza.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {LoggerService} from '../../service/logger.service';

@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html'
})
export class PizzaCardComponent implements OnInit {
  @Input() public pizza: PizzaApi;
  @Output('orderStart') onOrderStart = new EventEmitter<string>();
  @Output('orderEnd') onOrderEnd = new EventEmitter<string>();
  public btnLoader = false;
  @Input() public disabled = false;

  constructor(private pizzaservice: PizzaService, private toastr: ToastrService, private router: Router, private logger: LoggerService) { }

  ngOnInit(): void {
    this.logger.info('ngOnInit PizzaCardComponent').subscribe();
  }

  getPizzaDescription(): string {
    let description = `Pâte ${this.pizza.pate}, Base ${this.pizza.base}`;
    if (this.pizza.magret){
      description += ', magret';
    }
    if (this.pizza.anchois){
      description += ', anchois';
    }
    if (this.pizza.jambon){
      description += ', jambon';
    }
    if (this.pizza.miel){
      description += ', miel';
    }
    return description;
  }

  commanderPizza(): void {
    this.onOrderStart.emit('onOrderStart');
    this.btnLoader = true;
    this.pizzaservice.commanderPizzaApi(this.pizza).subscribe(success => {
      this.logger.info(`Commande passer avec succès ${success.id}`).subscribe();
      this.btnLoader = false;
      this.toastr.success(`Votre commande porte l'identifiant ${success.id}`, 'Commande');
      this.router.navigate(['/historique']);
      this.onOrderEnd.emit('onOrderEnd');
    }, error => {
      this.logger.error(`Erreur lors de la commande (${error.error.status})`).subscribe();
      this.btnLoader = false;
      this.toastr.error(`Erreur lors de la commande (${error.error.status})`);
      this.onOrderEnd.emit('onOrderEnd');
    });
  }
}
