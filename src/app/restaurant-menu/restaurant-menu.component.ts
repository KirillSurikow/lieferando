import { Component, OnInit, Type } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/models/restaurant.class';
import { CurrencyService } from '../services/currency.service';
import { FirebaseService } from '../services/firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateExtrasComponent } from '../dialog-create-extras/dialog-create-extras.component';
require("core-js/actual/array/group-by");
import { animate, style, transition, trigger } from '@angular/animations';
import { DialogEditDishComponent } from '../dialog-edit-dish/dialog-edit-dish.component';

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
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss'],
  animations: [slideLeftOut, slideRightIn, fadeIn, fadeOut]
})
export class RestaurantMenuComponent implements OnInit {
  userID: string;
  userData: object;
  publishID: string;
  name: string = "";
  backgroundImg: string = "";
  category: string[] = [];
  logoImg: string = "";
  rating: number;
  deliveryCost: number;
  deliveryCostString: string;
  deliveryTime: number;
  minOrder: number;
  minOrderString: string;
  menuUnsorted: any = [];
  menuObj: any = [];
  menu: any;
  dishName: string = "";
  dishCategory: string = "";
  dishPrice: number;
  dishPriceAsString: string = "";
  dishDescribtion: string = "";
  categoryList: any = [];
  restaurantNew: Restaurant;
  myRestaurants: Array<object> = [];
  upDatedRes: Restaurant;
  multiplePortions: boolean = false;
  allPortions = [];
  portionTag: string;
  portionPrice: number;

  constructor(private route: ActivatedRoute,
    private currency: CurrencyService,
    private gfs: Firestore,
    private firestore: FirebaseService,
    private curr: CurrencyService,
    public dialog: MatDialog,
    private router : Router) {
  }

  ngOnInit(): void {
    this.userID = localStorage.getItem('userId');
    this.getUserData(this.userID);
    console.log(typeof this.myRestaurants)
  }

  async getUserData(userID: string) {
    const docRef = doc(this.gfs, 'users', userID);
    const docSnap = await getDoc(docRef);
    let fetchedObject = docSnap.data();
    let testObj = fetchedObject['userData']['currRest'];
    if (testObj.length > 0) {
      this.extractData(fetchedObject);
    }
  }

  extractData(object: object) {
    let string = object['userData']['currRest'];
    console.log(object['userData']['myRestaurants'], typeof object['userData']['myRestaurants'])
    this.myRestaurants = this.returnArray(object);
    console.log(this.myRestaurants, typeof this.myRestaurants)
    this.restaurantNew = JSON.parse(string);
    this.publishID = this.restaurantNew['publishID'];
    this.name = this.restaurantNew['name'];
    this.backgroundImg = this.restaurantNew['backgroundImg'];
    this.category = this.restaurantNew['category'];
    this.logoImg = this.restaurantNew['logoImg'];
    this.rating = this.restaurantNew['rating'];
    this.minOrder = this.restaurantNew['minOrder'];
    this.minOrderString = this.restaurantNew['minOrderString'];
    this.deliveryTime = this.restaurantNew['deliveryTime'];
    this.deliveryCost = this.restaurantNew['deliveryCost'];
    this.deliveryCostString = this.restaurantNew['deliveryCostString'];
    this.menu = this.restaurantNew['menu'];
  }

  returnArray(object: object) {
    if (typeof object['userData']['myRestaurants'] == 'string') {
      return JSON.parse(object['userData']['myRestaurants'])
    } else {
      return object['userData']['myRestaurants']
    }
  }

  addDish() {
    let dish = {
      "dishCategory": this.dishCategory,
      "dishName": this.dishName,
      "dishPrice": this.findDishPrice(),
      "dishPriceAsString": this.findDishPriceString(),
      "portionPrices": this.findPortionPrices(),
      "dishDescribtion": this.dishDescribtion,
      "dishExtras": this.findExtras(this.dishCategory),
      "multiplePortions": this.multiplePortions,
      "placed": false
    }

    this.menuUnsorted.push(dish);
    this.initSortMenu();
    this.updateDatalist();
    this.clearInputs();
  }

  findDishPrice(): any {
    if (!this.multiplePortions) {
      return this.dishPrice;
    } else {
      return null
    }
  }

  findDishPriceString(): any {
    if (!this.multiplePortions) {
      return this.curr.returnCurrency(this.dishPrice);
    } else {
      return ""
    }
  }

  findPortionPrices(): any {
    if (this.multiplePortions) {
      return this.allPortions;
    } else {
      return []
    }
  }

  findExtras(category): any {
    if (this.menu) {
      if (this.menu.find(element => element.categorykey == category)) {
        let target = this.menu.find(element => element.categorykey == category)
        let extras = target.categoryItem[0]['dishExtras'];
        return extras
      } else {
        return [];
      }
    } else {
      return [];
    }
  }

  updateDatalist() {
    this.categoryList = this.menuUnsorted.map(item => item.dishCategory)
      .filter((value, index, self) => self.indexOf(value) === index)
  }

  initSortMenu() {
    this.groupDishes()
    this.convertToArray()
  }

  groupDishes() {
    this.menuObj = this.menuUnsorted.groupBy((dish) => {
      return dish.dishCategory
    })
  }

  convertToArray() {
    let item = {}
    let secondConvert = [];
    let firstConvert = (Object.entries(this.menuObj))
    for (let i = 0; i < firstConvert.length; i++) {
      let category = firstConvert[i];
      let foodCategory = category[0];
      let dishArr = category[1];
      item = {
        categorykey: foodCategory,
        categoryItem: dishArr,
      }
      secondConvert.push(item)
      this.menu = secondConvert;
    }
  }

  convertToString(number: number) {
    let currency = number.toLocaleString('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    });
    return currency
  }

  clearInputs() {
    this.dishCategory = "";
    this.dishName = "";
    this.dishPrice = null;
    this.portionTag = "";
    this.portionPrice = null;
    this.dishDescribtion = "";
    this.allPortions = [];
  }

  showEditName(i: number, j: number) {
    let label = document.getElementById(`${i}${j}dishNameLabel`);
    let input = document.getElementById(`${i}${j}dishName`);
    let btn = document.getElementById(`${i}${j}dishBtn`);
    label.style.display = 'none';
    input.style.display = 'flex';
    btn.style.display = 'flex';
  }

  showEditPrice(i: number, j: number) {
    let label = document.getElementById(`${i}${j}dishPriceLabel`);
    let input = document.getElementById(`${i}${j}dishPrice`);
    let btn = document.getElementById(`${i}${j}dishBtn`);
    label.style.display = 'none';
    input.style.display = 'flex';
    btn.style.display = 'flex';
  }

  showEditDescribtion(i: number, j: number) {
    let label = document.getElementById(`${i}${j}dishDescribtionLabel`);
    let input = document.getElementById(`${i}${j}dishDescribtion`);
    let btn = document.getElementById(`${i}${j}dishBtn`);
    label.style.display = 'none';
    input.style.display = 'flex';
    btn.style.display = 'flex';
  }

  updateDish(i: number, j: number) {
    this.reverseLayout(i, j);
    this.changeValues(i, j);
  }

  changeValues(i: number, j: number) {
    let newName = (<HTMLInputElement>document.getElementById(`${i}${j}dishName`)).value;
    let newPrice = (<HTMLInputElement>document.getElementById(`${i}${j}dishPrice`)).value;
    let newDescribtion = (<HTMLInputElement>document.getElementById(`${i}${j}dishDescribtion`)).value
    this.menu[i]['categoryItem'][j]['dishName'] = newName;
    this.menu[i]['categoryItem'][j]['dishPrice'] = newPrice;
    this.menu[i]['categoryItem'][j]['dishPriceAsString'] = this.returnCurrency(newPrice);
    this.menu[i]['categoryItem'][j]['dishDescribtion'] = newDescribtion;
  }

  returnCurrency(value: string) {
    let number = Number(value);
    let currency = number.toLocaleString('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    });
    return currency
  }

  reverseLayout(i: number, j: number) {
    this.reverseName(i, j);
    this.reverseDescribtion(i, j);
    this.reversePrice(i, j);
    this.reverseBtn(i, j)
  }

  reverseName(i: number, j: number) {
    let labelName = document.getElementById(`${i}${j}dishNameLabel`);
    let inputName = document.getElementById(`${i}${j}dishName`);
    labelName.style.display = 'flex';
    inputName.style.display = 'none';
  }
  reverseDescribtion(i: number, j: number) {
    let labelDescribtion = document.getElementById(`${i}${j}dishDescribtionLabel`);
    let inputDescribtion = document.getElementById(`${i}${j}dishDescribtion`);
    labelDescribtion.style.display = 'flex';
    inputDescribtion.style.display = 'none';
  }
  reversePrice(i: number, j: number) {
    let labelPrice = document.getElementById(`${i}${j}dishPriceLabel`);
    let inputPrice = document.getElementById(`${i}${j}dishPrice`);
    labelPrice.style.display = 'flex';
    inputPrice.style.display = 'none';
  }

  reverseBtn(i: number, j: number) {
    let btn = document.getElementById(`${i}${j}dishBtn`);
    btn.style.display = 'none';
  }

  createJSON() {
    return {
      name: this.name,
      category: this.category,
      backgroundImg: this.backgroundImg,
      logoImg: this.logoImg,
      rating: this.rating,
      deliveryCost: this.deliveryCost,
      deliveryCostString: this.curr.returnCurrency(this.deliveryCost),
      deliveryTime: this.deliveryTime,
      minOrder: this.minOrder,
      minOrderString: this.curr.returnCurrency(this.minOrder),
      menu: this.menu
    }
  }

  async saveData() {
    let json = this.createJSON();
    this.upDatedRes = new Restaurant(json);
    console.log(this.myRestaurants, 1)
    this.updateArray();
    this.prepareUpload();
  }

  updateArray() {
    this.myRestaurants.push(this.upDatedRes)
    console.log(this.myRestaurants, 2)
  }

  async prepareUpload() {
    let item = JSON.stringify(this.myRestaurants)
    let object = {
      userData: {
        currRest: {},
        myRestaurants: item
      }
    }
    await this.firestore.uploadChange(this.userID, object);
  }

  openExtrasDialog(category: object, index: number) {
    const dialogRef = this.dialog.open(DialogCreateExtrasComponent, {
      width: '600px',
    });
    dialogRef.componentInstance.currentCategory = category;
    dialogRef.componentInstance.index = index;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let target = this.menu[result[1]];
        target['categoryItem'].forEach(element => {
          element.dishExtras = result[0];
        });
      }
    })
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

  deletePortion(i: number) {
    this.allPortions.splice(i, 1)
  }


  openDishEditor(category, index, dish) {
    const dialogRef = this.dialog.open(DialogEditDishComponent, {
      width: '700px',
    })

    dialogRef.componentInstance.dish = dish;
    dialogRef.componentInstance.index = index;
    dialogRef.componentInstance.category = category;
    dialogRef.componentInstance.multiplePortions = this.multiplePortions;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.menu[result[2]]['categoryItem'][result[1]] = result[0]
      }
    })
  }

  return() {
    this.router.navigate([`/backoffice/${this.userID}/restaurantCondition`])
  }

}

