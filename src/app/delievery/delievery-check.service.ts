import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })


export class DelieveryCheckService{

    private baseUrl = `${environment.baserUrl}${environment.port}/api`;

    constructor(private http: HttpClient) {}

    checkDelievery(data: { city: any; street: any; houseNumber: any; }) {
        console.log(data);
        console.log(Response.toString);
        console.log(this.http.post(`${this.baseUrl}/delivery/check`, data));
        return this.http.post(`${this.baseUrl}/delivery/check`, data);
      }

}