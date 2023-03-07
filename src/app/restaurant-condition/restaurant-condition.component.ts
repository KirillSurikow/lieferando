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

  constructor(private data: DataService) {

  }

  ngOnInit(): void {
    this.data.getData().subscribe((description : Observable<object>) => {
      console.log(description)
    })
  }
}
