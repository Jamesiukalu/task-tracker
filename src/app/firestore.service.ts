import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  getTasks(userId: string): Observable<any[]> {
    return this.firestore.collection(`users/${userId}/tasks`).valueChanges();
  }

  addTask(userId: string, task: any): Promise<void> {
    return this.firestore.collection(`users/${userId}/tasks`).add(task);
  }

  // Add other Firestore operations as needed
}
