// Angular
import { Component, OnInit, OnDestroy , ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';

import { SubheaderService, LayoutConfigService } from '../../../../../core/_base/layout';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import {ObParticipantPersonalComponent} from "../_subs/ob-participant-personal/ob-participant-personal.component";
import {ObClinicalDetailsComponent} from "../_subs/ob-clinical-details/ob-clinical-details.component";
import {ObMedicationsComponent} from "../_subs/ob-medications/ob-medications.component";
import {ObOneMinuteRiskTestComponent} from "../_subs/ob-one-minute-risk-test/ob-one-minute-risk-test.component";
import {ObFamilyHistoryComponent} from "../_subs/ob-family-history/ob-family-history.component";
import {ObBiochemicalDetailsComponent} from "../_subs/ob-biochemical-details/ob-biochemical-details.component";
import {DocUploadComponent} from "../_subs/doc-upload/doc-upload.component";

@Component({
  selector: 'kt-osteoporosis-form',
  templateUrl: './osteoporosis-form.component.html',
  styleUrls: ['./osteoporosis-form.component.scss']
})
export class OsteoporosisFormComponent implements OnInit {

  selectedTab: number = 0;
  loading$: Observable<boolean>;
  hasFormErrors: boolean = false;
  formId : number;
  isLoading : boolean;
  isPrint : boolean = false;
  private subscriptions: Subscription[] = [];

  @ViewChild('appParticipation',{ static: false })appParticipation: ObParticipantPersonalComponent;
  @ViewChild('appClinical',{ static: false })appClinical: ObClinicalDetailsComponent;
  @ViewChild('appBiochemical',{ static: false })appBiochemical: ObBiochemicalDetailsComponent;
  @ViewChild('appMedications',{ static: false })appMedications: ObMedicationsComponent;
  @ViewChild('appOneMinuteRiskTest',{ static: false })appOneMinuteRiskTest: ObOneMinuteRiskTestComponent;
  @ViewChild('appFamilyHistory',{ static: false })appFamilyHistory: ObFamilyHistoryComponent;
  @ViewChild('appDocUpload',{ static: false })appDocUpload: DocUploadComponent;


  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private subheaderService: SubheaderService
  ) { this.selectedTab = 0; }


  ngOnInit() {
    const routeSubscription =  this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(id) {
        this.isLoading = true;
        this.formId = id;

      }
    });
    this.subheaderService.setTitle('Osteoporosis');
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
      this.appMedications.onSubmit();
    }else if(this.selectedTab == 4){
      this.appOneMinuteRiskTest.onSubmit();
    }else if(this.selectedTab == 5){
      this.appFamilyHistory.onSubmit();
    }else if(this.selectedTab == 6){
      this.appDocUpload.onSubmit();
    }
  }



}
