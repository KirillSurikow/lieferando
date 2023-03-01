import { Component, Input, OnInit } from '@angular/core';
import { Obj } from '@popperjs/core';
import { Restaurants } from 'src/models/restaurants.class';
import { FilterService } from './../services/filter.service';

@Component({
  selector: 'app-restaurant-overview',
  templateUrl: './restaurant-overview.component.html',
  styleUrls: ['./restaurant-overview.component.scss'],
})
export class RestaurantOverviewComponent implements OnInit {
    restaurantOV : any = [];
    currentRate : number = 1;
    choiceAmount : number = 1000;
    kitchenChoice : string = 'all';
    
    orderAmount : any = [
      {
        'id' : 1,
        'label' : 'show all',
        'value' : 1000,
      },
      {
        'id' : 2,
        'label' : '10,00€ or less',
        'value' : 10,
      },
      {
        'id' : 3,
        'label' : '15,00€ or less',
        'value' : 15,
      },
      {
        'id' : 4,
        'label' : '20,00€ or less',
        'value' : 20,
      },
    ];

    @Input() currentFilter : string = 'all';

    constructor(public allRestaurants : Restaurants, private filter : FilterService){
        
    }

    ngOnInit(): void {
      this.restaurantOV = this.allRestaurants.allRestaurants;
      this.filter.filterEmitter.subscribe((choice) => {
        this.kitchenChoice = choice;
      })
    }

    includesKitchen(restaurant : any){
      return restaurant.category.includes(this.kitchenChoice)
    }


    showValue(){
      console.log(this.choiceAmount)
    }
   
}
