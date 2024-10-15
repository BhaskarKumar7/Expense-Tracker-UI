import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NOTYF } from '../shared/utils/notyf.token';
import { NotyfNotification,Notyf } from 'notyf';
import { BankAccountRequest } from '../types/BankAccountRequest';
import { ExpenseListRequest } from '../types/ExpenseListRequest';
import { ExpenseRequest } from '../types/ExpenseRequest';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit {

  @ViewChild('datePicker',{static: true}) datePicker!: ElementRef;

  constructor(
    private apiService: ApiService, @Inject(NOTYF) private notyf: Notyf

  ) { }

  bankAccList : BankAccountRequest[] = [];
  expenseListRequest: ExpenseListRequest = new ExpenseListRequest();
  expenseList: ExpenseRequest[] = [];
  ngOnInit(): void {
    this.initFlatpickr();
    this.loadBankAccounts();
  }

  initFlatpickr() {
    flatpickr(this.datePicker.nativeElement,{
      mode: 'range', //for range selection
      dateFormat: 'Y-m-d',
      onChange: (selectedDates: Date[], dateStr: string) => {
        if(selectedDates.length === 2) {
          this.expenseListRequest.startDate = selectedDates[0].toISOString().split('T')[0]; // converting to YYYY-MM-DD 
          this.expenseListRequest.endDate = selectedDates[1].toISOString().split('T')[0];
        }
        console.log('Selected Dates:', selectedDates, 'Date String:', dateStr);
        console.log('start date ----> ', this.expenseListRequest.startDate);
        console.log('end date ---->', this.expenseListRequest.endDate);

      }
    });
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

  loadExpenseList(expenseListFrm : any) {
    this.apiService.callExpenseListApi(this.expenseListRequest).subscribe({
      next: response => {
        this.expenseList = response;
        console.log(this.expenseList);
        expenseListFrm.reset();
      }
      ,
      error: (error : any) => {
        console.log(error);
      }
    });
  }

}
