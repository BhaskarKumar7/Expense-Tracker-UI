import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../types/LoginRequest';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequest : LoginRequest = new LoginRequest();
  showError : boolean = false;
  errorMessage : String = 'invalid user name or password';
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
  }

  loginTheUser() {
    console.log(this.loginRequest);
    this.authService.login(this.loginRequest).subscribe({
      next: (response) => {
        //storing the token and userId
        this.authService.storeUserData(response.token, response.userId);
        //redirecting to dashboard
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        this.showError = true;
        console.error('Login Failed: ', err);
      }
    });
  }

}
