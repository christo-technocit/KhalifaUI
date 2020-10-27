

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
// import { HsaLaboratoryDetailsComponent } from '@components/hsa/_subs/laboratory-details/laboratory-details.component';

import {DocUploadComponent} from "@components/covid19/_subs/doc-upload/doc-upload.component";
import { Covid19PersonalDetailsComponent } from '@components/covid19/_subs/personal-details/personal-details.component';
import { Covid19ExposureSitesComponent } from '@components/covid19/_subs/exposure-sites/exposure-sites.component';
import { Covid19MicrobiomeComponent } from '@components/covid19/_subs/Microbiome/Microbiome.component';

import { Covid19ClinicalInformationComponent } from '@components/covid19/_subs/clinical-information/clinical-information.component';
import { Covid19ClinicalDetailsComponent } from '@components/covid19/_subs/clinical-details/clinical-details.component';
import { Covid19LaboratoryDetailsComponent } from '@components/covid19/_subs/laboratory-details/laboratory-details.component';
import { Covid19PossibleContactsComponent } from '@components/covid19/_subs/possible-contacts/possible-contacts.component';
import { Covid19RiskHistoryComponent } from '@components/covid19/_subs/risk-history/risk-history.component';


@Component({
  selector: 'kt-covid19-edit',
  templateUrl: './covid19-edit.component.html'
})
export class Covid19EditComponent implements OnInit, OnDestroy {

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

    @ViewChild('appCovid19PersonalDetails',{ static: false })appCovid19PersonalDetails: Covid19PersonalDetailsComponent;
	@ViewChild('appCovid19RiskHistory',{ static: false })appCovid19RiskHistory: Covid19RiskHistoryComponent;
	@ViewChild('appCovid19ClinicalDetails',{ static: false })appCovid19ClinicalDetails: Covid19ClinicalDetailsComponent;
	@ViewChild('appCovid19ClinicalInformation',{ static: false })appCovid19ClinicalInformation: Covid19ClinicalInformationComponent;
	@ViewChild('appCovid19ExposureSites',{ static: false })appCovid19ExposureSites: Covid19ExposureSitesComponent;
	@ViewChild('appCovid19PossibleContacts',{ static: false })appCovid19PossibleContacts: Covid19PossibleContactsComponent;
	@ViewChild('appCovid19LaboratoryDetails',{ static: false })appCovid19LaboratoryDetails: Covid19LaboratoryDetailsComponent;
	@ViewChild('appCovid19Microbiome',{ static: false })appCovid19Microbiome: Covid19MicrobiomeComponent;
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
		this.subheaderService.setTitle('Covid-19');
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}


	reset(){

	}

	onSubmit() {
		if(this.selectedTab == 0){
      this.appCovid19PersonalDetails.onSubmit();
    }
    else if(this.selectedTab == 1){
			this.appCovid19RiskHistory.onSubmit();
    }
    else if(this.selectedTab == 2){
			this.appCovid19ClinicalDetails.onSubmit();
    }
    else if(this.selectedTab == 3){
			this.appCovid19ClinicalInformation.onSubmit();
    }
     else if(this.selectedTab == 4){
		 	this.appCovid19ExposureSites.onSubmit();
     }
	else if (this.selectedTab == 5) {
			this.appCovid19PossibleContacts.onSubmit();
    }
    else if(this.selectedTab == 6){
			this.appCovid19LaboratoryDetails.onSubmit();
	} 
	else if(this.selectedTab == 7){
		this.appCovid19Microbiome.onSubmit();
} 
	else if(this.selectedTab == 8){
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
