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

  signIn(): void {
    this.authService.signIn(this.email, this.password)
      .then(() => {
        this.authService.isAuthenticated().subscribe((authenticated) => {
          if (authenticated) {
            this.router.navigate(['/home']);
          } else {
            alert('Sign-in failed. Check credentials.');
          }
        });
      })
      .catch((error) => {
        console.error('Sign-in error:', error);
        alert('Sign-in failed. Check credentials.');
      });
  }


  ngOnInit(): void {
  }

}
