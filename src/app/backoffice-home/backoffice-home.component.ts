import { Component,  OnInit } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { DirectionService } from '../services/direction-service';




@Component({
  selector: 'app-backoffice-home',
  templateUrl: './backoffice-home.component.html',
  styleUrls: ['./backoffice-home.component.scss']
})
export class BackofficeHomeComponent implements OnInit {
  userData: any;
  myRestaurants = [];
  userID: string = "";
  home: boolean;

  constructor(private firestore: FirebaseService, private acRoute: ActivatedRoute,
    private gfs: Firestore, private router: Router, private direction: DirectionService) {

  }

  ngOnInit() {
    this.userID = this.acRoute.snapshot.paramMap.get('id');
    this.getUserData(this.userID);
    this.home = true;
    this.direction.hideEmitter.subscribe(result =>{
       this.home = result;
    })
  }

  async getUserData(userID: string) {
    const docRef = doc(this.gfs, 'users', userID);
    const docSnap = await getDoc(docRef);
    this.userData = docSnap.data();
  }

  navigateToBO(){
    this.router.navigate([`/backoffice/${this.userID}`])
  }
}
