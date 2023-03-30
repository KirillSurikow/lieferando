import { Component, OnInit } from '@angular/core';
import { Firestore, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { doc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/models/restaurant.class';
import { CurrencyService } from '../services/currency.service';
import { FirebaseService } from '../services/firebase.service';



@Component({
  selector: 'app-restaurant-description',
  templateUrl: './restaurant-description.component.html',
  styleUrls: ['./restaurant-description.component.scss'],

})
export class RestaurantDescriptionComponent implements OnInit {
  userID: string;
  userData: object;
  publishID : string;
  name: string = "";
  backgroundImg: string = "";
  category: string = "";
  logoImg: string = "";
  rating: number;
  minOrder: number;
  minOrderString: string;
  deliveryTime: number;
  deliveryCost: number;
  deliveryCostString: string;
  menu: any[];
  restaurantNew: Restaurant;
  myRestaurants = [];



  constructor(private router: Router, private route: ActivatedRoute,
    private gfs: Firestore, private firestore: FirebaseService,
    private curr : CurrencyService) {

  }
  ngOnInit() {
    this.userID = localStorage.getItem('userId')
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

  createObject() {
    let obj = {
      name: this.name,
      backgroundImg: this.backgroundImg,
      category: this.category,
      logoImg: this.logoImg,
      rating: this.rating,
      minOrder: this.minOrder,
      minOrderString: this.curr.returnCurrency(this.minOrder),
      deliveryTime: this.deliveryTime,
      deliveryCost: this.deliveryCost,
      deliveryCostString: this.curr.returnCurrency(this.deliveryCost),
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
