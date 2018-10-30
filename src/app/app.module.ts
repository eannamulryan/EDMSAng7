import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuspectReportComponent } from './suspect-report/suspect-report.component';
import { SuspectsListComponent } from './suspects-list/suspects-list.component';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './data.service';

import {MatButtonModule, MatCheckboxModule, MatNativeDateModule, MatDatepickerModule, MatCardModule, MatFormFieldModule, MatInputModule,
MatSelectModule, MatToolbarModule, MatTabsModule, MatTableModule, MatPaginatorModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SuspectReportComponent,
    SuspectsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
