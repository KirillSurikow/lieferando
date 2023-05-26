import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  orderEmitter = new EventEmitter<any>();
  buttonEmitter = new EventEmitter<boolean>();

  placeOrder(order : any ){
      this.orderEmitter.emit(order)
  }

  checkBasketButton(status : boolean){
    this.buttonEmitter.emit(status)
  }
}
