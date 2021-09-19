import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pizza } from 'src/app/models/pizza';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PizzaService{
    private baseUrl = `${environment.baserUrl}${environment.port}/api`;

    constructor(private http: HttpClient) {}

  public getAllPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(`${this.baseUrl}/pizza/get`);
  }

  public deletePizza(id: string) {
    return this.http.delete(`${this.baseUrl}/pizza/delete/${id}`);
  }
}