import {  AfterViewInit, Component, OnInit } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit, AfterViewInit {
  restaurantId: string;
  restaurant: any;
  name: string;
  backgroundImg: string;
  logoImg: string;
  rating: number;
  minOrderString: string;
  deliveryTime: number;
  deliveryCostString: string;
  menu: Array<object>;
  categoryElements: any;
  adaptPanel: boolean = false;
  observer = new IntersectionObserver(entries => {
    console.log(entries)
  })

  constructor(private route: ActivatedRoute, private gfs: Firestore,) {
    this.registerMenu();
  }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('id');
    this.getRestaurantData(this.restaurantId);
    this.installreszizeListener();
  }

  ngAfterViewInit(): void {
    this.registerMenu();
  }

  registerMenu() {
    this.categoryElements = document.querySelectorAll('.categoryBox');
    console.log(this.categoryElements)
  }

  installreszizeListener() {
    let staticPanel = document.getElementById('staticPanel');
    let shiftPanel = document.getElementById('shiftPanel')
    window.addEventListener('resize', () => {
      if (shiftPanel.clientWidth >= staticPanel.clientWidth) {
        this.adaptPanel = true;
      } else {
        this.adaptPanel = false;
      }
    })
  }


  async getRestaurantData(id: string) {
    const docRef = doc(this.gfs, 'restaurants', id);
    const docSnap = await getDoc(docRef);
    this.restaurant = docSnap.data();
    this.assignData();
  }

  assignData() {
    this.name = this.restaurant.name;
    this.backgroundImg = this.restaurant.backgroundImg;
    this.logoImg = this.restaurant.logoImg;
    this.rating = this.restaurant.rating;
    this.menu = this.restaurant.menu;
    this.minOrderString = this.restaurant.minOrderString;
    this.deliveryTime = this.restaurant.deliveryTime;
    this.deliveryCostString = this.restaurant.deliveryCostString;
  }
}
