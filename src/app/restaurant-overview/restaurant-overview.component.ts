import { Component, Input, OnInit } from '@angular/core';
import { Restaurants } from 'src/models/restaurants.class';
import { FilterService } from './../services/filter.service';
import { DirectionService } from '../services/direction-service';
import { animate, style, transition, trigger } from '@angular/animations';

const enterTransitionUp = transition(':enter', [
  style({
    transform: 'translateY(100vh)'
  }),
  animate('500ms ease-in', style({
    transform: 'translateY(0)'
  }))
])

const exitTransitionDown = transition(':leave', [
  style({
    transform: 'translateY(0)'
  }),
  animate('200ms ease-in', style({
    transform: 'translateY(100vh)'
  }))
])

const slideUpIn = trigger('slideUpIn', [enterTransitionUp])
const slideDownOut = trigger('slideDownOut', [exitTransitionDown])

@Component({
  selector: 'app-restaurant-overview',
  templateUrl: './restaurant-overview.component.html',
  styleUrls: ['./restaurant-overview.component.scss'],
  animations: [slideUpIn, slideDownOut]
})
export class RestaurantOverviewComponent implements OnInit {
  restaurantOV: any = [];
  kitchenChoice: string = 'all';
  @Input() currentFilter: string = 'all';
  searchActive = false;
  filterActive = false;

  constructor(public allRestaurants: Restaurants, private filter: FilterService, private direction: DirectionService) {

  }

  ngOnInit(): void {
    this.restaurantOV = this.allRestaurants.allRestaurants;
    this.filter.kitchenFilterEmitter.subscribe((choice) => {
      this.kitchenChoice = choice;
    });
    this.direction.closeSearchEmitte.subscribe((result) => {
      this.searchActive = result;
    });
    this.direction.closeFilterEmitter.subscribe((result) => {
      this.filterActive = result;
    })
  }

  includesKitchen(restaurant: any) {
    return restaurant.category.includes(this.kitchenChoice)
  }

  openSearch() {
    this.searchActive = true;
    document.body.style.overflowY = "hidden";
  }

  openFilter(){
    this.filterActive = true;
    document.body.style.overflowY = "hidden";
  }
}
