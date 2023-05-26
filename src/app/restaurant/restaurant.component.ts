import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogCustomizeDishComponent } from '../dialog-customize-dish/dialog-customize-dish.component';
import { OrderService } from '../services/order.service';
import { DirectionService } from '../services/direction-service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit, AfterViewInit {
  restaurantId: string;
  restaurant: any;
  name: string;
  backgroundImgURL: string;
  logoImgURL: string;
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
  distance: number = 0;
  basketFilled: boolean = false;
  respBasketVisible: boolean = false;

  @ViewChildren('categoryBox') categoryBoxesRes: QueryList<ElementRef>;

  constructor(private route: ActivatedRoute,
    private gfs: Firestore,
    private dialog: MatDialog,
    private order: OrderService,
    private direction: DirectionService) {
  }

  ngOnInit(): void {
    this.preparingRestaurantData();
    this.organizeLayout();
    this.installBasketButton();
    this.installCloseBasketSubscribtion();
  }

  ngAfterViewInit(): void {
    this.installObserver();
    this.registerMenu();
  }

  organizeLayout() {
    this.direction.changeHeader(false);
  }

  preparingRestaurantData() {
    this.restaurantId = this.route.snapshot.paramMap.get('id');
    this.getRestaurantData(this.restaurantId);
  }

  /**
   * if there are items in the basket, then a button to open the basket appears.(only in mobile)
   * 
   */
  installBasketButton() {
    this.order.buttonEmitter.subscribe((result) => {
      this.basketFilled = result;
    });
  }

  /**
   * Subscribtion if the basket is closed (only in mobile)
   * 
   */
  installCloseBasketSubscribtion() {
    this.direction.closeBaketEmitter.subscribe(() => {
      this.closeRespBasket();
    })
  }

  /**
   * all food categories of the menu are registered and passed to the intersection observer
   * 
   */
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

  /**
   * an intersecion observer is installed. Every time another foodcategory comes in the viewport, the appropriate index tab highlights
   * 
   */
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

  /**
   * downloads the restaurants data
   * 
   * @param id string
   */
  async getRestaurantData(id: string) {
    const docRef = doc(this.gfs, 'restaurants', id);
    const docSnap = await getDoc(docRef);
    this.restaurant = docSnap.data();
    this.assignData();
  }

  assignData() {
    this.name = this.restaurant.name;
    this.backgroundImgURL = this.restaurant.backgroundImgURL;
    this.logoImgURL = this.restaurant.logoImgURL;
    this.rating = this.restaurant.rating;
    this.menu = this.restaurant.menu;
    this.minOrderString = this.restaurant.minOrderString;
    this.deliveryTime = this.restaurant.deliveryTime;
    this.deliveryCostString = this.restaurant.deliveryCostString;
    this.deliveryCost = this.restaurant.deliveryCost;
    this.minOrder = this.restaurant.minOrder;
  }

  /**
   * by pressing on an index tab the corresponding section is scrolled in to the viewport
   * 
   * @param id string
   */
  scrollTo(id: string) {
    let element = document.getElementById(id);
    element.scrollIntoView(true)
  }

  /**
   * changing to search layout
   * 
   */
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

  /**
   * if the dish has no extras and just one portion, the dish is placed immediatly in the basket,
   *  otherwise an dialog to customize the dish is opened
   * 
   * @param dish object
   */
  pickDish(dish: object) {
    if (dish['dishExtras'].length > 0 || dish['portionPrices'].length > 0) {
      this.openCustomizeDialog(dish);
    } else {
      this.placeOrder(dish);
    }
  }

  /**
   * a json with the dish's data is prepared and transfered to the order service
   * 
   * @param dish object
   */
  placeOrder(dish: any) {
    let order = {
      'dishName': dish.dishName,
      'dishExtras': dish.dishExtras,
      'portion': "",
      'amount': 1,
      'singlePrice': dish.dishPrice,
      'priceForOrder': dish.dishPrice,
      'priceForOrderString': dish.dishPriceAsString,
      'multiplePortions': dish.multiplePortions,
      'minOrder': this.minOrder,
      'minOrderString': this.minOrderString,
      'deliveryCost': this.deliveryCost,
      'deliveryCostString': this.deliveryCostString,
      'deliveryTime': this.deliveryTime
    }
    this.order.placeOrder([order, false]);
  }

  /**
   * a dialog to customize the dish is opened
   * 
   * @param dish object
   */
  openCustomizeDialog(dish) {
    const dialogRef = this.dialog.open(DialogCustomizeDishComponent, {
      width: '600px'
    })
    dialogRef.componentInstance.dish = dish;
    dialogRef.componentInstance.changingOrder = false;
    dialogRef.componentInstance.minOrder = this.minOrder;
    dialogRef.componentInstance.minOrderString = this.minOrderString;
    dialogRef.componentInstance.deliveryCost = this.deliveryCost;
    dialogRef.componentInstance.deliveryCostString = this.deliveryCostString;
    dialogRef.componentInstance.deliveryTime = this.deliveryTime;
  }

  /**
   * the basket is opened (only mobile)
   * 
   */
  showBasket() {
    let body = document.body;
    body.style.overflowY = "hidden"
    let obj = document.getElementById('respBasket');
    obj.classList.remove('d-none');
    obj.classList.add('swipeIn')
  }

  closeRespBasket() {
    let body = document.body;
    body.style.overflowY = "auto"
    let obj = document.getElementById('respBasket');
    obj.classList.add('d-none');
    obj.classList.remove('swipeIn')
  }
}
