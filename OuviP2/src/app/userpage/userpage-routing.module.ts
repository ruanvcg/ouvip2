import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserpageComponent } from './userpage.component';
import { ReportFormComponent } from './report-form/report-form.component';

const routes: Routes = [
    {
        path: 'userpage',
        component: UserpageComponent,
        children: [
          { path: 'report', component: ReportFormComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UserpageRoutingModule { }