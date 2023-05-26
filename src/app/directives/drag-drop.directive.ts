import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {

  constructor() { }

  @Output() fileDropped = new EventEmitter();
  

  @HostListener('dragover', [`$event`]) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  @HostListener('drop', [`$event`]) onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    let files = evt.dataTransfer.files
    if (files) {
      this.fileDropped.emit(files)
    }
  }

  @HostListener('dragleave', [`$event`]) onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();

  }

}
