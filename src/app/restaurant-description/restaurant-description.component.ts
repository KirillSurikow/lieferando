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
  publishID: string;
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
  direction;

  constructor(private router: Router, private route: ActivatedRoute,
    private gfs: Firestore, private firestore: FirebaseService,
    private curr: CurrencyService) {
  }

  async ngOnInit() {
    this.userID = localStorage.getItem('userId');
    await this.getUserData(this.userID);
    this.direction = this.route.snapshot.paramMap.get('direction');
  }

  async getUserData(userID: string) {
    const docRef = doc(this.gfs, 'users', userID);
    const docSnap = await getDoc(docRef);
    let fetchedObject = docSnap.data();
    if (Object.keys(fetchedObject['userData']).length !== 0) {
      this.extractData(fetchedObject);
    }
  }

  extractData(object: object) {
    let string = object['userData']['myRestaurants'];
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


  newRestaurant() {
    let json = this.createJSON();
    this.restaurantNew = new Restaurant(json);
    this.myRestaurants.unshift(this.restaurantNew);
  }

  createJSON() {
    return {
      name: this.name,
      category: this.category,
      backgroundImg: this.backgroundImg,
      logoImg: this.logoImg
    }
  }

  async saveData() {
    this.newRestaurant();
    this.changeArray();
    this.prepareUpload();
  }

  changeArray() {
    this.myRestaurants[0]['publishID'] = this.publishID;
    this.myRestaurants[0]['name'] = this.name;
    this.myRestaurants[0]['backgroundImg'] = this.backgroundImg;
    this.myRestaurants[0]['category'] = this.category;
    this.myRestaurants[0]['logoImg'] = this.logoImg;
    this.myRestaurants[0]['rating'] = this.rating;
    this.myRestaurants[0]['minOrder'] = this.minOrder;
    this.myRestaurants[0]['minOrderString'] = this.minOrderString;
    this.myRestaurants[0]['deliveryTime'] = this.deliveryTime;
    this.myRestaurants[0]['deliveryCost'] = this.deliveryCost;
    this.myRestaurants[0]['deliveryCostString'] = this.deliveryCostString;
    this.myRestaurants[0]['menu'] = this.menu;
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
