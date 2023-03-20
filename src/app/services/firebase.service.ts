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

  constructor(public auth: AngularFireAuth, private firestore: Firestore, private router: Router, private gfs: FirestoreService) { }

  async signIn(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.userId = res.user.multiFactor['user']['uid'];
        this.reEnterBackoffice()
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

  async reEnterBackoffice() {
    let response = await this.gfs.getUser(this.userId);
    console.log(response)

  }

  enterBackoffice(value1: string) {
    let id = this.returnJSON(value1);
    this.router.navigate(['/backoffice', id]);
  }

  returnJSON(value1: string) {
    return JSON.stringify({
      databaseID: value1,
      userID: this.newUser.userId
    })
  }

  uploadNewUser() {
    let coll = collection(this.firestore, 'users');
    setDoc(doc(coll), this.newUser)
    let databaseID = this.gfs.getUser(this.userId)
    console.log(databaseID)
  }

  logOut() {
    this.isLoggedIn = false;
    localStorage.removeItem('user')
  }
}
