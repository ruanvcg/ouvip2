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
import { ReportPendingListComponent } from './adminpage/report-pending-list/report-list.component';
import { ReportViewComponent } from './adminpage/report-view/report-view.component';
import { ReportForwardedListComponent } from './adminpage/report-forwarded-list/report-forwarded-list.component';
import { ReportCompletedListComponent } from './adminpage/report-completed-list/report-completed-list.component';
import { ReportFollowComponent } from './userpage/report-follow/report-follow.component';
import { RecoverPassComponent } from './recover-pass/recover-pass.component';
import { AnonympageComponent } from './anonympage/anonympage.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegisterComponent},
  { path: 'recover-pass', component: RecoverPassComponent},
  { path: 'userpage', component: UserpageComponent, canActivate: [GuardGuard]},
  { path: 'anonympage', component: AnonympageComponent, canActivate: [GuardGuard]},
  { path: 'userpage/report-form', component: ReportFormComponent, canActivate: [GuardGuard] },
  { path: 'userpage/report-follow', component: ReportFollowComponent, canActivate: [GuardGuard] },
  { path: 'adminpage', component: AdminpageComponent, canActivate: [ GuardGuard ] },
  { path: 'adminpage/report-pending-list', component: ReportPendingListComponent, canActivate: [ GuardGuard ] },
  { path: 'adminpage/report-forwarded-list', component: ReportForwardedListComponent, canActivate: [ GuardGuard ] },
  { path: 'adminpage/report-completed-list', component: ReportCompletedListComponent, canActivate: [ GuardGuard ] },
  { path: 'adminpage/report-pending-list/report-view/:id', component: ReportViewComponent, canActivate: [GuardGuard] },
  { path: 'adminpage/report-forwarded-list/report-view/:id', component: ReportViewComponent, canActivate: [GuardGuard] },
  { path: 'adminpage/report-completed-list/report-view/:id', component: ReportViewComponent, canActivate: [GuardGuard] },
  { path: "**", component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
