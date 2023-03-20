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
  data$ : Observable<any>;
  myRestaurants: any = [];
  restaurantNew: object = [];
  userID: string = "";
  databaseID: string = "";


  constructor(private firestore: AngularFirestore, private route: ActivatedRoute, private gfs : FirestoreService) {

  }

  ngOnInit(): void {
    let obj = JSON.parse(this.route.snapshot.paramMap.get('id'));
    this.userID = obj.userID;
    this.databaseID = obj.databaseID;
    this.updateAccount();
  }

  async updateAccount() {
   let user = await this.gfs.getUser(this.userID);
   console.log(user)
  }

  newRestaurant() {
    this.restaurantNew = new Restaurant();
    this.myRestaurants.push(this.restaurantNew)
    this
      .firestore
      .collection('users')
      .doc(this.databaseID)
      .update({'data' : this.myRestaurants })
      .then( res =>{
        console.log(res)
      })
  }
}
