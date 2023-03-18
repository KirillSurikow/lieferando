import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-restaurant-description',
  templateUrl: './restaurant-description.component.html',
  styleUrls: ['./restaurant-description.component.scss'],

})
export class RestaurantDescriptionComponent implements OnInit {
  name: string = "";
  backgroundImg: string = "";
  category: string = "";
  logoImg: string = "";
  currentUser: string = "";
  allRestaurants$: Observable<object>;


  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.divideLogOrSign()

  }

  divideLogOrSign() {
    // let obj = JSON.parse(this.route.snapshot.paramMap.get('id'));
    // this.currentUser = obj.userId;
    // if (new)
      // this.createNewUser()
    // else
      // this.loadUser();
  }

  saveData() {
    let describtion = {
      'name': this.name,
      'backgroundImg': this.backgroundImg,
      'category': this.category,
      'logoImg': this.logoImg
    }

    this.router.navigate(['/backoffice/:id/restaurantCondition', { my_object: JSON.stringify(describtion) }]);
  }

}
