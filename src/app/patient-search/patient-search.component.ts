import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.less']
})
export class PatientSearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output()
  public readonly inputChanged: EventEmitter<string> = new EventEmitter<string>;

  public inputValue: string = '';

  public handleChange = (value: string) => {
      this.inputChanged.emit(value)
      this.inputValue=value;
  }
}
