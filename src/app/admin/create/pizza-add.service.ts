import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })


export class PizzaAddService{
    private baseUrl = `${environment.baserUrl}${environment.port}/api`;

    constructor(private http: HttpClient) {}

    addPizza(data: { name: any; description: any; price: any, urlAdress: any}) {
        return this.http.post(`${this.baseUrl}/pizza/add`, data);
      }

}