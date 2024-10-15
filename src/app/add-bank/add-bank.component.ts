import { Component, Inject, OnInit } from '@angular/core';
import { NOTYF } from '../shared/utils/notyf.token';
import { NotyfNotification,Notyf } from 'notyf';
import { BankAccountRequest } from '../types/BankAccountRequest';
import { ApiService } from '../services/api.service';
import { Bank } from '../types/Bank';
import { error } from 'console';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.css']
})
export class AddBankComponent implements OnInit {

  constructor(private apiService : ApiService, 
    @Inject(NOTYF) private notyf : Notyf, 
    private authService: AuthService) { }

  bankAccountRequest : BankAccountRequest = new BankAccountRequest();

  bankArray : Bank [] = [];
  accountTypes: string[] = [];
  ngOnInit(): void {
   this.loadBanks();
   this.loadAccountTypes();
  }

  loadBanks(): void {
    this.apiService.callFecthAllBanksApi().subscribe({
      next: (data: Bank[]) => {
        this.bankArray = [{
            bankId : 0,
            bankName : '--- SELECT BANK ---',
            bankAddrsId : 0
        }, ...data];
      },
      error: (error: any) => {
        console.error('Error fetching the banks', error);
      }
    });
  }
  
  loadAccountTypes(): void {
    this.apiService.callFetchAllAccountTypesApi().subscribe({
      next: (data: string[]) => {
        this.accountTypes = ['---- SELECT ACCOUNT TYPE ----',...data];
      },
      error: (error: any) => {
        console.error('Error fetching bank account types', error);
      },
    });
  }


  registerBankAccount(bankAccFrm: any) {
    const userId = this.authService.getUserId();
    console.log('user id : ' + userId);
    if (userId) {
      this.bankAccountRequest.userId = Number(userId);
    } else {
        console.error('user id is null');
    }
    this.apiService.callRegisterBankAccountApi(this.bankAccountRequest).subscribe({
      next: response => {
        console.log(response.message,response.statusCode);
        this.notyf.success({
          message: response.message
        });
        bankAccFrm.reset();
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
