

// Angular
import { Component, OnInit, OnDestroy , ViewChild, Input} from '@angular/core';
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
// import { HsaLifestyleDetailsComponent } from '@components/hsa/_subs/lifestyle-details/lifestyle-details.component';
// import { HsaPersonalDetailsComponent } from '@components/hsa/_subs/personal-details/personal-details.component';
//  import { HsaMedicalDetailsComponent } from '@components/hsa/_subs/medical-details/medical-details.component';
// import { HsaFamilyHistoryComponent } from '@components/hsa/_subs/family-history/family-history.component';
// import { HsaClinicalDetailsComponent } from '@components/hsa/_subs/clinical-details/clinical-details.component';
// import { HsaDiabetesSelfManagementComponent } from '@components/hsa/_subs/diabetes-self-management/diabetes-self-management.component';
// import { HsaBiochemicalComponent } from '@components/hsa/_subs/biochemical/biochemical.component';
// import { HsaCognitiveTestResultComponent } from '@components/hsa/_subs/cognitive-test-result/cognitive-test-result.component';
// import { HsaDFIFFQComponent } from '@components/hsa/_subs/DFIFFQ/DFIFFQ.component';

import {DocUploadComponent} from "@components/covid19V2/_subs/doc-upload/doc-upload.component";
import { covid19V2PersonalDetailsComponent } from '@components/covid19V2/_subs/personal-details/personal-details.component';

import { covid19V2TreatmentregimenComponent } from '@components/covid19V2/_subs/Treatmentregimen/Treatmentregimen.component';

import { covid19V2ClinicalInformationComponent } from '@components/covid19V2/_subs/clinical-information/clinical-information.component';
import { covid19V2ClinicalDetailsComponent } from '@components/covid19V2/_subs/clinical-details/clinical-details.component';
import { covid19V2DFIFFQComponent } from '@components/covid19V2/_subs/DFIFFQ/DFIFFQ.component';
import { covid19V2ClinicalOutcomeComponent } from '@components/covid19V2/_subs/ClinicalOutcome/ClinicalOutcome.component';



@Component({
  selector: 'kt-covid19V2-edit',
  templateUrl: './covid19V2-edit.component.html'
})
export class covid19V2EditComponent implements OnInit, OnDestroy {

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

    @ViewChild('appcovid19V2PersonalDetails',{ static: false })appcovid19V2PersonalDetails: covid19V2PersonalDetailsComponent;
	
	@ViewChild('appcovid19V2ClinicalDetails',{ static: false })appcovid19V2ClinicalDetails: covid19V2ClinicalDetailsComponent;
	@ViewChild('appcovid19V2ClinicalInformation',{ static: false })appcovid19V2ClinicalInformation: covid19V2ClinicalInformationComponent;
	
	@ViewChild('appcovid19V2ClinicalOutcome',{ static: false })appcovid19V2ClinicalOutcome: covid19V2ClinicalOutcomeComponent;
	@ViewChild('appcovid19V2DFIFFQ',{ static: false })appcovid19V2DFIFFQ: covid19V2DFIFFQComponent;
	@ViewChild('appcovid19V2Treatmentregimen',{ static: false })appcovid19V2Treatmentregimen: covid19V2TreatmentregimenComponent;
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
		this.subheaderService.setTitle('covid19V2');
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}


	reset(){

	}

	onSubmit() {
		if(this.selectedTab == 0){
      this.appcovid19V2PersonalDetails.onSubmit();
    }
 
    else if(this.selectedTab == 1){
			this.appcovid19V2ClinicalDetails.onSubmit();
    }
	else if (this.selectedTab == 2) {
		this.appcovid19V2ClinicalOutcome.onSubmit();
}
    else if(this.selectedTab == 3){
			this.appcovid19V2ClinicalInformation.onSubmit();
    }
    else if(this.selectedTab == 4){
			this.appcovid19V2DFIFFQ.onSubmit();
	} 
	else if(this.selectedTab == 5){
		this.appcovid19V2Treatmentregimen.onSubmit();
} 
	else if(this.selectedTab == 6){
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
