import { Component, Input, OnInit } from '@angular/core';
import { Restaurants } from 'src/models/restaurants.class';
import { FilterService } from './../services/filter.service';
import { Restaurant } from 'src/models/restaurant.class';
import { SortService } from '../services/sort.service';
import { FirebaseService } from '../services/firebase.service';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';

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

  constructor(private filter: FilterService, public sort: SortService, private gfs: Firestore, private router : Router) {

  }

  ngOnInit(): void {
    this.accessDatabase();
    this.loadAllRestaurants();
    this.setKitchenFilter();
    this.setRatingFilter();
    this.setOrderAmountFilter();
    this.setSearchFilter();
  }

  async accessDatabase() {
    const coll = await getDocs(collection(this.gfs, 'restaurants'));
    coll.forEach((doc) => {
      let newResObject = new Restaurant(doc.data());
      newResObject.publishID = doc.id;
      this.restaurantS.push(newResObject);
    });
  }

  loadAllRestaurants() {
    this.sort.orderByEmitter.subscribe((order: any) => {
      this.restaurantS = order;
    });
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
    return restaurant.category.includes(this.kitchenChoice);
  }

  goToRestaurant(i : number){
      let restaurantId = this.restaurantS[i]['publishID'];
      this.router.navigate(['/restaurant', restaurantId ])
  }
}
