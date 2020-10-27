import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PartialsModule } from '../../../partials/partials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ObesityComponent } from '@components/obesity/obesity/obesity.component';
import { ObesityPrintComponent } from '@components/obesity/obesity-print/obesity-print.component';
import { ObesityEditComponent } from '@components/obesity/obesity-edit/obesity-edit.component';
import { ObesityPersonalDetailsComponent } from '@components/obesity/_subs/personal-details/personal-details.component';
import { ObesityMedicationComponent } from '@components/obesity/_subs/medication/medication.component';
import { ObesityFamilyHistoryComponent } from '@components/obesity/_subs/family-history/family-history.component';
import { ObesityBiochemicalComponent } from '@components/obesity/_subs/biochemical/biochemical.component';
import { ObesityClinicalDetailsComponent } from '@components/obesity/_subs/clinical-details/clinical-details.component';
import { ObesityCharacteristicsComponent } from '@components/obesity/_subs/characteristics/characteristics.component';

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
import {DocUploadComponent} from "@components/obesity/_subs/doc-upload/doc-upload.component";

const routes: Routes = [
      {
        path: '',
        component: ObesityComponent,
      }
      ,
      {
        path: 'add',
        component: ObesityEditComponent,
      },
      {
        path: 'edit/:id',
        component: ObesityEditComponent,
      },
      {
        path: 'print/:id',
        component: ObesityPrintComponent,
      }
    ]


@NgModule({
  declarations: [
    //Obesity
    ObesityComponent,
    ObesityEditComponent,
    ObesityPrintComponent,
    ObesityPersonalDetailsComponent,
    ObesityMedicationComponent,
    ObesityFamilyHistoryComponent,
    ObesityBiochemicalComponent,
    ObesityClinicalDetailsComponent,
    ObesityCharacteristicsComponent,
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
export class ObisityModule { }
