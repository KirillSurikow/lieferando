import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLoggedIn = false;
  newUser : object;

  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) { }

  async signIn(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user))
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async signUp(email: string, password: string) {
    await this.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.newUser = {
          userId: res.user.multiFactor['user']['uid']
        }
        // let userId = res.user.multiFactor['user']['uid'];
        this.uploadNewUser(); 
      })
      .catch(err => {
        console.log(err)
      })
  }

  enterBackoffice(value1: string) {
    let id = this.returnJSON(value1 )
    this.router.navigate(['/backoffice', id])
  }

  returnJSON(value1 :string){
    return JSON.stringify({
      databaseID : value1,
      userID : this.newUser['userID']
    })
  }

  uploadNewUser() {
    this
      .firestore
      .collection('users')
      .add(this.newUser)
      .then(res =>{
         let databaseId = res.id
         this.enterBackoffice( databaseId )
      })
      
  }

  logOut() {
    this.isLoggedIn = false;
    localStorage.removeItem('user')
  }
}
