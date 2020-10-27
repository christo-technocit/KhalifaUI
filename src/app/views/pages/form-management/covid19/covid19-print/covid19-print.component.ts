
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

import { Covid19PersonalDetailsComponent } from '../_subs/personal-details/personal-details.component';
import { Covid19ExposureSitesComponent } from '../_subs/exposure-sites/exposure-sites.component';
import { Covid19MicrobiomeComponent } from '../_subs/Microbiome/Microbiome.component';
import { Covid19ClinicalInformationComponent } from '../_subs/clinical-information/clinical-information.component';
import { Covid19ClinicalDetailsComponent } from '../_subs/clinical-details/clinical-details.component';
import { Covid19LaboratoryDetailsComponent } from '../_subs/laboratory-details/laboratory-details.component';
import { Covid19PossibleContactsComponent } from '../_subs/possible-contacts/possible-contacts.component';
import { Covid19RiskHistoryComponent } from '../_subs/risk-history/risk-history.component';

@Component({
  selector: 'kt-covid19-print',
  templateUrl: './covid19-print.component.html'
})
export class Covid19PrintComponent implements OnInit,OnDestroy {

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


	initTitle() {
		this.subheaderService.setTitle('Covid-19');
		this.subheaderService.showPrintButton(true);
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
