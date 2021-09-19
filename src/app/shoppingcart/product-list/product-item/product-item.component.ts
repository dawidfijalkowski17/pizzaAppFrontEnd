import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product'
import { MessangerService } from 'src/app/services/messanger.service'
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: any

  constructor(private msg: MessangerService, private orderService: OrderService) {

  }

  ngOnInit(): void {
  }

  handleAddToCart() {
    this.msg.sendMsg(this.productItem)
    this.orderService.products.next(this.productItem)
  }

}
