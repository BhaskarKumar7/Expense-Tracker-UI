import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { AddIncomeComponent } from './add-income/add-income.component';
import { AddBankComponent } from './add-bank/add-bank.component';
import { IncomeListComponent } from './income-list/income-list.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ReportComponent } from './report/report.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { NOTYF, notyfFactory } from './shared/utils/notyf.token';
import { BankAccountsListComponent } from './bank-accounts-list/bank-accounts-list.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    AddExpenseComponent,
    AddIncomeComponent,
    AddBankComponent,
    IncomeListComponent,
    ExpenseListComponent,
    ReportComponent,
    RegisterComponent,
    BankAccountsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    {
      provide: NOTYF,
      useFactory: notyfFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
