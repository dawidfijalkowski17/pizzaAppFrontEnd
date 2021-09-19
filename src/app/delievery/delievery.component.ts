import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { OrderService } from '../services/order.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DelieveryCheckService } from './delievery-check.service';
import { LocationDelivery } from '../models/location';

@Component({
  selector: 'app-delievery',
  templateUrl: './delievery.component.html',
  styleUrls: ['./delievery.component.css']
})
export class DelieveryComponent implements OnInit {

  cartTotal: any;
  isLoggedUser!: boolean;
  answer!: boolean
  delivery = false;
  deliveryN = false;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthenticationService,
    private orderService: OrderService,
    private delieveryService: DelieveryCheckService) { }


  credentials = this.formBuilder.group({
    city: ['', [Validators.required, Validators.minLength(3)]],
    street: ['', [Validators.required, Validators.minLength(3)]],
    houseNumber: ['', [Validators.required, Validators.minLength(1)]],
  })

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

  checkDelievery(){
    const delieveryData = {
      city: this.credentials.controls.city.value,
      street: this.credentials.controls.street.value,
      houseNumber: this.credentials.controls.houseNumber.value
    };
    this.delieveryService.checkDelievery(delieveryData).subscribe((res)=>{

      if(res == true){
        this.delivery = true
        this.deliveryN = false
      }else{
        this.deliveryN = true
        this.delivery = false
      }
    }, (err) => {
    });

  }

}