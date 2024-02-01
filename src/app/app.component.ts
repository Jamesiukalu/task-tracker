import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'task-tracker';
  constructor(private router: Router, private authService: AuthService) {}

  signOut(): void {
    // Call your authentication service signOut method
    this.authService.signOut();

    // Navigate to the sign-in page
    this.router.navigate(['/signin']); // Replace '/signin' with the actual route for your sign-in page
  }
}
