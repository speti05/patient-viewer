import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientHttpService } from '../services/patient-http-service/patient-http-service.service';
import { Gender } from '../types/gender';
import { Patient } from '../types/patient';

@Component({
  selector: 'app-patient-editor',
  templateUrl: './patient-editor.component.html',
  styleUrls: ['./patient-editor.component.less']
})
export class PatientEditorComponent implements OnInit {

  public patientName: string | undefined;
  public gender: string | undefined;
  public dateOfBirth: string | undefined;

  constructor(private patientHttpService: PatientHttpService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public save(): void {
    const newPatient: Patient = {
      id: -1,
      name: this.patientName as string,
      gender: this.gender as Gender,
      dateOfBirth: this.dateOfBirth as string
    };
    this.patientHttpService.addPatient(newPatient)
      .subscribe(hero => {
        this.router.navigate(['']);
      }); 
  }
}
