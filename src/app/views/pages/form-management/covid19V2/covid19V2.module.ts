import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PartialsModule } from '../../../partials/partials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { covid19V2Component } from '@components/covid19V2/covid19V2/covid19V2.component';
import { covid19V2EditComponent } from '@components/covid19V2/covid19V2-edit/covid19V2-edit.component';
import { covid19V2PrintComponent } from '@components/covid19V2/covid19V2-print/covid19V2-print.component';
import { covid19V2PersonalDetailsComponent } from '@components/covid19V2/_subs/personal-details/personal-details.component';

import { covid19V2TreatmentregimenComponent } from '@components/covid19V2/_subs/Treatmentregimen/Treatmentregimen.component';

import { covid19V2ClinicalInformationComponent } from '@components/covid19V2/_subs/clinical-information/clinical-information.component';
import { covid19V2ClinicalDetailsComponent } from '@components/covid19V2/_subs/clinical-details/clinical-details.component';
import { covid19V2DFIFFQComponent } from '@components/covid19V2/_subs/DFIFFQ/DFIFFQ.component';
import { covid19V2ClinicalOutcomeComponent } from '@components/covid19V2/_subs/ClinicalOutcome/ClinicalOutcome.component';


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
import {DocUploadComponent} from "@components/covid19V2/_subs/doc-upload/doc-upload.component";
//import { HsaEditComponent } from './hsa-edit/hsa-edit.component';



const routes: Routes = [
      {
        path: '',
        component: covid19V2Component,
      }
      ,
      {
        path: 'add',
        component: covid19V2EditComponent,
      },
      {
        path: 'edit/:id',
        component: covid19V2EditComponent,
      },
      {
        path: 'print/:id',
        component: covid19V2PrintComponent,
      }
    ]


@NgModule({
  declarations: [
    covid19V2Component,
    covid19V2EditComponent,
    covid19V2PrintComponent,
    covid19V2ClinicalDetailsComponent, 
    covid19V2PersonalDetailsComponent,
    covid19V2ClinicalInformationComponent,
    
    covid19V2DFIFFQComponent,
    covid19V2ClinicalOutcomeComponent,
    covid19V2TreatmentregimenComponent,
    DocUploadComponent,
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
export class covid19V2Module { }
