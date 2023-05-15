import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {


  hideEmitter = new EventEmitter<boolean>();

  constructor() { }
  
  hide(){
    this.hideEmitter.emit(false);
  }
}
