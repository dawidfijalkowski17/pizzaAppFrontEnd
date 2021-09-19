import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap, toArray } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Pizza } from '../models/pizza';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = `${environment.baserUrl}${environment.port}`;

  amountToPay: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );

  products: BehaviorSubject<Array<Pizza>> = new BehaviorSubject<any>(
    []
  );

  pizzaPrice: any;
  filter: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filterName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  filterTo: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    if (localStorage.getItem('amount')) {
      let tmp = '' + localStorage.getItem('amount');
      let tmpNumber: number = +tmp;
      this.amountToPay.next(tmpNumber)
    }
  }

  getAllPizza() {
    return this.http.get(`${this.baseUrl}/api/pizza/get`);
  }

  getPopularPizza(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(`${this.baseUrl}/api/pizza/get`).pipe(
      map(data => data.filter(data => +data.price <= 30))
    )
  }
}
