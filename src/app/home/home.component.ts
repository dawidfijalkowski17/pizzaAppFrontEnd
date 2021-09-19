import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { PizzaService } from '../admin/list/pizza.service';
import { Order } from '../models/order';
import { Pizza } from '../models/pizza';
import { AuthenticationService } from '../services/authentication.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {

  isLoggedUser: any;
  clickForMoreOptions = false;
  cartTotal: any;
  amount: any;
  popularPizzas: Pizza[] = [];
  pizzas: Pizza[] = []

  constructor(private config: NgbCarouselConfig, private x: Order, private pizzaService: PizzaService, private authService: AuthenticationService, private socialAuthService: SocialAuthService, private orderService: OrderService) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;


  }

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe((res) => {
      this.isLoggedUser = res;
    })
    this.orderService.amountToPay.subscribe((res) => {
      this.cartTotal = res;
    })

    this.getPopularPizzaList()
    this.getPizzaList()
  }

  ngOnChanges(): void {
  }

  toRegister() {
    setTimeout(() => {
      document.getElementById("register")?.scrollIntoView();
    })
  }

  logOut() {
    this.authService.logout();
    this.socialAuthService.signOut();
    this.authService.isAdmin.next(false)
  }

  private async getPizzaList() {
    this.pizzaService.getAllPizzas().subscribe(
      async (res) => {
        this.pizzas = res;
      },
      async (err) => {
        console.log('Nie udalo sie pobrac listy pizzy')
      }
    )

  }

  getPopularPizzaList() {
    this.orderService.getPopularPizza().subscribe((res) => {
      this.popularPizzas = res;
    })
  }

  getAllPizzaOptions() {
    this.clickForMoreOptions = true;
  }
}