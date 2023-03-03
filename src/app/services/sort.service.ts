import { Injectable } from "@angular/core";
import { Restaurant } from "src/models/restaurant.class";
import { Restaurants } from "src/models/restaurants.class";

@Injectable({
    providedIn: 'root'
})

export class SortService {
    sortedRestaurant: Restaurant[] = [];

    constructor(private restData: Restaurants) {

    }

    onRating(): void {
        this.sortedRestaurant = this.restData.allRestaurants.sort(this.sortByRating)
    }
    onMinOrder(): void {
        this.sortedRestaurant = this.restData.allRestaurants.sort(this.sortByMinOrder)
    }
    onDeliveryTime(): void {
        this.sortedRestaurant = this.restData.allRestaurants.sort(this.sortByDeliveryTime)
    }

    onDeliveryCost(): void {
        this.sortedRestaurant = this.restData.allRestaurants.sort(this.sortByDeliveryCost)
    }

    sortByRating(a: Restaurant, b: Restaurant): number {
        // try {

            if (a.rating < b.rating) {
                return -1
            }
            if (a.rating > b.rating) {
                return 1
            }
        //     if (a.rating == b.rating) {
        //         return -1
        //     }
        // } catch (error) {

        // }

    }

    sortByMinOrder(a: Restaurant, b: Restaurant): number  {
        if (a.rating < b.rating) {
            return 1
        }
        if (a.rating > b.rating) {
            return -1
        }
    }

    sortByDeliveryTime(a: Restaurant, b: Restaurant): number {
        if (a.rating < b.rating) {
            return 1
        }
        if (a.rating > b.rating) {
            return -1
        }
    }

    sortByDeliveryCost(a: Restaurant, b: Restaurant): number {
        if (a.rating < b.rating) {
            return 1
        }
        if (a.rating > b.rating) {
            return -1
        }
    }
}