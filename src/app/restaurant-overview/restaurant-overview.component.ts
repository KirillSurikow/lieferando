import { Component } from '@angular/core';
import { Restaurants } from 'src/models/restaurants.class';

@Component({
  selector: 'app-restaurant-overview',
  templateUrl: './restaurant-overview.component.html',
  styleUrls: ['./restaurant-overview.component.scss']
})
export class RestaurantOverviewComponent {
    restaurantOV : any = [];

    constructor(public allRestaurants : Restaurants){
        this.restaurantOV = this.allRestaurants.allRestaurants;
    }

   
}
