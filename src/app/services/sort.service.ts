import { EventEmitter, Injectable } from "@angular/core";
import { Obj } from "@popperjs/core";
import { Restaurant } from "src/models/restaurant.class";
import { Restaurants } from "src/models/restaurants.class";

@Injectable({
    providedIn: 'root'
})

export class SortService {
    sortedRestaurant: Restaurant[] = [];
    orderByEmitter = new EventEmitter<Obj>();

    constructor(private restData: Restaurants) {

    }

    onRating(): void {
        this.sortedRestaurant = this.restData.allRestaurants.sort(this.sortByRating);
        this.changeSortBy();
    }
    onMinOrder(): void {
        this.sortedRestaurant = this.restData.allRestaurants.sort(this.sortByMinOrder);
        this.changeSortBy();
    }
    onDeliveryTime(): void {
        this.sortedRestaurant = this.restData.allRestaurants.sort(this.sortByDeliveryTime);
        this.changeSortBy();
    }

    onDeliveryCost(): void {
        this.sortedRestaurant = this.restData.allRestaurants.sort(this.sortByDeliveryCost);
        this.changeSortBy();
    }

    sortByRating(a: Restaurant, b: Restaurant): number {
            if (a.rating < b.rating) {
                return 1
            }
            if (a.rating > b.rating) {
                return -1
            }
            return 0;
    }

    sortByMinOrder(a: Restaurant, b: Restaurant): number  {
        if (a.minOrder < b.minOrder) {
            return -1
        }
        if (a.minOrder > b.minOrder) {
            return 1
        }
        return 0;
    }

    sortByDeliveryTime(a: Restaurant, b: Restaurant): number {
        if (a.deliveryTime < b.deliveryTime) {
            return -1
        }
        if (a.deliveryTime > b.deliveryTime) {
            return 1
        }
        return 0;
    }

    sortByDeliveryCost(a: Restaurant, b: Restaurant): number {
        if (a.deliveryTime < b.deliveryTime) {
            return 1
        }
        if (a.deliveryTime > b.deliveryTime) {
            return -1
        }
        return 0;
    }

    changeSortBy(){
        this.orderByEmitter.emit(this.sortedRestaurant)
    }
}