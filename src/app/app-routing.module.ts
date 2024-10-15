import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { AddIncomeComponent } from './add-income/add-income.component';
import { AddBankComponent } from './add-bank/add-bank.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { IncomeListComponent } from './income-list/income-list.component';
import { ReportComponent } from './report/report.component';
import { RegisterComponent } from './register/register.component';
import { BankAccountsListComponent } from './bank-accounts-list/bank-accounts-list.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent

  },
  {
    path: 'add-expense', component: AddExpenseComponent
  },
  {
    path: 'add-income', component: AddIncomeComponent
  },
  {
    path: 'add-bank', component: AddBankComponent
  },
  {
    path: 'bank-acc-list', component: BankAccountsListComponent
  },
  {
    path: 'expense-list', component: ExpenseListComponent
  },
  {
    path: 'income-list', component: IncomeListComponent
  },
  {
    path: 'report', component: ReportComponent
  },
  {
    path: 'register', component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
