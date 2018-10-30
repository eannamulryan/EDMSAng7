import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Lesion } from "src/app/model/lesion";
import { Species } from "src/app/model/species";
import { ClinicalSign } from "src/app/model/clinicalSign";
import { map } from 'rxjs/operators';
import { BusinessCustomer } from "src/app/model/business-customer";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private species = new BehaviorSubject<any>(['BOVINE', 'OVINE']);
  spc = this.species.asObservable();

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`${environment.apiBase}/users`, {headers: new HttpHeaders()});
  }

  getSpecies() : Observable<Array<Species>> {
    return this.http.get<Species[]>(`${environment.apiBase}/species`, {headers: new HttpHeaders()});
  }

  getLesions(): Observable<Array<Lesion>> {
    return this.http.get<Lesion[]>(`${environment.apiBase}/lesions`, {headers: new HttpHeaders()});
  }

  getSigns(): Observable<Array<ClinicalSign>> {
    return this.http.get<ClinicalSign[]>(`${environment.apiBase}/clinicalSigns`, {headers: new HttpHeaders()});
  }

  getSuspectReports() {
    return this.http.get(`${environment.apiBase}/suspect`, {headers: new HttpHeaders()});
  }

  getSuspectReport(id) {
    return this.http.get(`${environment.apiBase}/suspect/${id}`, {headers: new HttpHeaders({'Content-Type' : 'application/json'})});
  }

  changeSpecies(spc) {
    this.species.next(spc);
  }

  saveSuspectReport(suspect) {
    return this.http
    .post(`${environment.apiBase}/suspect`, suspect, {headers: new HttpHeaders()});
  }

  deleteSuspectReport(suspect) {
    return this.http
    .delete(`${environment.apiBase}/suspect/${suspect.id}`, {headers: new HttpHeaders()});
  }

  loadBusinessCustomer(ccsId) : Observable<BusinessCustomer> {
    return this.http
    .post<BusinessCustomer>(`${environment.apiBase}/businessCustomer`, ccsId, {headers: new HttpHeaders()});
  }
  
}
