import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { DirectionService } from '../services/direction-service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, DoCheck {
  logOrSign: string = "";
  email: string = "";
  password: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private firebase: FirebaseService, private direction : DirectionService) {

  }

  /**
   * switching between log in or sign up
   * 
   */
  ngOnInit(): void {
    let obj = JSON.parse(this.route.snapshot.paramMap.get('my_object'));
    this.logOrSign = obj.type;
    this.direction.changeHeader(false);
  }

  /**
   * switching between log in or sign up
   * 
   */
  ngDoCheck(): void {
    let obj = JSON.parse(this.route.snapshot.paramMap.get('my_object'));
    this.logOrSign = obj.type;
  }

  onSubmit() {
    if (this.logOrSign == 'Log in')
      this.firebase.signIn(this.email, this.password)
    else
      this.firebase.signUp(this.email, this.password)
  }

}
