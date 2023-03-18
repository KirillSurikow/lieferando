import { Component, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss']
})
export class DialogLoginComponent {
  changeHeader = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogLoginComponent>,
    private router: Router
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }

  goToRegistration(value: string) {
    this.dialogRef.close();
    this.changeHeader.emit();
    this.router.navigate(['/registration', { my_object: JSON.stringify({type : value}) }]);
  }

}
