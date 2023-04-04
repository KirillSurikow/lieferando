import { Component, OnInit } from '@angular/core';
import { Firestore, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { doc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/models/restaurant.class';
import { CurrencyService } from '../services/currency.service';
import { DirectionService } from '../services/direction-service';
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
  category: string[] = [];
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
    await this.getUserData(this.userID)
  }

  async getUserData(userID: string) {
    const docRef = doc(this.gfs, 'users', userID);
    const docSnap = await getDoc(docRef);
    let fetchedObject = docSnap.data();
    if (Object.keys(fetchedObject['userData']).length !== 0) {
      this.extractData(fetchedObject);
      this.newRestaurant();
    }
  }

  extractData(object: object) {
    let string = object['userData']['currRest'];
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


  newRestaurant() {
    let json = this.createJSON();
    this.restaurantNew = new Restaurant(json);
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
    this.prepareUpload();
  }

  async prepareUpload() {
    let item = JSON.stringify(this.restaurantNew)
    let object = {
      userData: {
        currRest : item
      }
    }
    await this.firestore.uploadChange(this.userID, object);
  }
}
