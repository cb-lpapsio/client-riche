import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormPizzaComponent } from './components/form-pizza/form-pizza.component';
import {FormsModule} from '@angular/forms';
import { AccueilComponent } from './components/accueil/accueil.component';
import {PizzaService} from './service/pizza.service';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import { PizzafavoriteComponent } from './components/pizzafavorite/pizzafavorite.component';
import { PizzaCardComponent } from './components/pizza-card/pizza-card.component';
import { PizzaListComponent } from './components/pizza-list/pizza-list.component';

import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import {DateformatPipe} from './pipes/dateformat.pipe';

// https://www.npmjs.com/package/ngx-toastr  Configuration
import {CommonModule} from '@angular/common';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HistoriqueComponent } from './components/historique/historique.component';


// https://www.npmjs.com/package/javascript-time-ago
import TimeAgo from 'javascript-time-ago';
import fr from 'javascript-time-ago/locale/fr';
import { LoaderComponent } from './components/loader/loader.component';

TimeAgo.addDefaultLocale(fr);
registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FormPizzaComponent,
    AccueilComponent,
    PizzafavoriteComponent,
    PizzaCardComponent,
    PizzaListComponent,
    HistoriqueComponent,
    DateformatPipe,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ToastrModule.forRoot({timeOut: 10000, closeButton: true})
  ],
  providers: [PizzaService, {provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
