import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogCustomizeDishComponent } from '../dialog-customize-dish/dialog-customize-dish.component';
import { OrderService } from '../services/order.service';

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
  minOrder: number;
  minOrderString: string;
  deliveryTime: number;
  deliveryCost: number;
  deliveryCostString: string;
  menu: Array<object>;
  adaptPanel: boolean = false;
  categoryBoxes: HTMLElement[] = [];
  observer: IntersectionObserver | undefined;
  currentCategory: string;
  categoryInterface: boolean = true;
  searchInterface: boolean = false;
  search: string = "";

  @ViewChildren('categoryBox') categoryBoxesRes: QueryList<ElementRef>;

  constructor(private route: ActivatedRoute,
    private gfs: Firestore,
    private dialog: MatDialog,
    private order : OrderService ) {
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
        if (entry.isIntersecting) {
          this.currentCategory = entry.target.id;
        }
      })
    },
      {
        rootMargin: '-250px'
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
    this.deliveryCost = this.restaurant.deliveryCost;
    this.minOrder = this.restaurant.minOrder;
    console.log(this.menu[0]['categoryItem'][0]['dishExtras'])
  }

  scrollTo(id: string) {
    let element = document.getElementById(id);
    element.scrollIntoView(true)
  }

  switchToSearch() {
    this.categoryInterface = false;
    this.searchInterface = true;
  }

  cancelSearch() {
    this.categoryInterface = true;
    this.searchInterface = false;
    this.search = "";
  }

  includesSearch(dish: any) {
    if (dish.dishName.includes(this.search)) {
      return false;
    } else if (dish.dishDescribtion.includes(this.search))
      return false;
    else
      return true;
  }

  pickDish(dish: object) {
    if (dish['dishExtras'].length > 0 || dish['portionPrices'].length > 0) {
      this.openCustomizeDialog(dish);
    } else {
      this.placeOrder(dish);
    }
  }

  placeOrder(dish: any) {
    let order = {
      'dishName': dish.dishName,
      'dishExtras': dish.dishExtras,
      'portion': "",
      'amount': 1,
      'singlePrice': dish.dishPrice,
      'priceForOrder': dish.dishPrice,
      'priceForOrderString': dish.dishPriceAsString,
      'multiplePortions' : dish.multiplePortions,
      'minOrder': this.minOrder,
      'minOrderString': this.minOrderString,
      'deliveryCost': this.deliveryCost,
      'deliveryCostString': this.deliveryCostString,
      'deliveryTime': this.deliveryTime,
    }
    this.order.placeOrder([order , false]);
  }

  openCustomizeDialog(dish) {
    const dialogRef = this.dialog.open(DialogCustomizeDishComponent, {
      width: '600px'
    })
    console.log(dish.dishExtras)
    dialogRef.componentInstance.dish = dish;
    dialogRef.componentInstance.changingOrder = false;
  }
}
