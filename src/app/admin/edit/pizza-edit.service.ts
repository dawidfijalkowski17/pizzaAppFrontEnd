import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pizza } from 'src/app/models/pizza';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })

  

export class PizzaEditService{
    private baseUrl = `${environment.baserUrl}${environment.port}/api`;

    constructor(private http: HttpClient) {}

    editPizza(data: {name: any; description: any; price: any; urlAdress:any}, id: string){
        return this.http.patch(`${this.baseUrl}/pizza/update/${id}`, data);
    }
    getSelected(id:string):Observable<Pizza[]>{
        return this.http.get<Pizza[]>(`${this.baseUrl}/pizza/get/${id}`);
    }

}