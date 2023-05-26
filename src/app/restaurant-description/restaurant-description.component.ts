import { Component, OnInit } from '@angular/core';
import { Firestore, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { doc } from 'firebase/firestore';
import { Restaurant } from 'src/models/restaurant.class';
import { CurrencyService } from '../services/currency.service';
import { FirebaseService } from '../services/firebase.service';
import { DirectionService } from '../services/direction-service';
import { Storage, deleteObject, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

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
  backgroundImgFile: any;
  backgroundImgURL: string;
  logoImg: string = "";
  logoImgFile: any;
  logoImgURL: string;
  category: string[] = [];
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
    private curr: CurrencyService, private direction: DirectionService,
    private storage: Storage) {
  }

  ngOnInit() {
    this.organizeUserData();
    this.hideBtn();
  }

  async organizeUserData() {
    this.userID = localStorage.getItem('userId');
    await this.getUserData(this.userID);
  }

  hideBtn() {
    this.direction.hide();
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

  newRestaurant() {
    let json = this.createJSON();
    console.log(json)
    this.restaurantNew = new Restaurant(json);
  }

  createJSON() {
    return {
      name: this.name,
      category: ['all', this.category],
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

  async saveData() {
    this.newRestaurant();
    this.prepareUpload();
  }

  async prepareUpload() {
    let item = JSON.stringify(this.restaurantNew)
    let object = {
      userData: {
        currRest: item
      }
    }
    await this.firestore.uploadChange(this.userID, object);
  }

  prepareUploadLogo() {
    this.deleteOldLogo();
    this.uploadNewLogo();
  }

  async deleteOldLogo() {
    const storageRef = ref(this.storage, `${this.userID} ${this.name}-logo`);
    await deleteObject(storageRef).then(() => {

    }).catch((error) => {

    });
  }

  async uploadNewLogo() {
    const storageRef = ref(this.storage, `${this.userID} ${this.name}-logo`);
    const uploadTask = uploadBytesResumable(storageRef, this.logoImgFile);
    uploadTask.on('state_changed',
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downLoadUrl) => {
          this.logoImgURL = downLoadUrl
        })
      }
    )
  }

  prepareUploadTheme() {
    this.deleteOldTheme();
    this.uploadNewTheme()
  }

  deleteOldTheme() {
    const storageRef = ref(this.storage, `${this.userID} ${this.name}-theme`);
    deleteObject(storageRef).then(() => {

    }).catch((error) => {
      console.log('error')
    });
  }

  uploadNewTheme() {
    const storageRef = ref(this.storage, `${this.userID} ${this.name}-theme`);
    const uploadTask = uploadBytesResumable(storageRef, this.backgroundImgFile);
    uploadTask.on('state_changed',
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downLoadUrl) => {
        this.backgroundImgURL = downLoadUrl
      })
    }
  )
  }

  return() {
    this.router.navigate([`/backoffice/${this.userID}`])
  }

  uploadLogo(event) {
    this.logoImgFile = event[0];
    let name = event[0].name;
    this.logoImg = name;
    this.prepareUploadLogo();
  }

  uploadTheme(event) {
    this.backgroundImgFile = event[0];
    let name = event[0].name;
    this.backgroundImg = name;
    this.prepareUploadTheme();
  }

  removeBackground(event) {
    event.stopPropagation()
    this.backgroundImgFile = null;
    this.backgroundImg = "";
  }

  removeLogo(event) {
    event.stopPropagation()
    this.logoImgFile = null;
    this.logoImg = "";
  }
}
