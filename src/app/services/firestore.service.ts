import { Injectable } from '@angular/core';
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Firestore } from '@angular/fire/firestore';




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
  constructor(private db  : Firestore) { }

  async getUser(id: string) {
    const q = query(collection(db, "users"), where("userId", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // console.log({
      //   databaseID: doc.id
      // })
      return {
          databaseID: doc.id
        }
    });
  }
}
