import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  logOrSign: string = "";
  email: string = "";
  password: string = "";

  constructor(private route: ActivatedRoute, private router: Router, private firebase: FirebaseService) {

  }

  ngOnInit(): void {
    let obj = JSON.parse(this.route.snapshot.paramMap.get('my_object'));
    this.logOrSign = obj.type;
  }

  onSubmit() {
    if (this.logOrSign == 'Log in')
      this.firebase.signIn(this.email, this.password)
    else
      this.firebase.signUp (this.email, this.password)
  }

}