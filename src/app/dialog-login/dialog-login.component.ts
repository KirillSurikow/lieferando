import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss']
})
export class DialogLoginComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogLoginComponent>,
  ) { }

  closeDialog(){
    this.dialogRef.close()
  }

}
