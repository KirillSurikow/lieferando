import { EventEmitter, Injectable } from '@angular/core';
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';


const firebaseConfig = {
  projectId: 'lieferando-e3bf3',
  appId: '1:528209743114:web:211d690b8c4b5fe4993ef3',
  storageBucket: 'lieferando-e3bf3.appspot.com',
  apiKey: 'AIzaSyBz7gYY2AD4dfyD-GUXeYNq6l_Uy2svYKs',
  authDomain: 'lieferando-e3bf3.firebaseapp.com',
  messagingSenderId: '528209743114',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  databaseIDEmitter = new EventEmitter();
  dataEmitter = new EventEmitter();

  constructor(private db: Firestore , private firestore: AngularFirestore) { }

  async getUser(id: string) {
    const q = query(collection(db, "users"), where("userId", "==", id));

   let querySnapshot$ = await getDocs(q);
    querySnapshot$.forEach((doc) => {
      let databaseID = doc.id
      this.databaseIDEmitter.emit(databaseID)
    });
  }

  async getData(id : string){
      this
      .firestore
      .collection('users')
      .doc(id)
      .valueChanges()
      .subscribe(data =>{
          this.dataEmitter.emit(data)
      })
  }
}
