import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { animate, style, transition, trigger } from '@angular/animations';
import { CurrencyService } from '../services/currency.service';

const exitTransitionLeft = transition(':enter', [
  style({
    transform: 'translateX(100vw)'
  }),
  animate('200ms ease-in', style({
    transform: 'translateX(0)'
  }))
])

const enterTransitionRight = transition(':enter', [
  style({
    transform: 'translateX(-100vw)'
  }),
  animate('200ms ease-in', style({
    transform: 'translateX(0)'
  }))
])

const enterFade = transition(':enter', [
  style({
    opacity: 0
  }),
  animate('200ms ease-in', style({
    opacity: 1
  }))
])

const exitFade = transition(':leave', [
  style({
    opacity: 1
  }),
  animate('200ms ease-in', style({
    opacity: 0
  }))
])

const slideLeftOut = trigger('slideLeftOut', [exitTransitionLeft])
const slideRightIn = trigger('slideRightIn', [enterTransitionRight])
const fadeIn = trigger('fadeIn', [enterFade])
const fadeOut = trigger('fadeOut', [exitFade])

@Component({
  selector: 'app-dialog-edit-dish',
  templateUrl: './dialog-edit-dish.component.html',
  styleUrls: ['./dialog-edit-dish.component.scss'],
  animations: [slideLeftOut, slideRightIn, fadeIn, fadeOut]
})
export class DialogEditDishComponent implements OnInit {
  dish: object;
  index: number;
  category: number;
  dishExtras: any;
  dishCategory: string;
  dishName: string;
  dishDescribtion: string;
  dishPrice: number;
  dishPriceString: string;
  portionTag: string;
  portionPrice: number;
  allPortions = [];
  multiplePortions: boolean;

  constructor(private dialogRef: MatDialogRef<DialogEditDishComponent>, private curr: CurrencyService) { }

  ngOnInit(): void {
    this.dishCategory = this.dish['dishCategory'];
    this.dishName = this.dish['dishName'];
    this.dishDescribtion = this.dish['dishDescribtion'];
    this.dishExtras = this.dish['dishExtras'];
    this.multiplePortions = this.dish['multiplePortions'];
    if (!this.multiplePortions) {
      this.dishPrice = this.dish['dishPrice'];
      this.dishPriceString = this.dish['dishPriceString'];
    } else {
      this.allPortions = this.dish['portionPrices'];
    }
  }

  togglePortion() {
    if (this.multiplePortions == true)
      this.multiplePortions = false
    else
      this.multiplePortions = true
  }

  addPortion() {
    let item = {
      portionTag: this.portionTag,
      portionPrice: this.portionPrice,
      portionPriceString: this.curr.returnCurrency(this.portionPrice)
    }
    this.allPortions.push(item)
    this.allPortions = this.allPortions.sort((a, b) => a.portionPrice - b.portionPrice);
  }

  saveChanges() {
    let dish = {
      'dishCategory': this.dishCategory,
      'dishName': this.dishName,
      'dishDescribtion': this.dishDescribtion,
      "dishPrice": this.findDishPrice(),
      "dishPriceAsString": this.findDishPriceString(),
      "portionPrices": this.findPortionPrices(),
      "dishExtras": this.dishExtras,
      "multiplePortions": this.multiplePortions,
      "placed" : false
    }
    this.dialogRef.close([dish, this.index, this.category])
  }

  findDishPrice(): any {
    if (!this.multiplePortions) {
      return this.dishPrice;
    } else {
      return null;
    }
  }

  findDishPriceString(): any {
    if (!this.multiplePortions) {
      return this.curr.returnCurrency(this.dishPrice);
    } else {
      return "";
    }
  }

  findPortionPrices(): any {
    if (this.multiplePortions) {
      return this.allPortions;
    } else {
      return [];
    }
  }

  close() {
    this.dialogRef.close()
  }

  deletePortion(i: number) {
    this.allPortions.splice(i, 1)
  }
}
