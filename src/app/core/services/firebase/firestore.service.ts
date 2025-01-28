import { inject, Injectable } from '@angular/core';
import { authState, User } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  DocumentData,
  FieldValue,
  Firestore,
  getDoc,
  or,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { SalleDataForm, waitingTable } from '../../models/model.ts/models';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  fs = inject(Firestore);
  SalleCollectionRef = 'SalleData';
  SalleDataCollectionRef = collection(this.fs, this.SalleCollectionRef);
  createID = (colName: string) => doc(collection(this.fs, colName)).id;
  setDataToFirestore(data: SalleDataForm<FieldValue>) {
    const collectionRef = collection(this.fs, this.SalleCollectionRef);
    const salleDocRef = doc(collectionRef, data.ownerID);
    return setDoc(salleDocRef, data, { merge: true });
  }
  getSalle(user: User) {
    const collectionRef = collection(this.fs, this.SalleCollectionRef);
    const querySalle = query(
      collectionRef,
      or(where('ownerID', '==', user.uid))
    );
    return collectionData(querySalle);
  }
  async SalleExist(SalleID: string) {
    const salleDocRef = doc(this.SalleDataCollectionRef, SalleID);
    const salleExist = await getDoc(salleDocRef);
    return salleExist.exists();
  }
  /// reservation function
  ReservationCollectionRef = 'Reservation';
  ReservationDataCollectionRef = collection(
    this.fs,
    this.ReservationCollectionRef
  );

  setReservationToFirestore(data: waitingTable) {
    const collectionRef = collection(this.fs, this.ReservationCollectionRef);
    const salleDocRef = doc(collectionRef, data.id);
    return setDoc(salleDocRef, data, { merge: true });
  }
  getReservation(SalleName: string) {
    const collectionRef = collection(this.fs, this.ReservationCollectionRef);
    const querySalle = query(
      collectionRef,
      or(where('salleName', '==', SalleName))
    );
    return collectionData(querySalle);
  }
  DeleteReservation(id: string) {
    const collectionRef = collection(this.fs, this.ReservationCollectionRef);
    const salleDocRef = doc(collectionRef, id);
    return deleteDoc(salleDocRef);
  }
}
