import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PartialsModule } from '../../../partials/partials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NewFormComponent } from '@components/new-form/new-form/new-form.component';
import { NewFormEditComponent } from '@components/new-form/new-form-edit/new-form-edit.component';
import { NewFormPrintComponent } from '@components/new-form/new-form-print/new-form-print.component';
import { NewPhysicalMeasurementsComponent } from '@components/new-form/_subs/physical-measurements/physical-measurements.component';
import { NewPersonalDetailsComponent } from '@components/new-form/_subs/personal-details/personal-details.component';
import { NewMedicalEducationComponent } from '@components/new-form/_subs/medical-education/medical-education.component';
import { NewMedicalStatusComponent } from '@components/new-form/_subs/medical-status/medical-status.component';
import { NewMedicalDetailsComponent } from '@components/new-form/_subs/medical-details/medical-details.component';
import { NewMedicationComponent } from '@components/new-form/_subs/medication/medication.component';
import { NewFamilyInformationComponent } from '@components/new-form/_subs/family-information/family-information.component';
import { NewLaboratoryDetailsComponent } from '@components/new-form/_subs/laboratory-details/laboratory-details.component';
import { NewBiochemicalComponent } from '@components/new-form/_subs/biochemical/biochemical.component';
import { NewFamilyPedigreeComponent } from '@components/new-form/_subs/family-pedigree/family-pedigree.component';
import { NewLifestyleDetailsComponent } from '@components/new-form/_subs/lifestyle-details/lifestyle-details.component';


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
import {DocUploadComponent} from "@components/new-form/_subs/doc-upload/doc-upload.component";



const routes: Routes = [
      {
        path: '',
        component: NewFormComponent,
      }
      ,
      {
        path: 'add',
        component: NewFormEditComponent,
      },
      {
        path: 'edit/:id',
        component: NewFormEditComponent,
      },
      {
        path: 'print/:id',
        component: NewFormPrintComponent,
      }
    ]


@NgModule({
  declarations: [
    //New Form (Questionnaire8)
    NewFormComponent,
    NewFormEditComponent,
    NewFormPrintComponent,
    NewPhysicalMeasurementsComponent,
    NewPersonalDetailsComponent,
    NewMedicalEducationComponent,
    NewMedicalStatusComponent,
    NewMedicalDetailsComponent,
    NewMedicationComponent,
    NewFamilyInformationComponent,
    NewLaboratoryDetailsComponent,
    NewBiochemicalComponent,
    NewFamilyPedigreeComponent,
    NewLifestyleDetailsComponent,
    DocUploadComponent
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
export class NewFormModule { }
