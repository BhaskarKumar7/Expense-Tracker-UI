import { Component, Inject, OnInit } from '@angular/core';
import { RegistrationRequest } from '../types/RegistrationRequest';
import { UserAddress } from '../types/UserAddress';
import { ApiService } from '../services/api.service';
import { NotyfNotification,Notyf } from 'notyf';
import { NOTYF } from 'src/app/shared/utils/notyf.token';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private apiService: ApiService, @Inject(NOTYF) private notyf : Notyf, private router: Router) { }

  registrationRequest : RegistrationRequest = new RegistrationRequest();
  userAddress : UserAddress = new UserAddress();

  ngOnInit(): void {
  }

  registerTheUser() {
    this.registrationRequest.userAddress = this.userAddress;
    this.apiService.callRegisterUserApi(this.registrationRequest).subscribe({
      next: response => {
        console.log(response.message,response.statusCode);
        this.notyf.success({
          message: response.message
        });
        //registerUserForm.resetForm(); //form reset
        this.router.navigate(['/dashboard'])
      },
      error: error => {
        console.error(error);
        this.notyf.error({
          message: error.error.message
        });
      }
    });
  }
}
