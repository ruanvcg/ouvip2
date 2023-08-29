import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './guard.guard';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserpageComponent } from './userpage/userpage.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReportFormComponent } from './userpage/report-form/report-form.component';
import { ReportListComponent } from './adminpage/report-list/report-list.component';
import { ReportViewComponent } from './adminpage/report-view/report-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegisterComponent},
  { path: 'userpage', component: UserpageComponent, canActivate: [GuardGuard]},
  { path: 'userpage/report-form', component: ReportFormComponent, canActivate: [GuardGuard] },
  { path: 'adminpage', component: AdminpageComponent, canActivate: [ GuardGuard ] },
  { path: 'adminpage/report-list', component: ReportListComponent, canActivate: [ GuardGuard ] },
  { path: 'adminpage/report-list/report-view/:id', component: ReportViewComponent, canActivate: [GuardGuard] },
  { path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
