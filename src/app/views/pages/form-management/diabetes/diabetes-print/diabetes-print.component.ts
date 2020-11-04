
import { Component, OnInit, OnDestroy , ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, startWith, delay, first } from 'rxjs/operators';

import { SubheaderService, LayoutConfigService } from '../../../../../core/_base/layout';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import {
	EForm,
	FormUpdated,
	// Address,
	// SocialNetworks,
	selectHasFormsInStore,
	selectFormById,
	FormOnServerCreated,
	selectLastCreatedFormId,
	selectFormsActionLoading
} from '../../../../../core/forms';

import { DiabetesPersonalDetailsComponent } from '../_subs/personal-details/personal-details.component';
import { DiabetesLifestyleDetailsComponent } from '../_subs/lifestyle-details/lifestyle-details.component';
import { DiabetesFamilyHistoryComponent } from '../_subs/family-history/family-history.component';
import { DiabetesMedicalDetailsComponent } from '../_subs/medical-details/medical-details.component';
import { DiabetesClinicalDetailsComponent } from '../_subs/clinical-details/clinical-details.component';
import { DiabetesDiabetesSelfManagementComponent } from '../_subs/diabetes-self-management/diabetes-self-management.component';
import { DiabetesCognitiveTestResultComponent } from '../_subs/cognitive-test-result/cognitive-test-result.component';
import { DiabetesLaboratoryDetailsComponent } from '../_subs/laboratory-details/laboratory-details.component';
import { DiabetesBiochemicalComponent } from '../_subs/biochemical/biochemical.component';
import { DiabetesMedicationComponent } from '../_subs/medication/medication.component';
import { DiabetesFamilyPedigreeComponent } from '../_subs/family-pedigree/family-pedigree.component';
import { DiabetesPhysicalMeasurementsComponent } from '../_subs/physical-measurements/physical-measurements.component';
@Component({
  selector: 'kt-diabetes-print',
  templateUrl: './diabetes-print.component.html',
  styleUrls: ['./diabetes-print.component.scss']
})
export class DiabetesPrintComponent implements OnInit {

	selectedTab: number = 0;
	loading$: Observable<boolean>;
	eformForm: FormGroup;
	hasFormErrors: boolean = false;
	filteredNationalities: Observable<string[]>;
	// Private properties
	formId : number;
	isLoading : boolean;
	isPrint : boolean = false;
	private subscriptions: Subscription[] = [];

  @ViewChild('appDiabetesPersonalDetails',{ static: false })appDiabetesPersonalDetails: DiabetesPersonalDetailsComponent;
	@ViewChild('appDiabetesLifeStyleDetails',{ static: false })appDiabetesLifeStyleDetails: DiabetesLifestyleDetailsComponent;
	@ViewChild('appDiabetesFamilyHistory',{ static: false })appDiabetesFamilyHistory: DiabetesFamilyHistoryComponent;
	@ViewChild('appDiabetesFamilyPedigree',{ static: false })appDiabetesFamilyPedigree: DiabetesFamilyPedigreeComponent;
	@ViewChild('appDiabetesMedicalDetails',{ static: false })appDiabetesMedicalDetails: DiabetesMedicalDetailsComponent;
	@ViewChild('appDiabetesDiabetesSelfManagement',{ static: false })appDiabetesDiabetesSelfManagement: DiabetesDiabetesSelfManagementComponent;
	@ViewChild('appDiabetesPhysicalMeasurements',{ static: false })appDiabetesPhysicalMeasurements: DiabetesPhysicalMeasurementsComponent;
	@ViewChild('appDiabetesClinicalDetails',{ static: false })appDiabetesClinicalDetails: DiabetesClinicalDetailsComponent;
	@ViewChild('appDiabetesMedicationDetails',{ static: false })appDiabetesMedicationDetails: DiabetesMedicationComponent;
	@ViewChild('appDiabetesBiochemical',{ static: false })appDiabetesBiochemical: DiabetesBiochemicalComponent;
	@ViewChild('appDiabetesCognitiveTestResult',{ static: false })appDiabetesCognitiveTestResult: DiabetesCognitiveTestResultComponent;
    @ViewChild('appDiabetesLaboratoryDetails',{ static: false })appDiabetesLaboratoryDetails: DiabetesLaboratoryDetailsComponent;



	constructor(private activatedRoute: ActivatedRoute,
		private router: Router,
		private subheaderService: SubheaderService,
		private layoutUtilsService: LayoutUtilsService,
		private layoutConfigService: LayoutConfigService) { this.selectedTab = 0; }

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		const routeSubscription =  this.activatedRoute.params.subscribe(params => {
			const id = params['id'];
			if(id) {
				this.isLoading = true;
				this.formId = id;

			}
		});

		this.initTitle();
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}


	reset(){

	}

	initTitle() {
		this.subheaderService.setTitle('Diabetes');
		this.subheaderService.showPrintButton(true);
	}


	onSubmit() {
		if(this.selectedTab == 0){
      this.appDiabetesPersonalDetails.onSubmit();
    }
    else if(this.selectedTab == 1){
			this.appDiabetesLifeStyleDetails.onSubmit();
    }
    else if(this.selectedTab == 2){
			this.appDiabetesFamilyHistory.onSubmit();
    }
    else if(this.selectedTab == 3){
			this.appDiabetesFamilyPedigree.onSubmit();
    }
     else if(this.selectedTab == 4){
		 	this.appDiabetesMedicalDetails.onSubmit();
     }
	else if (this.selectedTab == 5) {
			this.appDiabetesDiabetesSelfManagement.onSubmit();
    }
    else if(this.selectedTab == 6){
			this.appDiabetesPhysicalMeasurements.onSubmit();
    }
    else if(this.selectedTab == 7){
		 	this.appDiabetesClinicalDetails.onSubmit();
		 }
		 else if (this.selectedTab == 8) {
				 this.appDiabetesMedicationDetails.onSubmit();
		 }
    else if(this.selectedTab == 9){
			this.appDiabetesBiochemical.onSubmit();
		}
	else if(this.selectedTab == 10){
			this.appDiabetesCognitiveTestResult.onSubmit();
    }
    else if(this.selectedTab == 11){
			this.appDiabetesLaboratoryDetails.onSubmit();
    }
	}

    //
	//	const editedForm = this.prepareForm();
    //
	//	if (editedForm.id > 0) {
	//		this.updateForm(editedForm, withBack);
	//		return;
	//	}
    //
	//	this.addForm(editedForm, withBack);
	//}

	/**
	 * Returns prepared data for save
	 */

	/**
	 * Returns component title
	 */
	//getComponentTitle() {
	//	let result = 'Create form';
	//	if (!this.eform || !this.eform.id) {
	//		return result;
	//	}
    //
	//	result = `Edit form - ${this.eform.sampleId}`;
	//	return result;
	//}

	/**
	 * Close Alert
	 *
	 * @param $event: Event
	 */
	//onAlertClose($event) {
	//	this.hasFormErrors = false;
	//}

		/**
	 * Filter nationality
	 *
	 * @param val: string
	 */

}