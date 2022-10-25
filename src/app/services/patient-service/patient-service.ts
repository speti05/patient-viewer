import { Injectable } from '@angular/core';
import { Patient } from 'src/app/types/patient';
import * as SampleJson from '../../../assets/patients.json';
import * as SampleJson2 from '../../../assets/patients2.json';
import * as SampleJson3 from '../../../assets/patients3.json';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private loadedPatients: Array<Patient> = [];
  private loadedPatients2: Array<Patient> = [];
  private loadedPatients3: Array<Patient> = [];
  // switch to true to simulate server error
  private readonly SOMETHING_WENT_WRONG: boolean = false;

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

  // Promise1
  public loadPatientsWithPromise(): Promise<Array<Patient>> {
    return new Promise((resolve, reject) => {
      console.log("waiting for Patients... Patients");

      setTimeout(()=> {
        if (this.SOMETHING_WENT_WRONG) {
          reject( "Server error!");
        }
        resolve(this.loadedPatients);
      }, 5000);
    });
  }

  // Promise 2
  public loadPatientsWithPromise2(): Promise<Array<Patient>> {
    return new Promise((resolve, reject) => {
      console.log("waiting for Patients...Patients2");

      setTimeout(()=> {
        if (this.SOMETHING_WENT_WRONG) {
          reject( "Server error!");
        }
        resolve(this.loadedPatients2);
      }, 4000);
    });
  }

    // Promise 3
    public loadPatientsWithPromise3(): Promise<Array<Patient>> {
      return new Promise((resolve, reject) => {
        console.log("waiting for Patients...Patients3");
  
        setTimeout(()=> {
          if (this.SOMETHING_WENT_WRONG) {
            reject( "Server error!");
          }
          resolve(this.loadedPatients3);
        }, 3000);
      });
    }

    // Promise 3
    public getPatient(id: number): Promise<Patient> {
      return new Promise((resolve, reject) => {
        console.log("waiting for Patients...Patients3");

  
        Promise.all([
          this.loadPatientsWithPromise(),
          this.loadPatientsWithPromise2(),
          this.loadPatientsWithPromise3(),
        ]).then((values: Array<Array<Patient>>)=>{
          console.log("Resolving All PAtientdata in getPatient Promise.all-s then");
          const results: Patient[] = values
            .flat(1);

            console.log("id:", id); 
            if (id === -1){
                reject("Patient not found");
            }
            console.log("results"); 
            console.dir(results); 
          const filteredResults: Patient[] = results
            .filter((value: Patient)=>{
              return value.id !== id;
            });

            console.log("filteredResults"); 
            console.dir(filteredResults); 
          resolve(filteredResults[0]);
        })
        .catch(()=>{
          console.error(`Error while loading Patient with id: ${id}`);
        });
      });
    }
}
