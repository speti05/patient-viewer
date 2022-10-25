import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Patient } from 'src/app/types/patient';


@Injectable({ providedIn: 'root' })
export class PatientHttpService {

  private patientsUrl = 'api/patients';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientsUrl)
      .pipe(
        tap(_ => this.log('fetched patients')),
        catchError(this.handleError<Patient[]>('getPatients', []))
      );
  }

  /** GET patient by id. Return `undefined` when id not found */
  getPatientNo404<Data>(id: number): Observable<Patient> {
    const url = `${this.patientsUrl}/?id=${id}`;
    return this.http.get<Patient[]>(url)
      .pipe(
        map(patients => patients[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} patient id=${id}`);
        }),
        catchError(this.handleError<Patient>(`getPatient id=${id}`))
      );
  }

  /** GET patient by id. Will 404 if id not found */
  getPatient(id: number): Observable<Patient> {
    const url = `${this.patientsUrl}/${id}`;
    return this.http.get<Patient>(url).pipe(
      tap(_ => this.log(`fetched patient id=${id}`)),
      catchError(this.handleError<Patient>(`getPatient id=${id}`))
    );
  }

  /* GET patients whose name contains search term */
  searchPatients(term: string): Observable<Patient[]> {
    if (!term.trim()) {
      // if not search term, return empty patient array.
      return of([]);
    }
    return this.http.get<Patient[]>(`${this.patientsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found patients matching "${term}"`) :
         this.log(`no patients matching "${term}"`)),
      catchError(this.handleError<Patient[]>('searchPatients', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new patient to the server */
  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.patientsUrl, patient, this.httpOptions).pipe(
      tap((newPatient: Patient) => this.log(`added patient w/ id=${newPatient.id}`)),
      catchError(this.handleError<Patient>('addPatient'))
    );
  }

  /** DELETE: delete the patient from the server */
  deletePatient(id: number): Observable<Patient> {
    const url = `${this.patientsUrl}/${id}`;

    return this.http.delete<Patient>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted patient id=${id}`)),
      catchError(this.handleError<Patient>('deletePatient'))
    );
  }

  /** PUT: update the patient on the server */
  updatePatient(patient: Patient): Observable<any> {
    return this.http.put(this.patientsUrl, patient, this.httpOptions).pipe(
      tap(_ => this.log(`updated patient id=${patient.id}`)),
      catchError(this.handleError<any>('updatePatient'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PatientService message with the MessageService */
  private log(message: string) {
    console.log(`PatientService: ${message}`);
  }
}