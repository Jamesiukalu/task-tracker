// auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState as Observable<User | null>;
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Sign-in successful');
    } catch (error) {
      console.error('Sign-in error:', error);
      throw error; // Rethrow the error for handling in the component
    }
  }

  async signOut(): Promise<void> {
    await this.afAuth.signOut();
  }

  isAuthenticated(): boolean {
    // Check if the user is authenticated
    // You might need to adjust this logic based on your specific authentication requirements
    return !!this.afAuth.currentUser;
  }
}
