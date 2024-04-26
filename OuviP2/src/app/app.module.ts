import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule} from '@angular/google-maps';
import { NgxCaptchaModule } from 'ngx-captcha';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { UserpageComponent } from './userpage/userpage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReportFormComponent } from './userpage/report-form/report-form.component';
import { ReportPendingListComponent } from './adminpage/report-pending-list/report-list.component';
import { ReportViewComponent } from './adminpage/report-view/report-view.component';
import { ReportForwardedListComponent } from './adminpage/report-forwarded-list/report-forwarded-list.component';
import { ReportCompletedListComponent } from './adminpage/report-completed-list/report-completed-list.component';
import { ReportFollowComponent } from './userpage/report-follow/report-follow.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RecoverPassComponent } from './recover-pass/recover-pass.component';
import { AnonympageComponent } from './anonympage/anonympage.component';
import { RedefinePassComponent } from './recover-pass/redefine-pass/redefine-pass.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    UserpageComponent,
    RegisterComponent,
    LoginComponent,
    PageNotFoundComponent,
    ReportFormComponent,
    ReportFollowComponent,
    ReportPendingListComponent,
    ReportViewComponent,
    ReportForwardedListComponent,
    ReportCompletedListComponent,
    SpinnerComponent,
    RecoverPassComponent,
    AnonympageComponent,
    RedefinePassComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxCaptchaModule, 
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
