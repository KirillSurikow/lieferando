import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {

  registrationEmitter = new EventEmitter<boolean>();
  hideEmitter = new EventEmitter<boolean>();
  closeSearchEmitte = new EventEmitter<boolean>();
  closeFilterEmitter = new EventEmitter<boolean>();
  closeBaketEmitter = new EventEmitter<any>();

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

  changeHeader(status){
    this.registrationEmitter.emit(status)
  }

  closeRespBasket(){
    this.closeBaketEmitter.emit()
  }

  
}
