import { Component, OnInit, OnDestroy } from '@angular/core';
import { doc, docData, Firestore, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/models/restaurant.class';
import { FirebaseService } from '../services/firebase.service';




@Component({
  selector: 'app-backoffice-home',
  templateUrl: './backoffice-home.component.html',
  styleUrls: ['./backoffice-home.component.scss']
})
export class BackofficeHomeComponent implements OnInit {
  userData: any;
  myRestaurants = [];
  restaurantNew: Restaurant;
  userID: string = "";

  constructor(private firestore: FirebaseService, private route: ActivatedRoute, private gfs: Firestore) {

  }

  ngOnInit() {
    this.userID = this.route.snapshot.paramMap.get('id');
    this.getUserData(this.userID);
  }

  async getUserData(userID: string) {
    const docRef = doc(this.gfs, 'users', userID);
    const docSnap = await getDoc(docRef);
    this.userData = docSnap.data();
  }

  newRestaurant() {
    this.restaurantNew = new Restaurant();
    this.myRestaurants.unshift(this.restaurantNew);
    this.prepareUpload();
    console.log(this.restaurantNew)
  }

  prepareUpload() {
    let item = JSON.stringify(this.myRestaurants)
    let object = {
      userData: {
        myRestaurants : item
      }
    }
    this.firestore.uploadChange(this.userID, object);
  }
}
