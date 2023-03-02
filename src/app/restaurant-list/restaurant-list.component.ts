import { Component, Input, OnInit } from '@angular/core';
import { Restaurants } from 'src/models/restaurants.class';
import { FilterService } from './../services/filter.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  restaurantUS: any = [];
  restaurantS: any = [];
  kitchenChoice: string = 'all';
  ratingFilter: number = 1;
  orderAmount: number = 1000;
  search: string = '';
  sortBy: string = 'rating';
  @Input() currentFilter: string = 'all';

  constructor(public allRestaurants: Restaurants, private filter: FilterService) {

  }

  ngOnInit(): void {
    this.loadAllRestaurants();
    this.sortRestaurants();
    this.setKitchenFilter();
    this.setRatingFilter();
    this.setOrderAmountFilter();
    this.setSearchFilter();
    this.setSortBy();
  }

  loadAllRestaurants() {
    this.restaurantUS = this.allRestaurants.allRestaurants;
  };

  sortRestaurants() {
    if (this.sortBy == 'Rating') {
      this.restaurantS = this.restaurantUS.sort((a, b) => {
        if (a[`${this.sortBy}`] < b[`${this.sortBy}`]) {
          return -1;
        }
      })
    } else {
      this.restaurantS = this.restaurantUS.sort((a, b) => {
        if (a[`${this.sortBy}`] > b[`${this.sortBy}`]) {
          return -1;
        }
      })
      console.log(this.restaurantS)
    }
  }


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

  setSortBy() {
    this.filter.sortByEmitter.subscribe((choice) => {
      this.sortBy = choice;
      this.sortRestaurants();
    });

  }

  includesSearch(restaurant: any) {
    return restaurant.name.includes(this.search)
  }

  includesKitchen(restaurant: any) {
    return restaurant.category.includes(this.kitchenChoice)
  }
}
