import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PatientHttpService } from '../services/patient-http-service/patient-http-service.service';
import { LoadingService } from '../services/loading-service/loading.service';
import { PatientService } from '../services/patient-service/patient-service';
import { Patient } from '../types/patient';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.less']
})
export class PatientDetailsComponent implements OnInit, OnDestroy {

  public id: number = -1;
  public isLoadInProgress: boolean = false;
  public displayedPatient!: Patient|undefined;

  public ngOnInit(): void {
    this.isLoadInProgress = true;
    //this.patientService.getPatient(this.id).then(this.handlePatientLoadSuccess, this.handlePatientLoadError);
    
    // use HTTP
    this.patientHttpService.getPatient(this.id).subscribe(patient => this.displayedPatient = patient);
  }
  
  public ngOnDestroy(): void {
  }

  public handleRouteParams(params: Params) {
    this.id = params['id'] as number;
    console.log("resolved id in patient-details:", this.id);
  }
  public handleRouteParamsError(err: any) {
    console.error("Error while getting id from route params")
  }

  public save(): void {
    const newPatient: Patient = {
      id: this.displayedPatient.id,
      name: this.displayedPatient.name,
      gender: this.displayedPatient.gender,
      dateOfBirth: this.displayedPatient.dateOfBirth
    };
    this.patientHttpService.updatePatient(newPatient)
      .subscribe(() => {
        this.router.navigate(['']);
      }); 
  }

  constructor(private readonly route: ActivatedRoute,
              private readonly patientService: PatientService,
              private readonly patientHttpService: PatientHttpService,
              private readonly router: Router,
              private readonly loadService: LoadingService) {
    this.route.params.subscribe({
      next: (v) => this.handleRouteParams(v),
      error: (e) => this.handleRouteParamsError(e),
      complete: () => console.info('completed route param query'),
    });
  }
}
