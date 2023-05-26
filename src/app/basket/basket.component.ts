import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { CurrencyService } from '../services/currency.service';
import { DialogCustomizeDishComponent } from '../dialog-customize-dish/dialog-customize-dish.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogCheckoutComponent } from '../dialog-checkout/dialog-checkout.component';
import { DirectionService } from '../services/direction-service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  allOrders = [];
  minOrder: number;
  minOrderString: string;
  deliveryCost: number;
  deliveryCostString: string;
  deliveryTime: number;
  subTotal: number;
  subTotalString: string;
  total: number;
  totalString: string;
  minOrderDiff: number;
  minOrderDiffString: string;
  minOrderReached: boolean;

  constructor(private orderService: OrderService, private curr: CurrencyService,
    private dialog: MatDialog, private direction: DirectionService) {

  }

  /**
   * subsribing all changes linked to the basket and the bill
   * 
   * 
   */
  ngOnInit(): void {
    this.orderService.orderEmitter.subscribe(order => {
      let status = order[1]
      if (!status) {
        this.addNewOrder(order)
      }
      if (status) {
        this.actualizeOrder(order)
      }
      this.actualizeBill();
      this.checkBasketBtn();
      console.log(this.allOrders)
    })

  }

  addNewOrder(order) {
    this.allOrders.push(order[0]);
    this.minOrder = order[0].minOrder;
    this.minOrderString = order[0].minOrderString;
    this.deliveryCost = order[0].deliveryCost;
    this.deliveryCostString = order[0].deliveryCostString;
    this.deliveryTime = order[0].deliveryTime;
  }

  actualizeOrder(order) {
    this.allOrders[order[2]] = order[0];
  }

  /**
   * there is a button on the mobile screen which appears when the basket is filled
   * 
   */
  checkBasketBtn() {
    if (this.allOrders.length > 0) {
      this.orderService.checkBasketButton(true);
    } else {
      this.orderService.checkBasketButton(false);
    }
  }

  /**
   * you can control the amount of items of an order
   * 
   * @param i number
   */
  addOne(i: number) {
    this.allOrders[i]['amount']++;
    this.countOrderPrice(i);
    this.actualizeBill();
    this.checkBasketBtn();
  }


  /**
   * counting the price for a single order
   * 
   */
  countOrderPrice(i: number) {
    let amount = this.allOrders[i]['amount'];
    let singlePrice = this.allOrders[i]['singlePrice'];
    this.allOrders[i]['priceForOrder'] = amount * singlePrice;
    this.allOrders[i]['priceForOrderString'] = this.curr.returnCurrency(this.allOrders[i]['priceForOrder']);
  }

  /**
  * you can control the amount of items of an order
  * 
  * @param i number
  */
  removeOne(i: number) {
    this.allOrders[i]['amount']--;
    this.countOrderPrice(i);
    if (this.allOrders[i]['amount'] == 0) {
      this.allOrders.splice(i, 1)
    }
    this.actualizeBill();
    this.checkBasketBtn();
  }

  /**
   * by clicking on a basket item you open a dialog to change it
   * 
   * @param dish object
   * @param i number
   */
  changeOrder(dish: any, i: number) {
    const dialogRef = this.dialog.open(DialogCustomizeDishComponent, {
      width: '600px'
    })
    dialogRef.componentInstance.changingOrder = true;
    dialogRef.componentInstance.changingDish = dish;
    dialogRef.componentInstance.orderNr = i;
  }

  /**
   * if you change the basket the bill changes too
   * 
   */
  actualizeBill() {
    this.subTotal = this.returnSubTotal();
    this.subTotalString = this.curr.returnCurrency(this.subTotal)
    this.total = this.subTotal + this.deliveryCost;
    this.totalString = this.curr.returnCurrency(this.total);
    this.minOrderDiff = this.minOrder - this.subTotal;
    this.minOrderDiffString = this.curr.returnCurrency(this.minOrderDiff);
    this.minOrderReached = this.returnMinOrderStatus();
  }


  /**
   * afiter changing the basket this function returns if the min order amount is reached
   * 
   * @returns boolean
   */
  returnMinOrderStatus() {
    if (this.minOrderDiff > 0) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * the bill without delivery costs
   * 
   * @returns number
   */
  returnSubTotal() {
    let array = []
    this.allOrders.forEach(element => {
      array.push(element.priceForOrder)
    });
    let sum = array.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return sum;
  }

  /**
   * after checking out a dialog is opened and the basket is empty
   * 
   */
  checkOut() {
    if (this.minOrderReached) {
      const dialogRef = this.dialog.open(DialogCheckoutComponent, {
        width: '600px'
      })
      dialogRef.componentInstance.deliveryTime = this.deliveryTime;

      dialogRef.afterClosed().subscribe(event => {
        this.allOrders = [];
        this.checkBasketBtn();
      })
    }

  }

  closeBasket() {
    this.direction.closeRespBasket();
  }
}

