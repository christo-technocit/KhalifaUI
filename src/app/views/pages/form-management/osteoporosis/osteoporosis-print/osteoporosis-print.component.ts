import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';

import { SubheaderService, LayoutConfigService } from '../../../../../core/_base/layout';

import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';
import {ObParticipantPersonalComponent} from "../_subs/ob-participant-personal/ob-participant-personal.component";
import {ObClinicalDetailsComponent} from "../_subs/ob-clinical-details/ob-clinical-details.component";
import {ObMedicationsComponent} from "../_subs/ob-medications/ob-medications.component";
import {ObOneMinuteRiskTestComponent} from "../_subs/ob-one-minute-risk-test/ob-one-minute-risk-test.component";
import {ObFamilyHistoryComponent} from "../_subs/ob-family-history/ob-family-history.component";
import {ObBiochemicalDetailsComponent} from "../_subs/ob-biochemical-details/ob-biochemical-details.component";


@Component({
  selector: 'kt-osteoporosis-print',
  templateUrl: './osteoporosis-print.component.html',
  styleUrls: ['./osteoporosis-print.component.scss']
})
export class OsteoporosisPrintComponent implements OnInit {

  loading$: Observable<boolean>;
  hasFormErrors: boolean = false;
  formId : number;
  isLoading : boolean;
  isPrint : boolean = true;
  private subscriptions: Subscription[] = [];

  @ViewChild('appParticipation',{ static: false })appParticipation: ObParticipantPersonalComponent;
  @ViewChild('appClinical',{ static: false })appClinical: ObClinicalDetailsComponent;
  @ViewChild('appBiochemical',{ static: false })appBiochemical: ObBiochemicalDetailsComponent;
  @ViewChild('appMedications',{ static: false })appMedications: ObMedicationsComponent;
  @ViewChild('appOneMinuteRiskTest',{ static: false })appOneMinuteRiskTest: ObOneMinuteRiskTestComponent;
  @ViewChild('appFamilyHistory',{ static: false })appFamilyHistory: ObFamilyHistoryComponent;


  constructor(private activatedRoute: ActivatedRoute,
              private subheaderService: SubheaderService,
              private router: Router) { }

  ngOnInit() {
    const routeSubscription =  this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(id) {
        this.isLoading = true;
        this.formId = id;

      }
    });
    this.subheaderService.setTitle('Osteoporosis');
    this.subheaderService.showPrintButton(true);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
