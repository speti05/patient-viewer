import { Component, OnInit } from '@angular/core';
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

  constructor(private patientService: PatientService) {
    
  }

  public ngOnInit(): void {
    this.loadedPatients = this.patientService.loadPatients();
    this.filteredPatients = this.loadedPatients;
  }

  public handleSearch = (value: string): void => {

    this.filteredPatients = this.loadedPatients.filter((patient: Patient)=>{
      return patient?.name?.includes(value);
    });
  };
}
