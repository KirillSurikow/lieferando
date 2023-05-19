import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {


  hideEmitter = new EventEmitter<boolean>();
  closeSearchEmitte = new EventEmitter<boolean>();
  closeFilterEmitter = new EventEmitter<boolean>();

  constructor() { }
  
  hide(){
    this.hideEmitter.emit(false);
  }

  closeSearch(){
    this.closeSearchEmitte.emit(false);
  }

  closeFilter(){
    this.closeFilterEmitter.emit(false);
  }
}
