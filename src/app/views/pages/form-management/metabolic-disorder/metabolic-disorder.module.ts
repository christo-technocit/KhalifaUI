import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PartialsModule } from '../../../partials/partials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Components

import { MetabolicDisorderComponent } from '@components/metabolic-disorder/metabolic-disorder/metabolic-disorder.component';
import { MetabolicDisorderEditComponent } from '@components/metabolic-disorder/metabolic-disorder-edit/metabolic-disorder-edit.component';
import { ParticipantDetailsComponent } from '@components/metabolic-disorder/_subs/participant-details/participant-details.component';
import { BiomechanicsDetailsComponent } from '@components/metabolic-disorder/_subs/biomechanics-details/biomechanics-details.component';
import { ClinicalDetailsComponent } from '@components/metabolic-disorder/_subs/clinical-details/clinical-details.component';
import { FamilyHistoryDetailsComponent } from '@components/metabolic-disorder/_subs/family-history-details/family-history-details.component';
import { FamilyPedigreeComponent } from '@components/metabolic-disorder/_subs/family-pedigree/family-pedigree.component';
import { LifestyleDetailsComponent } from '@components/metabolic-disorder/_subs/lifestyle-details/lifestyle-details.component';
import { MedicationDetailsComponent } from '@components/metabolic-disorder/_subs/medication-details/medication-details.component';
import {BiochemicalComponent} from "@components/metabolic-disorder/_subs/biochemical/biochemical.component";
import {MetabolicDisorderPrintComponent} from "@components/metabolic-disorder/metabolic-disorder-print/metabolic-disorder-print.component";


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
import {DocUploadComponent} from "@components/metabolic-disorder/_subs/doc-upload/doc-upload.component";



const routes: Routes = [
      {
        path: '',
        component: MetabolicDisorderComponent,
      }
      ,
      {
        path: 'add',
        component: MetabolicDisorderEditComponent,
      },
      {
        path: 'edit/:id',
        component: MetabolicDisorderEditComponent,
      },
      {
        path: 'print/:id',
        component: MetabolicDisorderPrintComponent,
      }
    ]


@NgModule({
  declarations: [
    // Metabolic Disorder
    MetabolicDisorderComponent,
    MetabolicDisorderEditComponent,
    MetabolicDisorderPrintComponent,
    ParticipantDetailsComponent,
    BiochemicalComponent,
    BiomechanicsDetailsComponent,
    ClinicalDetailsComponent,
    FamilyHistoryDetailsComponent,
    FamilyPedigreeComponent,
    LifestyleDetailsComponent,
    MedicationDetailsComponent,
    ParticipantDetailsComponent,
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
export class MetabolicDisorderModule { }
