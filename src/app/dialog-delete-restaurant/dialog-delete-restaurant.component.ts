import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-restaurant',
  templateUrl: './dialog-delete-restaurant.component.html',
  styleUrls: ['./dialog-delete-restaurant.component.scss']
})
export class DialogDeleteRestaurantComponent {
  constructor(private dialog: MatDialogRef<DialogDeleteRestaurantComponent>) { }

  deleteRestaurant() {
    this.dialog.close(true)
  }

  dontDeleteRestaurant() {
    this.dialog.close(false)
  }
}
