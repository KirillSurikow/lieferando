import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { FilterService } from './services/filter.service';
import { ViewportScroller } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    FilterService
  ]
})
export class AppComponent {
  address: string = "Niederstr. 70, 47829 Krefeld";
  delivery: boolean = true;
  pickUp: boolean = false;
  kitchens: any = ['all', 'italian', 'american', 'oriental', 'japanese', 'thai', 'chinese'];
  lang: string = './../assets/img/languages/united-kingdom.png';
  scrolled: boolean = false;
  doActive: boolean = true;
  kitActive: boolean = true;

  constructor(public dialog: MatDialog, private kitchenChoice: FilterService, private scroller: ViewportScroller) { }

  @HostListener('window: scroll', ['$event']) onScrollEvent($event: any) {
    const currPosition = this.scroller.getScrollPosition();
    if (currPosition[1] > 360) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }
  }

  deliver() {
    this.delivery = true;
    this.pickUp = false;
  }

  pickUpFkt() {
    this.delivery = false;
    this.pickUp = true;
  }

  changeKitchen(k: string) {
    this.kitchenChoice.changeKitchenFilterEvent(k)
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

    const sub = dialogRef.componentInstance.changeHeader.subscribe(() => {
      this.doActive = false;
      this.kitActive = false;
    });
  }

  resetHeader() {
    this.doActive = true;
    this.kitActive = true;

    console.log(this.doActive, this.kitActive)
  }
}
