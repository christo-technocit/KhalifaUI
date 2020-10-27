// Angular
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup,FormControl , Validators } from '@angular/forms';
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


// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment} from 'moment';
import {VitamindService} from "@services/vitamind.form.service";
import {ComponentInteractionService} from "@services/component-interaction.service";
import {VitaminDClinicalDetails} from "../_subs/vitamin-d-clinical-details/vitamin-d-clinical-details";
import {VitaminDFamilyHistory} from "../_subs/vitamin-d-family-history/vitamin-d-family-history";
import {VitaminDLifeStyles} from "../_subs/vitamin-d-life-styles/vitamin-d-life-styles";
import {VitaminDParticipationComponent} from "../_subs/vitamin-d-participation-details/vitamin-d-participation-details";
import {DocUploadComponent1} from "../_subs/doc-upload/doc-upload.component";

@Component({
    selector: 'kt-vitamin-d-form',
    templateUrl: './vitamin-d-form.html'
})
export class VitaminDFormComponent implements OnInit, OnDestroy {
    // Public properties
    formId : number;
    formValues : any;
    selectedTab: number = 0;
    isLoading : boolean = true;
    isPrint : boolean = false;
    isEdit : boolean = true;
    private subscriptions: Subscription[] = [];
    @ViewChild('appParticipation',{ static: false })appParticipation: VitaminDParticipationComponent;
    @ViewChild('appClinical',{ static: false })appClinical: VitaminDClinicalDetails;
    @ViewChild('appLifeStyle',{ static: false })appLifeStyle: VitaminDLifeStyles;
    @ViewChild('appFamilyHistory',{ static: false })appFamilyHistory: VitaminDFamilyHistory;
    @ViewChild('appDocUpload',{ static: false })appDocUpload: DocUploadComponent1;
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
       this.initForm();
      //  this._interactionService._Refid$.subscribe((id)=>{  this.VForm1.patchValue({"3_id" : id}); })
    }



    ngOnDestroy() {
        this._interactionService.sendRefId(undefined);
    }
    /**
     * Init form
     */
    initForm() {
        this.subheaderService.setTitle('Vitamin-D');

    }

    reset() {
        if (this.selectedTab == 0){
            this.appParticipation.createForm()
        }else if(this.selectedTab == 1){
            this.appClinical.createForm();
        }else if(this.selectedTab == 2){
            this.appLifeStyle.createForm();
        }else if(this.selectedTab == 3){
            this.appFamilyHistory.createForm();
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
            this.appLifeStyle.onSubmit();
        }else if(this.selectedTab == 3){
            this.appFamilyHistory.onSubmit();
        }else if(this.selectedTab == 4){
            this.appDocUpload.onSubmit();
        }
    }


}
