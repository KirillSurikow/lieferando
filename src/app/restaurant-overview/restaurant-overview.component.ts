import { Component, OnInit } from '@angular/core';
import { Restaurants } from 'src/models/restaurants.class';

@Component({
  selector: 'app-restaurant-overview',
  templateUrl: './restaurant-overview.component.html',
  styleUrls: ['./restaurant-overview.component.scss']
})
export class RestaurantOverviewComponent implements OnInit {
   

    constructor(private allRestaurants : Restaurants){
    
    }

    ngOnInit(): void {
      console.log(this.allRestaurants)
    }
}
