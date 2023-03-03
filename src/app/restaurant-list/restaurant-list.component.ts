import { Component, Input, OnInit } from '@angular/core';
import { Restaurants } from 'src/models/restaurants.class';
import { FilterService } from './../services/filter.service';
import { Restaurant } from 'src/models/restaurant.class';
import { SortService } from '../services/sort.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  restaurantS: Restaurant[] = [];
  kitchenChoice: string = 'all';
  ratingFilter: number = 1;
  orderAmount: number = 1000;
  search: string = '';
  sortBy: any = 'rating';
  @Input() currentFilter: string = 'all';

  constructor(public allRestaurants: Restaurants, private filter: FilterService, public sort : SortService) {

  }

  ngOnInit(): void {
    this.loadAllRestaurants();
    this.setKitchenFilter();
    this.setRatingFilter();
    this.setOrderAmountFilter();
    this.setSearchFilter();
  }

  loadAllRestaurants() {
    this.restaurantS = this.sort.sortedRestaurant;
  };


  setKitchenFilter() {
    this.filter.kitchenFilterEmitter.subscribe((choice) => {
      this.kitchenChoice = choice;
    });
  };

  setRatingFilter() {
    this.filter.ratingFilterEmitter.subscribe((choice) => {
      this.ratingFilter = choice;
    });
  };

  setOrderAmountFilter() {
    this.filter.orderAmountFilterEmitter.subscribe((choice) => {
      this.orderAmount = choice;
    });
  }

  setSearchFilter() {
    this.filter.searchFilterEmitter.subscribe((choice) => {
      this.search = choice;
    });
  };

  includesSearch(restaurant: any) {
    return restaurant.name.includes(this.search)
  }

  includesKitchen(restaurant: any) {
    return restaurant.category.includes(this.kitchenChoice)
  }
}
