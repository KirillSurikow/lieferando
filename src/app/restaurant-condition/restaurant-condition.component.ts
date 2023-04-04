import { Component, OnInit } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/models/restaurant.class';
import { CurrencyService } from '../services/currency.service';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-restaurant-condition',
  templateUrl: './restaurant-condition.component.html',
  styleUrls: ['./restaurant-condition.component.scss'],

})
export class RestaurantConditionComponent implements OnInit {
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
  upDatedRes: Restaurant;
  myRestaurants = [];
  restaurantNew: object;


  constructor(private route: ActivatedRoute, private router: Router,
    private gfs: Firestore, private firestore: FirebaseService, private curr: CurrencyService) {

  }

  ngOnInit(): void {
    this.userID = localStorage.getItem('userId');
    this.getUserData(this.userID);
  }

  async getUserData(userID: string) {
    const docRef = doc(this.gfs, 'users', userID);
    const docSnap = await getDoc(docRef);
    let fetchedObject = docSnap.data();
    if (Object.keys(fetchedObject['userData']).length !== 0) {
      this.extractData(fetchedObject)
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

  createJSON() {
    return {
      name: this.name,
      category: this.category,
      backgroundImg: this.backgroundImg,
      logoImg: this.logoImg,
      rating: this.rating,
      deliveryCost: this.deliveryCost,
      deliveryCostString: this.curr.returnCurrency(this.deliveryCost),
      minOrder: this.minOrder,
      minOrderString: this.curr.returnCurrency(this.minOrder),
    }
  }

  async saveData() {
    let json = this.createJSON();
    this.upDatedRes = new Restaurant(json);
    this.prepareUpload();
  }

  async prepareUpload() {
    let item = JSON.stringify(this.myRestaurants)
    let object = {
      userData: {
        currRest: item
      }
    }
    await this.firestore.uploadChange(this.userID, object);
  }
}
