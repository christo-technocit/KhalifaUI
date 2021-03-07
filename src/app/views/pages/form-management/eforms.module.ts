// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
// Translate
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PartialsModule } from '../../partials/partials.module';
// Services
import { HttpUtilsService, TypesUtilsService, InterceptService, LayoutUtilsService } from '../../../core/_base/crud';
// Shared
import { ActionNotificationComponent } from '../../partials/content/crud';
import { EFormsComponent } from './eforms.component'
// Material
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
import {
	formsReducer,
	FormEffects
} from '../../../core/forms';
import { SubstanceDependenceComponent } from './substance-dependence/substance-dependence.component';

import { ReportingToolComponent } from './reporting-tool/reporting-tool.component';
import {AuthGuard} from "../../../core/auth/_guards/auth.guard";
import {ReportingToolChildComponent} from "./reporting-tool-child/reporting-tool-child.component";



const routes: Routes = [
	{
		path: '',
		component: EFormsComponent,
		children: [

			{
				path: 'reporting-tool',
				component: ReportingToolComponent
			},
			{
				path: 'covid19V2',
				loadChildren: () => import('app/views/pages/form-management/covid19V2/covid19V2.module').then(m => m.covid19V2Module)
			 },
			{
			   path: 'covid19',
			   loadChildren: () => import('app/views/pages/form-management/covid19/covid19.module').then(m => m.Covid19Module)
			},
             {
				path: 'new-form',
				loadChildren: () => import('app/views/pages/form-management/new-form/newform.module').then(m => m.NewFormModule)
			 },
			 {
				path: 'hsa',
				loadChildren: () => import('app/views/pages/form-management/hsa/hsa.module').then(m => m.HsaModule)
             },{
				path: '1000-arab-genome',
				loadChildren: () => import('app/views/pages/form-management/k1000-arab-genone/k1000-arab-genone.module').then(m => m.K100ArabGenone)
             },{
				path: 'metabolic-disorder',
				loadChildren: () => import('app/views/pages/form-management/metabolic-disorder/metabolic-disorder.module').then(m => m.MetabolicDisorderModule)
             },{
				path: 'osteoporosis',
				loadChildren: () => import('app/views/pages/form-management/osteoporosis/osteoporosis.module').then(m => m.OsteoporosisModule)
              },{
				path: 'obesity',
				loadChildren: () => import('app/views/pages/form-management/obesity/obesity.module').then(m => m.ObisityModule)
              },{
	            path: 'vitamin-d',
			    loadChildren: () => import('app/views/pages/form-management/vitamin-d/vitamin-d.module').then(m => m.VitaminDModule)
               },{
	            path: 't1d',
			    loadChildren: () => import('app/views/pages/form-management/t1d/t1d.module').then(m => m.T1dModule)
               },{
	            path: 'substance-dependence',
			    loadChildren: () => import('app/views/pages/form-management/substance-dependence/substance.module').then(m => m.SubstanceModule)
               },{
	            path: 'diabetes',
			    loadChildren: () => import('app/views/pages/form-management/diabetes/diabetes.module').then(m => m.DiabetesModule)
			   }

		]
	}
];

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		PartialsModule,
		RouterModule.forChild(routes),
		FormsModule,
		ReactiveFormsModule,
		TranslateModule.forChild(),
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

	],
	providers: [
		//InterceptService,
		//{
		//	provide: HTTP_INTERCEPTORS,
		//	useClass: InterceptService,
		//	multi: true
		//},
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: {
				hasBackdrop: true,
				panelClass: 'kt-mat-dialog-container__wrapper',
				height: 'auto',
				width: '900px'
			}
		},
		HttpUtilsService,
		TypesUtilsService,
		LayoutUtilsService
	],
	entryComponents: [
		ActionNotificationComponent,
	],
	declarations: [
		EFormsComponent,



		// Reporting Tool
		ReportingToolComponent,
		ReportingToolChildComponent




]
})
export class EFormsModule { }
