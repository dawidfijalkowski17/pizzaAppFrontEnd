import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  cartTotal: any;
  isLoggedUser!: boolean;
  constructor(private authService: AuthenticationService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe((res) => {
      this.isLoggedUser = res;
    }, (err) => {
      console.log(err)
    })

    this.orderService.amountToPay.subscribe((res) => {
      this.cartTotal = res;
    })
  }

  logOut() {
    this.authService.logout()
  }


}
