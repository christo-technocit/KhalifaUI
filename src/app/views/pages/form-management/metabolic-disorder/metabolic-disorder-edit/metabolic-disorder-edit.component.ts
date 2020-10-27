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
import {ParticipantDetailsComponent} from "../_subs/participant-details/participant-details.component";
import {BiochemicalComponent} from "../_subs/biochemical/biochemical.component";
import {BiomechanicsDetailsComponent} from "../_subs/biomechanics-details/biomechanics-details.component";
import {FamilyHistoryDetailsComponent} from "../_subs/family-history-details/family-history-details.component";
import {FamilyPedigreeComponent} from "../_subs/family-pedigree/family-pedigree.component";
import {ClinicalDetailsComponent} from "../_subs/clinical-details/clinical-details.component";
import {LifestyleDetailsComponent} from "../_subs/lifestyle-details/lifestyle-details.component";
import {MedicationDetailsComponent} from "../_subs/medication-details/medication-details.component";
import {DocUploadComponent} from "../_subs/doc-upload/doc-upload.component";

@Component({
  selector: 'kt-metabolic-disorder-edit',
  templateUrl: './metabolic-disorder-edit.component.html'
})
export class MetabolicDisorderEditComponent implements OnInit, OnDestroy {

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

	@ViewChild('appParticipation',{ static: false })appParticipation: ParticipantDetailsComponent;
	@ViewChild('appBiochemical',{ static: false })appBiochemical: BiochemicalComponent;
	@ViewChild('appBiomechanics',{ static: false })appBiomechanics: BiomechanicsDetailsComponent;
	@ViewChild('appClinical',{ static: false })appClinical: ClinicalDetailsComponent;
	@ViewChild('appFamilyHistory',{ static: false })appFamilyHistory: FamilyHistoryDetailsComponent;
	@ViewChild('appFamilyPedigree',{ static: false })appFamilyPedigree: FamilyPedigreeComponent;
	@ViewChild('appLifestyle',{ static: false })appLifestyle: LifestyleDetailsComponent;
	@ViewChild('appMedication',{ static: false })appMedication: MedicationDetailsComponent;
	@ViewChild('appDocUpload',{ static: false })appDocUpload: DocUploadComponent;

	constructor(private activatedRoute: ActivatedRoute,
		private router: Router,
		private subheaderService: SubheaderService
                  ) { this.selectedTab = 0; }

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
		this.subheaderService.setTitle('Metabolic Disorder');
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}


	reset(){

	}

	onSubmit() {
		if (this.selectedTab == 0) {
			this.appParticipation.onSubmit();
		}else if(this.selectedTab == 1){
			this.appClinical.onSubmit();
		}else if(this.selectedTab == 2){
			this.appBiochemical.onSubmit();
		}else if(this.selectedTab == 3){
			this.appLifestyle.onSubmit();
		}else if(this.selectedTab == 4){
			this.appMedication.onSubmit();
		}else if(this.selectedTab == 5){
			this.appFamilyHistory.onSubmit();
		}else if(this.selectedTab == 6){
			this.appFamilyPedigree.onSubmit();
		}else if(this.selectedTab == 7){
			this.appBiomechanics.onSubmit();
		}else if(this.selectedTab == 8){
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
