import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationRequest } from '../types/RegistrationRequest';
import { ApiResponse } from '../types/ApiResponse';
import { Observable } from 'rxjs';
import { Bank } from '../types/Bank';
import { AuthService } from './auth.service';
import { BankAccountRequest } from '../types/BankAccountRequest';
import { CategoriesRequest } from '../types/CategoriesRequest';
import { IncomeRequest } from '../types/IncomeRequest';
import { ExpenseRequest } from '../types/ExpenseRequest';
import { IncomeListRequest } from '../types/IncomeListRequest';
import { ExpenseListRequest } from '../types/ExpenseListRequest';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient : HttpClient, private authService: AuthService) { }
  hostUrl : string = 'http://localhost:9181/exptracker/'
  incomeUrl : string = 'http://localhost:9181/exptracker/income/'
  expenseUrl : string = 'http://localhost:9181/exptracker/expense/'
  

  callRegisterUserApi(registrationRequest : RegistrationRequest) {
    console.log(registrationRequest);
    return this.httpClient.post<ApiResponse>(
      this.hostUrl + 'user',
      registrationRequest
  );
  }

  callFecthAllBanksApi():Observable<Bank[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    return this.httpClient.get<Bank[]>(this.hostUrl + 'banks',{headers});
  }

  callFetchAllAccountTypesApi(): Observable<string[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    return this.httpClient.get<string[]>(this.hostUrl + 'allAccTypes',{headers});
  }
  
  callRegisterBankAccountApi(bankAccountRequest: BankAccountRequest) {
    const token = this.authService.getToken();
    console.log('generated token: ' + token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    return this.httpClient.post<ApiResponse>(this.hostUrl + 'bankAccount',bankAccountRequest,{headers});
  }

  callFetchAllUserBankAccountsApi() : Observable<BankAccountRequest[]> {
    const token = this.authService.getToken();
    console.log('generated token: ' + token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` ,
    });
    const userId = this.authService.getUserId();
    const body = { userId: userId };
    return this.httpClient.post<BankAccountRequest[]>(this.hostUrl+'user/bankAccounts',body,{headers});
  }

  callFetchIncomeCategoriesApi() : Observable<CategoriesRequest[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    return this.httpClient.get<CategoriesRequest[]>(this.hostUrl+'categories/income',{headers});
  }

  callFetchExpenseCategoriesApi() : Observable<CategoriesRequest[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    return this.httpClient.get<CategoriesRequest[]>(this.hostUrl+'categories/expense',{headers});
  }

  callAddIncomeApi(incomeRequest : IncomeRequest) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    return this.httpClient.post<ApiResponse>(this.incomeUrl+'add',incomeRequest,{headers});
  }

  callAddExpenseApi(expenseRequest : ExpenseRequest) {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    return this.httpClient.post<ApiResponse>(this.expenseUrl+'add',expenseRequest,{headers});
  }

  callIncomeListApi(incomeListRequest: IncomeListRequest) : Observable<IncomeRequest[]>
   {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    return this.httpClient.post<IncomeRequest[]>(this.incomeUrl+'fetch', incomeListRequest, {headers});
  }

  callExpenseListApi(expenseListRequest: ExpenseListRequest) : Observable<ExpenseRequest[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    return this.httpClient.post<ExpenseRequest[]>(this.expenseUrl+'fetch',expenseListRequest,{headers});
  }

  callIncomeExpenseReportApi(payload: any) : Observable<any>  {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });
    return this.httpClient.post(this.hostUrl + 'user/incomeExpReport',payload,{headers});
  }

}


