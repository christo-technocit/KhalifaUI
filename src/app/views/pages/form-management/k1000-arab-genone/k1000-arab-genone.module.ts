import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PartialsModule } from '../../../partials/partials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Components

import { K1000ArabGenoneComponent } from '@components/k1000-arab-genone/k1000-arab-genone.component';
import { K1000ArabGenoneFormComponent } from '@components/k1000-arab-genone/k1000-arab-genone-form/k1000-arab-genone-form.component';
import { AgParticipantPersonalComponent } from '@components/k1000-arab-genone/_subs/ag-participant-personal/ag-participant-personal.component';
import { AgParticipantLifestyleComponent } from '@components/k1000-arab-genone/_subs/ag-participant-lifestyle/ag-participant-lifestyle.component';
import { AgParticipantFoodIntakeComponent } from '@components/k1000-arab-genone/_subs/ag-participant-food-intake/ag-participant-food-intake.component';
import { AgParticipantMedicalHistoryComponent } from '@components/k1000-arab-genone/_subs/ag-participant-medical-history/ag-participant-medical-history.component';
import { AgFamilyHistoryComponent } from '@components/k1000-arab-genone/_subs/ag-family-history/ag-family-history.component';
import { AgFamilyPedigreeComponent } from '@components/k1000-arab-genone/_subs/ag-family-pedigree/ag-family-pedigree.component';
import { AgParticipantClinicalComponent } from '@components/k1000-arab-genone/_subs/ag-participant-clinical/ag-participant-clinical.component';
import { AgElectrocardiographyComponent } from '@components/k1000-arab-genone/_subs/ag-electrocardiography/ag-electrocardiography.component';
import { K1000ArabGenonePrintComponent } from '@components/k1000-arab-genone/k1000-arab-genone-print/k1000-arab-genone-print.component';



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
import {DocUploadComponent} from "@components/k1000-arab-genone/_subs/doc-upload/doc-upload.component";



const routes: Routes = [
      {
        path: '',
        component: K1000ArabGenoneComponent,
      }
      ,
      {
        path: 'add',
        component: K1000ArabGenoneFormComponent,
      },
      {
        path: 'edit/:id',
        component: K1000ArabGenoneFormComponent,
      },
      {
        path: 'print/:id',
        component: K1000ArabGenonePrintComponent,
      }
    ]


@NgModule({
  declarations: [

    // 1000 Arab Genone
    K1000ArabGenoneComponent,
    K1000ArabGenoneFormComponent,
    AgParticipantPersonalComponent,
    AgParticipantLifestyleComponent,
    AgParticipantFoodIntakeComponent,
    AgParticipantMedicalHistoryComponent,
    AgFamilyHistoryComponent,
    AgFamilyPedigreeComponent,
    AgParticipantClinicalComponent,
    AgElectrocardiographyComponent,
    K1000ArabGenonePrintComponent,
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
export class K100ArabGenone { }
