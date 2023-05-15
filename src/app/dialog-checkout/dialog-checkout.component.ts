import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-checkout',
  templateUrl: './dialog-checkout.component.html',
  styleUrls: ['./dialog-checkout.component.scss']
})
export class DialogCheckoutComponent implements OnInit {
  deliveryTime: number;

  constructor(private dialog: MatDialogRef<DialogCheckoutComponent>) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.dialog.close()
    }, 3000);
  }
}
