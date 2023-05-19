import { Component } from '@angular/core';
import { FilterService } from '../services/filter.service';
import { SortService } from '../services/sort.service';
import { DirectionService } from '../services/direction-service';

@Component({
  selector: 'app-resp-filter',
  templateUrl: './resp-filter.component.html',
  styleUrls: ['./resp-filter.component.scss']
})
export class RespFilterComponent {
  sortBy: string = "Rating";
  sortByKey: string = "rating"
  active: boolean = false;

  constructor(private filter: FilterService, public sort: SortService , public direction : DirectionService) { }

  changeSortBy(change: string, changeLabel: string) {
    this.sortBy = changeLabel;
    this.sortByKey = change
    this.active = false;
    this.filter.changeSortBy(change);
  }

  toggleSortBy() {
    if (this.active == false) {
      this.active = true;
    } else {
      this.active = false;
    }
  }

  return(){
    this.sortBy = "Rating";
    this.sortByKey = "rating"
    this.active = false;

    this.direction.closeFilter();
  }

}
