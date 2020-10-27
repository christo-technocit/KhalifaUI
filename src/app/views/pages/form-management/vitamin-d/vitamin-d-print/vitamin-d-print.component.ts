import { Component, OnInit,ChangeDetectorRef,OnDestroy,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {LayoutUtilsService} from "../../../../../core/_base/crud/utils/layout-utils.service";
import {SubheaderService} from "../../../../../core/_base/layout/services/subheader.service";
import {VitamindService} from "../../../../../core/services/vitamind.form.service";
import { debounceTime, distinctUntilChanged, tap, skip, take, delay } from 'rxjs/operators';
import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
import {VitaminDParticipationComponent} from "../_subs/vitamin-d-participation-details/vitamin-d-participation-details";
import {VitaminDClinicalDetails} from "../_subs/vitamin-d-clinical-details/vitamin-d-clinical-details";
import {VitaminDLifeStyles} from "../_subs/vitamin-d-life-styles/vitamin-d-life-styles";
import {VitaminDFamilyHistory} from "../_subs/vitamin-d-family-history/vitamin-d-family-history";
@Component({
  selector: 'kt-vitamin-d-print',
  templateUrl: './vitamin-d-print.component.html',
})
export class PrintComponent implements OnInit {

  formValues : any;
  isLoading : boolean = true;
  isPrint : boolean = true;
  isEdit : boolean = true;
  formId : number;
  @ViewChild('appParticipation',{ static: false })appParticipation: VitaminDParticipationComponent;
  @ViewChild('appClinical',{ static: false })appClinical: VitaminDClinicalDetails;
  @ViewChild('appLifeStyle',{ static: false })appLifeStyle: VitaminDLifeStyles;
  @ViewChild('appFamilyHistory',{ static: false })appFamilyHistory: VitaminDFamilyHistory;

  @ViewChild('printButton',{ static: true }) printButton: ElementRef;
  constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private layoutUtilsService: LayoutUtilsService,
      private subheaderService: SubheaderService,
      private cdr: ChangeDetectorRef,
      private _vService : VitamindService
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
    this.subheaderService.setTitle('Vitamin D Form');
    this.subheaderService.showPrintButton(true);
  }
  //ngOnDestroy(){
  //  //this.subheaderService.showPrintButton(false);
  //}
}
