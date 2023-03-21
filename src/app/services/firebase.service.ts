import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { collection, doc, setDoc } from 'firebase/firestore';
import { FirestoreService } from '../services/firestore.service';
import { Firestore, collectionData, } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLoggedIn = false;
  databaseId = ""
  userId = "";
  newUser: any;

  constructor(public auth: AngularFireAuth, private firestore: Firestore, private router: Router, private gfs: FirestoreService) {
    this.gfs.databaseIDEmitter.subscribe((response)=>{
      this.databaseId = response
    })
   }

  async signIn(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.userId = res.user.multiFactor['user']['uid'];
        this.gfs.getUser(this.userId);
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
        this.newUser = {
          userId: this.userId,
          data: {}
        }
        this.uploadNewUser();
      })
      .catch(err => {
        console.log(err)
      })
  }

  enterBackoffice() {
    let id = this.returnJSON();
    this.router.navigate(['/backoffice', id]);
  }

  returnJSON() {
    return JSON.stringify({
      databaseID: this.databaseId,
      userID: this.newUser.userId
    })
  }

  async uploadNewUser() {
    let coll = collection(this.firestore, 'users');
    setDoc(doc(coll), this.newUser);
    await this.gfs.getUser(this.userId);
    this.enterBackoffice();
  }

  logOut() {
    this.isLoggedIn = false;
    localStorage.removeItem('user')
  }
}
