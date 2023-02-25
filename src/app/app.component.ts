import { Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  address: string = "Niederstr. 70, 47829 Krefeld";
  delivery: boolean = true;
  pickUp: boolean = false;
  kitchens : any = ['all', 'italian', 'american', 'oriental', 'japanese', 'thai', 'chinese'];
  kitchenFilter : string = "";

  deliver() {
    this.delivery = true;
    this.pickUp = false;
  }

  pickUpFkt() {
    this.delivery = false;
    this.pickUp = true;
  }

  showValue(k : string){
    this.kitchenFilter = k;
    console.log(this.kitchenFilter)
  }
}
