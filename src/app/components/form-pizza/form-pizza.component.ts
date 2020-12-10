import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Ingredient} from '../../models/Ingredient';
import {Base} from '../../models/Base';
import {Pizza, PizzaApi} from '../../models/Pizza';
import {PizzaService} from '../../service/pizza.service';
import {ToastrService} from 'ngx-toastr';
import {LoggerService} from '../../service/logger.service';

@Component({
  selector: 'app-form-pizza',
  templateUrl: './form-pizza.component.html'
})

export class FormPizzaComponent implements OnInit {
  public ingredients: Ingredient[] = [
    new Ingredient('Anchois', 1),
    new Ingredient('Jambon', 2),
    new Ingredient('Miel', 3),
    new Ingredient('Magret', 4)
  ];
  public bases: Base[] = [
    new Base('Tomates', 3),
    new Base('Creme', 4)
  ];

  public pizza: Pizza;
  public loaderCommande: boolean;


  constructor(private router: Router, private pizzaservice: PizzaService, private toastr: ToastrService, private logger: LoggerService) {
    this.pizza = new Pizza();
    this.loaderCommande = false;
  }

  ngOnInit(): void {
    this.logger.info('ngOnInit FormPizzaComponent').subscribe();
  }

  ingredientChange(ingredient: Ingredient, event): void {
    if (event.target.checked ){
      this.pizza.ingredients.push(ingredient);
    }else{
      this.pizza.ingredients = this.pizza.ingredients.filter(item => item.nom !== ingredient.nom);
    }
  }

  baseChange(base: Base, $event: Event): void {
    this.pizza.base =  base;
  }

  commander(): void {
    if (this.pizza.isValid()){
      this.loaderCommande = true;
      this.pizzaservice.commanderPizza(this.pizza).subscribe(success => {
        this.logger.info(`Commande passer avec succès ${success.id}`).subscribe();
        this.loaderCommande = false;
        this.toastr.success(`Votre commande porte l'identifiant ${success.id}`, 'Commande');
        this.router.navigate(['/historique']);
      }, error => {
        this.logger.error(`Erreur lors du passage de la commande`).subscribe();
        this.loaderCommande = false;
        this.toastr.error(`Erreur lors de la commande (${error.error.status})`);
      });
    }else{
      this.toastr.error(`pizza invalide`);
    }

  }
}
