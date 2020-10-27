import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PartialsModule } from '../../../partials/partials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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


import { VitaminDComponent } from '@components/vitamin-d/vitamin-d.component';
import { VitaminDFormComponent } from '@components/vitamin-d/vitamin-d-form/vitamin-d-form';
import { VitaminDClinicalDetails } from '@components/vitamin-d/_subs/vitamin-d-clinical-details/vitamin-d-clinical-details';
import { VitaminDLifeStyles } from '@components/vitamin-d/_subs/vitamin-d-life-styles/vitamin-d-life-styles';
import { VitaminDFamilyHistory } from '@components/vitamin-d/_subs/vitamin-d-family-history/vitamin-d-family-history';
import {VitaminDParticipationComponent} from "@components/vitamin-d/_subs/vitamin-d-participation-details/vitamin-d-participation-details";
import {PrintComponent} from "@components/vitamin-d/vitamin-d-print/vitamin-d-print.component";
import {DocUploadComponent1} from "@components/vitamin-d/_subs/doc-upload/doc-upload.component";


const routes: Routes = [
      {
        path: '',
        component: VitaminDComponent,
      }
      ,
      {
        path: 'add',
        component: VitaminDFormComponent,
      },
      {
        path: 'edit/:id',
        component: VitaminDFormComponent,
      },
      {
        path: 'print/:id',
        component: PrintComponent,
      }
    ]


@NgModule({
  declarations: [
    // Vitamin-D
    VitaminDComponent,
    VitaminDFormComponent,
    VitaminDParticipationComponent,
    VitaminDClinicalDetails,
    VitaminDLifeStyles,
    VitaminDFamilyHistory,
    PrintComponent,
    DocUploadComponent1
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
export class VitaminDModule { }
