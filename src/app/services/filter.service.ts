import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class FilterService {
    kitchenFilterEmitter = new EventEmitter<string>();
    ratingFilterEmitter = new EventEmitter<number>();
    orderAmountFilterEmitter = new EventEmitter<number>();
    searchFilterEmitter = new EventEmitter<string>();
    sortByEmitter = new EventEmitter<string>();

    changeKitchenFilterEvent(k: string) {
        this.kitchenFilterEmitter.emit(k) 
    }

    changeRatingFilterEvent(r : number){
        this.ratingFilterEmitter.emit(r)
    }

    changeOrderAmountFilterEvent(a : number){
        this.orderAmountFilterEmitter.emit(a)
    }

    searchForRestaurant(s : string){
        this.searchFilterEmitter.emit(s)
    }

    changeSortBy(sb : string){
        this.sortByEmitter.emit(sb)
    }

}