import { Component } from '@angular/core';
import { FilterService } from './../services/filter.service';
import { SortService } from '../services/sort.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  search : string = "";
  sortBy : string = "Rating";
  sortByKey : string = "rating"
  active : boolean = false;

  constructor(private filter : FilterService, public sort : SortService){

  }

  searchRestaurant(){
    this.filter.searchForRestaurant(this.search)
  }

  changeSortBy(change : string, changeLabel : string){
    this.sortBy = changeLabel;
    this.sortByKey = change
    this.active = false;
    this.filter.changeSortBy(change);
  }

  toggleSortBy(){
    if(this.active == false){
      this.active = true;
    }else{
      this.active = false;
    }
  }
}
