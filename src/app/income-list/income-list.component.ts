import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import flatpickr from 'flatpickr';
import { BankAccountRequest } from '../types/BankAccountRequest';
import { ApiService } from '../services/api.service';
import { NOTYF } from '../shared/utils/notyf.token';
import { NotyfNotification,Notyf } from 'notyf';
import { IncomeListRequest } from '../types/IncomeListRequest';
import { IncomeRequest } from '../types/IncomeRequest';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit {

  @ViewChild('datePicker',{static: true}) datePicker!: ElementRef;
  constructor(
    private apiService: ApiService, @Inject(NOTYF) private notyf: Notyf
  ) { }

  bankAccList : BankAccountRequest [] = [];
  incomeListRequest : IncomeListRequest = new IncomeListRequest();
  incomeList: IncomeRequest [] = [];

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
          this.incomeListRequest.startDate = selectedDates[0].toISOString().split('T')[0]; // converting to YYYY-MM-DD 
          this.incomeListRequest.endDate = selectedDates[1].toISOString().split('T')[0];
        }
        console.log('Selected Dates:', selectedDates, 'Date String:', dateStr);
        console.log('start date ----> ', this.incomeListRequest.startDate);
        console.log('end date ---->', this.incomeListRequest.endDate);

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

  loadIncomeList(incomeListFrm: any) {
    this.apiService.callIncomeListApi(this.incomeListRequest).subscribe({
      next: response => {
        this.incomeList = response;
        console.log(this.incomeList);
        incomeListFrm.reset();
      }
      ,
      error: (error : any) => {
        console.log(error);
      }
    });
  }

}
