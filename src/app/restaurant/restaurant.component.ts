import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
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
  adaptPanel: boolean = false;
  categoryBoxes: HTMLElement[] = [];
  observer: IntersectionObserver | undefined;

  @ViewChildren('categoryBox') categoryBoxesRes: QueryList<ElementRef>;

  constructor(private route: ActivatedRoute, private gfs: Firestore,) {
    this.registerMenu();
  }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('id');
    this.getRestaurantData(this.restaurantId);
    this.installreszizeListener();
  }

  ngAfterViewInit(): void {
    this.installObserver();
    this.registerMenu();
  }

  registerMenu() {
    if (this.categoryBoxesRes) {
      this.categoryBoxesRes.changes.subscribe((a) => {
        let response = a._results;
        for (let i = 0; i < response.length; i++) {
          let element = response[i]['nativeElement'];
          this.observer.observe(element)
        }
      });
    }
  }

  installObserver() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        console.log(entry.target.getBoundingClientRect())
      })
    }
    )

  }

  installreszizeListener() {
    let staticPanel = document.getElementById('staticPanel');
    let shiftPanel = document.getElementById('shiftPanel');
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
