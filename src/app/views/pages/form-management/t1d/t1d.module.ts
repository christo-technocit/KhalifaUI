import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PartialsModule } from '../../../partials/partials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { T1DComponent } from '@components/t1d/t1d.component';
import { T1DFormComponent } from '@components/t1d/t1d-form/t1d-form';
import { T1DClinicalDetails } from '@components/t1d/_subs/t1d-clinical-details/t1d-clinical-details';
import { T1DLifeStyles } from '@components/t1d/_subs/t1d-life-styles/t1d-life-styles';
import { T1DFamilyHistory } from '@components/t1d/_subs/t1d-family-history/t1d-family-history';
import { T1DParticipationComponent} from "@components/t1d/_subs/t1d-participation-details/t1d-participation-details";
import { T1DMedication } from '@components/t1d/_subs/t1d-medication/t1d-medication';
import { T1DPedigree } from '@components/t1d/_subs/t1d-pedigree/t1d-pedigree';
import { T1DBiochemicalDetails } from '@components/t1d/_subs/t1d-biochemical-details/t1d-biochemical-details';
import { T1DPrintComponent} from "@components/t1d/t1d-print/t1d-print.component";
import {DocUploadComponent} from "@components/t1d/_subs/doc-upload/doc-upload.component";

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
        component: T1DComponent,
      }
      ,
      {
        path: 'add',
        component: T1DFormComponent,
      },
      {
        path: 'edit/:id',
        component: T1DFormComponent,
      },
      {
        path: 'print/:id',
        component: T1DPrintComponent,
      }
    ]


@NgModule({
  declarations: [
// T1D
    T1DComponent,
    T1DFormComponent,
    T1DParticipationComponent,
    T1DClinicalDetails,
    T1DBiochemicalDetails,
    T1DLifeStyles,
    T1DMedication,
    T1DFamilyHistory,
    T1DPedigree,
    T1DPrintComponent,
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
export class T1dModule { }
