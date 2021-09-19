import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderAddService } from './order-add.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  title = 'Google Pay Demo';
  item: any[] = []
  id: any;
  cartItems: any[] = []

  credentials = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    surname: ['', [Validators.required, Validators.minLength(3)]],
    city: ['', [Validators.required, Validators.minLength(3)]],
    post_code: ['', [Validators.required, Validators.minLength(3)]],
    street: ['', [Validators.required, Validators.minLength(3)]],
    houseNumber: ['', [Validators.required, Validators.minLength(3)]],
  })
  amount = '0';
  amount2 = localStorage.getItem('amount')

  constructor(private formBuilder: FormBuilder, private orderService: OrderService, private orderAddService: OrderAddService, private router: Router) {
  }

  ngOnInit(): void {
    this.orderService.amountToPay.subscribe((res) => {
      let tmp = JSON.stringify(res)
      this.amount = tmp
    })

    if (localStorage.getItem('array')) {
      this.cartItems = JSON.parse(localStorage.getItem('array') || '')
      console.log(this.cartItems)
    }
  }

  paymentRequest: google.payments.api.PaymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId'
          }
        }
      }
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant'
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: this.amount2 || '0',
      currencyCode: 'PLN',
      countryCode: 'PL'
    },
    callbackIntents: ['PAYMENT_AUTHORIZATION']
  };

  onLoadPaymentData = (
    event: Event
  ): void => {
    const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
    console.log('load payment data', eventDetail.detail);
  }

  onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
    paymentData
  ) => {
    console.log('payment authorized', paymentData);
    this.createOrder()
    localStorage.removeItem('amount')
    localStorage.removeItem('array')
    this.orderService.amountToPay.next(0)
    this.router.navigate(['/home/statusOrder'])
    return {
      transactionState: 'SUCCESS'
    };
  }

  onError = (event: ErrorEvent): void => {
    this.router.navigate(['/home'])
    console.error('error', event.error);
  }

  createOrder() {
    this.item = []
    this.cartItems.forEach(el => {
      this.item.push(el.productName + " x " + el.qty)
    })

    const orderData = {
      name: this.credentials.controls.name.value,
      surname: this.credentials.controls.surname.value,
      city: this.credentials.controls.city.value,
      post_code: this.credentials.controls.post_code.value,
      street: this.credentials.controls.street.value,
      houseNumber: this.credentials.controls.houseNumber.value,
      price: this.amount,
      payment: "TAK",
      content: this.item
    };
    this.orderAddService.addOrder(orderData).subscribe((res) => {
      console.log(res)
    },
      (err) => {

      }
    );
  }
}