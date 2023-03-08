import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-restaurant-condition',
  templateUrl: './restaurant-condition.component.html',
  styleUrls: ['./restaurant-condition.component.scss'],

})
export class RestaurantConditionComponent implements OnInit {
  name: string = "";
  backgroundImg: string = "";
  category: string = "";
  logoImg: string = "";
  subscription: Subscription;

  constructor(private data: DataService) {
   
  }

  ngOnInit(): void {
    let subscription =  this.data.getData().subscribe((description: any) => {
      if(description)
        console.log(description)
      })
  }
}
