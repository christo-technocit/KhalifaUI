import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PartialsModule } from '../../../partials/partials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { DiabetesComponent } from '@components/diabetes/diabetes/diabetes.component';
import { DiabetesEditComponent } from '@components/diabetes/diabetes-edit/diabetes-edit.component';
import { DiabetesPrintComponent } from '@components/diabetes/diabetes-print/diabetes-print.component';
import { DiabetesLifestyleDetailsComponent } from '@components/diabetes/_subs/lifestyle-details/lifestyle-details.component';
import { DiabetesPersonalDetailsComponent } from '@components/diabetes/_subs/personal-details/personal-details.component';
import { DiabetesMedicalDetailsComponent } from '@components/diabetes/_subs/medical-details/medical-details.component';
import { DiabetesFamilyHistoryComponent } from '@components/diabetes/_subs/family-history/family-history.component';
import { DiabetesDiabetesSelfManagementComponent } from '@components/diabetes/_subs/diabetes-self-management/diabetes-self-management.component';
import { DiabetesClinicalDetailsComponent } from '@components/diabetes/_subs/clinical-details/clinical-details.component';
import { DiabetesMedicationComponent } from '@components/diabetes/_subs/medication/medication.component';

import { DiabetesBiochemicalComponent } from '@components/diabetes/_subs/biochemical/biochemical.component';
import { DiabetesCognitiveTestResultComponent } from '@components/diabetes/_subs/cognitive-test-result/cognitive-test-result.component';
import { DiabetesLaboratoryDetailsComponent } from '@components/diabetes/_subs/laboratory-details/laboratory-details.component';
import { DiabetesFamilyPedigreeComponent } from '@components/diabetes/_subs/family-pedigree/family-pedigree.component';
import {DocUploadComponent} from '@components/diabetes/_subs/doc-upload/doc-upload.component';
import { DiabetesPhysicalMeasurementsComponent } from '@components/diabetes/_subs/physical-measurements/physical-measurements.component';
import {DiabetesMedicalHistoryComponent } from '@components/diabetes/_subs/medical-history/medical-history.component';
import { DiabetesMetforminComponent} from '@components/diabetes/_subs/metformin/metformin.component';
import { DiabetesDietComponent} from '@components/diabetes/_subs/diet/diet.component';
import { DiabetesMedication2Component} from '@components/diabetes/_subs/medication2/medication2.component';


import {
MatInputModule,
MatPaginatorModule,
MatProgressSpinnerModule,
MatSortModule,
MatTableModule,
MatSelectModule,
MatMenuModule,
MatProgressBarModule,
MatButtonModule,
MatCheckboxModule,
MatDialogModule,
MatTabsModule,
MatNativeDateModule,
MatCardModule,
MatRadioModule,
MatIconModule,
MatDatepickerModule,
MatExpansionModule,
MatAutocompleteModule,
MAT_DIALOG_DEFAULT_OPTIONS,
MatSnackBarModule,
MatTooltipModule,
MatFormFieldControl
} from '@angular/material';



const routes: Routes = [
      {
        path: '',
        component: DiabetesComponent,
      }
      ,
      {
        path: 'add',
        component: DiabetesEditComponent,
      },
      {
        path: 'edit/:id',
        component: DiabetesEditComponent,
      },
      {
        path: 'print/:id',
        component: DiabetesPrintComponent,
      }
    ]


@NgModule({
  declarations: [
    DiabetesComponent,
    DiabetesEditComponent,
    DiabetesPrintComponent,
    DiabetesLifestyleDetailsComponent,
    DiabetesPersonalDetailsComponent,
    DiabetesFamilyHistoryComponent,
    DiabetesClinicalDetailsComponent,
    DiabetesMedicationComponent,
    DiabetesMedicalDetailsComponent,
    DiabetesDiabetesSelfManagementComponent,
    DiabetesBiochemicalComponent,
    DiabetesCognitiveTestResultComponent,
    DiabetesLaboratoryDetailsComponent,
    DocUploadComponent,
    DiabetesMedicationComponent,
    DiabetesFamilyPedigreeComponent,
	DiabetesPhysicalMeasurementsComponent,
	DiabetesMedicalHistoryComponent,
	DiabetesMetforminComponent,
	DiabetesDietComponent,
	DiabetesMedication2Component
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    PartialsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatIconModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTabsModule,
    MatTooltipModule,
    MatDialogModule,
  ]
})
export class DiabetesModule { }
