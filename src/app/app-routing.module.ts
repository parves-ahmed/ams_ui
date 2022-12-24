import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {ApplicationComponent} from './application/application.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth/auth.guard';
import {UserComponent} from './user/user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddAllotteeComponent } from './add-allottee/add-allottee.component';
import { AllotteeComponent } from './allottee/allottee.component';
import { DateWiseReportComponent } from './reports/date-wise-report/date-wise-report.component';
import { PeriodicReportComponent } from './reports/periodic-report/periodic-report.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'user', component: UserComponent, canActivate:[AuthGuard], data:{role:['ROLE_USER']}},
  {path: 'adduser', component: AddUserComponent, canActivate:[AuthGuard], data:{role:['ROLE_SUPER_ADMIN']}},
  {path: 'addallottee', component: AddAllotteeComponent},
  {path: 'allottee', component: AllotteeComponent},
  {path: 'attendancereport', component: DateWiseReportComponent},
  {path: 'periodicreport', component: PeriodicReportComponent},
  {path: 'application', component: ApplicationComponent},
  {path: 'forbidden', component: ForbiddenComponent}
  // {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  // {path: 'application', component: ApplicationComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
