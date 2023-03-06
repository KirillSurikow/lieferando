import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-restaurant-condition',
  templateUrl: './restaurant-condition.component.html',
  styleUrls: ['./restaurant-condition.component.scss'],
  providers: [
    DataService
  ]
})
export class RestaurantConditionComponent implements OnInit {
  name: string = "";
  backgroundImg: string = "";
  category: string = "";
  logoImg: string = "";

  constructor(private data: DataService) {

  }

  ngOnInit(): void {
    this.data.savedData.subscribe((description : any) => {
      console.log(description)
    })
  }
}
