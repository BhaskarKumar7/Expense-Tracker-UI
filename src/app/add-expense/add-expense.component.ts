import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NOTYF } from '../shared/utils/notyf.token';
import { NotyfNotification,Notyf } from 'notyf';
import { ExpenseRequest } from '../types/ExpenseRequest';
import { CategoriesRequest } from '../types/CategoriesRequest';
import { BankAccountRequest } from '../types/BankAccountRequest';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  constructor(
          private apiService : ApiService,
          @Inject(NOTYF) private notyf : Notyf
  ) { }

  expenseRequest : ExpenseRequest = new ExpenseRequest();
  categoriesList : CategoriesRequest [] = [];
  bankAccList : BankAccountRequest [] = [];

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
        console.log('error fecthing bank accounts :',error);
      }
    });
  }

  loadCategories() : void {
    this.apiService.callFetchExpenseCategoriesApi().subscribe({
      next : (data : CategoriesRequest[]) => {
        this.categoriesList = [{
          categoryId : 0,
          categoryName : '---- SELECT CATEGORY ----'
        }, ...data];
      },
      error:(err : any) => {
        console.error("error fetching expense categories list :", err);
      }
    });
  }

  registerExpense(expenseForm : any) {
    this.apiService.callAddExpenseApi(this.expenseRequest).subscribe({
      next: response => {
        console.log(response.message,response.statusCode);
        this.notyf.success({
          message: response.message
        });
        expenseForm.reset();
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
