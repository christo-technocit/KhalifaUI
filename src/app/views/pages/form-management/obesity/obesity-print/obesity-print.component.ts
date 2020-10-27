// Angular
import { Component, OnInit, OnDestroy , ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, startWith, delay, first } from 'rxjs/operators';
// NGRX
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AppState } from '../../../../../core/reducers';
// Layout
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
import {ObesityPersonalDetailsComponent} from "../_subs/personal-details/personal-details.component";
import {ObesityClinicalDetailsComponent} from "../_subs/clinical-details/clinical-details.component";
import {ObesityFamilyHistoryComponent} from "../_subs/family-history/family-history.component";
import {ObesityBiochemicalComponent} from "../_subs/biochemical/biochemical.component";
import {ObesityMedicationComponent} from "../_subs/medication/medication.component";
import {ObesityCharacteristicsComponent} from "../_subs/characteristics/characteristics.component";

@Component({
  selector: 'kt-obesity-print',
  templateUrl: './obesity-print.component.html'
})
export class ObesityPrintComponent implements OnInit, OnDestroy {

	selectedTab: number = 0;
	loading$: Observable<boolean>;
	eformForm: FormGroup;
	hasFormErrors: boolean = false;
	filteredNationalities: Observable<string[]>;
	// Private properties
	isLoading : boolean;
	isPrint : boolean = true;
	formId : number;
	private subscriptions: Subscription[] = [];

  @ViewChild('appObesityFamilyHistory',{ static: false })appObesityFamilyHistory: ObesityFamilyHistoryComponent;
	@ViewChild('appObesityBiochemical',{ static: false })appObesityBiochemical: ObesityBiochemicalComponent;
  @ViewChild('appObesityPersonalDetails',{ static: false })appObesityPersonalDetails: ObesityPersonalDetailsComponent;
	@ViewChild('appObesityClinicalDetails',{ static: false })appObesityClinicalDetails: ObesityClinicalDetailsComponent;
  @ViewChild('appObesityMedication',{ static: false })appObesityMedication: ObesityMedicationComponent;
	@ViewChild('appObesityCharacteristics',{ static: false })appObesityCharacteristics: ObesityCharacteristicsComponent;


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

	/**
	 * Init form
	 */
	initTitle() {
		this.subheaderService.setTitle('Obesity Print');
		this.subheaderService.showPrintButton(true);
	}



	onSubmit() {
    if(this.selectedTab == 0){
      this.appObesityPersonalDetails.onSubmit();
    }
    else if(this.selectedTab == 1){
			this.appObesityClinicalDetails.onSubmit();
    }
    else if(this.selectedTab == 2){
      this.appObesityBiochemical.onSubmit();
    }
     else if(this.selectedTab == 3){
			this.appObesityMedication.onSubmit();
     }
    else if(this.selectedTab == 4){
		 	this.appObesityCharacteristics.onSubmit();
		 }
	  else if (this.selectedTab == 5) {
      this.appObesityFamilyHistory.onSubmit();
    }
	}
}

