import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { CurrencyService } from '../services/currency.service';
import { FirebaseService } from '../services/firebase.service';


const exitTransitionLeft = transition(':leave', [
  style({
    transform: 'translateX(0)'
  }),
  animate('200ms ease-in', style({
    transform: 'translateX(-100vw)'
  }))
])

const exitTransitionRight = transition(':leave', [
  style({
    transform: 'translateX(0)'
  }),
  animate('200ms ease-in', style({
    transform: 'translateX(100vw)'
  }))
])

const enterTransitionLeft = transition(':enter', [
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

const enterTransitionUp = transition(':enter', [
  style({
    transform: 'translateY(100vh)'
  }),
  animate('500ms ease-in', style({
    transform: 'translateY(0)'
  }))
])

const exitTransitionDown = transition(':leave', [
  style({
    transform: 'translateY(0)'
  }),
  animate('200ms ease-in', style({
    transform: 'translateY(100vh)'
  }))
])

const slideLeftIn = trigger('slideLeftIn', [enterTransitionLeft])
const slideLeftOut = trigger('slideLeftOut', [exitTransitionLeft])
const slideRightOut = trigger('slideRightOut', [exitTransitionRight])
const slideRightIn = trigger('slideRightIn', [enterTransitionRight])
const slideUpIn = trigger('slideUpIn', [enterTransitionUp])
const slideDownOut = trigger('slideDownOut', [exitTransitionDown])

@Component({
  selector: 'app-my-restaurants',
  templateUrl: './my-restaurants.component.html',
  styleUrls: ['./my-restaurants.component.scss'],
  animations: [slideLeftOut, slideLeftIn, slideRightOut, slideRightIn, slideUpIn, slideDownOut]
})
export class MyRestaurantsComponent implements OnInit {
  userID: string;
  userData: object;
  myRestaurants = [];
  overview: boolean = true;
  detailedView: boolean = false;
  logoImg: string;
  backgroundImg: string;
  publishID: string;
  name: string;
  category: string[];
  rating: string;
  minOrder: number;
  minOrderString: string;
  deliveryTime: string;
  deliveryCost: number;
  deliveryCostString: string;
  menu: any;
  currentRestaurant: number;
  editActive: boolean = false;
  changingName: boolean = false;
  changingLogo: boolean = false;
  changingImg: boolean = false;
  changingDescribtion: string;
  copyLogo: string;
  copyImg: string;
  copyName: string;
  copyRating: string;
  copyMinOrder: number;
  copyMinOrderString: string;
  copyDeliveryTime: string;
  copyDeliveryCost: number;
  copyDeliveryCostString: string;
  copyMenu: any;
  uploading = false;
  menuActive = false;
  addDishActive = false;
  dishName: string;
  dishCategory: string;
  dishPrice: number;
  dishDescribtion: string;
  dishPriceAsString: string = "";
  menuUnsorted: any = [];
  menuObj: any = [];
  categoryList: any = [];


  constructor(private gfs: Firestore, private curr: CurrencyService, private firestore: FirebaseService) {

  }

  ngOnInit(): void {
    this.userID = localStorage.getItem('userId');
    this.getUserData(this.userID);
    this.subscribeToPublishID();
  }

  async getUserData(userID: string) {
    const docRef = doc(this.gfs, 'users', userID);
    const docSnap = await getDoc(docRef);
    let fetchedObject = docSnap.data();
    let testObj = fetchedObject['userData']['myRestaurants'];
    if (testObj.length > 0) {
      this.extractData(fetchedObject)
    }
  }

  extractData(object: object) {
    let string = object['userData']['myRestaurants'];
    this.myRestaurants = JSON.parse(string);
    console.log(this.myRestaurants)
  }

  subscribeToPublishID() {
    this.firestore.publishIdEmitter.subscribe((id) => {
      this.publishID = id;
      this.updateMyRestaurants();
      this.saveChanges();
    })
  }

  showDetails(i: number) {
    this.hideOverview();
    this.showDetailedView();
    this.assignDataToMask(i);
    this.createCopies();
  }

  showDetailedView() {
    this.detailedView = true;
  }

  hideOverview() {
    this.overview = false;
  }

  assignDataToMask(i: number) {
    this.currentRestaurant = i;
    this.logoImg = this.myRestaurants[i]['logoImg'];
    this.backgroundImg = this.myRestaurants[i]['backgroundImg'];
    this.name = this.myRestaurants[i]['name'];
    this.category = this.myRestaurants[i]['category'];
    this.publishID = this.myRestaurants[i]['publishID'];
    this.rating = this.myRestaurants[i]['rating'];
    this.minOrderString = this.myRestaurants[i]['minOrderString'];
    this.minOrder = this.myRestaurants[i]['minOrder'];
    this.deliveryTime = this.myRestaurants[i]['deliveryTime'];
    this.deliveryCostString = this.myRestaurants[i]['deliveryCostString'];
    this.deliveryCost = this.myRestaurants[i]['deliveryCost'];
    this.menu = this.myRestaurants[i]['menu'];
  }

  createCopies() {
    this.copyLogo = this.logoImg;
    this.copyImg = this.backgroundImg;
    this.copyName = this.name;
    this.copyRating = this.rating;
    this.copyMinOrder = this.minOrder;
    this.copyMinOrderString = this.minOrderString;
    this.copyDeliveryTime = this.deliveryTime;
    this.copyDeliveryCost = this.deliveryCost;
    this.copyDeliveryCostString = this.deliveryCostString;
    this.copyMenu = this.menu;
  }

  changeCondition() {
    this.editActive = true;
    this.changingLogo = false;
    this.changingImg = false;
    this.changingName = false;
  }

  saveChanges() {
    this.prepareArray();
    this.prepareUpload();
    this.assignDataToMask(this.currentRestaurant);
    this.closeEdits();
  }

  prepareArray() {
    this.myRestaurants[this.currentRestaurant]['logoImg'] = this.copyLogo;
    this.myRestaurants[this.currentRestaurant]['backgroundImg'] = this.copyImg;
    this.myRestaurants[this.currentRestaurant]['name'] = this.copyName;
    this.myRestaurants[this.currentRestaurant]['publishID'] = this.publishID;
    this.myRestaurants[this.currentRestaurant]['rating'] = this.copyRating;
    this.myRestaurants[this.currentRestaurant]['minOrderString'] = this.curr.returnCurrency(this.copyMinOrder);
    this.myRestaurants[this.currentRestaurant]['minOrder'] = this.copyMinOrder
    this.myRestaurants[this.currentRestaurant]['deliveryTime'] = this.copyDeliveryTime;
    this.myRestaurants[this.currentRestaurant]['deliveryCostString'] = this.curr.returnCurrency(this.copyDeliveryCost);
    this.myRestaurants[this.currentRestaurant]['deliveryCost'] = this.copyDeliveryCost,
    this.myRestaurants[this.currentRestaurant]['menu'] = this.copyMenu
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

  closeEdits() {
    this.changingLogo = false;
    this.changingImg = false;
    this.changingName = false;
    this.editActive = false;
    this.menuActive = false;
    this.addDishActive = false;
  }

  goBackNoSave() {
    this.selectRightPath();
    this.createCopies();
  }

  selectRightPath() {
    if (this.detailedView && this.changingLogo
      || this.detailedView && this.changingName
      || this.detailedView && this.changingImg
      || this.detailedView && this.editActive) {
      this.closeEdits();
    }
    else {
      this.showOverview();
      this.hideDetailedView();
    }
  }

  showOverview() {
    this.overview = true;
  }

  hideDetailedView() {
    this.detailedView = false;
    this.menuActive = false;
    this.addDishActive = false;
  }

  changeName() {
    this.changingLogo = false;
    this.changingImg = false;
    this.changingName = true;
    this.editActive = false;
  }

  changeImg() {
    this.changingLogo = false;
    this.changingImg = true;
    this.changingName = false;
    this.editActive = false;
  }

  changeLogo() {
    this.changingLogo = true;
    this.changingImg = false;
    this.changingName = false;
    this.editActive = false;
  }

  publish() {
    this.uploading = true;
    this.prepareJSON();
  }

  updateMyRestaurants() {
    this.myRestaurants[this.currentRestaurant]['publishID'] = this.publishID;
    
  }

  async prepareJSON() {
    let item = {
      logoImg: this.logoImg,
      backgroundImg: this.backgroundImg,
      name: this.name,
      category : this.category,
      rating: this.rating,
      minOrder: this.minOrder,
      minOrderString: this.minOrderString,
      deliveryTime: this.deliveryTime,
      deliveryCost: this.deliveryCost,
      deliveryCostString: this.deliveryCostString,
      menu: this.menu
    }
    await this.firestore.publishChange(item);
    setTimeout(() => {
      this.uploading = false
    }, 2000);
  }

  async uploadChanges() {
    this.uploading = true;
    let item = {
      logoImg: this.logoImg,
      backgroundImg: this.backgroundImg,
      name: this.name,
      rating: this.rating,
      minOrder: this.minOrder,
      minOrderString: this.minOrderString,
      deliveryTime: this.deliveryTime,
      deliveryCost: this.deliveryCost,
      deliveryCostString: this.deliveryCostString,
      menu: this.menu
    }
    await this.firestore.updateRestColl(this.publishID, item)
    setTimeout(() => {
      this.uploading = false
    }, 2000);
  }

  showMenu() {
    this.menuActive = true;
  }

  saveMenuChanges() {
    this.menuActive = false;
    this.saveChanges();
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

  openAddDish() {
    this.menuActive = false;
    setTimeout(() => {
      this.addDishActive = true;
    }, 200);
  }

  cancelAddDishes() {
    this.addDishActive = false;
  }

  addDish() {
    let dish = {
      "dishCategory": this.dishCategory,
      "dishName": this.dishName,
      "dishPrice": this.dishPrice,
      "dishPriceAsString": this.convertToString(this.dishPrice),
      "dishDescribtion": this.dishDescribtion
    }

    this.findSpotInArray(dish);
    this.saveChanges();
  }

  findSpotInArray(dish: object) {
    let spot = this.menu.find(category => category.categorykey == this.dishCategory);
    if (spot) {
      spot.categoryItem.push(dish)
    } else {
      this.createNewCategory(dish)
    }
  }

  createNewCategory(dish: object) {
    let newCategory = dish['dishCategory'];
    let json = {
      "categorykey": newCategory,
      "categoryItem": [dish]
    }
    this.menu.push(json);
  }

  convertToString(number: number) {
    let currency = number.toLocaleString('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    });
    return currency
  }
}
