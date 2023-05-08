import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { CurrencyService } from '../services/currency.service';
import { DialogCustomizeDishComponent } from '../dialog-customize-dish/dialog-customize-dish.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  allOrders = [];

  constructor(private orderService: OrderService, private curr: CurrencyService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.orderService.orderEmitter.subscribe(order => {
      let status = order[1]
      if (!status) {
        this.allOrders.push(order[0])
      }
      if (status) {
        this.allOrders[order[2]] = order[0];
      }
    })
  }

  addOne(i: number) {
    this.allOrders[i]['amount']++;
    this.countOrderPrice(i);
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
  }

  changeOrder(dish: any, i: number) {
    const dialogRef = this.dialog.open(DialogCustomizeDishComponent, {
      width: '600px'
    })
    console.log(dish)
    dialogRef.componentInstance.changingOrder = true;
    dialogRef.componentInstance.changingDish = dish;
    dialogRef.componentInstance.orderNr = i;
  }
}

