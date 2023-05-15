import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { CurrencyService } from '../services/currency.service';
import { DialogCustomizeDishComponent } from '../dialog-customize-dish/dialog-customize-dish.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogCheckoutComponent } from '../dialog-checkout/dialog-checkout.component';

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

  constructor(private orderService: OrderService, private curr: CurrencyService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.orderService.orderEmitter.subscribe(order => {
      let status = order[1]
      if (!status) {
        this.allOrders.push(order[0]);
        this.minOrder = order[0].minOrder;
        this.minOrderString = order[0].minOrderString;
        this.deliveryCost = order[0].deliveryCost;
        this.deliveryCostString = order[0].deliveryCostString;
        this.deliveryTime = order[0].deliveryTime;
      }
      if (status) {
        this.allOrders[order[2]] = order[0];
      }
      this.actualizeBill();
    })
  }

  addOne(i: number) {
    this.allOrders[i]['amount']++;
    this.countOrderPrice(i);
    this.actualizeBill();
  }

  countOrderPrice(i: number) {
    let amount = this.allOrders[i]['amount'];
    let singlePrice = this.allOrders[i]['singlePrice'];
    this.allOrders[i]['priceForOrder'] = amount * singlePrice;
    this.allOrders[i]['priceForOrderString'] = this.curr.returnCurrency(this.allOrders[i]['priceForOrder']);
  }

  removeOne(i: number) {
    this.allOrders[i]['amount']--;
    this.countOrderPrice(i);
    if (this.allOrders[i]['amount'] == 0) {
      this.allOrders.splice(i, 1)
    }
    this.actualizeBill();
  }

  changeOrder(dish: any, i: number) {
    const dialogRef = this.dialog.open(DialogCustomizeDishComponent, {
      width: '600px'
    })
    dialogRef.componentInstance.changingOrder = true;
    dialogRef.componentInstance.changingDish = dish;
    dialogRef.componentInstance.orderNr = i;
  }

  actualizeBill() {
    this.subTotal = this.returnSubTotal();
    this.subTotalString = this.curr.returnCurrency(this.subTotal)
    this.total = this.subTotal + this.deliveryCost;
    this.totalString = this.curr.returnCurrency(this.total);
    this.minOrderDiff = this.minOrder - this.subTotal;
    this.minOrderDiffString = this.curr.returnCurrency(this.minOrderDiff);
    this.minOrderReached = this.returnMinOrderStatus();
  }

  returnMinOrderStatus() {
    if (this.minOrderDiff > 0) {
      return false;
    } else {
      return true;
    }
  }

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

  checkOut() {
    if (this.minOrderReached) {
      const dialogRef = this.dialog.open(DialogCheckoutComponent, {
        width: '600px'
      })
      dialogRef.componentInstance.deliveryTime = this.deliveryTime;

      dialogRef.afterClosed().subscribe(event => {
         this.allOrders = []; 
      })
    }
  }
}

