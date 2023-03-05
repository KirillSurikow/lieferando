import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-scroll-top-button',
  templateUrl: './scroll-top-button.component.html',
  styleUrls: ['./scroll-top-button.component.scss']
})
export class ScrollTopButtonComponent {
  constructor(private scroller : ViewportScroller){

  }

  goToTop() {
    this.scroller.scrollToPosition([0,0])
  }
}
