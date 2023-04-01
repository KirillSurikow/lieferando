import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Firestore, addDoc, } from '@angular/fire/firestore';
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

  publishIdEmitter = new EventEmitter<string>();

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
          userData: {}
        };
        this.uploadNewUser(userData);
      })
      .catch(err => {
        console.log(err)
      })
  }

  enterBackoffice() {
    this.router.navigate(['/backoffice', this.userId]);
    localStorage.setItem('userId', this.userId)
  }

  async uploadNewUser(userData: object) {
    await setDoc(doc(this.firestore, 'users', this.userId), userData);
    this.enterBackoffice();
  }

  async uploadChange(id: string, change: object) {
    setDoc(doc(this.firestore, 'users', id), change, { merge: true });
  }

  async updateRestColl(id: string, change: object) {
    setDoc(doc(this.firestore, 'restaurants', id), change, { merge: true });
  }

  async publishChange(restaurant: object) {
    let docRef = await addDoc(collection(this.firestore, "restaurants"), restaurant)
    this.publishIdEmitter.emit(docRef.id)
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
