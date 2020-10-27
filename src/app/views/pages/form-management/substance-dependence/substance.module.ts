import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PartialsModule } from '../../../partials/partials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SubstancedDependenceFormComponent } from '@components/substance-dependence/substanced-dependence-form/substanced-dependence-form.component';
import { SbParticipantDetailsComponent } from '@components/substance-dependence/_subs/sb-participant-details/sb-participant-details.component';
import { SbClinicalDetailsComponent } from '@components/substance-dependence/_subs/sb-clinical-details/sb-clinical-details.component';
import { SbLifeStyleComponent } from '@components/substance-dependence/_subs/sb-life-style/sb-life-style.component';
import { SbMedicalHistoryComponent } from '@components/substance-dependence/_subs/sb-medical-history/sb-medical-history.component';
import { SbDependenceHistoryComponent } from '@components/substance-dependence/_subs/sb-dependence-history/sb-dependence-history.component';
import { SbFamilyHistoryComponent } from '@components/substance-dependence/_subs/sb-family-history/sb-family-history.component';
import { SbTreatmentComponent } from '@components/substance-dependence/_subs/sb-treatment/sb-treatment.component';
import { SbPatientsFollowupComponent } from '@components/substance-dependence/_subs/sb-patients-followup/sb-patients-followup.component';
import { SbTestSectionComponent } from '@components/substance-dependence/_subs/sb-test-section/sb-test-section.component';
import { SbDiabeticPatientsComponent } from '@components/substance-dependence/_subs/sb-diabetic-patients/sb-diabetic-patients.component';
import { SbBiochemicalComponent } from '@components/substance-dependence/_subs/sb-biochemical/sb-biochemical.component';
import { SbMedicationsComponent } from '@components/substance-dependence/_subs/sb-medications/sb-medications.component';
import { SbFamilyHistoryWithoutSbComponent } from '@components/substance-dependence/_subs/sb-family-history-without-sb/sb-family-history-without-sb.component';
import { SbFamilyPedigreeComponent } from '@components/substance-dependence/_subs/sb-family-pedigree/sb-family-pedigree.component';
import { SubstanceDependencePrintComponent } from '@components/substance-dependence/substance-dependence-print/substance-dependence-print.component';
import {SubstanceDependenceComponent} from "@components/substance-dependence/substance-dependence.component";
import {DocUploadComponent} from "@components/substance-dependence/_subs/doc-upload/doc-upload.component";


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
        component: SubstanceDependenceComponent,
      }
      ,
      {
        path: 'add',
        component: SubstancedDependenceFormComponent,
      },
      {
        path: 'edit/:id',
        component: SubstancedDependenceFormComponent,
      },
      {
        path: 'print/:id',
        component: SubstanceDependencePrintComponent,
      }
    ]


@NgModule({
  declarations: [
    DocUploadComponent,
// Substance Dependence
    SubstanceDependenceComponent,
    SubstancedDependenceFormComponent,
    SbParticipantDetailsComponent,
    SbClinicalDetailsComponent,
    SbLifeStyleComponent,
    SbMedicalHistoryComponent,
    SbDependenceHistoryComponent,
    SbFamilyHistoryComponent,
    SbTreatmentComponent,
    SbPatientsFollowupComponent,
    SbTestSectionComponent,
    SbDiabeticPatientsComponent,
    SbBiochemicalComponent,
    SbMedicationsComponent,
    SbFamilyHistoryWithoutSbComponent,
    SbFamilyPedigreeComponent,
    SubstanceDependencePrintComponent,

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
export class SubstanceModule { }
