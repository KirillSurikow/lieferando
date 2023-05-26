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
  dishName: string;
  dishDescribtion: string;
  dishPriceAsString: string;
  multiplePortions: boolean;
  dishExtras = [];
  amount: number;
  orderPriceString: string;
  orderPrice: number;
  portionPrices = [];
  singlePrice: number;
  minOrder: number;
  minOrderString: string;
  deliveryCost: number;
  deliveryCostString: string;
  deliveryTime: number;

  constructor(private dialogRef: MatDialogRef<DialogCustomizeDishComponent>,
    private curr: CurrencyService,
    private orderService: OrderService,) {
  }

  ngOnInit(): void {
    if (!this.changingOrder) {
      this.placeNewOrder();
    }
    if (this.changingOrder) {
      this.changeExistingOrder();
    }
  }

  placeNewOrder() {
    this.order = new Order(this.dish);
    if (this.order.multiplePortions) {
      this.inCaseOfMultiplePortionsNew();
    } else {
      this.inCaseOfSinglePortionNew();
    }
    if (this.order.dishExtras) {
      this.resetExtrasMask();
    }
    this.order.countPrice();
  }

  /**
   * sets the price if dish has multiple portions
   * 
   */
  inCaseOfMultiplePortionsNew() {
    this.order.orderPrice = this.order.portionPrices[0]['portionPrice'];
    this.order.orderPriceString = this.curr.returnCurrency(this.orderPrice);
  }

  /**
  * sets the price if dish has just a single portion
  * 
  */
  inCaseOfSinglePortionNew() {
    this.order.orderPrice = this.singlePrice;
    this.order.orderPriceString = this.curr.returnCurrency(this.orderPrice);
  }

  /**
  * the mask for dish extras has to be reseted
  * 
  */
  resetExtrasMask() {
    this.order.dishExtras.forEach(extra => {
      extra.picked = false;
    });
  }

  changeExistingOrder() {
    this.order = new Order(this.changingDish);
    this.order.dishCopy = this.returnDishCopy()
    if (this.order.multiplePortions) {
      this.inCaseOfMultiplePortions();
    } else {
      this.inCaseOfSinglePortion();
    }
  }

  /**
  * sets the price if dish has multiple portions
  * 
  */
  inCaseOfMultiplePortions() {
    this.order.orderPrice = this.order.portionPrices[0]['portionPrice'];
    this.order.orderPriceString = this.curr.returnCurrency(this.order.orderPrice);
    this.order.changePortion();
  }

  /**
  * sets the price if dish hasjust one portion
  * 
  */
  inCaseOfSinglePortion() {
    this.order.singlePrice = this.order.dishCopy['dishPrice'];
    this.order.countPrice();
  }

  /**
   * the object with the dish extras has a boolen property picked to register the choosen extras
   * 
   * @param index number
   */
  toggleExtra(index) {
    if (this.order.dishExtras[index]['picked'] == false) {
      this.order.dishExtras[index]['picked'] = true;
      this.order.countPrice();
    } else {
      this.order.dishExtras[index]['picked'] = false;
      this.order.countPrice();
    }
  }

  /**
   * by default there are only 3 extras shown
   * 
   */
  showMore() {
    this.visibleAmount = this.order.dishExtras.length;
    this.hidden = false;
  }

  /**
   * by default there are only 3 extras shown
   * 
   */
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

  /**
   * an order json is prepared and sent to the order service
   * 
   */
  placeOrder() {
    let order = {
      'dishName': this.order.dishName,
      'dishCategory': this.order.dishCategory,
      'dishExtras': this.order.dishExtras,
      'pickedExtrasText' : this.order.returnDescribtion(),
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
    console.log(order)
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

