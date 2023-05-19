import { Component, OnInit } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { Restaurant } from 'src/models/restaurant.class';
import { Router } from '@angular/router';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { DirectionService } from '../services/direction-service';

@Component({
  selector: 'app-resp-search',
  templateUrl: './resp-search.component.html',
  styleUrls: ['./resp-search.component.scss']
})
export class RespSearchComponent implements OnInit {
  search: string;
  restaurantS: Restaurant[] = [];
  kitchenChoice: string = 'all';

  constructor(private filter: FilterService, private router: Router, private gfs: Firestore, private direction : DirectionService) { }

  ngOnInit(): void {
    this.accessDatabase();
  }

  async accessDatabase() {
    const coll = await getDocs(collection(this.gfs, 'restaurants'));
    coll.forEach((doc) => {
      let newResObject = new Restaurant(doc.data());
      newResObject.publishID = doc.id;
      this.restaurantS.push(newResObject);
    });
  }

  searchRestaurant() {
    this.filter.searchForRestaurant(this.search)
  }

  includesSearch(restaurant: any) {
    return restaurant.name.includes(this.search)
  }

  includesKitchen(restaurant: any) {
    return restaurant.category.includes(this.kitchenChoice);
  }

  goToRestaurant(i: number) {
    let restaurantId = this.restaurantS[i]['publishID'];
    this.router.navigate(['/restaurant', restaurantId])
  }

  closeSearch(){
    this.direction.closeSearch();
    document.body.style.overflowY = "auto";
  }
}
