import { Component, Input, OnInit } from '@angular/core';
import { Restaurants } from 'src/models/restaurants.class';
import { FilterService } from './../services/filter.service';

@Component({
  selector: 'app-restaurant-overview',
  templateUrl: './restaurant-overview.component.html',
  styleUrls: ['./restaurant-overview.component.scss'],
})
export class RestaurantOverviewComponent implements OnInit {
    restaurantOV : any = [];
    kitchenChoice : string = 'all';
    @Input() currentFilter : string = 'all';

    constructor(public allRestaurants : Restaurants, private filter : FilterService){
        
    }

    ngOnInit(): void {
      this.restaurantOV = this.allRestaurants.allRestaurants;
      this.filter.kitchenFilterEmitter.subscribe((choice) => {
        this.kitchenChoice = choice;
      })
    }

    includesKitchen(restaurant : any){
      return restaurant.category.includes(this.kitchenChoice)
    }
}
