import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {

  direction = 'forward';
  directionEmitter = new EventEmitter<string>();

  constructor() { }
  
  onChangeDirection(){
    this.direction = 'backward';
    this.directionEmitter.emit(this.direction);
  }
}
