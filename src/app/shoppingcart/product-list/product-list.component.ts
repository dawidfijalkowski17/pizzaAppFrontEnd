import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service'
import { PizzaService } from 'src/app/admin/list/pizza.service';
import { Pizza } from 'src/app/models/pizza';
import { OrderService } from '../../services/order.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productsList: Pizza[] = [];
  pizzas: Pizza[] = [];
  searchPrice: any;
  searchTo: any;
  searchName!: string;

  constructor(private productService: ProductService, private pizzaService: PizzaService, private orderService: OrderService) { }

  ngOnInit(): void {
    this.getPizzaList()
    this.orderService.filter.subscribe((res) => {
      this.searchPrice = res;
    })
    this.orderService.filterName.subscribe((res) => {
      this.searchName = res;
    })
    this.orderService.filterTo.subscribe((res) => {
      this.searchTo = res;
    })
  }

  private async getPizzaList() {
    this.pizzaService.getAllPizzas().subscribe(
      async (res) => {
        this.pizzas = res;
        this.productsList = res;
      },
      async (err) => {
        console.log('Nie udalo sie pobrac listy pizzy')
      }
    )
  };

}
