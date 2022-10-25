import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientEditorComponent } from './patient-editor/patient-editor.component';
import { PatientListComponent } from './patient-list/patient-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'patients', pathMatch: 'full'},
  {path: 'patients', component: PatientListComponent},
  {path: 'edit', component: PatientEditorComponent},
  {path: 'details/:id', component: PatientDetailsComponent},
  {path: '**', redirectTo: 'patients'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
