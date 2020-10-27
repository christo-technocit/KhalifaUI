// Angular
import { Component, OnInit, OnDestroy , ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';

import { SubheaderService, LayoutConfigService } from '../../../../../core/_base/layout';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';

import {AgParticipantPersonalComponent} from "../_subs/ag-participant-personal/ag-participant-personal.component";
import {AgParticipantLifestyleComponent} from "../_subs/ag-participant-lifestyle/ag-participant-lifestyle.component";
import {AgElectrocardiographyComponent} from "../_subs/ag-electrocardiography/ag-electrocardiography.component";
import {AgParticipantClinicalComponent} from "../_subs/ag-participant-clinical/ag-participant-clinical.component";
import {AgFamilyPedigreeComponent} from "../_subs/ag-family-pedigree/ag-family-pedigree.component";
import {AgFamilyHistoryComponent} from "../_subs/ag-family-history/ag-family-history.component";
import {AgParticipantMedicalHistoryComponent} from "../_subs/ag-participant-medical-history/ag-participant-medical-history.component";
import {AgParticipantFoodIntakeComponent} from "../_subs/ag-participant-food-intake/ag-participant-food-intake.component";

@Component({
  selector: 'kt-k1000-arab-genone-print',
  templateUrl: './k1000-arab-genone-print.component.html',
  styleUrls: ['./k1000-arab-genone-print.component.scss']
})
export class K1000ArabGenonePrintComponent implements OnInit {
  formId : number;
  isLoading : boolean;
  isPrint : boolean = true;
  private subscriptions: Subscription[] = [];

  @ViewChild('appParticipation',{ static: false })appParticipation: AgParticipantPersonalComponent;
  @ViewChild('appLifestyle',{ static: false })appLifestyle: AgParticipantLifestyleComponent;
  @ViewChild('appFoodIntake',{ static: false })appFoodIntake: AgParticipantFoodIntakeComponent;
  @ViewChild('appMedicalHistory',{ static: false })appMedicalHistory: AgParticipantMedicalHistoryComponent;
  @ViewChild('appFamilyHistory',{ static: false })appFamilyHistory: AgFamilyHistoryComponent;
  @ViewChild('appFamilyPedigree',{ static: false })appFamilyPedigree: AgFamilyPedigreeComponent;
  @ViewChild('appClinical',{ static: false })appClinical: AgParticipantClinicalComponent;
  @ViewChild('appElectrocardiography',{ static: false })appElectrocardiography: AgElectrocardiographyComponent;


  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private subheaderService: SubheaderService
  ) {  }


  ngOnInit() {
    const routeSubscription =  this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(id) {
        this.isLoading = true;
        this.formId = id;

      }
    });
    this.subheaderService.setTitle('1000 Arab Genome');
    this.subheaderService.showPrintButton(true);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }
}
