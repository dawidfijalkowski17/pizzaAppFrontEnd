import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  searchPrice = '';
  searchName = '';
  searchTo = '';
  constructor(private formBuilder: FormBuilder, private orderService: OrderService) { }

  ngOnInit(): void {

  }

  filter() {
    this.orderService.filter.next(this.searchPrice)
    this.orderService.filterName.next(this.searchName)
    this.orderService.filterTo.next(this.searchTo)
  }

}
