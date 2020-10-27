import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PartialsModule } from '../../../partials/partials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OsteoporosisComponent } from '@components/osteoporosis/osteoporosis.component';
import { OsteoporosisFormComponent } from '@components/osteoporosis/osteoporosis-form/osteoporosis-form.component';
import { OsteoporosisPrintComponent } from '@components/osteoporosis/osteoporosis-print/osteoporosis-print.component';
import { ObParticipantPersonalComponent } from '@components/osteoporosis/_subs/ob-participant-personal/ob-participant-personal.component';
import { ObClinicalDetailsComponent } from '@components/osteoporosis/_subs/ob-clinical-details/ob-clinical-details.component';
import { ObBiochemicalDetailsComponent } from '@components/osteoporosis/_subs/ob-biochemical-details/ob-biochemical-details.component';
import { ObMedicationsComponent } from '@components/osteoporosis/_subs/ob-medications/ob-medications.component';
import { ObOneMinuteRiskTestComponent } from '@components/osteoporosis/_subs/ob-one-minute-risk-test/ob-one-minute-risk-test.component';
import { ObFamilyHistoryComponent } from '@components/osteoporosis/_subs/ob-family-history/ob-family-history.component';

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
import {DocUploadComponent} from "@components/osteoporosis/_subs/doc-upload/doc-upload.component";

const routes: Routes = [
      {
        path: '',
        component: OsteoporosisComponent,
      }
      ,
      {
        path: 'add',
        component: OsteoporosisFormComponent,
      },
      {
        path: 'edit/:id',
        component: OsteoporosisFormComponent,
      },
      {
        path: 'print/:id',
        component: OsteoporosisPrintComponent,
      }
    ]


@NgModule({
  declarations: [
    //Osteoporosis
    OsteoporosisComponent,
    OsteoporosisPrintComponent,
    OsteoporosisFormComponent,
    ObParticipantPersonalComponent,
    ObClinicalDetailsComponent,
    ObBiochemicalDetailsComponent,
    ObMedicationsComponent,
    ObOneMinuteRiskTestComponent,
    ObFamilyHistoryComponent,
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
export class OsteoporosisModule { }
