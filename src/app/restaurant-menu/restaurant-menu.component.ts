import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from '../services/currency.service';
require("core-js/actual/array/group-by");

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss']
})
export class RestaurantMenuComponent implements OnInit {
  obj: object;
  name: string = "";
  backgroundImg: string = "";
  category: string = "";
  logoImg: string = "";
  rating: number;
  deliveryCost: number;
  deliveryTime: number;
  minOrder: number;
  menuUnsorted: any = [];
  menuObj: any = [];
  menu: any = [];
  dishName: string = "";
  dishCategory: string = "";
  dishPrice: number;
  dishPriceAsString: string = ";"
  dishDescribtion: string = "";
  categoryList: any = [];

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private currency: CurrencyService) {

  }

  ngOnInit(): void {
    this.obj = JSON.parse(this.route.snapshot.paramMap.get('my_object'));
    this.name = this.obj['name'];
    this.backgroundImg = this.obj['backgroundImg'];
    this.category = this.obj['category'];
    this.logoImg = this.obj['logoImg'];
    this.rating = this.obj['rating'];
    this.deliveryCost = this.obj['deliveryCost'];
    this.deliveryTime = this.obj['deliveryTime'];
    this.minOrder = this.obj['minOrder'];
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

  saveMenu() {
    let json = this.createObject();
    this.uploadToFirestore(json);
  }

  createObject() {
    return {
      name: this.name,
      category: this.category,
      backgroundImg: this.backgroundImg,
      logoImg: this.logoImg,
      rating: this.rating,
      minOrder: this.minOrder,
      minOrderString: this.convertToString(this.minOrder) ,
      deliveryTime: this.deliveryTime,
      deliveryCost: this.deliveryCost,
      deliveryCostString: this.convertToString(this.deliveryCost),
      menu: this.menu,
    }
  }

  uploadToFirestore(json : object){
    this
    .firestore
    .collection('restaurants')
    .add(json) 
  }
}



