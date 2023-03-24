import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { collection, doc, DocumentData, DocumentReference, setDoc } from 'firebase/firestore';
import { Firestore, collectionData, getDoc, docData, } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLoggedIn = false;
  userId = "";
  newUser: any;
  userData: any;
  userDataObservable = new Observable((subscriber) => {
    subscriber.next(this.userData)
  });

  // observer = {
  //   next: (value) => {
  //     console.log(value)
  //   }
  // }
  // userDataEmitter = new EventEmitter()

  constructor(public auth: AngularFireAuth, private firestore: Firestore, private router: Router) {

  }

  async signIn(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.userId = res.user.multiFactor['user']['uid'];
        this.enterBackoffice()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async signUp(email: string, password: string) {
    await this.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.userId = res.user.multiFactor['user']['uid'];
        let userData = {
          myRestaurants: []
        };
        this.uploadNewUser(userData);
      })
      .catch(err => {
        console.log(err)
      })
  }

  enterBackoffice() {
    this.router.navigate(['/backoffice', this.userId]);
    localStorage.setItem('userId',this.userId )
  }

  async uploadNewUser(userData: object) {
    console.log(userData)
    await setDoc(doc(this.firestore, 'users', this.userId), userData);
    this.enterBackoffice();
  }

  async uploadChange(id : string, change: object) {
    setDoc(doc(this.firestore, 'users', id), change, { merge: true });
  }

  logOut() {
    this.isLoggedIn = false;
    localStorage.removeItem('user')
  }

  // getUserData(userID: string) {
  //   const docRef = doc(this.firestore, 'users', userID);
  //   docData(docRef).subscribe(user => {

  //   })



  //  const observer = {
  //     next: (value) => {
  //       console.log(value)
  //     }
  //   }
  // }
}
