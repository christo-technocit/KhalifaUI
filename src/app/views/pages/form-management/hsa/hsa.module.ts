import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PartialsModule } from '../../../partials/partials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { HsaComponent } from '@components/hsa/hsa/hsa.component';
import { HsaEditComponent } from '@components/hsa/hsa-edit/hsa-edit.component';
import { HsaPrintComponent } from '@components/hsa/hsa-print/hsa-print.component';
import { HsaLifestyleDetailsComponent } from '@components/hsa/_subs/lifestyle-details/lifestyle-details.component';
import { HsaPersonalDetailsComponent } from '@components/hsa/_subs/personal-details/personal-details.component';
import { HsaMedicalHistoryComponent } from '@components/hsa/_subs/medical-history/medical-history.component'; 
import { HsaMedicalDetailsComponent } from '@components/hsa/_subs/medical-details/medical-details.component';
import { HsaFamilyHistoryComponent } from '@components/hsa/_subs/family-history/family-history.component';
import { HsaDiabetesSelfManagementComponent } from '@components/hsa/_subs/diabetes-self-management/diabetes-self-management.component';
import { HsaClinicalDetailsComponent } from '@components/hsa/_subs/clinical-details/clinical-details.component';
import { HsaMedicationComponent } from '@components/hsa/_subs/medication/medication.component';

import { HsaBiochemicalComponent } from '@components/hsa/_subs/biochemical/biochemical.component';
import { HsaCognitiveTestResultComponent } from '@components/hsa/_subs/cognitive-test-result/cognitive-test-result.component';
import { HsaLaboratoryDetailsComponent } from '@components/hsa/_subs/laboratory-details/laboratory-details.component';
import { HsaFamilyPedigreeComponent } from '@components/hsa/_subs/family-pedigree/family-pedigree.component';


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
import {DocUploadComponent} from "@components/hsa/_subs/doc-upload/doc-upload.component";
import { HsaPhysicalMeasurementsComponent } from '@components/hsa/_subs/physical-measurements/physical-measurements.component';
//import { HsaEditComponent } from './hsa-edit/hsa-edit.component';



const routes: Routes = [
      {
        path: '',
        component: HsaComponent,
      }
      ,
      {
        path: 'add',
        component: HsaEditComponent,
      },
      {
        path: 'edit/:id',
        component: HsaEditComponent,
      },
      {
        path: 'print/:id',
        component: HsaPrintComponent,
      }
    ]


@NgModule({
  declarations: [
    HsaComponent,
    HsaEditComponent,
    HsaPrintComponent,
    HsaLifestyleDetailsComponent, 
    HsaPersonalDetailsComponent,
    HsaFamilyHistoryComponent,
    HsaClinicalDetailsComponent,
    HsaMedicationComponent,
    HsaMedicalHistoryComponent,
    HsaMedicalDetailsComponent,
    HsaDiabetesSelfManagementComponent,
    HsaBiochemicalComponent,
    HsaCognitiveTestResultComponent,
    HsaLaboratoryDetailsComponent,
    DocUploadComponent,
    HsaMedicationComponent,
    HsaFamilyPedigreeComponent,
    HsaPhysicalMeasurementsComponent,
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
export class HsaModule { }
