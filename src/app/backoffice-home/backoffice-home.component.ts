import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Restaurant } from 'src/models/restaurant.class';
import { FirestoreService } from '../services/firestore.service';



@Component({
  selector: 'app-backoffice-home',
  templateUrl: './backoffice-home.component.html',
  styleUrls: ['./backoffice-home.component.scss']
})
export class BackofficeHomeComponent implements OnInit {
  data: any = "";
  myRestaurants: any = [];
  restaurantNew: object = [];
  userID: string = "";
  databaseID: string = "";


  constructor(private firestore: AngularFirestore, private route: ActivatedRoute, private gfs: FirestoreService) {

  }

  ngOnInit(): void {
    let obj = JSON.parse(this.route.snapshot.paramMap.get('id'));
    this.userID = obj.userID;
    this.databaseID = obj.databaseID;
    this.setDataListener();
    this.gfs.getData(this.databaseID);
  }

  setDataListener() {
    this.gfs.dataEmitter.subscribe(data => {
      this.data = data;
      console.log(data.data)
    })
  }

  newRestaurant() {
    this.restaurantNew = new Restaurant();
    this.myRestaurants.push(this.restaurantNew)
    this
      .firestore
      .collection('users')
      .doc(this.databaseID)
      .update({ 'data': this.myRestaurants })
      .then(res => {
        console.log(res)
      })
  }
}
