import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Species } from '../model/species';
import { ClinicalSign } from '../model/clinicalSign';
import { Lesion } from '../model/lesion';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from "rxjs";
import { BusinessCustomer } from '../model/business-customer';

@Component({
  selector: 'app-suspect-report',
  templateUrl: './suspect-report.component.html',
  styleUrls: ['./suspect-report.component.css']
})
export class SuspectReportComponent implements OnInit {

  premisesTypeList: Array<any>;
  reportedByList: Array<any>;
  reportTypes: Array<any>;
  speciesList$: Observable<Array<Species>>;
  lesionsList$: Observable<Array<Lesion>>;
  clinicalSignsList$: Observable<Array<ClinicalSign>>;
  premisesName: String = "fddfdsfdfs";

  busCust :BusinessCustomer;

  isPremiseNotSelected = true;
  isIndexHerdNotSelected = true;
  reportedByNotSelected = true;

  suspectReportForm: FormGroup;

  suspectId: String;


  onSubmit() {
    //console.warn(this.suspectReportForm.value);
    this.service.saveSuspectReport(this.suspectReportForm.value).subscribe(res => {
      console.log(res);
      this.router.navigate(['suspectReport']);
    });
  }

  constructor(private fb: FormBuilder, private service: DataService, private router: Router, private route: ActivatedRoute) { 
  }
  ngOnInit() {

    this.suspectReportForm = this.fb.group({
      date: ['' , Validators.required],
      time: ['' , Validators.required],
      premisesType: ['', Validators.required],
      premisesPigsOnSite: [''],
      premisesDealer: [''],
      premisesDairyFarm: [''],
      premisesHerdType: [''],
      premisesBusinessIdentifier: [{value: '' , disabled: true} , [Validators.required, Validators.maxLength(30)]],
      premisesComments: ['', [Validators.maxLength(400)]],
      indexHerdNumber: [{value: '' , disabled: true} , [Validators.maxLength(30)]],
      indexPigsOnSite: [{value: '' , disabled: true}],
      indexDealer: [{value: '' , disabled: true}],
      indexDairyFarm: [{value: '' , disabled: true}],
      indexHerdType: [{value: '' , disabled: true}],
      indexComments: [{value: '' , disabled: true}],
      reportedBy: ['', Validators.required],
      reporterType: ['', Validators.required],
      reporterTelNo: ['', Validators.maxLength(20)],
      reporterCcs: [{value: '',  disabled: true}],
      reporterName: ['', [Validators.required, Validators.maxLength(70)]],
      reporterAddr1: ['', Validators.required],
      reporterAddr2: [''],
      reporterAddr3: [''],
      reporterAddr4: [''],
      selectedSpecies: ['', Validators.required],
      noAnimalAffected: ['', Validators.required],
      selectedClinicalSigns: ['', Validators.required],
      selectedLesions: ['', Validators.required],
      diseaseHistory: ['', [Validators.maxLength(400)]],
      diseaseComments: ['', [Validators.maxLength(400)]],
      ndccPerson: ['', Validators.required],
      sviPerson: ['', Validators.required],
      ssviPerson: ['', Validators.required],
      rvlPerson: ['', Validators.required],
      id: ['']
    })


    this.route.params.subscribe(res => this.suspectId = res.id);
    if(this.suspectId !== '0'){
      if(!this.suspectId) {
        alert("Invalid action.")
        this.router.navigate(['suspectReport']);
        return;
      } else {
        this.service.getSuspectReport(this.suspectId).subscribe(res => {
        //console.log(res);
        this.suspectReportForm.setValue(res);
        this.enablePremiseFields();
        //this.router.navigate(['suspectReport']);
      });
        //this.suspectReportForm.setValue();
      }
    }


    this.premisesTypeList = [
      {description: 'Farm', code: 'FRM'},
      {description: 'Other E.g. Lake, Mountain', code: 'OTH'},
      {description: 'Local Authority Abattoir', code: 'LAA'},
      {description: 'Mart', code: 'MRT'},
      {description: 'Show', code: 'SHW'}
    ];

    this.reportedByList = [
      {description: 'Private Veterinary Practitioner', code: 'PVP'},
      {description: 'Department Veterinary Inspector', code: 'DVI'},
      {description: 'Department Technical Staff', code: 'DTS'},
      {description: 'Gardaí', code: 'GAR'},
      {description: 'Other', code: 'OTH'}
    ];   

    this.reportTypes = [
      {description: 'Telephone', code: 'TEL'},
      {description: 'Email', code: 'EML'},
      {description: 'Fax', code: 'FAX'},
      {description: 'Verbal', code: 'VBL'},
      {description: 'Text Message', code: 'TXT'}
    ];

    this.lesionsList$ = this.service.getLesions();

    this.clinicalSignsList$ = this.service.getSigns();

    this.speciesList$ = this.service.getSpecies();
 

    this.suspectReportForm.valueChanges.subscribe(console.log);


  }

  enablePremiseFields() {
    this.suspectReportForm.controls['premisesBusinessIdentifier'].enable();
    this.isPremiseNotSelected = false;

    if(this.suspectReportForm.controls['premisesType'].value == 'MRT') {
      this.suspectReportForm.controls['indexPigsOnSite'].enable();
      this.suspectReportForm.controls['indexDealer'].enable();
      this.suspectReportForm.controls['indexDairyFarm'].enable();
      this.suspectReportForm.controls['indexHerdType'].enable();
      this.suspectReportForm.controls['indexComments'].enable();
      this.suspectReportForm.get('indexHerdType').setValidators([Validators.required]);
    } else {
      this.suspectReportForm.controls['indexPigsOnSite'].disable();
      this.suspectReportForm.controls['indexDealer'].disable();
      this.suspectReportForm.controls['indexDairyFarm'].disable();
      this.suspectReportForm.controls['indexHerdType'].disable();
      this.suspectReportForm.controls['indexComments'].disable();
      this.suspectReportForm.get('indexHerdType').clearValidators();
      this.isIndexHerdNotSelected = true;
      this.suspectReportForm.controls['indexPigsOnSite'].reset();
      this.suspectReportForm.controls['indexDealer'].reset();
      this.suspectReportForm.controls['indexDairyFarm'].reset();
      this.suspectReportForm.controls['indexHerdType'].reset();
      this.suspectReportForm.controls['indexComments'].reset();
    }
    this.suspectReportForm.get('indexHerdType').updateValueAndValidity();
  }

  enableIndexFields() {
    this.isIndexHerdNotSelected = false;
  }

  enableReportedBy() {
    this.suspectReportForm.controls['reporterCcs'].enable();
    this.reportedByNotSelected = false;
  }

  addClicked() {
    alert("add button clicked");
    this.premisesName = "aaaaaa";

    this.service.loadBusinessCustomer(this.suspectReportForm.controls['premisesBusinessIdentifier'].value).subscribe(res =>{ this.busCust = res; console.log(res);}

    , err => { alert(err.message) });
  }

  searchClicked() {
    alert("search button clicked");
  }

  changeReportType() {
    if(this.suspectReportForm.controls['reporterType'].value == 'TEL') {
      this.suspectReportForm.get('reporterTelNo').setValidators([Validators.required]);
    } else {
      this.suspectReportForm.get('reporterTelNo').clearValidators();
    }
    this.suspectReportForm.get('reporterTelNo').updateValueAndValidity();
  }


  premisesIndicativeAnimalList = [
  {herdNo: 'M1031031', species: 'BOVINE', noOfAnimals: 100, keeperName: 'Joe Bloggs', activityStatus: 'ACTIVE'}
];

  displayedColumns: string[] = ['herdNo', 'species', 'noOfAnimals', 'keeperName', 'activityStatus'];
  dataSource = this.premisesIndicativeAnimalList;


  get date() {
    return this.suspectReportForm.get('date');
  }
  get time() {
    return this.suspectReportForm.get('time');
  }

  get premisesType() {
    return this.suspectReportForm.get('premisesType');
  }

  get premisesBusinessIdentifier() {
    return this.suspectReportForm.get('premisesBusinessIdentifier');
  }

  get premisesComments() {
    return this.suspectReportForm.get('premisesComments');
  }


  get reporterName() {
    return this.suspectReportForm.get('reporterName');
  }

  get reporterAddr1() {
    return this.suspectReportForm.get('reporterAddr1');
  }

  get selectedSpecies() {
    return this.suspectReportForm.get('selectedSpecies');
  }

  get selectedClinicalSigns() {
    return this.suspectReportForm.get('selectedClinicalSigns');
  }

  get selectedLesions() {
    return this.suspectReportForm.get('selectedLesions');
  }

  get reporterTelNo() {
    return this.suspectReportForm.get('reporterTelNo');
  }

  get reportedBy() {
    return this.suspectReportForm.get('reportedBy');
  }

  get reporterType() {
    return this.suspectReportForm.get('reporterType');
  }

  get noAnimalAffected() {
    return this.suspectReportForm.get('noAnimalAffected');
  }


  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

  compareByValue(f1: any, f2: any) { 
    return f1 && f2 && f1.id === f2.id; 
  }

}
