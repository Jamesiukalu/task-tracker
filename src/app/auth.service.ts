// auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState as Observable<User | null>; // Explicitly cast the type
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Sign-in successful');
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  }

  async signOut(): Promise<void> {
    await this.afAuth.signOut();
  }

  isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(map((user) => !!user) // Convert user to boolean
    );
  }
}
