import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-restaurant-condition',
  templateUrl: './restaurant-condition.component.html',
  styleUrls: ['./restaurant-condition.component.scss'],

})
export class RestaurantConditionComponent implements OnInit {
  obj: object;
  name: string = "";
  backgroundImg: string = "";
  category: string = "";
  logoImg: string = "";
  rating: number;
  deliveryCost: number;
  deliveryTime: number;
  minOrder: number;


  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.obj = JSON.parse(this.route.snapshot.paramMap.get('my_object'));
    this.name = this.obj['name'];
    this.backgroundImg = this.obj['backgroundImg'];
    this.category = this.obj['category'];
    this.logoImg = this.obj['logoImg'];
  }

  saveData(){
    let decrAndCond = {
      'name': this.name,
      'backgroundImg': this.backgroundImg,
      'category' : this.category,
      'logoImg' : this.logoImg,
      'rating': this.rating,
      'deliveryCost': this.deliveryCost,
      'deliveryTime' : this.deliveryTime,
      'minOrder' : this.minOrder,

    }

    this.router.navigate(['/backoffice/:id/restaurantMenu', {my_object: JSON.stringify(decrAndCond)}]);
  }
}
