import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

// @Injectable({
//     providedIn: 'root'
// })

export class DataService{
   savedData = new Subject<object>();
    
   transferData(description : object){
       this.savedData.next(description)
   }

   getData(): Observable<object> {
    return this.savedData.asObservable();
}

}