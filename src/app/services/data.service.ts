import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class DataService{
    savedData = new EventEmitter<any>();

    emitData(data : any){
        this.savedData.emit(data)
    }
}