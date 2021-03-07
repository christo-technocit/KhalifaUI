
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

import { HsaPersonalDetailsComponent } from '../_subs/personal-details/personal-details.component';
import { HsaLifestyleDetailsComponent } from '../_subs/lifestyle-details/lifestyle-details.component';
import { HsaFamilyHistoryComponent } from '../_subs/family-history/family-history.component';
import { HsaMedicalHistoryComponent } from '../_subs/medical-history/medical-history.component';
import { HsaMedicalDetailsComponent } from '../_subs/medical-details/medical-details.component';
import { HsaClinicalDetailsComponent } from '../_subs/clinical-details/clinical-details.component';
import { HsaDiabetesSelfManagementComponent } from '../_subs/diabetes-self-management/diabetes-self-management.component';
import { HsaCognitiveTestResultComponent } from '../_subs/cognitive-test-result/cognitive-test-result.component';
import { HsaLaboratoryDetailsComponent } from '../_subs/laboratory-details/laboratory-details.component';
import { HsaBiochemicalComponent } from '../_subs/biochemical/biochemical.component';
import { HsaMedicationComponent } from '../_subs/medication/medication.component';
import { HsaFamilyPedigreeComponent } from '../_subs/family-pedigree/family-pedigree.component';
import { HsaPhysicalMeasurementsComponent } from '../_subs/physical-measurements/physical-measurements.component';
@Component({
  selector: 'kt-hsa-print',
  templateUrl: './hsa-print.component.html',
  styleUrls: ['./hsa-print.component.scss']
})
export class HsaPrintComponent implements OnInit {

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

  @ViewChild('appHsaPersonalDetails',{ static: false })appHsaPersonalDetails: HsaPersonalDetailsComponent;
	@ViewChild('appHsaLifeStyleDetails',{ static: false })appHsaLifeStyleDetails: HsaLifestyleDetailsComponent;
	@ViewChild('appHsaFamilyHistory',{ static: false })appHsaFamilyHistory: HsaFamilyHistoryComponent;
	@ViewChild('appHsaFamilyPedigree',{ static: false })appHsaFamilyPedigree: HsaFamilyPedigreeComponent;
	@ViewChild('appHsaMedicalHistory',{ static: false })appHsaMedicalHistory: HsaMedicalHistoryComponent;
	@ViewChild('appHsaMedicalDetails',{ static: false })appHsaMedicalDetails: HsaMedicalDetailsComponent;
	@ViewChild('appHsaDiabetesSelfManagement',{ static: false })appHsaDiabetesSelfManagement: HsaDiabetesSelfManagementComponent;
	@ViewChild('appHsaPhysicalMeasurements',{ static: false })appHsaPhysicalMeasurements: HsaPhysicalMeasurementsComponent;
	@ViewChild('appHsaClinicalDetails',{ static: false })appHsaClinicalDetails: HsaClinicalDetailsComponent;
	@ViewChild('appHsaMedicationDetails',{ static: false })appHsaMedicationDetails: HsaMedicationComponent;
	@ViewChild('appHsaBiochemical',{ static: false })appHsaBiochemical: HsaBiochemicalComponent;
	@ViewChild('appHsaCognitiveTestResult',{ static: false })appHsaCognitiveTestResult: HsaCognitiveTestResultComponent;
    @ViewChild('appHsaLaboratoryDetails',{ static: false })appHsaLaboratoryDetails: HsaLaboratoryDetailsComponent;



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
		this.subheaderService.setTitle('Precision Medicine in Type 2 (Long)');
		this.subheaderService.showPrintButton(true);
	}


	onSubmit() {
		if(this.selectedTab == 0){
      this.appHsaPersonalDetails.onSubmit();
    }
    else if(this.selectedTab == 1){
			this.appHsaLifeStyleDetails.onSubmit();
    }
    else if(this.selectedTab == 2){
			this.appHsaFamilyHistory.onSubmit();
    }
    else if(this.selectedTab == 3){
			this.appHsaFamilyPedigree.onSubmit();
    }
     else if(this.selectedTab == 4){
		 	this.appHsaMedicalDetails.onSubmit();
     }
	else if (this.selectedTab == 5) {
			this.appHsaDiabetesSelfManagement.onSubmit();
    }
    else if(this.selectedTab == 6){
			this.appHsaPhysicalMeasurements.onSubmit();
    }
    else if(this.selectedTab == 7){
		 	this.appHsaClinicalDetails.onSubmit();
		 }
		 else if (this.selectedTab == 8) {
				 this.appHsaMedicationDetails.onSubmit();
		 }
    else if(this.selectedTab == 9){
			this.appHsaBiochemical.onSubmit();
		}
	else if(this.selectedTab == 10){
			this.appHsaCognitiveTestResult.onSubmit();
    }
    else if(this.selectedTab == 11){
			this.appHsaLaboratoryDetails.onSubmit();
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
