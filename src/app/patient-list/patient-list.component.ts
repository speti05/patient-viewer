import { Component, OnInit } from '@angular/core';
import { PatientHttpService } from '../services/patient-http-service/patient-http-service.service';
import { Observer } from 'rxjs';
import { LoadingService } from '../services/loading-service/loading.service';
import { PatientService} from '../services/patient-service/patient-service';
import { Patient } from '../types/patient';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.less']
})
export class PatientListComponent implements OnInit {

  public loadedPatients: Array<Patient> = [];
  public filteredPatients: Array<Patient> = [];
  public isLoadInProgress: boolean = false;

  constructor(private readonly patientService: PatientService,
              private patientHttpService: PatientHttpService, 
              private readonly loadService: LoadingService) { 
  }

  public ngOnInit(): void {
    this.loadService.requestDisplayLoadingMask();

    // original synchron json loading 
    // this.loadedPatients = this.patientService.loadPatients();
    // this.filteredPatients = this.loadedPatients; 

    // asynchron loading with promise, success and errorhandler in then

    // resolving with callback
    // this.patientService.loadPatientsWithCallback((patient:Patient[])=>{
    //   this.loadedPatients = patient;
    //   this.filteredPatients = patient;
    //   this.loadService.requestHideLoadingMask();
    // });
    

    // loading resolving a single promise
    // this.patientService
    //   .loadPatientsWithPromise()
    //   .then(this.loadWithPromiseSuccessHandler, this.loadWithPromiseErrorHandler);

    // resolving 3 promises with Promise.all
    // Promise.all([
    //   this.patientService.loadPatientsWithPromise(),
    //   this.patientService.loadPatientsWithPromise2(),
    //   this.patientService.loadPatientsWithPromise3(),
    // ]).then(this.promiseAllLoadSuccessHandler, this.loadWithPromiseErrorHandler);

    // Racing  3 promises with Promise.all
    // Promise.race([
    //   this.patientService.loadPatientsWithPromise(),
    //   this.patientService.loadPatientsWithPromise2(),
    //   this.patientService.loadPatientsWithPromise3(),
    // ])
    //   .then(this.loadWithPromiseSuccessHandler, this.loadWithPromiseErrorHandler);

    // resolving 3 promises with Promise.all
    // this.loadPatientsWithAsyncAwait().then(()=> {
    //   this.loadService.requestHideLoadingMask();
    // });

    // getting patients as Observable 
    // const loadPatientsObserver: Observer<Patient[]> = {
    //   next: (data: Patient[]) => {
    //     this.loadService.requestDisplayLoadingMask();
    //     this.loadedPatients = this.loadedPatients.concat(...data);
    //     this.filteredPatients=this.loadedPatients;
    //   },
    //   error: () =>{
    //     console.error("Error while loading Patients with observable in Patient-list");
    //   },
    //   complete: ()=>{
    //     this.loadService.requestHideLoadingMask();
    //     console.log("Loaded patient-list with Observable");
    //   }
    // };
    // this.patientService.loadPatientsWithObservable().subscribe(loadPatientsObserver);

    // use HTTP
    this.patientHttpService.getPatients().subscribe(patients => {
      this.loadedPatients = patients;
      this.filteredPatients = patients;
      this.loadService.requestHideLoadingMask();
    });
  }

  private async loadPatientsWithAsyncAwait(): Promise<void> {
    try {
      const patients: Patient[] = await this.patientService.loadPatientsWithPromise();
      const patients1: Patient[] = await this.patientService.loadPatientsWithPromise2();
      const patients2: Patient[] = await this.patientService.loadPatientsWithPromise3();

      this.loadedPatients =  this.filteredPatients = [...patients, ...patients1, ...patients2];
      console.log("loadPatientsWithAsyncAwait result:");
      console.dir(this.loadedPatients);
    }
    catch (e: any) {
      console.error('Error While async/await loading');
    }
  }

  private loadWithPromiseSuccessHandler = (loadedPatients: Array<Patient>)=>{
    this.filteredPatients = loadedPatients;
    this.loadedPatients = loadedPatients;
    this.loadService.requestHideLoadingMask();
  }

  private promiseAllLoadSuccessHandler = (loadedPatients: Array<Array<Patient>>)=>{
    console.log("Patients Loaded with Promise.all!");
    console.dir(loadedPatients);
    this.loadedPatients = loadedPatients.flat(1);
    this.filteredPatients = loadedPatients.flat(1);
    this.loadService.requestHideLoadingMask();
  }

  private loadWithPromiseErrorHandler = (error: unknown)=>{
    console.error(`Something wehnt wrong while loading Patients: ${JSON.stringify(error)}`);
    this.loadService.requestHideLoadingMask();
  }

  public handleSearch = (value: string): void => {

    this.filteredPatients = this.loadedPatients.filter((patient: Patient)=>{
      return patient?.name?.includes(value);
    });
  };

  public routerLinkForDetailsState(id: number): Array<string> {
    return ['/details', (id as any as string)];
  }

  public deletePatient(patientId: number): void {
    this.isLoadInProgress = true;
    this.patientHttpService.deletePatient(patientId).subscribe();
    this.patientHttpService.getPatients().subscribe(patients => {
      this.loadedPatients = patients;
      this.filteredPatients = patients;
      this.isLoadInProgress = false;
    });
    
  } 
}
