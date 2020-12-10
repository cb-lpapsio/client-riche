import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PizzaApi} from '../models/Pizza';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private url = 'http://localhost:8000';
  constructor(private http: HttpClient) { }

  warning(message: string): Observable<any> {
    return this.http.get(this.url + `/logger/warn?message=${message}`);
  }

  info(message: string): Observable<any> {
    return this.http.get(this.url + `/logger/info?message=${message}`);
  }

  error(message: string): Observable<any> {
    return this.http.get(this.url + `/logger/error?message=${message}`);
  }
}
