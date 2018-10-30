import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SuspectReport } from '../model/suspectreport';
import { DataService } from '../data.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-suspects-list',
  templateUrl: './suspects-list.component.html',
  styleUrls: ['./suspects-list.component.css']
})
export class SuspectsListComponent implements OnInit {

  premisesTypeList: Object;
  suspectReportForm = new FormGroup({
    date: new FormControl(''),
    premisesType: new FormControl(''),
    premisesPigsOnSite: new FormControl('')
   // time: new FormControl(''),
  });
  displayedColumns: string[];
  suspectReports: Array<SuspectReport>;
  dataSource: any;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  onSubmit() {
  // TODO: Use EventEmitter with form value
    console.warn(this.suspectReportForm.value);
  }

  constructor(private service: DataService, private router: Router) { 
  }

  ngOnInit() {
    this.premisesTypeList = [
            {description: 'Farm', code: 'FRM'},
            {description: 'Other E.g. Lake, Mountain', code: 'OTH'},
            {description: 'Local Authority Abattoir', code: 'LAA'},
            {description: 'Mart', code: 'MRT'},
            {description: 'Show', code: 'SHW'}
        ];

      this.service.getSuspectReports().subscribe((suspects: Array<SuspectReport>) => {
      this.displayedColumns = ['edit', 'delete', 'id', 'date', 'reporterName', 'premisesType', 'premisesBusinessIdentifier'];

      this.suspectReports = suspects;

      this.dataSource = new MatTableDataSource(suspects);

      this.dataSource.paginator = this.paginator;
      });

      
  }

  editSuspect(suspect: SuspectReport): void {
   // localStorage.removeItem("editSuspectId");
    //localStorage.setItem("editSuspectId", suspect.id.toString());
    this.router.navigate(['suspectReportMat', suspect.id]);
  };


  deleteSuspect(suspect: SuspectReport, index: number): void {
    this.service.deleteSuspectReport(suspect).subscribe(res => {
      this.suspectReports.splice(index,1);

      this.dataSource = new MatTableDataSource(this.suspectReports);

      this.dataSource.paginator = this.paginator;
    });
  }
}
