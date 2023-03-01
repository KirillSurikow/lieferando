import { EventEmitter, Injectable } from "@angular/core";

@Injectable()
export class FilterService {
    filterEmitter = new EventEmitter<string>()

    changeFilterEvent(k: string) {
        this.filterEmitter.emit(k) 
    }

}