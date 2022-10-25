import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
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
    this.loadService.requestDisplayLoadingMask();
    this.patientService.loadPatient(this.id as number).subscribe({
        next: (patient: Patient|undefined) => {
          this.displayedPatient = patient;
          console.log("Found patient in patient details");
          console.dir(this.displayedPatient);
        },
        error: (e) => {
          console.error('Cant select patient for PatientDetails')
        },
         complete: () => {
          this.loadService.requestHideLoadingMask();
        }
      });
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

  constructor(private readonly route: ActivatedRoute,
              private readonly patientService: PatientService,
              private readonly loadService: LoadingService) {
    this.route.params.subscribe({
      next: (v) => this.handleRouteParams(v),
      error: (e) => this.handleRouteParamsError(e),
      complete: () => console.info('completed route param query'),
    });
  }
}
