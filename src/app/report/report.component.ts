import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import flatpickr from 'flatpickr';
import { BankAccountRequest } from '../types/BankAccountRequest';
import { ApiService } from '../services/api.service';
import { IncomeRequest } from '../types/IncomeRequest';
import { ExpenseRequest } from '../types/ExpenseRequest';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @ViewChild('datePicker',{static: true}) datePicker!: ElementRef;
  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.loadBankAccounts();
    this.initFlatpickr();
  }
  startDate: string = '';
  endDate: string = '';
  bankAccountId: number = 0;
  btnContent: string = 'Show report';
  isBtnDisabled: boolean = false;
  bankAccList : BankAccountRequest [] = [];
  incomeList: IncomeRequest[] = [];
  expenseList: ExpenseRequest[] = [];
  netIncome: number = 0;
  totalExpense: number = 0;
  totalIncome: number = 0;

  loadReport() : void {
    const reportRequest = {
      'startDate' : this.startDate,
      'endDate' : this.endDate,
      'bankAccountId' : this.bankAccountId
    }
    console.log(reportRequest);
    this.btnContent = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      <span role="status">Loading...</span>`;
    this.isBtnDisabled = true;
  this.apiService.callIncomeExpenseReportApi(reportRequest).subscribe({
    next: resp => {
      this.expenseList = resp.expenseList;
      this.incomeList = resp.incomeList;
      this.totalExpense = resp.totalExpense;
      this.totalIncome = resp.totalIncome;
      this.netIncome = resp.netIncome;
      this.btnContent = 'Show report';
      this.isBtnDisabled = false;
    },
    error:resp => {
      console.log(resp);
      this.btnContent = 'Show report';
      this.isBtnDisabled = false;
    }
  });
  }

  initFlatpickr() {
    flatpickr(this.datePicker.nativeElement,{
      mode: 'range', //for range selection
      dateFormat: 'Y-m-d',
      onChange: (selectedDates: Date[], dateStr: string) => {
        if(selectedDates.length === 2) {
          this.startDate = selectedDates[0].toISOString().split('T')[0]; // converting to YYYY-MM-DD 
          this.endDate = selectedDates[1].toISOString().split('T')[0];
        }
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
}
