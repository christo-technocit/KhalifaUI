import { Component, OnInit,ChangeDetectorRef,OnDestroy,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {LayoutUtilsService} from "../../../../../core/_base/crud/utils/layout-utils.service";
import {SubheaderService} from "../../../../../core/_base/layout/services/subheader.service";
import { debounceTime, distinctUntilChanged, tap, skip, take, delay } from 'rxjs/operators';
import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
import {T1DParticipationComponent} from "../_subs/t1d-participation-details/t1d-participation-details";
import {T1DClinicalDetails} from "../_subs/t1d-clinical-details/t1d-clinical-details";
import {T1DLifeStyles} from "../_subs/t1d-life-styles/t1d-life-styles";
import {T1DFamilyHistory} from "../_subs/t1d-family-history/t1d-family-history";
import {T1DMedication} from "../_subs/t1d-medication/t1d-medication";
import {T1DPedigree} from "../_subs/t1d-pedigree/t1d-pedigree";
import {T1DBiochemicalDetails} from "../_subs/t1d-biochemical-details/t1d-biochemical-details"

@Component({
  selector: 'kt-t1d-print',
  templateUrl: './t1d-print.component.html',
})
export class T1DPrintComponent implements OnInit {

  formValues : any;
  isLoading : boolean = true;
  isPrint : boolean = true;
  isEdit : boolean = true;
  formId : number;
  @ViewChild('appParticipation',{ static: false })appParticipation: T1DParticipationComponent;
  @ViewChild('appClinical',{ static: false })appClinical: T1DClinicalDetails;
  @ViewChild('appLifeStyle',{ static: false })appLifeStyle: T1DLifeStyles;
  @ViewChild('appFamilyHistory',{ static: false })appFamilyHistory: T1DFamilyHistory;
  @ViewChild('appMedication',{ static: false })appMedication: T1DMedication;
  @ViewChild('appPedigree',{ static: false })appPedigree: T1DPedigree;
  @ViewChild('appBiochemicalDetails',{ static: false })appBiochemicalDetails: T1DBiochemicalDetails;

  @ViewChild('printButton',{ static: true }) printButton: ElementRef;
  constructor(
      private activatedRoute: ActivatedRoute,
      private subheaderService: SubheaderService
  ) {



  }

  ngOnInit() {
   this.initTitle();

    const routeSubscription =  this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(id) {
        this.isLoading = true;
        this.formId = id;

      }
    });

  }

  initTitle(){
    this.subheaderService.setTitle('T1D Form');
    this.subheaderService.showPrintButton(true);
  }
  //ngOnDestroy(){
  //  //this.subheaderService.showPrintButton(false);
  //}
}
