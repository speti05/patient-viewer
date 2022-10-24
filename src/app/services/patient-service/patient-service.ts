import { Injectable } from '@angular/core';
import { Patient } from 'src/app/types/patient';
// import * as fs from 'fs';
import * as SampleJson from '../../../assets/patients.json';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private loadedPatients: Array<Patient> = [];
  // private readonly JSON_PATH: fs.PathOrFileDescriptor = './assets/patients.json';
  private readonly JSON_OPTIONS: unknown = {

  };
  constructor() {
    Object.values(SampleJson).map((value) => {
      this.loadedPatients.push(value);
    });

  }

  // public loadPatientsFromJson(): void {
    // fs-t nem találta az angular,még package json módosítással sem
    // const loadPatientCallback = (err: any, data: any) => {
    //   if(err) {
    //     console.log(`Error while loading JSON: ${JSON.stringify(err)}`);
    //     return;
    //   }
    //   this.loadedPatients = data;
    // }; 
    
    // // callback version
    // fs.readFile(this.JSON_PATH, loadPatientCallback)
  // }

  public loadPatients(): Array<Patient> {
    return this.loadedPatients;
  }
}
