import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NOTYF } from '../shared/utils/notyf.token';
import { Notyf } from 'notyf';
import { BankAccountRequest } from '../types/BankAccountRequest';
import { error } from 'console';

@Component({
  selector: 'app-bank-accounts-list',
  templateUrl: './bank-accounts-list.component.html',
  styleUrls: ['./bank-accounts-list.component.css']
})
export class BankAccountsListComponent implements OnInit {

  constructor(
    private apiService : ApiService, 
    @Inject(NOTYF) private notyf : Notyf
  ) { }

  bankAccList : BankAccountRequest [] = [];

  ngOnInit(): void {
    this.loadBankAccountsList();
  }

  loadBankAccountsList() {
    this.apiService.callFetchAllUserBankAccountsApi().subscribe({
      next: response => {
        this.bankAccList = response;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

}
