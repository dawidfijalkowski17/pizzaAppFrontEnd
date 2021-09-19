import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })


export class OrderAddService{

    private baseUrl = `${environment.baserUrl}${environment.port}/api`;

    constructor(private http: HttpClient) {}

    addOrder(data: { name: any; surname: any; city: any; post_code: any; street: any;
    houseNumber: any; price: any; payment: any; content: any[]}) {
        return this.http.post(`${this.baseUrl}/order/add`, data)
      }

}