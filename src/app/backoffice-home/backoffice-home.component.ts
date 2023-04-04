import { Component, OnInit, OnDestroy } from '@angular/core';
import { doc, docData, Firestore, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
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
  userID: string = "";

  constructor(private firestore: FirebaseService, private route: ActivatedRoute, private gfs: Firestore, private router: Router) {

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

  newRestaurant(){
    // this.router.navigate(['characteristics'])
  }
}
