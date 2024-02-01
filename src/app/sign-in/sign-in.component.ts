// sign-in.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async signIn(): Promise<void> {
    try {
      await this.authService.signIn(this.email, this.password);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Sign-in error:', error);
      alert('Sign-in failed. Check credentials.');
    }
  }

  ngOnInit(): void {
  }
}
