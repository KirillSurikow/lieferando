import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/models/restaurant.class';


@Component({
  selector: 'app-backoffice-home',
  templateUrl: './backoffice-home.component.html',
  styleUrls: ['./backoffice-home.component.scss']
})
export class BackofficeHomeComponent implements OnInit {
  myRestaurants: any = [];
  restaurantNew: object = [];
  userID: string = "";
  databaseID: string = "";


  constructor(private firestore: AngularFirestore, private route: ActivatedRoute) {
     
  }

  ngOnInit(): void {
    let obj = JSON.parse(this.route.snapshot.paramMap.get('id'));
    this.userID = obj.userID;
    this.databaseID = obj.databaseID;
    this.updateAccount();
  }

  updateAccount(){
    // this
    // .firestore
    // .collection('users')
    // .doc(this.databaseID)
    // .getDoc('myRestaurants')


    this.firestore.collection('users', ref => ref.where('userId', '==', this.userID))
   .valueChanges()
   .subscribe(data =>{
    console.log(data)
   });
  }

  newRestaurant() {
    this.restaurantNew = new Restaurant();
    this.myRestaurants.push(this.restaurantNew)
    this
      .firestore
      .collection('users')
      .doc(this.databaseID)
      .update({ myRestaurants: this.myRestaurants })
  }
}
