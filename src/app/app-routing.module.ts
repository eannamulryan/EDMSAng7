import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuspectReportComponent } from './suspect-report/suspect-report.component';
import { SuspectsListComponent } from './suspects-list/suspects-list.component';

const routes: Routes = [
  {
    path: '',
    component: SuspectsListComponent
  },
  {
    path: 'suspectReport/:id',
    component: SuspectReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
