// Angular
import { Component, OnInit, OnDestroy , ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, startWith, delay, first } from 'rxjs/operators';

import { SubheaderService, LayoutConfigService } from '../../../../../core/_base/layout';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
// Services and Models
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
import {NewFamilyInformationComponent} from "../_subs/family-information/family-information.component";
import {NewBiochemicalComponent} from "../_subs/biochemical/biochemical.component";
import {NewFamilyPedigreeComponent} from "../_subs/family-pedigree/family-pedigree.component";
import {NewLaboratoryDetailsComponent} from "../_subs/laboratory-details/laboratory-details.component";
import {NewLifestyleDetailsComponent} from "../_subs/lifestyle-details/lifestyle-details.component";
import {NewMedicalDetailsComponent} from "../_subs/medical-details/medical-details.component";
import {NewMedicalEducationComponent} from "../_subs/medical-education/medical-education.component";
import {NewMedicalStatusComponent} from "../_subs/medical-status/medical-status.component";
import {NewMedicationComponent} from "../_subs/medication/medication.component";
import {NewPersonalDetailsComponent} from "../_subs/personal-details/personal-details.component";
import {NewPhysicalMeasurementsComponent} from "../_subs/physical-measurements/physical-measurements.component";
import {DocUploadComponent} from "../_subs/doc-upload/doc-upload.component";
@Component({
  selector: 'kt-new-form-edit',
  templateUrl: './new-form-edit.component.html'
})
export class NewFormEditComponent implements OnInit, OnDestroy {

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

    @ViewChild('appNewFamilyInformation',{ static: false })appNewFamilyInformation: NewFamilyInformationComponent;
	@ViewChild('appNewBiochemical',{ static: false })appNewBiochemical: NewBiochemicalComponent;
	@ViewChild('appNewFamilyPedigree',{ static: false })appNewFamilyPedigree: NewFamilyPedigreeComponent;
	@ViewChild('appNewLaboratoryDetails',{ static: false })appNewLaboratoryDetails: NewLaboratoryDetailsComponent;
	@ViewChild('appNewLifestyleDetails',{ static: false })appNewLifestyleDetails: NewLifestyleDetailsComponent;
	@ViewChild('appNewMedicalDetails',{ static: false })appNewMedicalDetails: NewMedicalDetailsComponent;
	@ViewChild('appNewMedicalEducation',{ static: false })appNewMedicalEducation: NewMedicalEducationComponent;
	@ViewChild('appNewMedicalStatus',{ static: false })appNewMedicalStatus: NewMedicalStatusComponent;
    @ViewChild('appNewMedication',{ static: false })appNewMedication: NewMedicationComponent;
	@ViewChild('appNewPersonalDetails',{ static: false })appNewPersonalDetails: NewPersonalDetailsComponent;
	@ViewChild('appNewPhysicalMeasurements',{ static: false })appNewPhysicalMeasurements: NewPhysicalMeasurementsComponent;
	@ViewChild('appDocUpload',{ static: false })appDocUpload: DocUploadComponent;



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
		this.subheaderService.setTitle('Emirates Family Registry');
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}


	reset(){

	}

	onSubmit() {
		if(this.selectedTab == 0){
      this.appNewPersonalDetails.onSubmit();
    }
    else if(this.selectedTab == 1){
			this.appNewPhysicalMeasurements.onSubmit();
    }
    else if(this.selectedTab == 2){
			this.appNewMedicalEducation.onSubmit();
    }
     else if(this.selectedTab == 3){
		 	this.appNewMedicalStatus.onSubmit();
     }
    else if(this.selectedTab == 4){
		 	this.appNewMedicalDetails.onSubmit();
		 }
	else if (this.selectedTab == 5) {
			this.appNewMedication.onSubmit();
    }
    else if(this.selectedTab == 6){
			this.appNewBiochemical.onSubmit();
		}
	else if(this.selectedTab == 7){
			this.appNewLifestyleDetails.onSubmit();
    }
    else if(this.selectedTab == 8){
			this.appNewFamilyInformation.onSubmit();
    }
    else if(this.selectedTab == 9){
			this.appNewFamilyPedigree.onSubmit();
    }
    else if(this.selectedTab == 10){
			this.appNewLaboratoryDetails.onSubmit();
		} else if(this.selectedTab == 11){
			this.appDocUpload.onSubmit();
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
