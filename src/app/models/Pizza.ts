import {Base} from './Base';
import {Ingredient} from './Ingredient';

export class Pizza {
  public base: Base;
  public ingredients: Ingredient[];
  public prix: number;
  constructor() {
    this.prix = 0;
    this.base = null;
    this.ingredients = [];
  }

  getPrice(): number {
    this.prix = 0;
    if (this.base != null) {
      this.prix += this.base.prix;
    }
    this.ingredients.forEach(element => {
      this.prix += element.prix;
    });
    return this.prix;
  }

  isValid(): boolean{
    if (this.base == null){
      return false;
    }
    if (this.ingredients.length === 0){
      return false;
    }
    return true;
  }
}

export class PizzaApi {
  public base = 'tomates';
  public pate = 'fine';
  public jambon = false;
  public miel = false;
  public magret = false;
  public anchois = false;
  public image: string;
  public nom: string;
  public prix: number;
  public date: Date;
  constructor() {
  }
}

export function convertPizzaForApi(pizza: Pizza): PizzaApi{
  const pizzaApi =  new PizzaApi();
  pizzaApi.base = pizza.base.nom;
  pizza.ingredients.forEach(item => {
    switch (item.nom.toLowerCase()){
      case 'anchois':
        pizzaApi.anchois = true;
        break;
      case 'jambon':
        pizzaApi.jambon = true;
        break;
      case 'miel':
        pizzaApi.miel = true;
        break;
      case 'magret':
        pizzaApi.magret = true;
        break;
    }
  });
  return pizzaApi;
}


