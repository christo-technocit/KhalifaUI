import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PartialsModule } from '../../../partials/partials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { Covid19Component } from '@components/covid19/covid19/covid19.component';
import { Covid19EditComponent } from '@components/covid19/covid19-edit/covid19-edit.component';
import { Covid19PrintComponent } from '@components/covid19/covid19-print/covid19-print.component';
import { Covid19PersonalDetailsComponent } from '@components/covid19/_subs/personal-details/personal-details.component';
import { Covid19ExposureSitesComponent } from '@components/covid19/_subs/exposure-sites/exposure-sites.component';
import { Covid19MicrobiomeComponent } from '@components/covid19/_subs/Microbiome/Microbiome.component';

import { Covid19ClinicalInformationComponent } from '@components/covid19/_subs/clinical-information/clinical-information.component';
import { Covid19ClinicalDetailsComponent } from '@components/covid19/_subs/clinical-details/clinical-details.component';
import { Covid19LaboratoryDetailsComponent } from '@components/covid19/_subs/laboratory-details/laboratory-details.component';
import { Covid19PossibleContactsComponent } from '@components/covid19/_subs/possible-contacts/possible-contacts.component';
import { Covid19RiskHistoryComponent } from '@components/covid19/_subs/risk-history/risk-history.component';


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
import {DocUploadComponent} from "@components/covid19/_subs/doc-upload/doc-upload.component";
//import { HsaEditComponent } from './hsa-edit/hsa-edit.component';



const routes: Routes = [
      {
        path: '',
        component: Covid19Component,
      }
      ,
      {
        path: 'add',
        component: Covid19EditComponent,
      },
      {
        path: 'edit/:id',
        component: Covid19EditComponent,
      },
      {
        path: 'print/:id',
        component: Covid19PrintComponent,
      }
    ]


@NgModule({
  declarations: [
    Covid19Component,
    Covid19EditComponent,
    Covid19PrintComponent,
    Covid19ClinicalDetailsComponent, 
    Covid19PersonalDetailsComponent,
    Covid19ClinicalInformationComponent,
    Covid19ExposureSitesComponent,
    Covid19LaboratoryDetailsComponent,
    Covid19RiskHistoryComponent,
    Covid19PossibleContactsComponent,
    Covid19MicrobiomeComponent,
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
export class Covid19Module { }
