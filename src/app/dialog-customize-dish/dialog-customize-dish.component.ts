import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CurrencyService } from '../services/currency.service';
import { OrderService } from '../services/order.service';
import { Order } from 'src/models/order.class';



@Component({
  selector: 'app-dialog-customize-dish',
  templateUrl: './dialog-customize-dish.component.html',
  styleUrls: ['./dialog-customize-dish.component.scss']
})
export class DialogCustomizeDishComponent implements OnInit {
  dish: object;
  changingDish: object;
  order: Order;
  visibleAmount: number = 2;
  hidden: boolean = true;
  changingOrder: boolean = false;
  orderNr: number = null;
  dishName : string;
  dishDescribtion : string;
  dishPriceAsString : string;
  multiplePortions : boolean;
  dishExtras = [];
  amount : number;
  orderPriceString : string;
  orderPrice : number;
  portionPrices  = [];
  singlePrice : number;
  minOrder : number;
  minOrderString : string;
  deliveryCost : number;
  deliveryCostString : string;
  deliveryTime : number;

  constructor(private dialogRef: MatDialogRef<DialogCustomizeDishComponent>,
    private curr: CurrencyService,
    private orderService: OrderService,) {
  }

  ngOnInit(): void {
    if (!this.changingOrder) {
      this.order = new Order(this.dish);
      if (this.order.multiplePortions) {
        this.order.orderPrice = this.order.portionPrices[0]['portionPrice'];
        this.order.orderPriceString = this.curr.returnCurrency(this.orderPrice);
      }else{
       this.order.orderPrice = this.singlePrice;
       this.order.orderPriceString = this.curr.returnCurrency(this.orderPrice);
      }
      if(this.order.dishExtras){
        this.order.dishExtras.forEach(extra => {
          extra.picked = false;
        });
      }
      this.order.countPrice();
    }
    if (this.changingOrder) {
      this.order = new Order(this.changingDish);
      this.order.dishCopy = this.returnDishCopy()
      if (this.order.multiplePortions) {
        this.order.orderPrice = this.order.portionPrices[0]['portionPrice'];
        this.order.orderPriceString = this.curr.returnCurrency(this.order.orderPrice);
        this.order.changePortion();
      }else{
       this.order.singlePrice = this.order.dishCopy['dishPrice'];
       this.order.countPrice();
      }
    }
  }

  toggleExtra(index) {
    if (this.order.dishExtras[index]['picked'] == false) {
      this.order.dishExtras[index]['picked'] = true;
      this.order.countPrice();
    } else {
      this.order.dishExtras[index]['picked'] = false;
      this.order.countPrice();
    }
  }

  showMore() {
    this.visibleAmount = this.order.dishExtras.length;
    this.hidden = false;
  }

  hideMore() {
    this.visibleAmount = 2;
    this.hidden = true;
  }

  increaseAmount() {
    this.order.amount++;
    this.order.countPrice();
  }

  decreaseAmount() {
    this.order.amount--;
    this.order.countPrice();
  }

  close() {
    this.dialogRef.close();
  }

  placeOrder() {
    let order = {
      'dishName': this.order.dishName,
      'dishCategory': this.order.dishCategory,
      'dishExtras': this.order.dishExtras,
      'portionPrices': this.order.portionPrices,
      'dishDescribtion': this.order.dishDescribtion,
      'pickedPortionNr': this.order.returnPortionNr(),
      'amount': this.order.amount,
      'singlePrice': this.order.returnSinglePrice(),
      'priceForOrder': this.order.orderPrice,
      'priceForOrderString': this.curr.returnCurrency(this.order.orderPrice),
      'dishCopy': this.returnDishCopy(),
      'multiplePortions': this.order.multiplePortions,
      'minOrder': this.minOrder,
      'minOrderString': this.minOrderString,
      'deliveryCost': this.deliveryCost,
      'deliveryCostString': this.deliveryCostString,
      'deliveryTime': this.deliveryTime
    }
    this.orderService.placeOrder([order, this.changingOrder, this.orderNr]);
    this.dialogRef.close();
  }

  returnDishCopy() {
    if (this.changingOrder) {
      return this.changingDish['dishCopy'];
    } else {
      return this.dish;
    }
  }
}

