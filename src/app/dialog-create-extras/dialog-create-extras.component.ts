import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-create-extras',
  templateUrl: './dialog-create-extras.component.html',
  styleUrls: ['./dialog-create-extras.component.scss']
})
export class DialogCreateExtrasComponent implements OnInit {
  currentCategory: object;
  allExtras = [];
  categoryName: string;
  newExtraName: string;
  newExtraPrice: number;
  index : number;

  constructor(private curr: CurrencyService, private dialog : MatDialogRef<DialogCreateExtrasComponent>) {

  }


  ngOnInit(): void {
     this.organizingLayout();
  }

  organizingLayout(){
    this.categoryName = this.currentCategory['categorykey']
    this.allExtras = this.currentCategory['categoryItem'][0]['dishExtras']
  }

  createExtra() {
    let item = {
      extraName: this.newExtraName,
      extraPrice: this.newExtraPrice,
      extraPriceString: this.curr.returnCurrency(this.newExtraPrice),
      picked : false,
    }
    this.allExtras.unshift(item)
    this.newExtraName = "";
    this.newExtraPrice = null;
  }

  deleteExtra(i : number) {
    this.allExtras.splice(i, 1);
  }

  close(){
     this.dialog.close();
  }

  saveExtras(){;
    this.dialog.close([this.allExtras, this.index]);
  }
}
