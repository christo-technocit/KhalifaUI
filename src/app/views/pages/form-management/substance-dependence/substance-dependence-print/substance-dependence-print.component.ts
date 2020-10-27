// Angular
import { Component, OnInit, OnDestroy , ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map, startWith, delay, first } from 'rxjs/operators';

import { SubheaderService, LayoutConfigService } from '../../../../../core/_base/layout';

import {SbParticipantDetailsComponent} from "../_subs/sb-participant-details/sb-participant-details.component";
import {SbClinicalDetailsComponent} from "../_subs/sb-clinical-details/sb-clinical-details.component";
import {SbLifeStyleComponent} from "../_subs/sb-life-style/sb-life-style.component";
import {SbMedicalHistoryComponent} from "../_subs/sb-medical-history/sb-medical-history.component";
import {SbDependenceHistoryComponent} from "../_subs/sb-dependence-history/sb-dependence-history.component";
import {SbFamilyHistoryComponent} from "../_subs/sb-family-history/sb-family-history.component";
import {SbTreatmentComponent} from "../_subs/sb-treatment/sb-treatment.component";
import {SbPatientsFollowupComponent} from "../_subs/sb-patients-followup/sb-patients-followup.component";
import {SbTestSectionComponent} from "../_subs/sb-test-section/sb-test-section.component";
import {SbDiabeticPatientsComponent} from "../_subs/sb-diabetic-patients/sb-diabetic-patients.component";
import {SbBiochemicalComponent} from "../_subs/sb-biochemical/sb-biochemical.component";
import {SbMedicationsComponent} from "../_subs/sb-medications/sb-medications.component";
import {SbFamilyHistoryWithoutSbComponent} from "../_subs/sb-family-history-without-sb/sb-family-history-without-sb.component";
@Component({
  selector: 'kt-substance-dependence-print',
  templateUrl: './substance-dependence-print.component.html',
  styleUrls: ['./substance-dependence-print.component.scss']
})
export class SubstanceDependencePrintComponent implements OnInit {

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

  @ViewChild('appParticipation',{ static: false })appParticipation: SbParticipantDetailsComponent;
  @ViewChild('appClinical',{ static: false })appClinical: SbClinicalDetailsComponent;
  @ViewChild('appLifestyle',{ static: false })appLifestyle: SbLifeStyleComponent;
  @ViewChild('appMedical',{ static: false })appMedical: SbMedicalHistoryComponent;
  @ViewChild('appDependence',{ static: false })appDependence: SbDependenceHistoryComponent;
  @ViewChild('appFamily',{ static: false })appFamily: SbFamilyHistoryComponent;
  @ViewChild('appTreatment',{ static: false })appTreatment: SbTreatmentComponent;
  @ViewChild('appTest',{ static: false })appTest: SbTestSectionComponent;
  @ViewChild('appPatients',{ static: false })appPatients: SbPatientsFollowupComponent;
  @ViewChild('appDiabetic',{ static: false })appDiabetic: SbDiabeticPatientsComponent;
  @ViewChild('appBiochemical',{ static: false })appBiochemical: SbBiochemicalComponent;
  @ViewChild('appMedications',{ static: false })appMedications: SbMedicationsComponent;
  @ViewChild('appFamilyWOS',{ static: false })appFamilyWOS: SbFamilyHistoryWithoutSbComponent;
  @ViewChild('appFamilyPedigree',{ static: false })appFamilyPedigree: SbFamilyHistoryWithoutSbComponent;

  constructor(private activatedRoute: ActivatedRoute,
              private subheaderService: SubheaderService
  ) { this.isPrint = true; }


  ngOnInit() {
    const routeSubscription =  this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(id) {
        this.isLoading = true;
        this.formId = id;
      }
    });
    this.subheaderService.setTitle('Substance Dependence Print');
    this.subheaderService.showPrintButton(true);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }



}
