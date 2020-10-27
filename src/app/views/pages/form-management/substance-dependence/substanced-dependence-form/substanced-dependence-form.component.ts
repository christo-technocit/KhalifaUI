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
import {DocUploadComponent} from "../_subs/doc-upload/doc-upload.component";
@Component({
  selector: 'kt-substanced-dependence-form',
  templateUrl: './substanced-dependence-form.component.html',
  styleUrls: ['./substanced-dependence-form.component.scss']
})
export class SubstancedDependenceFormComponent implements OnInit {
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
  @ViewChild('appDocUpload',{ static: false })appDocUpload: DocUploadComponent;

  constructor(private activatedRoute: ActivatedRoute,
              private subheaderService: SubheaderService
             ) { this.selectedTab=0;  }


  ngOnInit() {
    const routeSubscription =  this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(id) {
        this.isLoading = true;
        this.formId = id;

      }
    });
    this.subheaderService.setTitle('Substance Dependence');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }


  reset(){
    //if (this.selectedTab == 0) {
    //  this.appParticipation.reset();
    //}else if(this.selectedTab == 1){
    //  this.appClinical.reset();
    //}else if(this.selectedTab == 2){
    //  this.appLifestyle.reset();
    //}else if(this.selectedTab == 3){
    //  this.appMedical.reset();
    //}else if(this.selectedTab == 4){
    //  this.appDependence.reset();
    //}else if(this.selectedTab == 5){
    //  this.appFamily.reset();
    //}else if(this.selectedTab == 6){
    //  this.appTreatment.reset();
    //}else if(this.selectedTab == 7){
    //  this.appPatients.reset();
    //}else if(this.selectedTab == 8){
    //  this.appTest.reset();
    //}else if(this.selectedTab == 9){
    //  this.appDiabetic.reset();
    //}else if(this.selectedTab ==10){
    //  this.appBiochemical.reset();
    //}else if(this.selectedTab == 11){
    //  this.appMedications.reset();
    //}else if(this.selectedTab == 12){
    //  this.appFamilyWOS.reset();
    //}else if(this.selectedTab == 13){
    //  this.appFamilyPedigree.reset();
    //}
  }

  onSubmit() {
    if (this.selectedTab == 0) {
      this.appParticipation.onSubmit();
    }else if(this.selectedTab == 1){
      this.appClinical.onSubmit();
    }else if(this.selectedTab == 2){
      this.appLifestyle.onSubmit();
    }else if(this.selectedTab == 3){
      this.appMedical.onSubmit();
    }else if(this.selectedTab == 4){
      this.appDependence.onSubmit();
    }else if(this.selectedTab == 5){
      this.appFamily.onSubmit();
    }else if(this.selectedTab == 6){
      this.appTreatment.onSubmit();
    }else if(this.selectedTab == 7){
      this.appPatients.onSubmit();
    }else if(this.selectedTab == 8){
      this.appTest.onSubmit();
    }else if(this.selectedTab == 9){
      this.appDiabetic.onSubmit();
    }else if(this.selectedTab ==10){
      this.appBiochemical.onSubmit();
    }else if(this.selectedTab == 11){
      this.appMedications.onSubmit();
    }else if(this.selectedTab == 12){
      this.appFamilyWOS.onSubmit();
    }else if(this.selectedTab == 13){
      this.appFamilyPedigree.onSubmit();
    }else if(this.selectedTab == 14){
      this.appDocUpload.onSubmit();
    }
  }

}
