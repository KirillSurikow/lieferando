import { Component, } from '@angular/core';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-restaurant-description',
  templateUrl: './restaurant-description.component.html',
  styleUrls: ['./restaurant-description.component.scss'],

})
export class RestaurantDescriptionComponent {
  name: string = "";
  backgroundImg: string = "";
  category: string = "";
  logoImg: string = "";

  constructor(private data : DataService){

  }

  saveData() {
    let description = {
      'name': this.name,
      'category' : this.category,
      'logo' : this.logoImg,
      'img' : this.backgroundImg
    }
   
    this.data.transferData(description)
  }
}
