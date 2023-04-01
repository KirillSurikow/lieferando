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
  category: string = "";
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


  constructor(private route: ActivatedRoute, private router: Router,
    private gfs: Firestore, private firestore: FirebaseService, private curr: CurrencyService) {

  }

  ngOnInit(): void {
    addEventListener("popstate", () => {
        this.router.navigate(['../characteristics', 'back'])
    });
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

  createJSON() {
    return {
      name: this.name,
      category: this.category,
      backgroundImg: this.backgroundImg,
      logoImg: this.logoImg,
      rating: this.rating,
      deliveryCost: this.deliveryCost,
      deliveryCostString : this.curr.returnCurrency(this.deliveryCost),
      minOrder : this.minOrder,
      minOrderString : this.curr.returnCurrency(this.minOrder),
    }
  }

  async saveData() {
    let json = this.createJSON();
    this.upDatedRes = new Restaurant(json);
    this.updateArray();
    this.prepareUpload();
  }

  updateArray(){
    this.myRestaurants[0] = this.upDatedRes;
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
