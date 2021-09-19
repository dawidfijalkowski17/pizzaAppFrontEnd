import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, ReplaySubject, Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { IUser } from '../User/I-user';
import { User } from '../User/user'
import { UserService } from '../User/user.service';
import { environment } from 'src/environments/environment';
import { OrderService } from './order.service';

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = `${environment.baserUrl}${environment.port}`;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    !null
  );
  isAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false
  )
  private token = '';

  constructor(private http: HttpClient, private userService: UserService, private orderService: OrderService) {
    this.loadToken();

    if (localStorage.getItem('admin')) {
      this.isAdmin.next(true)
    }
  }

  async loadToken() {
    const token = await localStorage.getItem('my-token');
    if (token) {
      this.token = token;
      this.generateAndStoreUserDetails(this.token);
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: { username: any; password: any }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/login`, credentials).pipe(
      map((data: any) => data.accessToken),
      tap((token) => {
        this.token = token;
        if (!localStorage.getItem('amount')) {
          this.orderService.amountToPay.next(0)
        }
        this.generateAndStoreUserDetails(this.token);
        localStorage.setItem('my-token', this.token);
        this.userService.getUserDetails().roles.forEach(role => {
          if (role === "ROLE_USER") {
            localStorage.setItem('admin', 'admin')
            this.isAdmin.next(true)
          }
        });
        this.isAuthenticated.next(true);
      })
    );
  }

  register(data: { username: any; password: any; email: any; roles: any }) {
    return this.http.post(`${this.baseUrl}/api/auth/register`, data);
  }

  logout() {
    this.isAuthenticated.next(false);
    this.isAdmin.next(false);
    localStorage.removeItem('admin')
    localStorage.removeItem('amount')
    return localStorage.removeItem('my-token');
  }

  decodeJWTtoken(token: string): IUser {
    const decodedToken = jwt_decode(token, { header: false }) as IUser;
    const userDetails: IUser = {
      accessToken: token,
      username: decodedToken.username,
      roles: decodedToken.roles,
      email: decodedToken.email,
      id: decodedToken.id,
      isActive: decodedToken.isActive
    };
    return userDetails;
  }

  private generateAndStoreUserDetails(token: string) {
    this.userService.storeUserDetails(this.decodeJWTtoken(token));
  }

  getToken() {
    return this.token;
  }
}
