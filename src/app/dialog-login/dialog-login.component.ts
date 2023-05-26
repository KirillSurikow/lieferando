import { Component, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DirectionService } from '../services/direction-service';


@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss']
})
export class DialogLoginComponent {
  

  constructor(
    public dialogRef: MatDialogRef<DialogLoginComponent>,
    private router: Router, private direction : DirectionService
  ) { }

  closeDialog() {
    this.dialogRef.close();
  }

  goToRegistration(value: string) {
    this.dialogRef.close();
    this.router.navigate(['/registration', { my_object: JSON.stringify({type : value}) }]);
  }

}
