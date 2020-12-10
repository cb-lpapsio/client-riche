import { Component, OnInit } from '@angular/core';
import {LoggerService} from '../../service/logger.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html'
})
export class AccueilComponent implements OnInit {

  constructor(private logger: LoggerService) { }

  ngOnInit(): void {
    this.logger.info('ngOnInit AccueilComponent').subscribe();
  }

}
