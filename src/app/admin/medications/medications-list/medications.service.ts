import { Injectable } from '@angular/core';
import { Observable, throwError, ErrorObserver } from 'rxjs'; // Import throwError correctly
import { Medication } from './medication.model';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MedicationsService {
  private baseUrl = 'http://localhost:8090/api/medication';

  constructor(private http: HttpClient) { }

  getAllMedications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/list`)
  }

  /*getAllPhysicalTreatments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/list`);
  }*/
}
