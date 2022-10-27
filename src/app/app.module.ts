import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientEditorComponent } from './patient-editor/patient-editor.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientSearchComponent } from './patient-search/patient-search.component';
import { FormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/patient-http-service/in-memory-data.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    PatientListComponent,
    PatientEditorComponent,
    PatientDetailsComponent,
    PatientSearchComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ]
})
export class AppModule { }
