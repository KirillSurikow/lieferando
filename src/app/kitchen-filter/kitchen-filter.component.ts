import { Component } from '@angular/core';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-kitchen-filter',
  templateUrl: './kitchen-filter.component.html',
  styleUrls: ['./kitchen-filter.component.scss']
})
export class KitchenFilterComponent {
  kitchens: any = ['all', 'italian', 'american', 'oriental', 'japanese', 'thai', 'chinese'];

  constructor(private kitchenChoice: FilterService) {

  }
  

  /**
   * you can filter the restaurants by kitchen category
   * 
   * @param k string
   */
  changeKitchen(k: string) {
    this.kitchenChoice.changeKitchenFilterEvent(k)
  }

}
