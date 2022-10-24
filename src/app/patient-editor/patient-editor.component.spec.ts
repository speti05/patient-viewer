import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEditorComponent } from './patient-editor.component';

describe('PatientEditorComponent', () => {
  let component: PatientEditorComponent;
  let fixture: ComponentFixture<PatientEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
