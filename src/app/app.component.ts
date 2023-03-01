import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { FilterService } from './services/filter.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers :[
    FilterService
  ]
})
export class AppComponent {
  address: string = "Niederstr. 70, 47829 Krefeld";
  delivery: boolean = true;
  pickUp: boolean = false;
  kitchens: any = ['all', 'italian', 'american', 'oriental', 'japanese', 'thai', 'chinese'];
  lang: string = './../assets/img/languages/united-kingdom.png';

  constructor(public dialog: MatDialog, private kitchenChoice : FilterService) { }

  deliver() {
    this.delivery = true;
    this.pickUp = false;
  }

  pickUpFkt() {
    this.delivery = false;
    this.pickUp = true;
  }

  changeKitchen(k : string) {
      this.kitchenChoice.changeFilterEvent(k)
  }

  changeLanguage(lang: string) {
    if (lang == 'english') {
      this.lang = './../assets/img/languages/united-kingdom.png';
    } else {
      this.lang = './../assets/img/languages/germany.png';
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogLoginComponent, {
      width: '600px',
      height: '210px'
    });
  }
}
