import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from './order-list.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order[]=[];


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrderList()
  }

  private getOrderList(){
this.orderService.getAllOrders().subscribe(
  (res)=> {
    this.orders=res;
    console.log(res)
  },
  (err)=>{
    console.log("Nie udalo sie pobrac listy zamowien")
  }
)
  }

  delete(id: any){
    this.orderService.deleteOrder(id).subscribe(
      () => this.getOrderList(),
      () => this.getOrderList(),
      () => this.getOrderList()
    );
  }

}
