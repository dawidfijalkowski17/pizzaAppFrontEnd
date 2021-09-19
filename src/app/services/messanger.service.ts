import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs'
import { __values } from 'tslib';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class MessangerService {


  idsend: any;
  subject = new Subject<Product>()
  item: BehaviorSubject<Product> = new BehaviorSubject<any>(null)
  constructor() { }

  sendMsg(product: any) {
    this.subject.next(product)
  }

  getMsg() {
    return this.subject.asObservable()
  }

  sendId(id: any) {
    this.idsend = id;
  }
  getId() {
    return this.idsend;
  }
}