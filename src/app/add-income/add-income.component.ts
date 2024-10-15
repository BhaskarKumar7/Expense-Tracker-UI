import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NOTYF } from '../shared/utils/notyf.token';
import { AuthService } from '../services/auth.service';
import { NotyfNotification,Notyf } from 'notyf';
import { CategoriesRequest } from '../types/CategoriesRequest';
import { IncomeRequest } from '../types/IncomeRequest';
import { BankAccountRequest } from '../types/BankAccountRequest';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css']
})
export class AddIncomeComponent implements OnInit {

  constructor(
        private apiService : ApiService,
        @Inject(NOTYF) private notyf : Notyf,
        
  ) { }

   incomeRequest : IncomeRequest = new IncomeRequest();
   bankAccList : BankAccountRequest [] = [];
   categoriesList : CategoriesRequest [] = [];

  ngOnInit(): void {
    this.loadBankAccounts();
    this.loadCategories();
  }

  loadBankAccounts() : void {
    this.apiService.callFetchAllUserBankAccountsApi().subscribe({
      next: (data : BankAccountRequest[]) => {
        this.bankAccList = [{
          bankAccountId : 0,
          bankId : 0,
          accountNo : '',
          accountType : '',
          balance :  0,
          userId: 0,
          bankName : '---- SELECT BANK ACCOUNT --- '
        }, ...data];
      },
      error: (error: any) => {
        console.log('error fecthing bank accounts  ',error);
      }
    });
  }

  loadCategories() : void {
    this.apiService.callFetchIncomeCategoriesApi().subscribe({
      next : (data : CategoriesRequest[]) => {
        this.categoriesList = [{
          categoryId : 0,
          categoryName : '---- SELECT CATEGORY ----'
        }, ...data];
      },
      error:(err : any) => {
        console.error("error fetching categories list", err);
      }
    });
  }

  registerIncome(incomeForm : any) {
    this.apiService.callAddIncomeApi(this.incomeRequest).subscribe({
      next: response => {
        console.log(response.message,response.statusCode);
        this.notyf.success({
          message: response.message
        });
          incomeForm.reset();
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
