// Angular
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
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


// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment} from 'moment';
import {ComponentInteractionService} from "../../../../../core/services/component-interaction.service";
import {T1DClinicalDetails} from "../_subs/t1d-clinical-details/t1d-clinical-details";
import {T1DFamilyHistory} from "../_subs/t1d-family-history/t1d-family-history";
import {T1DLifeStyles} from "../_subs/t1d-life-styles/t1d-life-styles";
import {T1DParticipationComponent} from "../_subs/t1d-participation-details/t1d-participation-details";
import {T1DMedication} from "../_subs/t1d-medication/t1d-medication";
import {T1DPedigree} from "../_subs/t1d-pedigree/t1d-pedigree";
import {T1DBiochemicalDetails} from "../_subs/t1d-biochemical-details/t1d-biochemical-details"
import {VitamindService} from "@services/vitamind.form.service";
import {DocUploadComponent} from "../_subs/doc-upload/doc-upload.component";

@Component({
    selector: 'kt-t1d-form',
    templateUrl: './t1d-form.html'
})
export class T1DFormComponent implements OnInit, OnDestroy {
    // Public properties
    formId : number;
    formValues : any;
    selectedTab: number = 0;
    isLoading : boolean = true;
    isPrint : boolean = false;
    isEdit : boolean = true;
    private subscriptions: Subscription[] = [];
    @ViewChild('appParticipation',{ static: false })appParticipation: T1DParticipationComponent;
    @ViewChild('appClinical',{ static: false })appClinical: T1DClinicalDetails;
    @ViewChild('appMedication',{ static: false })appMedication: T1DMedication;
    @ViewChild('appLifeStyle',{ static: false })appLifeStyle: T1DLifeStyles;
    @ViewChild('appFamilyHistory',{ static: false })appFamilyHistory: T1DFamilyHistory;
    @ViewChild('appPedigree',{ static: false })appPedigree: T1DPedigree;
    @ViewChild('appBiochemicalDetails',{ static: false })appBiochemicalDetails: T1DBiochemicalDetails;
    @ViewChild('appDocUpload',{ static: false })appDocUpload: DocUploadComponent;

    /**
     * Component constructor
     *
     * @param activatedRoute: ActivatedRoute
     * @param router: Router
     * @param eformFB: FormBuilder
     * @param subheaderService: SubheaderService
     * @param layoutUtilsService: LayoutUtilsService
     * @param store: Store<AppState>
     * @param layoutConfigService: LayoutConfigService
     */
    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private eformFB: FormBuilder,
                private subheaderService: SubheaderService,
                private layoutUtilsService: LayoutUtilsService,
                private _vService : VitamindService,
                private _interactionService : ComponentInteractionService,
                private layoutConfigService: LayoutConfigService) { }

    ngOnInit() {
        const routeSubscription =  this.activatedRoute.params.subscribe(params => {
            const id = params['id'];
          if(id) {
              this.isLoading = true;
              this.formId = id;

          }
        });
      //  this.initForm();
      //  this._interactionService._Refid$.subscribe((id)=>{  this.VForm1.patchValue({"3_id" : id}); })
    }



    ngOnDestroy() {
        this._interactionService.sendRefId(undefined);
    }
    /**
     * Init form
     */
    initForm() {
        this.subheaderService.setTitle('Create T1D Form');

    }

    reset() {
        if (this.selectedTab == 0){
            this.appParticipation.createForm()
        }else if(this.selectedTab == 1){
            this.appClinical.createForm();
        }else if(this.selectedTab == 2){
            this.appBiochemicalDetails.createForm();
        }else if(this.selectedTab == 3){
            this.appLifeStyle.createForm();
        }else if(this.selectedTab == 4){
            this.appMedication.createForm();
        }else if(this.selectedTab == 5){
            this.appFamilyHistory.createForm();
        }else if(this.selectedTab == 6){
            this.appPedigree.createForm();
    }
        
    }

    /**
     * Save data
     *
     * @param withBack: boolean
     */
    onSumbit(withBack: boolean = false) {
        if (this.selectedTab == 0){
            this.appParticipation.onSubmit();
       }else if(this.selectedTab == 1){
            this.appClinical.onSubmit();
        }else if(this.selectedTab == 2){
            this.appBiochemicalDetails.onSubmit();
        }else if(this.selectedTab == 3){
            this.appLifeStyle.onSubmit();
        }else if(this.selectedTab == 4){
            this.appMedication.onSubmit();
        }else if(this.selectedTab == 5){
            this.appFamilyHistory.onSubmit();
        }else if(this.selectedTab == 6){
            this.appPedigree.onSubmit();
          }else if(this.selectedTab == 7){
            this.appDocUpload.onSubmit();

       }
    }


}
