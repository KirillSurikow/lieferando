import { Component, OnInit } from '@angular/core';
import { Firestore, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { doc } from 'firebase/firestore';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-restaurant-description',
  templateUrl: './restaurant-description.component.html',
  styleUrls: ['./restaurant-description.component.scss'],

})
export class RestaurantDescriptionComponent implements OnInit {
  userID: string;
  userData : object;
  myRestaurants : Array<any>;
  name: string = "";
  backgroundImg: string = "";
  category: string = "";
  logoImg: string = "";
  currentUser: string = "";
  allRestaurants$: Observable<object>;


  constructor(private router: Router, private route: ActivatedRoute, private gfs: Firestore) {

  }
  ngOnInit() {
    this.userID = localStorage.getItem('userId')
    console.log(this.userID)
    // this.getUserData(this.userID);
  }

  async getUserData(userID: string) {
    const docRef = doc(this.gfs, 'users', userID);
    const docSnap = await getDoc(docRef);
    this.userData = docSnap.data();
    console.log(this.userData)
    // this.assignData();
  }

  assignData() {
    // this.myRestaurants = this.userData.myRestaurants
    // console.log(this.userData)
  }



  saveData() {

  }

}
