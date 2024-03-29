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
  backgroundImgURL : string;
  category: string[] = [];
  logoImg: string = "";
  logoImgURL : string;
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
    this.organizingUserData();
  }

  organizingUserData() {
    this.userID = localStorage.getItem('userId');
    this.getUserData(this.userID);
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

  /**
   * extract data from fetched object
   * 
   */
  extractData(object: object) {
    let string = object['userData']['currRest'];
    this.restaurantNew = JSON.parse(string);
    this.publishID = this.restaurantNew['publishID'];
    this.name = this.restaurantNew['name'];
    this.backgroundImg = this.restaurantNew['backgroundImg'];
    this.backgroundImgURL = this.restaurantNew['backgroundImgURL'];
    this.logoImgURL = this.restaurantNew['logoImgURL'];
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
      backgroundImgURL: this.backgroundImgURL,
      logoImgURL: this.logoImgURL,
      rating: this.rating,
      deliveryCost: this.deliveryCost,
      deliveryCostString: this.curr.returnCurrency(this.deliveryCost),
      deliveryTime: this.deliveryTime,
      minOrder: this.minOrder,
      minOrderString: this.curr.returnCurrency(this.minOrder),
      menu: this.menu
    }
  }

  /**
   * data from developing restaurant collected in a json, transfered to an object and uploaded
   * 
   */
  async saveData() {
    let json = this.createJSON();
    this.upDatedRes = new Restaurant(json);
    this.prepareUpload();
  }

  async prepareUpload() {
    let item = JSON.stringify(this.upDatedRes)
    let object = {
      userData: {
        currRest: item
      }
    }
    await this.firestore.uploadChange(this.userID, object);
  }

  return() {
    this.router.navigate([`/backoffice/${this.userID}/characteristics`])
  }
}
