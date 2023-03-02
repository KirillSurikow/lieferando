import { Component } from '@angular/core';
import { FilterService } from './../services/filter.service';

@Component({
  selector: 'app-rating-and-amount',
  templateUrl: './rating-and-amount.component.html',
  styleUrls: ['./rating-and-amount.component.scss']
})
export class RatingAndAmountComponent {
  choiceAmount: number = 1000;
  currentRate : number = 1;

  orderAmount: any = [
    {
      'id': 1,
      'label': 'show all',
      'value': 1000,
    },
    {
      'id': 2,
      'label': '10,00€ or less',
      'value': 10,
    },
    {
      'id': 3,
      'label': '15,00€ or less',
      'value': 15,
    },
    {
      'id': 4,
      'label': '20,00€ or less',
      'value': 20,
    },
  ];

  constructor(private filter : FilterService){

  }

  changeOrderAmount(a : number){
    this.filter.changeOrderAmountFilterEvent(a);
  }

  changeRating(r : number){
    this.filter.changeRatingFilterEvent(r);
  }

}
