import { Injectable } from '@angular/core';
import { Observable, of, Subscriber } from 'rxjs';
import { Patient } from 'src/app/types/patient';
import * as SampleJson from '../../../assets/patients.json';
import * as SampleJson2 from '../../../assets/patients2.json';
import * as SampleJson3 from '../../../assets/patients3.json';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private readonly LP_CB_TIMEOUT: number = 1000;
  private readonly LP_1_TIMEOUT: number = 500;
  private readonly LP_2_TIMEOUT: number = 800;
  private readonly LP_3_TIMEOUT: number = 700;
  private readonly LP_COMPLETE_TIMEOUT: number = 3000;

  private loadedPatients: Array<Patient> = [];
  private loadedPatients2: Array<Patient> = [];
  private loadedPatients3: Array<Patient> = [];
  // switch to true to simulate server error
  private readonly SOMETHING_WENT_WRONG_1: boolean = false;
  private readonly SOMETHING_WENT_WRONG_2: boolean = false;
  private readonly SOMETHING_WENT_WRONG_3: boolean = false;

  constructor() {
    this.mapFileToArray(SampleJson, this.loadedPatients);
    this.mapFileToArray(SampleJson2, this.loadedPatients2);
    this.mapFileToArray(SampleJson3, this.loadedPatients3);
  }

  /**
   * mapping Json file to object
   * param json imported JSON file
   * param target local variable, which holds the data
   * */ 
  private mapFileToArray = (json: any, target: Patient[]):void =>  {
    target.push(...json.list);
  }

  public loadPatients(): Array<Patient> {
    return this.loadedPatients;
  }

  public loadPatientsWithCallback(callback: any)  {
    setTimeout(()=>{
      return callback(this.loadedPatients)
    },this.LP_CB_TIMEOUT)
  }

  // Promise1
  public loadPatientsWithPromise(): Promise<Array<Patient>> {
    return new Promise((resolve, reject) => {
      console.log("waiting for Patients... Patients");

      setTimeout(()=> {
        if (this.SOMETHING_WENT_WRONG_1) {
          reject( "Server error!");
        }
        resolve(this.loadedPatients);
      }, this.LP_1_TIMEOUT);
    });
  }

  // Promise 2
  public loadPatientsWithPromise2(): Promise<Array<Patient>> {
    return new Promise((resolve, reject) => {
      console.log("waiting for Patients...Patients2");

      setTimeout(()=> {
        if (this.SOMETHING_WENT_WRONG_2) {
          reject( "Server error!");
        }
        resolve(this.loadedPatients2);
      }, this.LP_2_TIMEOUT);
    });
  }

    // Promise 3
    public loadPatientsWithPromise3(): Promise<Array<Patient>> {
      return new Promise((resolve, reject) => {
        console.log("waiting for Patients...Patients3");
  
        setTimeout(()=> {
          if (this.SOMETHING_WENT_WRONG_3) {
            reject( "Server error!");
          }
          resolve(this.loadedPatients3);
        }, this.LP_3_TIMEOUT);
      });
    }

    // Observable of patient arrays
    public loadPatientsWithObservable(): Observable<Patient[]> {
      return new Observable((subscriber: Subscriber<Patient[]>)=>{
        setTimeout(()=>{
          console.log("Loading data with Observable 1");
          subscriber.next(this.loadedPatients)
        }, this.LP_1_TIMEOUT);
        setTimeout(()=>{
          console.log("Loading data with Observable 2");
          subscriber.next(this.loadedPatients2)
        }, this.LP_2_TIMEOUT);
        setTimeout(()=>{
          console.log("Loading data with Observable 3");
          subscriber.next(this.loadedPatients3);
        }, this.LP_3_TIMEOUT);
        setTimeout(()=>{
          console.log("Loading data with Observable finished");
          subscriber.complete();
        }, this.LP_COMPLETE_TIMEOUT);
      });
    }

    // Observable of patient arrays
    public loadPatient(id: number): Observable<Patient|undefined> {
      const source: Patient[] = [...this.loadedPatients,...this.loadedPatients2, ...this.loadedPatients3];
      const foundPatient: Patient|undefined = source.find(
          (patient: Patient) =>{
            // Todo: ===, could not be converted route param to string, why?
            return patient.id == id
          }
      );
      console.log(`Patient found with id outside settimeout: ${foundPatient?.id}`);
      return new Observable((subscriber: Subscriber<Patient>)=>{
        setTimeout(()=>{
          console.log(`Patient found with id: ${foundPatient?.id}`);
          subscriber.next(foundPatient);
          subscriber.complete();
        }, this.LP_1_TIMEOUT);
      });
    }
}
