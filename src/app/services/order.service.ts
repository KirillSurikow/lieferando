import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderEmitter = new EventEmitter<any>();

  placeOrder(order : any ){
      this.orderEmitter.emit(order)
  }
}
