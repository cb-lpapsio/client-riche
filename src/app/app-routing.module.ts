import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormPizzaComponent} from './components/form-pizza/form-pizza.component';
import {AccueilComponent} from './components/accueil/accueil.component';
import {PizzaListComponent} from './components/pizza-list/pizza-list.component';
import {HistoriqueComponent} from './components/historique/historique.component';

const routes: Routes = [
  {path: '', component: AccueilComponent},
  {path: 'formulaire', component: FormPizzaComponent},
  {path: 'carte', component: PizzaListComponent},
  {path: 'historique', component: HistoriqueComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
