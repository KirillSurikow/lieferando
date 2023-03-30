import { Component, OnInit } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/models/restaurant.class';
import { CurrencyService } from '../services/currency.service';
import { FirebaseService } from '../services/firebase.service';
require("core-js/actual/array/group-by");

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss']
})
export class RestaurantMenuComponent implements OnInit {
  userID : string;
  userData: object;
  publishID : string;
  name: string = "";
  backgroundImg: string = "";
  category: string = "";
  logoImg: string = "";
  rating: number;
  deliveryCost: number;
  deliveryCostString: string;
  deliveryTime: number;
  minOrder: number;
  minOrderString: string;
  menuUnsorted: any = [];
  menuObj: any = [];
  menu : any;
  dishName: string = "";
  dishCategory: string = "";
  dishPrice: number;
  dishPriceAsString: string = ";"
  dishDescribtion: string = "";
  categoryList: any = [];
  restaurantNew: Restaurant;
  myRestaurants = [];

  constructor(private route: ActivatedRoute,
     private currency: CurrencyService,  private gfs: Firestore, private firestore: FirebaseService) {
  }

  ngOnInit(): void {
    this.userID = localStorage.getItem('userId');
    this.getUserData(this.userID);
  }

  async getUserData(userID: string) {
    const docRef = doc(this.gfs, 'users', userID);
    const docSnap = await getDoc(docRef);
    this.userData = docSnap.data();
    this.extractData();
  }

  extractData() {
    let string = this.userData['userData']['myRestaurants'];
    this.myRestaurants = JSON.parse(string);
    this.publishID = this.myRestaurants[0]['publishID'];
    this.name = this.myRestaurants[0]['name'];
    this.backgroundImg = this.myRestaurants[0]['backgroundImg'];
    this.category = this.myRestaurants[0]['category'];
    this.logoImg = this.myRestaurants[0]['logoImg'];
    this.rating = this.myRestaurants[0]['rating'];
    this.minOrder = this.myRestaurants[0]['minOrder'];
    this.minOrderString = this.myRestaurants[0]['minOrderString'];
    this.deliveryTime = this.myRestaurants[0]['deliveryTime'];
    this.deliveryCost = this.myRestaurants[0]['deliveryCost'];
    this.deliveryCostString = this.myRestaurants[0]['deliveryCostString'];
    this.menu = this.myRestaurants[0]['menu'];
  }

  addDish() {
    let dish = {
      "dishCategory": this.dishCategory,
      "dishName": this.dishName,
      "dishPrice": this.dishPrice,
      "dishPriceAsString": this.convertToString(this.dishPrice),
      "dishDescribtion": this.dishDescribtion
    }

    this.menuUnsorted.push(dish);
    this.initSortMenu();
    this.updateDatalist();
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
        categoryItem: dishArr
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
    console.log(currency)
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

  createObject() {
    let obj = {
      name: this.name,
      backgroundImg: this.backgroundImg,
      category: this.category,
      logoImg: this.logoImg,
      rating: this.rating,
      minOrder: this.minOrder,
      minOrderString: this.minOrderString,
      deliveryTime: this.deliveryTime,
      deliveryCost: this.deliveryCost,
      deliveryCostString: this.deliveryCostString,
      menu: this.menu
    }
    this.createClass(obj);
  }

  createClass(obj: object) {
    this.restaurantNew = new Restaurant(obj);
  }

  async saveData() {
    this.createObject();
    this.changeArray();
    this.prepareUpload();
  }

  changeArray() {
    this.myRestaurants[0] = this.restaurantNew;
  }

  async prepareUpload() {
    let item = JSON.stringify(this.myRestaurants)
    let object = {
      userData: {
        myRestaurants: item
      }
    }
    await this.firestore.uploadChange(this.userID, object);
  }


}



